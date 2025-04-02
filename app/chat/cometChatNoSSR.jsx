"use client";
import React, { useEffect, useState } from "react";
import {
  CometChatMessageComposer,
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import "./CometChatNoSSR.css";

const COMETCHAT_CONSTANTS = {
  APP_ID: process.env.NEXT_PUBLIC_APP_ID,
  REGION: process.env.NEXT_PUBLIC_REGION,
  AUTH_KEY: process.env.NEXT_PUBLIC_AUTH_KEY,
};

const CometChatNoSSR = ({ uid }) => {
  const [user, setUser] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(undefined);

  useEffect(() => {
    const UIKitSettings = new UIKitSettingsBuilder()
      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
      .subscribePresenceForAllUsers()
      .build();

    CometChatUIKit.init(UIKitSettings)
      ?.then(() => {
        console.log("Initialization completed successfully");
        CometChatUIKit.getLoggedinUser().then((loggedInUser) => {
          if (!loggedInUser) {
            const loggedInUser = JSON.parse(
              sessionStorage.getItem("comet-chat-user")
            );
            CometChatUIKit.login(loggedInUser.uid)
              .then((user) => {
                console.log("Login Successful", { user });
                setUser(user);
              })
              .catch((error) => console.error("Login failed", error));
          } else {
            console.log("Already logged-in", { loggedInUser });
            setUser(loggedInUser);
          }
        });
      })
      .catch((error) => console.error("Initialization failed", error));
  }, []);

  useEffect(() => {
    if (user) {
      console.log("other user uuid:", uid);
      // Fetch user or group from CometChat SDK whose chat you want to load.

      /** Fetching User */
      const UID = `${uid}`;
      if (typeof window !== "undefined") {
        CometChat.getUser(UID).then(
          (user) => {
            setSelectedUser(user);
          },
          (error) => {
            console.log("User fetching failed with error:", error);
          }
        );
      }
    }
  }, [user]);

  return user ? (
    <>
      {selectedUser ? (
        <div className="messages-wrapper">
          <CometChatMessageHeader user={selectedUser} />
          <CometChatMessageList user={selectedUser} />
          <CometChatMessageComposer user={selectedUser} />
        </div>
      ) : (
        <div className="empty-conversation">Select Conversation to start</div>
      )}
    </>
  ) : undefined;
};

export default CometChatNoSSR;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isCometChatInitialized, setIsCometChatInitialized] = useState(null); // For tracking initialization status
  const router = useRouter(); // Use router to navigate to the login page on success

  // Function to initialize CometChat
  function initalizeCometChat() {
    /**
     * CometChat Constants - Replace with your actual credentials
     */
    const COMETCHAT_CONSTANTS = {
      APP_ID: process.env.NEXT_PUBLIC_APP_ID, // Replace with your actual App ID from CometChat
      REGION: process.env.NEXT_PUBLIC_REGION, // Replace with your App's Region
      AUTH_KEY: process.env.NEXT_PUBLIC_AUTH_KEY, // Replace with your Auth Key (leave blank if using Auth Token)
    };

    // Dynamic import of CometChat to avoid "window is not defined" error
    import("@cometchat/chat-uikit-react")
      .then(({ CometChatUIKit, UIKitSettingsBuilder }) => {
        /**
         * Configure the CometChat UI Kit using the UIKitSettingsBuilder.
         * This setup determines how the chat UI behaves.
         */
        const UIKitSettings = new UIKitSettingsBuilder()
          .setAppId(COMETCHAT_CONSTANTS.APP_ID) // Assign the App ID
          .setRegion(COMETCHAT_CONSTANTS.REGION) // Assign the App's Region
          .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY) // Assign the Authentication Key (if applicable)
          .subscribePresenceForAllUsers() // Enable real-time presence updates for all users
          .build(); // Build the final configuration

        /**
         * Initialize the CometChat UI Kit with the configured settings.
         * Once initialized successfully, you can proceed with user authentication and chat features.
         */
        CometChatUIKit.init(UIKitSettings)
          .then(() => {
            console.log("CometChat UI Kit initialized successfully.");
            setIsCometChatInitialized(true); // Set success state
            router.push("/login"); // Redirect to the login page if successful
          })
          .catch((error) => {
            console.error("CometChat UI Kit initialization failed:", error); // Log errors if initialization fails
            setIsCometChatInitialized(false); // Set failure state
          });
      })
      .catch((error) => {
        console.error("Failed to load CometChat module:", error);
        setIsCometChatInitialized(false);
      });
  }

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      initalizeCometChat(); // Call the function to initialize CometChat
    }
  }, []);

  // If CometChat is not initialized, show the error message
  if (isCometChatInitialized === false) {
    return <h1>Failed to initialize CometChat. Please try again later.</h1>;
  }

  // Otherwise, show loading or Home content until initialization is complete
  return <h1>Initializing CometChat...</h1>;
}

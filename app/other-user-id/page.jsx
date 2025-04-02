"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CometChatNoSSR() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [opponentUserId, setOpponentUserId] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in via session storage
  useEffect(() => {
    const cometChatUser = sessionStorage.getItem("comet-chat-user");

    if (!cometChatUser) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  // Handle user ID input change
  const handleUserIdChange = (e) => {
    setOpponentUserId(e.target.value);

    setError("");
  };

  // Validate the user ID and fetch user details
  const validateUserId = async () => {
    // Reset states
    setError("");
    setIsLoading(true);

    // Space validation
    if (opponentUserId.includes(" ")) {
      setError("User ID should not contain spaces");
      setIsLoading(false);
      return;
    }

    try {
      router.push(`/chat/${opponentUserId}`);
    } catch (error) {
      console.error("User fetching failed:", error);
      setError("The provided user ID is not correct");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (!isLoggedIn) {
    return <div>Checking authentication status...</div>;
  }

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
        <h1 className="text-2xl font-bold mb-4">Chat Page</h1>
        <p className="mb-4">Enter the user ID you want to chat with:</p>

        <div className="mb-4">
          <input
            type="text"
            value={opponentUserId}
            onChange={handleUserIdChange}
            placeholder="Enter user ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={validateUserId}
          disabled={isLoading}
          className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading ? "Checking..." : "Start Chat"}
        </button>

        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
}

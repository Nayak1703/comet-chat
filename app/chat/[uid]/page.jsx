"use client";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// Dynamically import CometChat component with SSR disabled
const CometChatComponent = dynamic(() => import("../cometChatNoSSR"), {
  ssr: false,
});

export default function Home() {
  const params = useParams();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extract userId from params
    console.log("PARAMS:", params);
    if (params && params.uid) {
      setUserId(params.uid);
    }
  }, [params]);

  return <CometChatComponent uid={userId} />;
}

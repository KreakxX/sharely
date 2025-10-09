"use client";
import Image from "next/image";
import Background from "./components/background";
import Chat from "./components/Chat";
import StreamView from "./components/StreamView";
import Header from "./components/header";
import React, { useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/interfaces/chat";
export default function Home() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  // useEffect for connecting to the Websocket server
  useEffect(() => {
    const connectToWebsocket = () => {
      try {
        // establish connection to the Websocket
        const ws = new WebSocket("ws://localhost:8080");
        wsRef.current = ws;

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          handleWebsocketMessage(data);
        };
      } catch (error) {
        console.log("Erro while connecting to Websocket", error);
      }
    };
    connectToWebsocket();

    // closing function, so not more than one connection is established
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  });

  const handleWebsocketMessage = (data: any) => {
    switch (data.type) {
      case "":
        break;
    }
  };

  const handleSend = (message: string) => {};

  return (
    <div className="relative w-full h-screen ">
      <Background />
      <Header></Header>
      <div className="flex justify-between w-full h-[95vh] gap-3 bg-[#030303] px-10 ">
        <StreamView />
        <Chat handleSend={handleSend} chatMessages={chatMessages} />
      </div>
    </div>
  );
}

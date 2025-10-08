"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Plus, Paperclip } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey team! Ready to start the session?",
      sender: "Alex",
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: "2",
      text: "Yes, let me share my screen",
      sender: "You",
      timestamp: new Date(Date.now() - 120000),
      isOwn: true,
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: message,
          sender: "You",
          timestamp: new Date(),
          isOwn: true,
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="bg-[#030303] flex justify-end mb-10">
      <Card className="bg-zinc-950 max-w-[30vw] min-w-[30vw] border border-zinc-800 shadow-xl">
        <CardHeader className="border-b border-zinc-800/50 pb-4">
          <CardTitle className="text-zinc-100 font-semibold">Chat</CardTitle>
          <CardDescription className="text-zinc-500 text-sm">
            Collaborate with your team in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* <CHANGE> Added message display area with proper styling */}
          <ScrollArea className="h-[45vh] p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.isOwn ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs">
                      {msg.sender.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex flex-col gap-1 max-w-[75%] ${
                      msg.isOwn ? "items-end" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 font-medium">
                        {msg.sender}
                      </span>
                      <span className="text-xs text-zinc-600">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        msg.isOwn
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-800 text-zinc-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* <CHANGE> Enhanced input area with better styling and interactions */}
          <div className="p-4 border-t border-zinc-800/50">
            <InputGroup className="border border-zinc-800 bg-zinc-900/50 rounded-xl transition-all focus-within:border-zinc-700 focus-within:bg-zinc-900">
              <InputGroupTextarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="text-zinc-300 placeholder:text-zinc-600 bg-transparent border-none resize-none min-h-[60px]"
                placeholder="Type a message... (Shift+Enter for new line)"
              />
              <InputGroupAddon align="block-end" className="gap-1 pb-2 pr-2">
                <InputGroupButton
                  variant="ghost"
                  className="rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  size="icon-xs"
                  type="button"
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </InputGroupButton>
                <InputGroupButton
                  onClick={handleSend}
                  disabled={!message.trim()}
                  variant="default"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all"
                  size="icon-xs"
                  type="button"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <p className="text-xs text-zinc-600 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

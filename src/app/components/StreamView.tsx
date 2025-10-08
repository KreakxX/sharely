"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  ScreenShare,
  Camera,
  Download,
  Maximize2,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";
import { useState, useRef } from "react";

export default function StreamView() {
  const [isStreaming, setIsStreaming] = useState(false);

  const streamRef = useRef<HTMLDivElement>(null);

  const handleSelectScreen = () => {
    setIsStreaming(!isStreaming);
  };

  return (
    <div className="bg-[#030303] flex w-full mt-[10vh]">
      <Card className="bg-zinc-950 border ]  min-w-full border-zinc-800 shadow-xl">
        <CardContent className="relative">
          <div className="absolute top-6 right-6 gap-2 flex justify-between z-10">
            <Button
              variant="outline"
              className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-all"
            >
              <Plus className="h-4 w-4" />
              Invite Team
            </Button>
            <Button
              onClick={handleSelectScreen}
              variant={isStreaming ? "destructive" : "default"}
              className={
                isStreaming
                  ? ""
                  : "bg-blue-600 hover:bg-blue-700 transition-all"
              }
            >
              <ScreenShare className="h-4 w-4" />
              {isStreaming ? "Stop Sharing" : "Share Screen"}
            </Button>
          </div>

          <CardHeader className="border-b border-zinc-800/50 pb-4">
            <CardTitle className="text-zinc-100 font-semibold">
              Stream
            </CardTitle>
            <CardDescription className="text-zinc-500 text-sm">
              Share your screen and collaborate in real-time
            </CardDescription>
          </CardHeader>

          <div className="mt-6">
            <Card
              ref={streamRef}
              className="bg-zinc-900 border-zinc-800 min-h-[71vh] relative overflow-hidden group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {isStreaming ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <ScreenShare className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-zinc-400 text-sm">
                      Screen sharing active
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                      <ScreenShare className="h-8 w-8 text-zinc-600" />
                    </div>
                    <p className="text-zinc-500 text-sm">
                      Click "Share Screen" to start streaming
                    </p>
                  </div>
                )}
              </div>

              {isStreaming && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded-full px-4 py-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    className="rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                    title="Take screenshot"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon-sm"
                    variant="ghost"
                    className="rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

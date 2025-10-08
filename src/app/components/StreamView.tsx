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
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);

  // <CHANGE> Added screenshot capture functionality
  const captureScreenshot = async () => {
    try {
      if (streamRef.current) {
        // In a real implementation, you would capture the actual stream
        // For now, we'll simulate the capture
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          canvas.width = streamRef.current.offsetWidth;
          canvas.height = streamRef.current.offsetHeight;

          ctx.fillStyle = "#18181b";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#71717a";
          ctx.font = "20px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(
            "Screenshot captured",
            canvas.width / 2,
            canvas.height / 2
          );

          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `stream-capture-${Date.now()}.png`;
              a.click();
              URL.revokeObjectURL(url);
            }
          });
        }
      }
    } catch (error) {}
  };

  const handleSelectScreen = () => {
    setIsStreaming(!isStreaming);
  };

  return (
    <div className="bg-[#030303] flex w-full mb-10">
      <Card className="bg-zinc-950 border min-w-full border-zinc-800 shadow-xl">
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

          {/* <CHANGE> Enhanced stream display with controls and capture tools */}
          <div className="mt-6">
            <Card
              ref={streamRef}
              className="bg-zinc-900 border-zinc-800 min-h-[45vh] relative overflow-hidden group"
            >
              {/* Stream placeholder or actual stream */}
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
                    onClick={captureScreenshot}
                    size="icon-sm"
                    variant="ghost"
                    className="rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                    title="Take screenshot"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>

                  <div className="w-px h-6 bg-zinc-800" />

                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    size="icon-sm"
                    variant="ghost"
                    className={`rounded-full transition-colors ${
                      isMuted
                        ? "bg-red-600/20 text-red-500 hover:bg-red-600/30"
                        : "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100"
                    }`}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    size="icon-sm"
                    variant="ghost"
                    className={`rounded-full transition-colors ${
                      isVideoOff
                        ? "bg-red-600/20 text-red-500 hover:bg-red-600/30"
                        : "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100"
                    }`}
                    title={isVideoOff ? "Turn on camera" : "Turn off camera"}
                  >
                    {isVideoOff ? (
                      <VideoOff className="h-4 w-4" />
                    ) : (
                      <Video className="h-4 w-4" />
                    )}
                  </Button>

                  <div className="w-px h-6 bg-zinc-800" />

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

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isStreaming ? "bg-green-500 animate-pulse" : "bg-zinc-700"
                  }`}
                />
                <span className="text-zinc-500">
                  {isStreaming ? "Live" : "Not streaming"}
                </span>
              </div>
              {isStreaming && (
                <span className="text-zinc-600 text-xs">
                  Hover over stream to show controls
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { div } from "framer-motion/client";
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export default function Header() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-5 right-5 flex justify-between gap-3">
        <Button className="bg-zinc-950 border border-zinc-800">Sign Up</Button>
        <Button className="bg-zinc-950 border border-zinc-800">Login in</Button>
      </div>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div custom={1} initial="hidden" animate="visible">
          <h1
            className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-400/90 to-pink-300 text-7xl  ",
              pacifico.className
            )}
          >
            Stream, view and Annotate in Real Time
          </h1>
        </motion.div>
        <Button className="px-8 py-7 mt-10 rounded-lg text-lg font-semibold transition-all bg-zinc-950 border border-zinc-800">
          Start Streaming
        </Button>
      </div>
    </div>
  );
}

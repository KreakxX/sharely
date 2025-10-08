import { Button } from "@/components/ui/button";
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
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowRight, Plus, ScreenShare } from "lucide-react";

export default function StreamView() {
  return (
    <div className="bg-[#030303] flex w-full mb-10">
      <Card className="bg-zinc-950 border min-w-full border-zinc-800 ">
        <CardContent className="relative">
          <div className="absolute  right-5 gap-2 flex justify-between">
            <Button>
              <Plus /> invite Team Members
            </Button>
            <Button>
              <ScreenShare /> Select Screen
            </Button>
          </div>
          <CardHeader>
            <CardTitle className="text-zinc-400">Stream</CardTitle>
            <CardDescription className="text-zinc-400">
              Share your Screen with your Team
            </CardDescription>
          </CardHeader>
          <Card className="bg-zinc-900 border-none mt-10 min-h-[45vh]"></Card>
        </CardContent>
      </Card>
    </div>
  );
}

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
import { ArrowRight, Plus } from "lucide-react";

export default function Chat() {
  return (
    <div className="bg-[#030303]  border-zinc-800 flex justify-end">
      <Card className="bg-zinc-950 max-w-[30vw] min-w-[30vw] border border-zinc-800 ">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-zinc-400">Chat</CardTitle>
            <CardDescription className="text-zinc-400">
              Chat with your Team
            </CardDescription>
          </CardHeader>
          <ScrollArea className="min-h-[40vh]" />

          <InputGroup className="border border-zinc-800">
            <InputGroupTextarea
              className="text-zinc-400"
              placeholder="Chat with your Team, and attach screenshots"
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                variant="default"
                className="rounded-full"
                size="icon-xs"
                disabled
              >
                <ArrowRight></ArrowRight>
                <span className="sr-only">Send</span>
              </InputGroupButton>
              <InputGroupButton
                variant="default"
                className="rounded-full"
                size="icon-xs"
                disabled
              >
                <Plus></Plus>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </CardContent>
      </Card>
    </div>
  );
}

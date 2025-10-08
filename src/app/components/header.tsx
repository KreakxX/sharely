import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";

export default function Header() {
  return (
    <div className="absolute top-5 right-10 flex justify-between gap-4">
      <Dialog>
        <DialogTrigger>
          <Button className="bg-blue-600 hover:bg-blue-600">
            <User></User>
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-950 border border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-zinc-400">
              Profile Settings
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Logout or view your Profile Settings
            </DialogDescription>
          </DialogHeader>
          <Button className="bg-blue-600">Logout</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

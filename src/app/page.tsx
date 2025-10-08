import Image from "next/image";
import Background from "./components/background";
import Chat from "./components/Chat";
import StreamView from "./components/StreamView";

export default function Home() {
  return (
    <div className="relative w-full h-screen ">
      <Background />
      <div className="flex justify-between w-full gap-3 bg-[#030303] px-10 ">
        <StreamView />
        <Chat />
      </div>
    </div>
  );
}

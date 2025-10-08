import Image from "next/image";
import Header from "./components/header";
import Background from "./components/background";
import Chat from "./components/Chat";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Background />
      <Header />
      <Chat />
    </div>
  );
}

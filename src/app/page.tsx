import Image from "next/image";
import Header from "./components/header";
import Background from "./components/background";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Background />
      <Header />
    </div>
  );
}

import Image from "next/image";
import { Shiba } from "./components/shiba";
import Base from "./components/base";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-screen h-screen">
        <Shiba />
        {/* <Base /> */}
      </div>
    </main>
  );
}

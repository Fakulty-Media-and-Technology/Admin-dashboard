import { Login } from "@/screens";
import Image from "next/image";

export const runtime = "edge";


export default function Home() {
  return (
    <main className="flex h-[110%] items-center w-full mx-auto">
      <Login />
    </main>
  );
}

"use client"

import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import Image from "next/image";
import Logo from "@/src/img/logo.jpg"
import { Space } from "@/components/Space";
import { useRouter } from "next/navigation";

export default function Captioner() {
  const router = useRouter();

  return (
    <div className="body">
      <SideBar />
      <div className="main">
        <Header section={"Media Captioner"}/>
        <main>
          <h1>Coming Soon!!!</h1>
        </main>
      </div>

    </div>
  );
}

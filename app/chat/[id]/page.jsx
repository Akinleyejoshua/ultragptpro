"use client"

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ChatSection } from "@/layouts/ChatSection";
import { PromptSection } from "@/layouts/PromptSection";
import Image from "next/image";
import { useParams } from "next/navigation"

export default function Page() {
  const { id } = useParams();

  return (
    <div className="chat">
      
    </div>

  );
}

"use client"

import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import Image from "next/image";
import Logo from "@/src/img/logo.jpg"
import { Space } from "@/components/Space";
import { useRouter } from "next/navigation";
import ImgCap from "@/src/img/img-cap.jpg";
import Inter from "@/src/img/inter.jpg";
import Transcript from "@/src/img/transcript.jpg"

export default function Home() {
  const router = useRouter();

  return (
    <div className="body">
      <SideBar />
      <div className="main">
        <Header section={"Home"}/>
        <main>
          <h1>Select the GPT of Your Choice!</h1>
          <Space p={".3rem"} />
          <div className="grid-home">
            {[
              {
                name: "Interviewer GPT",
                description: "Helps Interview and Recruite Job Candidates",
                link: "/interviewer",
                image: Inter,
              },
              {
                name: "Image Captioning GPT",
                description: "Helps describes content in a media or image",
                link: "/captioner",
                image: ImgCap,
              },
              {
                name: "Translator/Transcript GPT",
                description: "Helps transcribe text from one language to another language",
                link: "/transcript",
                image: Transcript,
              }
            ].map((item, i) => {
              return <div className="item" key={i}>
                <Image className="img" src={item?.image} alt=""/>
                <div className="content col">
                  <p>{item.name}</p>
                  <small className="dim">
                    {item.description}
                  </small>
                  <button onClick={() => router.push(item.link)}>Get Started</button>
                </div>
              </div>
            })}

          </div>
        </main>
      </div>

    </div>
  );
}

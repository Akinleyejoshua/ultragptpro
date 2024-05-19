"use client"

import { Input } from "@/components/Input";
import { Space } from "@/components/Space";
import { setPrompt, setLoader, setMsg, setErr } from "@/redux/features/prompt";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { gptPrompt } from "@/services/gpt-prompt";

export const PromptSection = ({ }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const prompt = useSelector(state => state.prompt.prompt);
    const loader = useSelector(state => state.prompt.loading);
    const id = Math.floor(Math.random() * 1000);
    
const err = useSelector(state => state.prompt.err);
    
    return <section className="prompt-section col">
       
    </section>
}
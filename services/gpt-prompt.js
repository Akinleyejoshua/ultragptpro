import { request } from "@/utils/axios";

export const gptPrompt = async (text) => request.get(`/api/gpt/prompt?prompt=${text}`)
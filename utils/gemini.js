import { GoogleGenerativeAI } from "@google/generative-ai";
// alert(process.env.API_KEY)
const API_KEY = "AIzaSyBIQFdtw0EngFVlVfpwT0V4kNz7VZBZWak";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function prompt(prompt) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp"});
  
    const chat = model.startChat();
  
    const msg = prompt;

    try{
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        return text.replace(/\*/g, '').replace(/[|]/g, '').replace(/-/g, '') || "";
    } catch (err){
        console.log(err)
    }
  
    
  }

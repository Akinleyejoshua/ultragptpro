import { GoogleGenerativeAI } from "@google/generative-ai";
// alert(process.env.API_KEY)
const API_KEY="AIzaSyCqbZHBwQilte6ktDaa6F6GyM7SvvPFyMQ";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function prompt(prompt) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const chat = model.startChat();
  
    const msg = prompt;

    try{
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        return text.replace(/\*/g, '') || "";
    } catch (err){

    }
  
    
  }

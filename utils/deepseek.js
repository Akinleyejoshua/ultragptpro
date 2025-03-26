import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: "sk-1a4071490a104004ac89cd545b5d75dc",
});

export const prompt = async (text) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "Analyze this text for sentiment, key topics, and named entities."
        },
        { role: "user", content: text }
      ],
      temperature: 0.1,
      max_tokens: 256
    });
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("Analysis error:", error.message);
    throw error;
  }
}

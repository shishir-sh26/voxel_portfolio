import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  async chat(message: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []) {
    // Guidelines: Always use a named parameter for apiKey and obtain from process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => ({ role: h.role, parts: h.parts })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      // Guidelines: Access .text property directly, do not call as a method.
      return response.text || "I'm having trouble connecting to the block-network. Try again later!";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble connecting to the block-network. Try again later!";
    }
  }
}

export const gemini = new GeminiService();
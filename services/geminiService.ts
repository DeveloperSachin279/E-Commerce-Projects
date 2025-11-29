import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Note: In a real app, API Key should be securely handled.
const API_KEY = import.meta.env.VITE_API_KEY || '';

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const getDesignAdvice = async (userQuery: string, availableProducts: Product[]) => {
  if (!ai) {
    return "I'm sorry, my design brain isn't connected right now. Please check the API configuration.";
  }

  const productContext = availableProducts
    .map(p => `- ${p.name} (${p.category}): ₹${p.price}. ${p.description}`)
    .join('\n');

  const systemInstruction = `You are "Akash AI", a sophisticated and helpful interior design assistant for the premium furniture brand "Akash Interio". 
  
  Your goal is to help customers choose furniture from our catalog that matches their style and needs.
  
  Here is our current product catalog:
  ${productContext}
  
  Rules:
  1. Be polite, professional, and classy. Use a warm, inviting tone.
  2. Recommend specific products from the catalog if they fit the user's query.
  3. If the user asks about general design advice (colors, layout), provide expert tips and suggest how our products fit in.
  4. Keep responses concise (under 150 words) unless detailed advice is requested.
  5. If asked about prices, always quote them in ₹ (INR).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble visualizing that right now. Could you please try asking again?";
  }
};

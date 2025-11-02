import { GoogleGenAI } from "@google/genai";
import { outlets } from '../data/outlets';

export const getFoodRecommendation = async (): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API key not found. Recommendation feature will be disabled.");
    return "Fitur rekomendasi saat ini tidak tersedia. Silakan periksa konfigurasi API key.";
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const outletNames = outlets.map(o => o.name).join(', ');

  try {
    const prompt = `Kamu adalah pemandu makanan yang asik dan ramah untuk mahasiswa Telkom University. Ada seorang mahasiswa yang lapar dan bingung mau makan apa. Berdasarkan daftar warung ini: ${outletNames}, berikan satu rekomendasi singkat (di bawah 50 kata) yang seru dan persuasif untuk satu menu dari salah satu warung tersebut. Mulai dengan kalimat yang menarik perhatian dan gunakan bahasa Indonesia yang santai!`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching recommendation from Gemini API:", error);
    return "Waduh! Aku lagi pusing nih, belum nemu ide. Coba lagi nanti ya.";
  }
};
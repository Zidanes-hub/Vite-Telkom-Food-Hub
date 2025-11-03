// backend/geminiService.js
import { GoogleGenAI } from "@google/genai";
import { outlets } from './data.js'; // <-- Impor dari data.js lokal

export const getFoodRecommendation = async () => {
  // process.env.GEMINI_API_KEY akan otomatis dibaca dari .env oleh server
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("Gemini API key not found. Set GEMINI_API_KEY in .env");
    return "Fitur rekomendasi saat ini tidak tersedia.";
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
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

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCreativeSuggestions = async (
  eventType: string,
  productName: string,
  tone: string
): Promise<string> => {
  const prompt = `
    Você é um especialista em lembrancinhas criativas e botânica da loja 'MyPlant'.
    O cliente está comprando o produto: "${productName}" para um evento do tipo: "${eventType}".
    O tom desejado é: "${tone}".

    Por favor, sugira:
    1. Uma frase curta e impactante para colocar na tag de personalização (máximo 6 palavras).
    2. Uma explicação curta de 1 frase sobre o significado simbólico da planta ou do ato de plantar para esta ocasião.

    Retorne apenas o texto simples, formatado de forma amigável.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Desculpe, não consegui gerar uma sugestão agora.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Falha ao consultar a IA criativa.");
  }
};

export const chatWithAssistant = async (history: {role: 'user' | 'model', text: string}[], newMessage: string): Promise<string> => {
    const systemInstruction = `
      Você é a 'Flora', a assistente virtual da MyPlant. 
      Você é especialista em kits de plantio com SEMENTES.
      
      REGRA IMPORTANTE: A loja NÃO vende suculentas, cactos ou plantas vivas montadas. 
      Trabalhamos EXCLUSIVAMENTE com Kits de Plantio contendo SEMENTES (Girassol, Tomate Cereja, Hortaliças, etc).
      
      Se o cliente perguntar por suculentas, explique educadamente que não trabalhamos com elas por questões de logística e sugira os Kits de Sementes como uma alternativa mais duradoura e interativa.
      
      Ajude os clientes a escolherem o kit ideal, dê dicas de cultivo e sugira frases para personalização. 
      Seja simpática, use emojis de plantas 🌿 e mantenha respostas concisas (máx 50 palavras).
    `;

    try {
        const historyText = history.map(h => `${h.role === 'user' ? 'Cliente' : 'Flora'}: ${h.text}`).join('\n');
        const finalPrompt = `${systemInstruction}\n\nHistórico da conversa:\n${historyText}\nCliente: ${newMessage}\nFlora:`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: finalPrompt
        });

        return response.text || "Desculpe, não entendi.";
    } catch (e) {
        console.error(e);
        return "Tive um pequeno problema técnico. Tente novamente!";
    }
}

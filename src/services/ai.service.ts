import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});


export async function summarizeText(
  text: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI assistant inside a collaborative document editor.

Summarize the following text.

Rules:
- Return only the summary.
- Maximum 5 bullet points.
- No introduction.
- No explanation.
- No markdown heading.

Text:
${text}
`,
  });

  return response.text?.trim();
}


export async function rewriteText(
  text: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI writing assistant.

Rewrite the following text.

Rules:
- Return ONLY the rewritten text.
- Do not explain changes.
- Preserve the original meaning.
- Improve grammar and clarity.

Text:
${text}
`,
  });

  return response.text?.trim();
}

export async function improveWriting(
  text: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI writing assistant.

Improve the following text.

Rules:
- Return ONLY the improved text.
- Fix grammar.
- Improve readability.
- Improve professionalism.
- Do not explain what you changed.

Text:
${text}
`,
  });

  return response.text?.trim();
}


export async function grammarCheck(
  text: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an English grammar assistant.

Correct the following text.

Rules:
- Fix grammar.
- Fix spelling.
- Fix punctuation.
- Return ONLY the corrected text.
- Do NOT explain anything.

Text:
${text}
`,
  });

  return response.text?.trim();
}


export async function continueWriting(
  text: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI writing assistant.

Continue writing the following text.

Rules:
- Continue naturally.
- Keep the same tone.
- Keep the same language.
- Write around 100 words.
- Return ONLY the continuation.

Text:
${text}
`,
  });

  return response.text?.trim();
}


export async function generateTitle(
  text: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI assistant.

Generate a concise document title.

Rules:
- Maximum 8 words.
- Return ONLY the title.
- No quotation marks.
- No explanation.

Document:
${text}
`,
  });

  return response.text?.trim();
}

export async function translateText(
  text: string,
  language: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are a professional translator.

Translate the following text into ${language}.

Rules:
- Return ONLY the translated text.
- Preserve the meaning.
- Do not explain anything.

Text:
${text}
`,
  });

  return response.text?.trim();
}
export async function convertToBullets(
  text: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI writing assistant.

Convert the following text into concise bullet points.

Rules:
- Return ONLY bullet points.
- Use "-" for each bullet.
- Maximum 10 bullets.
- Do not explain anything.

Text:
${text}
`,
  });

  return response.text?.trim();
}


export async function changeTone(
  text: string,
  tone: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI writing assistant.

Rewrite the following text in a ${tone} tone.

Rules:
- Preserve the original meaning.
- Do not add new information.
- Return ONLY the rewritten text.
- Do not explain your changes.

Text:
${text}
`,
  });

  return response.text?.trim();
}

export async function simplifyText(
  text: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an AI writing assistant.

Rewrite the following text using simple, easy-to-understand language.

Rules:
- Keep the original meaning.
- Use short sentences.
- Return ONLY the simplified text.
- Do not explain anything.

Text:
${text}
`,
  });

  return response.text?.trim();
}

export async function explainText(
  text: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an expert teacher.

Explain the following text in simple language.

Rules:
- Keep the explanation concise.
- Maximum 150 words.
- Return ONLY the explanation.
- Do not repeat the original text.

Text:
${text}
`,
  });

  return response.text?.trim();
}
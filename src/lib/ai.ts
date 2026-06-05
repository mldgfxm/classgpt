import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});

export const aiModel = openai(
  process.env.AI_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini"
);

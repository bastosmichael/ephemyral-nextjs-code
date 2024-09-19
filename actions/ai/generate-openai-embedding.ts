"use server"

import {
  EPHEMYRAL_EMBEDDING_DIMENSIONS,
  EPHEMYRAL_EMBEDDING_MODEL
} from "@/lib/constants/ephemyral-code-config"
import OpenAI from "openai"

const openai = new OpenAI()

export async function generateEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: EPHEMYRAL_EMBEDDING_MODEL,
      dimensions: EPHEMYRAL_EMBEDDING_DIMENSIONS,
      input: text
    })

    return response.data[0].embedding
  } catch (error) {
    console.error("Error generating embedding:", error)
    throw error
  }
}

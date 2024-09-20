"use server"

import OpenAI from "openai"
import { calculateLLMCost } from "@/lib/ai/calculate-llm-cost"

// Ensure the API key is set in the environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Define the message structure according to the OpenAI API
type ChatCompletionMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export const generateOpenAIResponse = async (
  messages: ChatCompletionMessage[]
) => {
  const modelId = "gpt-4o-mini"
  try {
    const response = await openai.chat.completions.create({
      model: modelId,
      messages: messages, // Using the correctly typed messages array
      max_tokens: 16000 // Adjust as needed
    })

    // Calculate the cost using the model's input and output tokens
    const usage = response.usage // Assuming usage data is available in the response
    calculateLLMCost({
      llmId: modelId,
      inputTokens: usage?.prompt_tokens || 0,
      outputTokens: usage?.completion_tokens || 0
    })

    // Returning the text response from the assistant
    return response.choices[0].message?.content || ""
  } catch (error) {
    console.error("Error generating AI response with GPT-4:", error)
    throw error
  }
}

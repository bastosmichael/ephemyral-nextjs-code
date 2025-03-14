"use server"

import OpenAI from "openai"
import { calculateLLMCost } from "@/lib/ai/calculate-llm-cost"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Define the message structure according to the OpenAI API
type ChatCompletionMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export const generateOpenAIResponse = async (
  messages: ChatCompletionMessage[]
) => {
  const modelId = "gpt-4-turbo-preview"

  try {
    const response = await openai.chat.completions.create({
      model: modelId,
      messages,
      max_tokens: 16000 // Adjust as needed
    })

    // Calculate cost based on the model’s usage data
    const usage = response.usage
    calculateLLMCost({
      llmId: modelId,
      inputTokens: usage?.prompt_tokens || 0,
      outputTokens: usage?.completion_tokens || 0
    })

    // Returning the text response from the assistant
    return response.choices[0].message?.content || ""
  } catch (error: any) {
    console.error("Error generating AI response with GPT-4:", error)

    // Check if the error message contains the “max context length” pattern
    const message = error?.error?.message
    if (typeof message === "string") {
      const match = message.match(
        /This model's maximum context length is (\d+) tokens?\.\s*However, your messages resulted in (\d+) tokens?\.\s*Please reduce the length of the messages\./i
      )
      if (match) {
        const maxTokens = match[1]
        const submittedTokens = match[2]

        // Throw a custom error that can be caught and handled upstream
        throw new Error(
          JSON.stringify({
            errorType: "EXCEED_CONTEXT",
            message: "Too many tokens in request.",
            maxTokens,
            submittedTokens
          })
        )
      }
    }

    // If it’s some other error, re-throw as-is or handle differently if you want
    throw error
  }
}

"use server"

import { calculateLLMCost } from "@/lib/ai/calculate-llm-cost"

// Optionally, pull these from env variables, similar to how you used process.env for OpenAI.
const GROK_API_URL = "https://api.x.ai/v1"
const GROK_API_KEY = process.env.GROK_API_KEY

// Structure of our chat messages remains the same
type ChatCompletionMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export const generateGrokResponse = async (
  messages: ChatCompletionMessage[]
) => {
  try {
    // Body for the Grok API request
    const requestBody = {
      messages,
      model: "grok-2-latest",
      stream: false,
      temperature: 0
    }

    const response = await fetch(`${GROK_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROK_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("Grok API error response:", errorBody)
      throw new Error(`Grok API request failed with status ${response.status}`)
    }

    // Parse JSON response from Grok
    const data = await response.json()

    // If usage data is returned, you can still compute cost if you like
    const usage = data.usage // e.g., { prompt_tokens: number; completion_tokens: number }
    if (usage) {
      calculateLLMCost({
        llmId: "grok-2-latest",
        inputTokens: usage.prompt_tokens || 0,
        outputTokens: usage.completion_tokens || 0
      })
    }

    // Return the text response from the Grok assistant
    return data.choices?.[0]?.message?.content || ""
  } catch (error) {
    console.error("Error generating AI response with Grok:", error)
    throw error
  }
}

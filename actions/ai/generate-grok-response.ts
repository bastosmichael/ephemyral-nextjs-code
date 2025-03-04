"use server"

import { calculateLLMCost } from "@/lib/ai/calculate-llm-cost"

const GROK_API_URL = "https://api.x.ai/v1"
const GROK_API_KEY = process.env.GROK_API_KEY

type ChatCompletionMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export const generateGrokResponse = async (
  messages: ChatCompletionMessage[]
) => {
  try {
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

      // Look for the "max prompt length vs. request tokens" pattern
      const match = errorBody.match(
        /This model's maximum prompt length is (\d+) but the request contains (\d+) tokens?\./i
      )

      if (match) {
        const maxTokens = match[1]
        const submittedTokens = match[2]

        throw new Error(
          JSON.stringify({
            errorType: "EXCEED_CONTEXT",
            message: "Too many tokens in request.",
            maxTokens,
            submittedTokens
          })
        )
      }

      // Fallback if it was some other error
      throw new Error(`Grok API request failed with status ${response.status}`)
    }

    const data = await response.json()
    const usage = data.usage
    if (usage) {
      calculateLLMCost({
        llmId: "grok-2-latest",
        inputTokens: usage.prompt_tokens || 0,
        outputTokens: usage.completion_tokens || 0
      })
    }

    return data.choices?.[0]?.message?.content || ""
  } catch (error) {
    console.error("Error generating AI response with Grok:", error)
    // Rethrow or handle the error however you prefer
    throw error
  }
}

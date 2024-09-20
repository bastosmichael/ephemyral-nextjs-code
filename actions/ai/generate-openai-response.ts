"use server"

import OpenAI from "openai"
import { calculateLLMCost, OPENAI_LLMS } from "@/lib/ai/calculate-llm-cost"

// Ensure the API key is set in the environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Define the message structure according to the OpenAI API
type ChatCompletionMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

// Utility function to find the next available model in the list
const getNextOpenAIModel = (currentModelId: string) => {
  const currentIndex = OPENAI_LLMS.findIndex(
    model => model.id === currentModelId
  )
  if (currentIndex < 0 || currentIndex === OPENAI_LLMS.length - 1) {
    return null // No more models available
  }
  return OPENAI_LLMS[currentIndex + 1]
}

// Utility function to get max tokens for a given model
const getMaxTokensForOpenAIModel = (modelId: string): number => {
  const model = OPENAI_LLMS.find(m => m.id === modelId)
  return model ? model.tokenLimits.TPD / model.tokenLimits.RPD : 1000 // Default to 1000 if not found
}

export const generateOpenAIResponse = async (
  messages: ChatCompletionMessage[],
  currentModelId: string = OPENAI_LLMS[0].id // Start with the first model in the list
): Promise<string> => {
  let modelId: string | null = currentModelId
  let response

  while (modelId) {
    try {
      // Get the max tokens for the current model
      const maxTokens = getMaxTokensForOpenAIModel(modelId)

      // Attempt to generate a response with the current model
      response = await openai.chat.completions.create({
        model: modelId,
        messages: messages,
        max_tokens: maxTokens
      })

      // Calculate the cost using the model's input and output tokens
      const usage = response.usage // Assuming usage data is available in the response
      calculateLLMCost({
        llmId: modelId,
        inputTokens: usage?.prompt_tokens || 0,
        outputTokens: usage?.completion_tokens || 0
      })

      // Return the response if successful
      return response.choices[0].message?.content || ""
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        console.error(`Error with model ${modelId}:`, error.message)

        // Check for errors related to token limits and switch to the next model
        if (
          error.message.includes("TPM") ||
          error.message.includes("RPM") ||
          error.message.includes("RPD") ||
          error.message.includes("TPD")
        ) {
          console.warn(
            `Switching to the next available model due to token limit exceeded: ${error.message}`
          )
          const nextModel = getNextOpenAIModel(modelId) // Get the next model
          if (nextModel) {
            modelId = nextModel.id
          } else {
            modelId = null // No more models available, exit loop
          }
        } else {
          // For other errors, break out of the loop and throw the error
          throw new Error(`Unhandled error: ${error.message}`)
        }
      } else {
        // Handle unknown error type
        throw new Error("An unknown error occurred")
      }
    }
  }

  // If no models are available, throw an error
  throw new Error(
    "No available models could fulfill the request due to token limits."
  )
}

// Type guard to check if the error is an object with a message property
const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  )
}

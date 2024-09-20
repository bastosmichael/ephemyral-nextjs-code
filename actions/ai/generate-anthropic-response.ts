"use server"

import {
  calculateLLMCost,
  getLLMById,
  ANTHROPIC_LLMS
} from "@/lib/ai/calculate-llm-cost"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic()

// Utility function to find the next available model in the list
const getNextModel = (currentModelId: string) => {
  const currentIndex = ANTHROPIC_LLMS.findIndex(
    model => model.id === currentModelId
  )
  if (currentIndex < 0 || currentIndex === ANTHROPIC_LLMS.length - 1) {
    return null // No more models available
  }
  return ANTHROPIC_LLMS[currentIndex + 1]
}

// Utility function to get max tokens for a given model
const getMaxTokensForModel = (modelId: string): number => {
  const model = getLLMById(modelId)
  return model ? model.tokenLimits.TPD / model.tokenLimits.RPD : 1000 // Default to 1000 if not found
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

export const generateAnthropicResponse = async (
  messages: Anthropic.Messages.MessageParam[],
  currentModelId: string = ANTHROPIC_LLMS[0].id // Start with the first model in the list
): Promise<string> => {
  let modelId: string | null = currentModelId
  let response

  while (modelId) {
    try {
      // Get the max tokens for the current model
      const maxTokens = getMaxTokensForModel(modelId)

      // Attempt to generate a response with the current model
      response = await anthropic.messages.create({
        model: modelId,
        system:
          "You are a helpful assistant that can answer questions and help with tasks.",
        messages,
        max_tokens: maxTokens
      })

      console.warn("usage", response.usage)

      // Calculate the cost using the model's input and output tokens
      calculateLLMCost({
        llmId: modelId,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens
      })

      // Return the response if successful
      return response.content[0].type === "text" ? response.content[0].text : ""
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
          const nextModel = getNextModel(modelId) // Get the next model
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

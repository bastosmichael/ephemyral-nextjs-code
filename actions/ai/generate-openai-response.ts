"use server"

import OpenAI from "openai"

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
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: messages, // Using the correctly typed messages array
      max_tokens: 300 // Adjust as needed
    })

    // Returning the text response from the assistant
    return response.choices[0].message?.content || ""
  } catch (error) {
    console.error("Error generating AI response with GPT-4:", error)
    throw error
  }
}

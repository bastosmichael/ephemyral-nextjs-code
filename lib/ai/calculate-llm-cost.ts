// Anthropic Models (ordered by total cost: inputCost + outputCost)
export const ANTHROPIC_LLMS = [
  {
    name: "Claude 3.5 Sonnet",
    id: "claude-3-5-sonnet-20240620",
    inputCost: 3,
    outputCost: 15,
    tokenLimits: {
      TPM: 200000,
      RPM: 500,
      RPD: 10000,
      TPD: 2000000
    }
  },
  {
    name: "Claude 3.5 Haiku",
    id: "claude-3-haiku-20240307",
    inputCost: 0.25,
    outputCost: 1.25,
    tokenLimits: {
      TPM: 200000,
      RPM: 500,
      RPD: 10000,
      TPD: 2000000
    }
  }
]

// OpenAI Models (ordered by total cost: inputCost + outputCost)
export const OPENAI_LLMS = [
  {
    name: "GPT-4 Omni Mini",
    id: "gpt-4o-mini",
    inputCost: 2.5,
    outputCost: 7.5,
    tokenLimits: {
      TPM: 200000,
      RPM: 500,
      RPD: 10000,
      TPD: 2000000
    }
  },
  {
    name: "GPT-3.5 Turbo 16k",
    id: "gpt-3.5-turbo-16k",
    inputCost: 0.75,
    outputCost: 2,
    tokenLimits: {
      TPM: 200000,
      RPM: 500,
      RPD: 10000,
      TPD: 2000000
    }
  },
  {
    name: "GPT-3.5 Turbo",
    id: "gpt-3.5-turbo",
    inputCost: 0.5,
    outputCost: 1.5,
    tokenLimits: {
      TPM: 200000,
      RPM: 500,
      RPD: 10000,
      TPD: 2000000
    }
  },
  {
    name: "GPT-3.5 Turbo Instruct",
    id: "gpt-3.5-turbo-instruct",
    inputCost: 0.3,
    outputCost: 1,
    tokenLimits: {
      TPM: 90000,
      RPM: 3500,
      RPD: 10000,
      TPD: 200000
    }
  },
  {
    name: "GPT-4 Turbo",
    id: "gpt-4-turbo",
    inputCost: 10,
    outputCost: 30,
    tokenLimits: {
      TPM: 30000,
      RPM: 500,
      RPD: 10000,
      TPD: 90000
    }
  },
  {
    name: "GPT-4 Omni",
    id: "gpt-4o",
    inputCost: 5,
    outputCost: 15,
    tokenLimits: {
      TPM: 30000,
      RPM: 500,
      RPD: 10000,
      TPD: 90000
    }
  },
  {
    name: "GPT-4",
    id: "gpt-4",
    inputCost: 5,
    outputCost: 15,
    tokenLimits: {
      TPM: 10000,
      RPM: 500,
      RPD: 10000,
      TPD: 100000
    }
  }
]

// Google Models (ordered by total cost: inputCost + outputCost)
export const GOOGLE_LLMS = [
  {
    name: "Gemini 1.5 Pro",
    id: "models/gemini-1.5-pro-latest",
    inputCost: 3.5,
    outputCost: 10.5,
    tokenLimits: {
      TPM: 30000,
      RPM: 500,
      RPD: 10000,
      TPD: 90000
    }
  }
]

// Combined LLM List for easy access
export const LLMS = [...ANTHROPIC_LLMS, ...OPENAI_LLMS, ...GOOGLE_LLMS]

// Utility Functions

// Function to get LLM by ID
export const getLLMById = (llmId: string) => LLMS.find(llm => llm.id === llmId)

// Function to calculate LLM cost
export const calculateLLMCost = ({
  llmId,
  inputTokens,
  outputTokens
}: {
  llmId: string
  inputTokens: number
  outputTokens: number
}) => {
  const llm = getLLMById(llmId)
  if (!llm) {
    return 0 // Skip if LLM not found
  }

  const inputCost = (inputTokens / 1_000_000) * llm.inputCost
  const outputCost = (outputTokens / 1_000_000) * llm.outputCost
  const totalCost = inputCost + outputCost

  // Cost in USD
  console.warn(`Total cost for ${llm.name}: $${totalCost.toFixed(6)}`)
  return parseFloat(totalCost.toFixed(6))
}

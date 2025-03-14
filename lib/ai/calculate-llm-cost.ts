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
    name: "GPT-4 Turbo Preview",
    id: "gpt-4-turbo-preview",
    inputCost: 10,
    outputCost: 30,
    maxContext: 128000,
    tokenLimits: {
      TPM: 30000,
      RPM: 500,
      RPD: 10000,
      TPD: 128000
    }
  },
  {
    name: "GPT-4 Turbo",
    id: "gpt-4-turbo",
    inputCost: 10,
    outputCost: 30,
    maxContext: 128000,
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
    maxContext: 128000,
    tokenLimits: {
      TPM: 30000,
      RPM: 500,
      RPD: 10000,
      TPD: 90000
    }
  },
  {
    name: "GPT-4 Omni Mini",
    id: "gpt-4o-mini",
    inputCost: 2.5,
    outputCost: 7.5,
    maxContext: 16000,
    tokenLimits: {
      TPM: 200000,
      RPM: 500,
      RPD: 10000,
      TPD: 2000000
    }
  },
  {
    name: "GPT-4",
    id: "gpt-4",
    inputCost: 5,
    outputCost: 15,
    maxContext: 8192,
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

export const GROK_LLMS = [
  {
    name: "Grok 3",
    id: "grok-3",
    inputCost: 5.0,
    outputCost: 15.0,
    maxContext: 1000000,
    tokenLimits: {
      TPM: 50000,
      RPM: 600,
      RPD: 15000,
      TPD: 120000
    }
  },
  {
    name: "Grok 2 1212",
    id: "grok-2-1212",
    inputCost: 2.5,
    outputCost: 12.0,
    maxContext: 80000,
    tokenLimits: {
      TPM: 45000,
      RPM: 550,
      RPD: 13000,
      TPD: 110000
    }
  },
  {
    name: "Grok 2 Latest",
    id: "grok-2-latest",
    inputCost: 2.0,
    outputCost: 10.0,
    maxContext: 64000,
    tokenLimits: {
      TPM: 40000,
      RPM: 500,
      RPD: 12000,
      TPD: 100000
    }
  }
];
``` ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​

// Combined LLM List for easy access
export const LLMS = [
  ...ANTHROPIC_LLMS,
  ...OPENAI_LLMS,
  ...GOOGLE_LLMS,
  ...GROK_LLMS
]

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

  // Both inputTokens and outputTokens are typically measured in "number of tokens"
  // We'll convert them to millions of tokens ( / 1,000,000 ) for the cost formula
  const inputCost = (inputTokens / 1_000_000) * llm.inputCost
  const outputCost = (outputTokens / 1_000_000) * llm.outputCost
  const totalCost = inputCost + outputCost

  // Cost in USD
  console.warn(`Total cost for ${llm.name}: $${totalCost.toFixed(6)}`)
  return parseFloat(totalCost.toFixed(6))
}

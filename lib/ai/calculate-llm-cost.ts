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

export const GROK_LLMS = [
  {
    name: "Grok 2 Latest",
    id: "grok-2-latest",
    // Pricing based on xAI API updates from December 2024 (Web ID: 6)
    inputCost: 2.0, // $2 per million input tokens
    outputCost: 10.0, // $10 per million output tokens
    tokenLimits: {
      TPM: 40000, // Tokens per minute (estimated)
      RPM: 500, // Requests per minute (unchanged from your example)
      RPD: 12000, // Requests per day (estimated)
      TPD: 100000 // Tokens per day (estimated)
    }
  },
  {
    name: "Grok 2 1212",
    id: "grok-2-1212",
    // Pricing inferred as a slight increase from Grok 2 Latest, assuming a December 2024 update
    inputCost: 2.5, // $2.5 per million input tokens (modest bump for an updated version)
    outputCost: 12.0, // $12 per million output tokens (reflecting improved capabilities)
    tokenLimits: {
      TPM: 45000, // Tokens per minute (slightly higher than Grok 2 Latest)
      RPM: 550, // Requests per minute (modest increase)
      RPD: 13000, // Requests per day (estimated)
      TPD: 110000 // Tokens per day (slightly higher than Grok 2 Latest)
    }
  },
  {
    name: "Grok 3",
    id: "grok-3",
    // Pricing inferred from API trends and X Premium+ adjustments (Web ID: 0, 11, Posts on X)
    inputCost: 5.0, // $5 per million input tokens (based on earlier Grok-beta pricing, Web ID: 3)
    outputCost: 15.0, // $15 per million output tokens (based on earlier Grok-beta pricing, Web ID: 3)
    tokenLimits: {
      TPM: 50000, // Tokens per minute (increased for Grok 3’s higher capacity)
      RPM: 600, // Requests per minute (slightly higher than Grok 2)
      RPD: 15000, // Requests per day (estimated)
      TPD: 120000 // Tokens per day (reflecting Grok 3’s 1M-token context window capability)
    }
  }
]

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

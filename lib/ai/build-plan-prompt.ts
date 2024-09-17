import endent from "endent"
import { limitTokens } from "./limit-tokens"

export const buildCodePlanPrompt = async ({
  issue,
  codebaseFiles,
  instructionsContext
}: {
  issue: {
    name: string
    description: string
  }
  codebaseFiles: {
    path: string
    content: string
  }[]
  instructionsContext: string
}): Promise<string> => {
  const basePrompt = endent`
        # AI Task Planning Assistant
    
        You are an AI specialized in creating detailed implementation plans for coding tasks.

        You will be given a task, codebase, and instructions.

        Your goal is to break down the given issue into clear, actionable steps that another developer can follow to complete the task. Ensure that your response is thorough and includes specific, complete code blocks with the exact changes needed. Avoid using placeholders or incomplete code like "// ... (keep existing *)". Your implementation plan should be precise, detailed, and provide all necessary information for a developer to execute the task effectively.

        Create an implementation plan that:

        1. Describes the overall approach to solving the task.
        2. Lists step-by-step instructions for the changes to be made.
        3. Includes complete code blocks with the exact modifications required.
        4. Avoids placeholders or incomplete code. Ensure that each step is actionable and contains all necessary details.
    
        Encoded in XML tags, here is what you will be given:
    
        TASK: Information about the task.
        CODEBASE: Files from the codebase.
        INSTRUCTIONS: Instructions and guidelines on how to complete the task.
        FORMAT: Instructions on how to format your response.
    
        ---
    
        # Task
    
        <task>
    
        # Title
        ${issue.name ?? "No title."}
    
        ## Description
        ${issue.description ?? "No description."}
    
        </task>
    
        ---
    
        # Codebase
    
        <codebase>
      `

  const formatInstructions = endent`
        </codebase>
    
        ---
    
        # Instructions
    
        <instructions>
    
        Follow these instructions:
    
        ${instructionsContext}
    
        </instructions>
    
        ---
    
        # Format
    
        <format>
    
        Format your response as follows:
    
        1. Present your plan as a numbered list of steps.
        2. Use markdown formatting.
    
        </format>
      `

  const { prompt, tokensUsed } = limitTokens(basePrompt, codebaseFiles)
  const finalPrompt = `${prompt}\n${formatInstructions}`
  console.warn(`Code Plan Prompt: Tokens used: ${tokensUsed}`)

  return finalPrompt
}

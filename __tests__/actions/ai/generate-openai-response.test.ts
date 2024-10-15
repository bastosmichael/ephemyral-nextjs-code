import { generateOpenAIResponse } from "../../actions/ai/generate-openai-response";

describe('generateOpenAIResponse', () => {
  it('should generate response correctly', async () => {
    const messages = [{ role: 'user', content: 'What is AI?' }];
    const response = await generateOpenAIResponse(messages);
    expect(typeof response).toBe('string');
  });

  it('should throw error when no messages are provided', async () => {
    await expect(generateOpenAIResponse([])).rejects.toThrow();
  });
});

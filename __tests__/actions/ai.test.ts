import { generateOpenAIResponse } from '../actions/ai/generate-openai-response';
import { generateAnthropicResponse } from '../actions/ai/generate-anthropic-response';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { calculateLLMCost } from '../lib/ai/calculate-llm-cost';

// Mocking external dependencies
jest.mock('openai');
jest.mock('@anthropic-ai/sdk');
jest.mock('../lib/ai/calculate-llm-cost', () => ({
  calculateLLMCost: jest.fn(),
}));

describe('AI Actions Tests', () => {
  
  describe('generateOpenAIResponse', () => {
    it('should return response content on successful API call', async () => {
      const mockResponse = {
        choices: [{ message: { content: 'Test response' } }],
        usage: { prompt_tokens: 5, completion_tokens: 5 },
      };

      OpenAI.prototype.chat.completions.create = jest.fn().mockResolvedValue(mockResponse);
      
      const response = await generateOpenAIResponse([{ role: 'user', content: 'Hello!' }]);
      expect(response).toBe('Test response');
      expect(calculateLLMCost).toHaveBeenCalledWith({
        llmId: 'gpt-4o-mini',
        inputTokens: 5,
        outputTokens: 5,
      });
    });
    
    it('should throw an error when API call fails', async () => {
      OpenAI.prototype.chat.completions.create = jest.fn().mockRejectedValue(new Error('Service Unavailable'));
      
      await expect(generateOpenAIResponse([{ role: 'user', content: 'Hello!' }])).rejects.toThrow('Service Unavailable');
    });
  });

  describe('generateAnthropicResponse', () => {
    it('should return response content on successful API call', async () => {
      const mockResponse = {
        content: [{ type: 'text', text: 'Anthropic Test response' }],
        usage: { input_tokens: 3, output_tokens: 3 },
      };

      Anthropic.prototype.messages.create = jest.fn().mockResolvedValue(mockResponse);
      
      const response = await generateAnthropicResponse([{ role: 'user', content: 'Hello!' }]);
      expect(response).toBe('Anthropic Test response');
      expect(calculateLLMCost).toHaveBeenCalledWith({
        llmId: expect.any(String), // Adjust this to match your implementation, if necessary
        inputTokens: 3,
        outputTokens: 3,
      });
    });
    
    it('should throw an error if token limit is exceeded', async () => {
      Anthropic.prototype.messages.create = jest.fn().mockRejectedValue({ message: "TPM limit exceeded" });
      
      await expect(generateAnthropicResponse([{ role: 'user', content: 'Hello!' }])).rejects.toThrow('Unhandled error: TPM limit exceeded');
    });
  });
});

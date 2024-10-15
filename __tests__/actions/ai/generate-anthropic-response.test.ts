import { generateAnthropicResponse } from "../../actions/ai/generate-anthropic-response";

describe('generateAnthropicResponse', () => {
  it('should return response content when successful', async () => {
    const messages = [{ role: 'user', content: 'Hello' }];
    const response = await generateAnthropicResponse(messages);
    expect(response).toBeDefined();
  });

  it('should handle error and throw when error occurs', async () => {
    await expect(generateAnthropicResponse([])).rejects.toThrow();
  });
});

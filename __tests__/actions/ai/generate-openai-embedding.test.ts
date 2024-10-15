import { generateEmbedding } from "../../actions/ai/generate-openai-embedding";

describe('generateEmbedding', () => {
  it('should return valid embedding for given text', async () => {
    const text = "Sample text for embedding";
    const embedding = await generateEmbedding(text);
    expect(embedding).toBeInstanceOf(Array);
  });

  it('should throw an error with invalid input', async () => {
    await expect(generateEmbedding('')).rejects.toThrow();
  });
});

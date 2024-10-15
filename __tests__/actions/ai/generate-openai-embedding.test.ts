import { generateEmbedding } from "@/actions/ai/generate-openai-embedding";

describe("generateEmbedding", () => {
  it("should generate valid embedding", async () => {
    const text = "Sample text";
    
    const embedding = await generateEmbedding(text);
    
    expect(Array.isArray(embedding)).toBe(true);
    expect(embedding.length).toBeGreaterThan(0); // Assuming embedding array should not be empty
  });

  it("should handle errors gracefully", async () => {
    // Mock the console.error to catch error logging
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(generateEmbedding("")).rejects.toThrow("Error generating embedding:");

    consoleErrorSpy.mockRestore();
  });
});

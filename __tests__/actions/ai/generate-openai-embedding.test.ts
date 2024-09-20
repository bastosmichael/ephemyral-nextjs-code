import { generateEmbedding } from "@/actions/ai/generate-openai-embedding";
import { expect, it, describe } from "@jest/globals";

describe("generateEmbedding", () => {
    it("should generate an embedding for the given text", async () => {
        const embedding = await generateEmbedding("Sample text");
        expect(embedding).toBeDefined();
        expect(Array.isArray(embedding)).toBe(true);
        expect(embedding.length).toBeGreaterThan(0); // or check specific length based on embedding dimensions
    });
});

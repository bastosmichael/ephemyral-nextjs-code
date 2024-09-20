import { generateOpenAIResponse } from "@/actions/ai/generate-openai-response";
import { expect, it, describe } from "@jest/globals";

describe("generateOpenAIResponse", () => {
    it("should generate a valid response from OpenAI API", async () => {
        const messages = [{ role: "user", content: "Test message" }];
        const response = await generateOpenAIResponse(messages);
        expect(response).toBeDefined();
        expect(typeof response).toBe("string");
        expect(response.length).toBeGreaterThan(0);
    });

    it("should throw an error when there's an API failure", async () => {
        await expect(generateOpenAIResponse([])).rejects.toThrow(Error);
    });
});

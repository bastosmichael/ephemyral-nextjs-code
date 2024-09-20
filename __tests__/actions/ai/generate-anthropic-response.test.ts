import { generateAnthropicResponse } from "@/actions/ai/generate-anthropic-response";
import { expect, it, describe } from "@jest/globals";

describe("generateAnthropicResponse", () => {
    it("should generate a valid response based on input messages", async () => {
        const messages = [{ role: "user", content: "Sample prompt" }];
        const response = await generateAnthropicResponse(messages);
        expect(response).toBeDefined();
        expect(typeof response).toBe("string");
    });

    it("should throw an error when no messages are provided", async () => {
        await expect(generateAnthropicResponse([])).rejects.toThrow(Error);
    });
});

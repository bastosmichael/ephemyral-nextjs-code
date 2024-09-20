import { fetchFiles } from "@/actions/github/fetch-files";
import { expect, it, describe } from "@jest/globals";

describe("fetchFiles", () => {
    it("should fetch and return file contents", async () => {
        const files = [
            {
                owner: "user",
                repo: "repo",
                path: "file1.js",
                ref: "main"
            },
            {
                owner: "user",
                repo: "repo",
                path: "file2.js",
                ref: "main"
            }
        ];

        const response = await fetchFiles(12345, files);
        expect(response).toBeDefined();
        expect(Array.isArray(response)).toBe(true);
    });
});

import { embedFiles } from "@/actions/github/embed-files";
import { expect, it, describe } from "@jest/globals";

describe("embedFiles", () => {
    it("should embed files and return prepared file objects", async () => {
        const filesContent = [
            {
                path: "file1.js",
                content: "const a = 1;",
                tokenCount: 4,
                embedding: []
            },
            {
                path: "file2.js",
                content: "let b = 2;",
                tokenCount: 4,
                embedding: []
            }
        ];
        const preparedFiles = await embedFiles(filesContent);
        expect(preparedFiles).toHaveLength(2);
        expect(preparedFiles[0]).toHaveProperty("path", "file1.js");
    });
});

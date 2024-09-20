import { listBranches } from "@/actions/github/list-branches";
import { expect, it, describe } from "@jest/globals";

describe("listBranches", () => {
    it("should return the branches of a repository", async () => {
        const branches = await listBranches(12345, "user/repo");
        expect(branches).toBeDefined();
        expect(Array.isArray(branches)).toBe(true);
    });
});

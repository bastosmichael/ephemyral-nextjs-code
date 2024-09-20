import { fetchCodebaseForBranch } from "@/actions/github/fetch-codebase";
import { expect, it, describe } from "@jest/globals";

describe("fetchCodebaseForBranch", () => {
    it("should fetch the codebase for a specific branch", async () => {
        const branchData = await fetchCodebaseForBranch({
            githubRepoFullName: "user/repo",
            path: "",
            branch: "main",
            installationId: 12345
        });
        expect(branchData).toBeDefined();
        expect(Array.isArray(branchData)).toBe(true);
    });
});

import { embedBranch } from "@/actions/github/embed-branch";
import { expect, it, describe } from "@jest/globals";

describe("embedBranch", () => {
    it("should successfully embed a branch and return the id", async () => {
        const response = await embedBranch({
            projectId: "project-123",
            githubRepoFullName: "user/repo",
            branchName: "main",
            embeddedBranchId: "embedded-branch-123",
            installationId: 12345
        });
        expect(response).toBeDefined();
        expect(response.id).toBe("embedded-branch-123");
    });
});

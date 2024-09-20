import { generatePR } from "@/actions/github/generate-pr";
import { expect, it, describe } from "@jest/globals";

describe("generatePR", () => {
    it("should create a PR and return a link", async () => {
        const project = {
            id: "project-123",
            githubTargetBranch: "main",
            githubRepoFullName: "user/repo",
            githubInstallationId: 12345
        };
        const response = await generatePR("feature-branch", project, {
            prTitle: "Test PR",
            prDescription: "This is a test PR."
        });
        expect(response.prLink).toContain("https://github.com/user/repo/pull/");
        expect(response.branchName).toBe("feature-branch");
    });
});

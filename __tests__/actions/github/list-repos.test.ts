import { listRepos } from "@/actions/github/list-repos";
import { expect, it, describe } from "@jest/globals";

describe("listRepos", () => {
    it("should return repos for the authenticated user", async () => {
        const repos = await listRepos(12345, "organizationId");
        expect(repos).toBeDefined();
        expect(Array.isArray(repos)).toBe(true);
    });
});

import { embedBranch } from '../../actions/github/embed-branch';
    import { expect } from '@jest/globals';

    describe('Embed Branch Function', () => {
      it('should embed branch without errors', async () => {
        const result = await embedBranch({
          projectId: 'projectIdExample',
          githubRepoFullName: 'owner/repo',
          branchName: 'main',
          embeddedBranchId: 'embeddedBranchIdExample',
          installationId: 12345,
        });

        expect(result).toHaveProperty('id');
      });
    });

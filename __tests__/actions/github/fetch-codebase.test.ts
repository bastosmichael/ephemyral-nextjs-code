import { fetchCodebaseForBranch } from '../../../actions/github/fetch-codebase';
    import { expect } from '@jest/globals';

    describe('Fetch Codebase Function', () => {
      it('should fetch codebase for a specific branch', async () => {
        const files = await fetchCodebaseForBranch({
          githubRepoFullName: 'owner/repo',
          path: '',
          branch: 'main',
          installationId: 12345,
        });

        expect(Array.isArray(files)).toBe(true);
      });
    });

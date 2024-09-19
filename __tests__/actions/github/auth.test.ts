import { getAuthenticatedOctokit } from '../../actions/github/auth';
    import { expect } from '@jest/globals';

    describe('GitHub Authentication', () => {
      it('should return an authenticated Octokit instance', async () => {
        const octokit = await getAuthenticatedOctokit(12345);
        expect(octokit).toHaveProperty('request');
      });
    });

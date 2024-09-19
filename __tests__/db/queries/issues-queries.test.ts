import { createIssue, getIssuesByProjectId } from '../../queries/issues-queries';
    import { expect } from '@jest/globals';

    describe('Issues Queries', () => {
      it('should create a new issue', async () => {
        const issue = await createIssue({
          name: 'New Test Issue',
          content: 'Test issue content',
          userId: 'userIdExample',
          projectId: 'projectIdExample',
        });

        expect(issue).toHaveProperty('name', 'New Test Issue');
      });

      it('should get issues by project ID', async () => {
        const issues = await getIssuesByProjectId('projectIdExample');
        expect(Array.isArray(issues)).toBe(true);
      });
    });

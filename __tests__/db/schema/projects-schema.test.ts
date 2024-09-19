import { projectsTable } from '../../db/schema/projects-schema';
    import { expect } from '@jest/globals';

    describe('Projects Schema', () => {
      it('should have a valid structure', () => {
        const schema = projectsTable;

        expect(schema).toHaveProperty('id');
        expect(schema).toHaveProperty('userId');
        expect(schema).toHaveProperty('workspaceId');
        expect(schema).toHaveProperty('name');
        expect(schema).toHaveProperty('githubRepoFullName');
        expect(schema).toHaveProperty('githubTargetBranch');
        expect(schema).toHaveProperty('createdAt');
        expect(schema).toHaveProperty('updatedAt');
      });
    });

import { embeddedBranchesTable } from '../../db/schema/embedded-branches-schema';
    import { expect } from '@jest/globals';

    describe('Embedded Branch Schema', () => {
      it('should have a valid structure', () => {
        const schema = embeddedBranchesTable;

        expect(schema).toHaveProperty('id');
        expect(schema).toHaveProperty('userId');
        expect(schema).toHaveProperty('projectId');
        expect(schema).toHaveProperty('branchName');
        expect(schema).toHaveProperty('lastEmbeddedCommitHash');
        expect(schema).toHaveProperty('createdAt');
        expect(schema).toHaveProperty('updatedAt');
      });
    });

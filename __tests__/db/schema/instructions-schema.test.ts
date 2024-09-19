import { instructionsTable } from '../../../db/schema/instructions-schema';
    import { expect } from '@jest/globals';

    describe('Instructions Schema', () => {
      it('should have a valid structure', () => {
        const schema = instructionsTable;

        expect(schema).toHaveProperty('id');
        expect(schema).toHaveProperty('userId');
        expect(schema).toHaveProperty('projectId');
        expect(schema).toHaveProperty('name');
        expect(schema).toHaveProperty('content');
        expect(schema).toHaveProperty('createdAt');
        expect(schema).toHaveProperty('updatedAt');
      });
    });

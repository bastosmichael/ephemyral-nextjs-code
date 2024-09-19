import { templatesTable } from '../../db/schema/templates-schema';
    import { expect } from '@jest/globals';

    describe('Templates Schema', () => {
      it('should have a valid structure', () => {
        const schema = templatesTable;

        expect(schema).toHaveProperty('id');
        expect(schema).toHaveProperty('userId');
        expect(schema).toHaveProperty('projectId');
        expect(schema).toHaveProperty('name');
        expect(schema).toHaveProperty('content');
        expect(schema).toHaveProperty('createdAt');
        expect(schema).toHaveProperty('updatedAt');
      });
    });

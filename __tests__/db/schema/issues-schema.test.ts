import { issuesTable } from '../../../db/schema/issues-schema';
import { expect } from '@jest/globals';

describe('Issues Schema', () => {
    it('should have a valid structure', () => {
        const schema = issuesTable;

        expect(schema).toHaveProperty('id');
        expect(schema).toHaveProperty('userId');
        expect(schema).toHaveProperty('projectId');
        expect(schema).toHaveProperty('name');
        expect(schema).toHaveProperty('content');
        expect(schema).toHaveProperty('status');
        expect(schema).toHaveProperty('createdAt');
        expect(schema).toHaveProperty('updatedAt');
    });
});

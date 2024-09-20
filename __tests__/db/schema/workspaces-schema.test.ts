import { workspacesTable } from '../../../db/schema/workspaces-schema';
import { expect } from '@jest/globals';

describe('Workspaces Schema', () => {
    it('should have a valid structure', () => {
        const schema = workspacesTable;

        expect(schema).toHaveProperty('id');
        expect(schema).toHaveProperty('userId');
        expect(schema).toHaveProperty('name');
        expect(schema).toHaveProperty('createdAt');
        expect(schema).toHaveProperty('updatedAt');
    });
});

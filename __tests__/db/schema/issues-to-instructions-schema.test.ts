import { issuesToInstructionsTable } from '../../../db/schema/issues-to-instructions-schema';
import { expect } from '@jest/globals';

describe('Issues To Instructions Schema', () => {
    it('should have a valid structure', () => {
        const schema = issuesToInstructionsTable;

        expect(schema).toHaveProperty('issueId');
        expect(schema).toHaveProperty('instructionId');
    });
});

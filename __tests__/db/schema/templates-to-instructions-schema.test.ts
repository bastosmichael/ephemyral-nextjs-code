import { templatesToInstructionsTable } from '../../../db/schema/templates-to-instructions-schema';
import { expect } from '@jest/globals';

describe('Templates To Instructions Schema', () => {
    it('should have a valid structure', () => {
        const schema = templatesToInstructionsTable;

        expect(schema).toHaveProperty('templateId');
        expect(schema).toHaveProperty('instructionId');
    });
});

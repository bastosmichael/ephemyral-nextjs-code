import { issueMessagesTable } from '../../../db/schema/issue-messages-schema';
import { expect } from '@jest/globals';

describe('Issue Messages Schema', () => {
  it('should have a valid structure', () => {
    const schema = issueMessagesTable;

    expect(schema).toHaveProperty('id');
    expect(schema).toHaveProperty('issueId');
    expect(schema).toHaveProperty('content');
    expect(schema).toHaveProperty('sequence');
    expect(schema).toHaveProperty('createdAt');
    expect(schema).toHaveProperty('updatedAt');
  });
});

import { embeddedFilesTable } from '../../../db/schema/embedded-files-schema';
import { expect } from '@jest/globals';

describe('Embedded Files Schema', () => {
  it('should have a valid structure', () => {
    const schema = embeddedFilesTable;

    expect(schema).toHaveProperty('id');
    expect(schema).toHaveProperty('userId');
    expect(schema).toHaveProperty('projectId');
    expect(schema).toHaveProperty('embeddedBranchId');
    expect(schema).toHaveProperty('githubRepoFullName');
    expect(schema).toHaveProperty('path');
    expect(schema).toHaveProperty('tokenCount');
    expect(schema).toHaveProperty('content');
  });
});

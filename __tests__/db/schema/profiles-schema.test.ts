import { profilesTable } from '../../../db/schema/profiles-schema';
import { expect } from '@jest/globals';

describe('Profiles Schema', () => {
  it('should have a valid structure', () => {
    const schema = profilesTable;

    expect(schema).toHaveProperty('userId');
    expect(schema).toHaveProperty('createdAt');
    expect(schema).toHaveProperty('updatedAt');
  });
});

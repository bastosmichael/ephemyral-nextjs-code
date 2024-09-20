import { myNewFeatureTable } from '../../../db/schema/my-new-feature-schema';
        import { expect } from '@jest/globals';

        describe('My New Feature Schema', () => {
            it('should have a valid structure', () => {
                const schema = myNewFeatureTable;

                expect(schema).toHaveProperty('id');
                expect(schema).toHaveProperty('name');
                expect(schema).toHaveProperty('createdAt');
                expect(schema).toHaveProperty('updatedAt');
            });
        });

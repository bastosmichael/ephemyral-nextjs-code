import { createInstructionRecords, getInstructionsByProjectId } from '../../queries/instructions-queries';
    import { expect } from '@jest/globals';

    describe('Instructions Queries', () => {
      it('should create instruction records', async () => {
        const instructions = await createInstructionRecords([
          {
            name: 'New Test Instruction',
            content: 'Test instruction content',
            projectId: 'projectIdExample',
          },
        ]);

        expect(instructions).toHaveLength(1);
        expect(instructions[0]).toHaveProperty('name', 'New Test Instruction');
      });

      it('should get instructions by project ID', async () => {
        const instructions = await getInstructionsByProjectId('projectIdExample');
        expect(Array.isArray(instructions)).toBe(true);
      });
    });

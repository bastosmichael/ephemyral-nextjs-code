import { createProject, getProjectById, getProjectsByUserId } from '../../../db/queries/projects-queries';
    import { expect } from '@jest/globals';

    describe('Projects Queries', () => {
      it('should create a new project', async () => {
        const project = await createProject({
          name: 'New Test Project',
          workspaceId: 'workspaceIdExample',
        });

        expect(project).toHaveProperty('name', 'New Test Project');
      });

      it('should get project by ID', async () => {
        const project = await getProjectById('projectIdExample');
        expect(project).toHaveProperty('id', 'projectIdExample');
      });

      it('should get projects by user ID', async () => {
        const projects = await getProjectsByUserId();
        expect(Array.isArray(projects)).toBe(true);
      });
    });

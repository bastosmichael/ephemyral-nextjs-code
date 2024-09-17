import { GitHubRepository } from '../../types/github';

describe('GitHubRepository type', () => {
  it('should have the correct properties', () => {
    const repo: GitHubRepository = {
      id: 123,
      full_name: 'user/repo',
      name: 'repo',
      private: false,
      html_url: 'https://github.com/user/repo',
      description: 'Test repo'
    };

    expect(repo).toHaveProperty('id');
    expect(repo).toHaveProperty('full_name');
    expect(repo).toHaveProperty('name');
    expect(repo).toHaveProperty('private');
    expect(repo).toHaveProperty('html_url');
    expect(repo).toHaveProperty('description');
  });

  it('should allow optional description', () => {
    const repo: GitHubRepository = {
      id: 456,
      full_name: 'user/another-repo',
      name: 'another-repo',
      private: true,
      html_url: 'https://github.com/user/another-repo',
      description: null
    };

    expect(repo.description).toBeNull();
  });
});

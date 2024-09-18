import { getUserId } from '../../actions/auth/auth';

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(() => ({ userId: 'test_user_id' }))
}));

describe('getUserId', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should return the user ID in simple mode', async () => {
    process.env.NEXT_PUBLIC_APP_MODE = 'simple';
    const userId = await getUserId();
    expect(userId).toBe('test_user_id');
  });

  it('should return the user ID from Clerk in advanced mode', async () => {
    process.env.NEXT_PUBLIC_APP_MODE = 'advanced';
    const userId = await getUserId();
    expect(userId).toBe('test_user_id');
  });
});

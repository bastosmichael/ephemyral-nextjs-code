import { db } from '../../db/db';
import { sql } from 'drizzle-orm';

describe('Database connection', () => {
  it('should establish a connection to the database', async () => {
    expect(db).toBeDefined();
    // Add a simple query to test the connection
    const result = await db.execute(sql`SELECT 1+1 AS sum`);
    expect(result[0].sum).toBe(2);
  });
});

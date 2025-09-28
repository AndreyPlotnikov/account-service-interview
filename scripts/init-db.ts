import fs from 'fs';
import path from 'path';
import pool from '../src/db';

const initializeDatabase = async () => {
  console.log('Initializing database schema...');

  try {
    // Resolve the path to init.sql from the project root
    const sqlFilePath = path.join(__dirname, '..', 'init.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf-8');

    // Execute the SQL script
    await pool.query(sql);

    console.log('Database schema initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    process.exit(1); // Exit with an error code
  } finally {
    // End the pool
    await pool.end();
  }
};

initializeDatabase();

const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const setupDatabase = async () => {
  try {
    console.log('🔄 Setting up database...');

    // Read SQL file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    // Execute SQL
    await pool.query(schema);

    console.log('Database tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
};

setupDatabase();
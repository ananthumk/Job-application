const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const setupDatabase = async () => {
  try {
    console.log('🔄 Ensuring database schema...');

    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    await pool.query(schema);

    console.log('✅ Database schema ready');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    throw error;
  }
};

module.exports = setupDatabase;

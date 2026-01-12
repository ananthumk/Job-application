const app = require('./app');
const pool = require('./config/db');
const setupDatabase = require('./database/setup');

const PORT = process.env.PORT || 5000;

// Auto-create tables (SAFE)
(async () => {
  try {
    await setupDatabase();
  } catch {
    console.warn('⚠️  Continuing without schema setup');
  }
})();

// DB connection test (non-blocking)
let retries = 5;
const testConnection = () => {
  pool.query('SELECT 1', (err) => {
    if (err && retries > 0) {
      retries--;
      console.error(`DB retry (${retries} left):`, err.message);
      setTimeout(testConnection, 2000);
    } else if (!err) {
      console.log('✅ Database connection verified');
    }
  });
};

testConnection();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

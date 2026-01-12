const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

// Test database connection with retry logic
let retries = 5;
const testConnection = () => {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error(`Database connection failed (${retries} retries left):`, err.message);
      if (retries > 0) {
        retries--;
        setTimeout(testConnection, 2000); // Retry after 2 seconds
      } else {
        console.error('Max retries reached. Database connection failed.');
        console.warn('⚠️  Server starting without database. Requests may fail.');
      }
    } else {
      console.log('✅ Database connected at:', res.rows[0].now);
    }
  });
};

// Don't block server startup on DB connection failure
testConnection();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
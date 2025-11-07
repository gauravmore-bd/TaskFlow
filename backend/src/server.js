const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ MySQL connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();

const {Pool} = require('pg');

require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'react_app',
  password: 'mdraza7586',
  port: 5432});

pool.connect()
.then(() => {
  console.log('Connected to the database');
})
.catch((err) => {
  console.error('Database connection error:', err.stack);
}
);

module.exports = pool;
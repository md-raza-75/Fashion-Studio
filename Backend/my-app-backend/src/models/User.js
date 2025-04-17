const pool = require('../config/db');

// Create user
async function createUser(name, email, password) {
  try {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, email, password];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Get user by email and password
async function findUserByCredentials(email, password) {
  try {
    const query = `
      SELECT  name, email
      FROM users
      WHERE email = $1 AND password = $2;
    `;
    const values = [email, password];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  findUserByCredentials
};

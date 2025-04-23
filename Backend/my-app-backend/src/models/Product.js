const pool = require('../config/db');

// Create payment
async function createPayment(paymentData) {
  try {
    const { 
      user_name, 
      email,
      phone, 
      address, 
      city, 
      state, 
      pincode, 
      payment_method, 
      amount
    } = paymentData;
    
    const query = `
      INSERT INTO payments (user_name, email, phone, address, city, state, pincode, payment_method, amount)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    
    const values = [
      user_name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      payment_method,
      amount
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

// Get all payments
async function getAllPayments() {
  try {
    const query = 'SELECT * FROM payments ORDER BY created_at DESC;';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error getting payments:', error);
    throw error;
  }
}

// Get payment by ID
async function getPaymentById(id) {
  try {
    const query = 'SELECT * FROM payments WHERE id = $1;';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting payment by ID:', error);
    throw error;
  }
}

// Get payments by user email
async function getPaymentsByEmail(email) {
  try {
    const query = 'SELECT * FROM payments WHERE email = $1 ORDER BY created_at DESC;';
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error getting payments by email:', error);
    throw error;
  }
}

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentsByEmail
}; 

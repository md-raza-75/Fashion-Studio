const fs = require('fs');
const path = require('path');
const pool = require('../src/config/db');

async function initializePaymentsTable() {
  try {
    console.log('Initializing payments table...');
    
    // Read SQL script file
    const sqlFilePath = path.join(__dirname, '../src/config/payments-table.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute SQL script
    await pool.query(sqlScript);
    console.log('Payments table initialized successfully!');
    
    // Insert sample payment data (optional)
    await insertSamplePayments();
    
    // Exit process
    process.exit(0);
  } catch (error) {
    console.error('Error initializing payments table:', error);
    process.exit(1);
  }
}

async function insertSamplePayments() {
  try {
    console.log('Inserting sample payment data...');
    
    // Sample payment data
    const payments = [
      {
        user_name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '9876543210',
        address: '123 Main Street, Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        payment_method: 'Credit Card',
        amount: 1299.00
      },
      {
        user_name: 'Priya Patel',
        email: 'priya@example.com',
        phone: '8765432109',
        address: '456 Park Avenue',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        payment_method: 'UPI',
        amount: 2499.00
      },
      {
        user_name: 'Amit Kumar',
        email: 'amit@example.com',
        phone: '7654321098',
        address: '789 Garden Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        payment_method: 'Cash on Delivery',
        amount: 3999.00
      }
    ];
    
    // Insert each payment
    for (const payment of payments) {
      const query = `
        INSERT INTO payments (user_name, email, phone, address, city, state, pincode, payment_method, amount)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      const values = [
        payment.user_name,
        payment.email,
        payment.phone,
        payment.address,
        payment.city,
        payment.state,
        payment.pincode,
        payment.payment_method,
        payment.amount
      ];
      
      await pool.query(query, values);
    }
    
    console.log('Sample payment data inserted successfully!');
  } catch (error) {
    console.error('Error inserting sample payment data:', error);
    throw error;
  }
}

// Run the initialization
initializePaymentsTable(); 
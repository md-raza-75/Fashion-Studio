const express = require('express');
const conn = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = 3000;

// ✅ Enable CORS before defining routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'], // Allow frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Optional: if you're using cookies or auth headers
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the public directory
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

// Test database connection
app.get('/api/test-db', (req, res) => {
  conn.query('SELECT NOW()', (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ 
      message: 'Database connected!', 
      timestamp: result.rows[0].now 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

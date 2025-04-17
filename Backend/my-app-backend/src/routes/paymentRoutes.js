const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/', paymentController.createPayment);

// Admin routes (protected)
router.get('/', authMiddleware, paymentController.getAllPayments);
router.get('/:id', authMiddleware, paymentController.getPaymentById);
router.get('/user/:email', authMiddleware, paymentController.getPaymentsByEmail);

module.exports = router; 
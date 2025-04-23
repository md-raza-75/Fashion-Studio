const PaymentModel = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    
    // Validate required fields
    const requiredFields = ['user_name', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'payment_method', 'amount'];
    for (const field of requiredFields) {
      if (!paymentData[field]) {
        return res.status(400).json({ 
          success: false, 
          message: `Missing required field: ${field}` 
        });
      }
    }
    
    const payment = await PaymentModel.createPayment(paymentData);
    
    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully',
      data: payment
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create payment', 
      error: error.message 
    });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.getAllPayments();
    
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch payments', 
      error: error.message 
    });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentModel.getPaymentById(id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch payment', 
      error: error.message 
    });
  }
};

// Get payments by user email
exports.getPaymentsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const payments = await PaymentModel.getPaymentsByEmail(email);
    
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Error fetching user payments:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user payments', 
      error: error.message 
    });
  }
}; 

const User = require('../models/User');

// Signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.createUser(name, email, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error: error.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Only send name in response so frontend can use it
    res.status(200).json({ message: 'Login successful', name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { signup, login };

const express = require('express');
const router = express.Router();
const User = require('../models/User_schema');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email or password is incorrect' });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '100h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;

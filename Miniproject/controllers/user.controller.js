const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserController {
  async get(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.log('Database error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async post(req, res) {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        username: username,
        password: hashedPassword
      });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.log('User da ton tai', error);
      res.status(500).json({ message: 'Error: account already exists' });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(400).json({ message: 'Account or Password is incorrect' });
      }
    } catch (error) {
      console.log('Database error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new UserController();

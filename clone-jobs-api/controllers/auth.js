const User = require('../models/User');

const register = async (req, res) => {
  console.log(req.body);
  res.send('register user');
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };

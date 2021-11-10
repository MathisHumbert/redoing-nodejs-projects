const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  //const { name, email, password } = req.body;

  // const salt = await bcrypt.genSalt(10);
  // const hasedPassword = await bcrypt.hash(password, salt);
  // const tempUser = { name, email, password: hasedPassword };
  // const user = await User.create(tempUser);

  // const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
  //   expiresIn: '30d',
  // });

  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ name: user.name, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  //const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();

  // const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
  //   expiresIn: '30d',
  // });

  res.status(StatusCodes.OK).json({ name: user.name, token: token });
};

module.exports = { register, login };

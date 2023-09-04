import bcrypt from 'bcrypt';

import User from '../schemas/userSchema.js';
import { generateToken } from '../services/tokenGenerator.js';

// get all users
const getAll = async (_, res, next) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

// registration controller
const registration = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      res.status(400);
      throw new Error('You did not pass the data');
    }

    const registeredUser = await User.findOne({ email });

    if (registeredUser) {
      res.status(400);
      throw new Error('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({ token: generateToken(user._id) });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// login controller
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const userPassword = await bcrypt.compare(password, user?.password || '');

    if (!user || !userPassword) {
      res.status(400);
      throw new Error('The user does not exist');
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// auth user controller
const check = async (req, res, next) => {
  try {
    const { id, name, lastName, email } = req.user;
    res.status(200).json({
      name,
      lastName,
      email,
      id,
    });
  } catch (error) {
    next(error);
  }
};

export { registration, login, check, getAll };

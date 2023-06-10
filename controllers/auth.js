const Users = require("../models/registration.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv');

const register = async (req, res) => {

  const { firstName, lastName, email, address, username, password, confirmPassword, roles } = req.body;

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords doesnot match" });
  }

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Users({
      firstName,
      lastName,
      email,
      username,
      address,
      password: hashedPassword,
      roles
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// for login

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User doesnot exist' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password doesnot match' });
    }

    //jsonWebToken
    const username = req.body.username;
    const User = { name: username }
    const accessToken = jwt.sign(User, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });

    // Login successful
    return res.status(200).json({ message: 'Login successful' });
  }

  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
  register,
  login
}


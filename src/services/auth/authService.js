import Users from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(
  username,
  password,
  confirmPassword,
  email,
  firstName,
  lastName,
  address,
  roles
) {
  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw new Error("User with the same email already exists");
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
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
      roles,
    });
    // Save the user to the database
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function loginUser(email, password) {
  try {
    // Check if the user exists in the database
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("User doesnot exist");
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Password doesnot match");
    }
    //jsonWebToken
    const User = { username: user.username, userId: user._id };
    const accessToken = jwt.sign(User, process.env.ACCESS_TOKEN_SECRET);
    // Login successful
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
}

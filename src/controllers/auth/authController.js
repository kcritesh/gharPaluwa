import * as AuthService from "../../services/auth/authService.js";

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    address,
    username,
    password,
    confirmPassword,
    roles,
  } = req.body;
  try {
    const user = await AuthService.registerUser(
      username,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      address,
      roles
    );
    return res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// for login

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const accessToken = await AuthService.loginUser(email, password);
    return res
      .status(200)
      .json({ message: "User logged in successfully", accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// for verify email
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await AuthService.verifyEmail(token);
    return res
      .status(200)
      .json({ message: "Email verified successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

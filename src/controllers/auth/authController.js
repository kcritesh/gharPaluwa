import * as AuthService from "../../services/auth/authService.js";

const register = async (req, res) => {
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
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      address,
      username,
      roles
    );
    return res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// for login

const login = async (req, res) => {
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



export { register, login };

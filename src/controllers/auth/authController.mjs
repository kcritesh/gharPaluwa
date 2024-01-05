import * as AuthService from '../../services/auth/authService.mjs';

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
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
      phone,
      password,
      confirmPassword,
      firstName,
      lastName,
      address,
      roles
    );
    return res.status(200).json({ message: 'User created successfully', user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// for login

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const accessToken = await AuthService.loginUser(email, password);
    return res
      .status(200)
      .json({ message: 'User logged in successfully', accessToken });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// for verify email
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await AuthService.verifyEmail(token);
    return res
      .status(200)
      .json({ message: 'Email verified successfully', user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// for reset password request
export const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    await AuthService.resetPasswordRequest(email);
    return res
      .status(200)
      .json({ message: 'Reset password link sent', status: 'sent' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// for verify reset password
export const verifyResetPassword = async (req, res) => {
  try {
    const { resetToken } = req.body;
    await AuthService.verifyResetPassword(resetToken);
    return res
      .status(200)
      .json({ message: 'Reset password link verified', status: 'verified' });
  } catch (error) {
    res.status(400).json({ message: error.message, status: 'failed' });
  }
};

// for reset password
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, password, confirmPassword } = req.body;
    await AuthService.resetPassword(resetToken, password, confirmPassword);
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// for send otp phone verifcation
export const sendPhoneVerification = async (req, res) => {
  try {
    const { userId } = req.User;
    await AuthService.sendPhoneVerification(userId);
    return res
      .status(200)
      .json({ message: 'Verification code sent', status: 'sent' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// for verify phone verification
export const verifyPhoneVerification = async (req, res) => {
  try {
    const { userId } = req.User;
    const { otp } = req.body;
    await AuthService.verifyPhoneVerification(userId, otp);
    return res
      .status(200)
      .json({ message: 'Phone verified successfully', status: 'verified' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

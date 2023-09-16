import Users from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as EmailService from "../../services/email/emailServices.js";
import * as SmsService from "../../services/sms/smsServices.js";
import User from "../../models/User.js";

export async function registerUser(
  username,
  email,
  phone,
  password,
  confirmPassword,
  firstName,
  lastName,
  address,
  roles
) {
  try {
    // Check if user already exists
    const existingUser = await Users.findOne({
      $or: [{ username }, { email }, { phone }],
    });
    if (existingUser) {
      throw new Error("User with the same Email or Username already exists");
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
      phone,
      username,
      address,
      password: hashedPassword,
      roles,
    });
    // Save the user to the database
    await newUser.save();
    // send verification email
    const token = EmailService.generateToken(email);
    await EmailService.sendVerificationEmail(email, token);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function loginUser(email, password) {
  try {
    // Check if the user exists in the database
    const user = await Users.findOne({ email }).select("+password");

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

export const verifyEmail = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decodedToken;

    const user = await User.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true } // Add the new option to get the updated user
    );

    if (!user) {
      throw new Error({ message: "User doesnot exist" });
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// for reset password request
export const resetPasswordRequest = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User doesnot exist");
    }
    // Generate a token
    const resetToken = EmailService.generateToken(email);
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);
    user.resetToken = {
      token: resetToken,
      expiration: resetTokenExpiration,
    };
    await user.save();
    // Send the email
    await EmailService.sendResetPasswordEmail(user.email, resetToken);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// Verify reset password
export const verifyResetPassword = async (resetToken) => {
  try {
    const user = await User.findOne({
      "resetToken.token": resetToken,
      "resetToken.expiration": { $gt: Date.now() },
    });
    if (!user) {
      throw new Error("Invalid or expired reset token");
    }
    // Return the user or a success message if needed
    return user;
  } catch (error) {
    // Handle the error and provide a more informative error message
    throw new Error(`Reset password verification failed: ${error.message}`);
  }
};

// Reset password
export const resetPassword = async (resetToken, password, confirmPassword) => {
  try {
    if (password !== confirmPassword) {
      throw new Error("Password and confirm password doesnot match");
    }
    const user = await User.findOne({
      "resetToken.token": resetToken,
      "resetToken.expiration": { $gt: Date.now() },
    }).select("password");
    if (!user) {
      throw new Error("Invalid or expired reset token");
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if the new password is the same as the old password
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      throw new Error("New password cannot be the same as the old password");
    }
    // Update the user's password
    user.password = hashedPassword;
    user.resetToken = undefined;
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

// for send phone verification otp
export const sendPhoneVerification = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User doesnot exist");
    }
    // if the phone is already verified
    if (user.isPhoneVerified) {
      throw new Error("Phone already verified");
    }
    // Generate a token
    const verificationOTP = SmsService.generateOTP();
    const verificationOTPExpiration = new Date();
    verificationOTPExpiration.setHours(
      verificationOTPExpiration.getMinutes() + 15
    );
    user.verificationOTP = {
      otp: verificationOTP,
      expiration: verificationOTPExpiration,
    };
    await user.save();
    const verificationMessage = `Dear ${user.firstName},\nYour verification code is ${verificationOTP}. Your code will expire in 15 Minutes.\nIf you did not request a code, Please ignore this message.\nThank you for using GharPaluwa.com ! ^_~`;
    // Send the sms
    await SmsService.sendSMS(user.phone, verificationMessage);
    return user; // Return the user or a success message if needed
  } catch (error) {
    throw new Error(error);
  }
};

// Confirm phone verification
export const verifyPhoneVerification = async (userId, otp) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User doesnot exist");
    }
    // Check if the OTP is expired
    if (user.verificationOTP.expiration < Date.now()) {
      throw new Error("OTP expired! Please request a new one.");
    }

    // Check if the OTP is the same as the one in the database
    if (user.verificationOTP.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    // Update the user's phone verification status
    user.isPhoneVerified = true;
    user.verificationOTP = undefined;
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

// Schema is a class that allows us to represent a collection of fields
import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import validator from 'validator';

const { isMobilePhone } = validator;
const validRoles = ['seller', 'buyer'];

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'please enter valid email'],
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) =>
        // Example: Validate against phone numbers in the United States
        isMobilePhone(value, 'ne-NP'),
      message: 'Please enter a valid phone number',
    },
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: [6, 'Minimun password length is 6'],
    select: false,
    match: [
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/,
      'Password must have uppercase, lowercase and special character.',
    ],
  },

  roles: {
    type: String,
    required: true,
    enum: validRoles,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  isPhoneVerified: {
    type: Boolean,
    default: false,
  },

  resetToken: {
    token: {
      type: String,
      select: false,
      default: null,
    },
    expiration: {
      type: Date,
      default: null,
      select: false,
    },
  },

  verificationOTP: {
    otp: {
      type: String,
      select: false,
      default: null,
    },
    expiration: {
      type: Date,
      default: null,
      select: false,
    },
  },
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

export default model('User', userSchema);

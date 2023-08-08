//SCHEMAS
// Schema is a class that allows us to represent a collection of fields
import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
const validRoles = ["seller", "buyer"];

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
    validate: [isEmail, "please enter valid email"],
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: [6, "Minimun password length is 6"],
    select: false,
    match: [
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/,
      "Password must have uppercase, lowercase and special character.",
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
});

export default model("Users", userSchema);

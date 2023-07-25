//SCHEMAS
// Schema is a class that allows us to represent a collection of fields
import { Schema, model } from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
const validRoles = ["seller", "buyer"];

const registerSchema = new Schema({
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
    validate:[isEmail,"please enter valid email"]
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
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,"Password must have uppercase, lowercase and special character."],
    
  },

  roles: {
    type: String,
    required: true,
    enum: validRoles,
  },
});

export default model("Users", registerSchema);

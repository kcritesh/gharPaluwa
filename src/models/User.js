//SCHEMAS
// Schema is a class that allows us to represent a collection of fields
import { Schema, model } from "mongoose";
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
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    required: true,
    enum: validRoles,
  },
});

export default model("Users", registerSchema);

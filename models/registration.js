//SCHEMAS

const mongoose = require("mongoose");
const validRoles = ["seller", "buyer"];

const registerSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true

    },

    address: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        required: true,
        enum: validRoles
    }


})

module.exports = mongoose.model("Users", registerSchema);
<<<<<<< HEAD
import express, { json } from "express";
import connectDb from "./database/connection.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import register_routes from "./routes/gharPaluwa.js";

=======
const express = require("express");
const connectDb = require("./database/connection");
const dotenv = require("dotenv").config();
const controllers= require("./controllers/auth");
>>>>>>> a78dfab939b6be568cf522e93648df3189f94530
const app = express();
const port = 9000;

app.use(json());
app.use("/api", register_routes);

const startServer = () => {
    try {
        connectDb(process.env.CONNECTION_URL);
        app.listen(port, () => {
            console.log(`Server running on ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();

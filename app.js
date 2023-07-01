import express, { json } from "express";
import connectDb from "./database/connection.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import register_routes from "./routes/gharPaluwa.js";

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

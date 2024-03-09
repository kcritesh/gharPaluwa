/* eslint-disable no-console */
import express, { json } from "express";

import helmet from "helmet";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./database/index.js";
import rootRoutes from "./routes/index.js";

dotenv.config();

// Importing the routes

const app = express();
const port = process.env.PORT || 9000;

app.use(json());
app.use(cors());
app.use(helmet());

app.use("/api", rootRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API Gharpaluwa");
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "API Route not found" });
});

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

import express, { json } from "express";

import connectDb from "./database/index.js";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

// Importing the routes
import rootRoutes from "./routes/index.js";

const app = express();
const port = process.env.PORT || 9000;

app.use(json());
app.use(cors());

app.use("/api", rootRoutes);

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

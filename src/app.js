import express, { json } from "express";
import connectDb from "./database/index.js";
import * as dotenv from "dotenv";
dotenv.config();

import register_routes from "./routes/index.js";

const app = express();
const port = 9000;

app.use(json());
app.use(express.urlencoded({ extended: true }));

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

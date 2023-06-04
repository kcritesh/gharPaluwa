const express = require("express");
const connectDb = require("./database/connection");
const dotenv = require("dotenv").config();
const app = express();
const port = 9000;

const register_routes = require("./routes/gharPaluwa");

app.use(express.json());

app.use("/api", register_routes);


app.get("/", (req, res) => {
    res.send("<h1>Kritisha Monkey</h1>");

})

const startServer = () => {
    try {
        connectDb(process.env.CONNECTION_URL);
        app.listen(port, () => {
            console.log(`Server is running in port ${port}`);
        })

    } catch (error) {
        console.log(error);
    }
}

startServer();


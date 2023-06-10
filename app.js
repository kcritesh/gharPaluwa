const express = require("express");
const connectDb = require("./database/connection");
const dotenv = require("dotenv").config();
const app = express();
const port = 9000;

const register_routes = require("./routes/gharPaluwa");

app.use(express.json());

app.use("/api", register_routes);

const posts = [
    {
        username: "kritisha",
        role: "buyer"
    }, {
        username: "ritesh",
        role: "seller"
    }, {
        username: "sayara",
        role: "buyer"
    }
]

app.get("/posts", (req, res) => {
    res.json(posts);
})

const startServer = () => {
    try {
        connectDb(process.env.CONNECTION_URL);
        app.listen(port, () => {
            console.log(`Server running on ${port}`);
        })

    } catch (error) {
        console.log(error);
    }
}

startServer();


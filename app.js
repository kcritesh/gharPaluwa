const express = require("express");
const connectDb = require("./database/connection");
const dotenv = require("dotenv").config();
const app = express();
const port = 9000;
const controllers = require("./controllers/auth");
const jwt = require("jsonwebtoken");
const register_routes = require("./routes/gharPaluwa");

app.use(express.json());

app.use("/api", register_routes);

const posts = [
    {
        username: "kritisha",
        nickname: "kriti",
        role: "buyer"
    }, {
        username: "testu",
        nickname: "tester",
        role: "seller"
    }, {
        username: "sayara",
        nickname: "saya",
        role: "buyer"
    }
]

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.User.name));
})
//function to Authenticate as a middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // console.log({ authHeader });
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, User) => {
        if (err) return res.sendStatus(403);
        req.User = User;
        next();
    })

}

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


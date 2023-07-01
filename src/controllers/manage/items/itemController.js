import mongoose from "mongoose";
import { authenticateToken } from "../../../middleware/index.js";

const items = [
  {
    username: "kritisha",
    nickname: "kriti",
    role: "buyer",
  },
  {
    username: "testu",
    nickname: "tester",
    role: "seller",
  },
  {
    username: "sayara",
    nickname: "saya",
    role: "buyer",
  },
];
const getItem = (req, res) => {
  res.json(items.filter((item) => item.username === req.User.name));
};

export { getItem };

import mongoose from 'mongoose';
import { authenticateToken } from '../../../middleware';

const items= [
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
const getitem= (req, res) => {
    res.json(items.filter(item => item.username === req.User.name));
};

export {getitem};
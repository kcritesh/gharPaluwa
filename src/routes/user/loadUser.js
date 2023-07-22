import express from "express";
const router = express.Router();

import getUserDetails from "../../controllers/user/loadUser.js";

router.get("/user", getUserDetails);

export default router;
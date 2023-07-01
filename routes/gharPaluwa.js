
import { Router } from "express";
const router = Router();
import { register, login, getitem } from "../controllers";



router.post("/register", register);
router.post("/login", login);
router.get("/post",getitem);


export default router;


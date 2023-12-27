import express from "express";
import { getSignedUrl } from "../../controllers/uploads/uploadController.js";

const router = express.Router();

router.get("/:type/:domain", getSignedUrl);

export default router;

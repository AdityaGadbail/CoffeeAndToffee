import express from "express";
import {
	createSupport,
	getCreatorSupports,
	getMySupports,
} from "../controllers/supportController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/create", protect, createSupport);
router.get("/creator/:creatorId", getCreatorSupports);
router.get("/my-supports", protect, getMySupports);

export default router;
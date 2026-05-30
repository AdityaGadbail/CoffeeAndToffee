import express from "express";
import upload from "../middleware/upload.js";
import protect from "../middleware/auth.js";
import {
	getUsers,
	getUserByUsername,
	updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.put(
	"/profile",
	protect,
	upload.fields([
		{ name: "profileImage", maxCount: 1 },
		{ name: "coverImage", maxCount: 1 },
	]),
	updateProfile
);
router.get("/:username", getUserByUsername);

export default router;
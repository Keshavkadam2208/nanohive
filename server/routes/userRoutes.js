import express from "express";
import { updateProfile, getProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import { get } from "mongoose";
const router = express.Router();
router.put(
    "/profile",
    protect,
    updateProfile
);
router.get(
    "/profile",
        protect,
        getProfile
    
)
export default router;
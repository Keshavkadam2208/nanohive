import express from "express";
import { updateProfile, getProfile, searchInfluencers } from "../controllers/userController.js";
import protect, { authorize } from "../middleware/authMiddleware.js";
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
router.get("/search",
    protect,
    authorize("brand"),
    searchInfluencers
);
export default router;
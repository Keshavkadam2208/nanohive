import express from "express";
import { updateProfile, getProfile, searchInfluencers, uploadProfileImage } from "../controllers/userController.js";
import protect, { authorize } from "../middleware/authMiddleware.js";
import { get } from "mongoose";
import { validateProfile }  from "../middleware/validationMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();
router.put(
    "/profile",
    protect,
    validateProfile,
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

router.put("/upload-image",
    protect,
    upload.single(
        "profileImage"
    ),
    uploadProfileImage
)
export default router;
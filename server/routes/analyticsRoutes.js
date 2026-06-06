import { getBrandAnalytics, getInfluencerAnalytics } from "../controllers/analyticsController.js"
import express from "express";
import protect, {authorize} from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/brand",
    protect,
    authorize("brand"),
    getBrandAnalytics
)
router.get("/influencer",
    protect,
    authorize("influencer"),
    getInfluencerAnalytics
)

export default router;
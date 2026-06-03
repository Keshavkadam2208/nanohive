import { getBrandAnalytics } from "../controllers/analyticsController.js"
import express from "express";
import protect, {authorize} from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/brand",
    protect,
    authorize("brand"),
    getBrandAnalytics
)

export default router;
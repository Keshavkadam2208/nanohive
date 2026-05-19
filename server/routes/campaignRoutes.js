import express from "express";
import{
    createCampaign,getAllCampaigns,applyCampaign
}
from "../controllers/campaignController.js";

import protect, {authorize} from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
    "/create",
    protect,
     authorize("brand"),
    createCampaign
);

router.get("/all",
    protect, 
    getAllCampaigns
);

router.post(
    "/apply",
    protect,
    authorize("influencer"),
    applyCampaign
);

export default router;
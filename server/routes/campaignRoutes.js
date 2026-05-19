import express from "express";
import{
    createCampaign,getAllCampaigns,applyCampaign,getApplicants
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

router.get(
    "/applicants/:campaignId",
    protect, authorize("brand"),
    getApplicants
);

export default router;
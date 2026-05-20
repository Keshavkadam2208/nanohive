import express from "express";
import{
    createCampaign,
    getAllCampaigns,
    applyCampaign,
    getApplicants,
    updateApplicationStatus,
    getMyApplications
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

router.put(
    "/application/:applicationId",
    protect,
    authorize("brand"),
    updateApplicationStatus
);

router.get(
    "/my-applications",
    protect,
    authorize("influencer"),
    getMyApplications
)

export default router;
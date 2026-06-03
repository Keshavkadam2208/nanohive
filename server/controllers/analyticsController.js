import Campaign from "../models/campaign.js";
import Application from "../models/Application.js";

export const getBrandAnalytics = async(req, res) =>{
    try {
        const campaigns = await Campaign.find({
            createdBy: req.user._id
        });
        const campaignIds = campaigns.map(
            campaign => campaign._id
        );

        const totalCampaigns = campaigns.length;
        const totalApplications = await Application.countDocuments({
            campaignId:{
                $in: campaignIds
            }
        });

        const acceptedApplications = await Application.countDocuments({
            campaignId:{
                $in: campaignIds
            },
            status: "accepted"
        });

        const pendingApplications = await Application.countDocuments({
            campaignId:{
                $in: campaignIds
            },
            status:"pending"
        });
        const rejectedApplications = await Application.countDocuments({
            campaignId:{
                $in: campaignIds
            },
            status:"rejected"
        });
        res.status(200).json({
            totalCampaigns,
            totalApplications,
            acceptedApplications,
            pendingApplications,
            rejectedApplications
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
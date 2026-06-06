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

//Influencer analytics

export const getInfluencerAnalytics = 
async (req, res) => {
    try {
        const totalApplications = 
        await Application.countDocuments({
            influencerId: req.user._id
        });

        const acceptedApplications = 
        await Application.countDocuments({
            influencerId: req.user._id,
            status: "accepted"
        });

        const pendingApplications = 
        await Application.countDocuments({
            influencerId: req.user._id,
            status: "pending"
        });

        const rejectedApplications = 
        await Application.countDocuments({
            influencerId: req.user._id,
            status: "rejected"
        })

        res.status(200).json({
            totalApplications,
            acceptedApplications,
            pendingApplications,
            rejectedApplications
        });
    } catch (error) {
        res.status(200).json({
            message:error.message
        })
    }
}
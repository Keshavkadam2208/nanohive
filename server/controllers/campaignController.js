import Campaign from "../models/campaign.js";
import Application from "../models/Application.js";
export const createCampaign = async(req, res)=>{
    try {
        const{
            title,
            description,
            budget,
            niche,
        } = req.body;

        if(!title || !description || !budget || !niche)
        {
            return res.status(400).json({
                message:"please fill all fields"
            });
        }

        const campaign = await Campaign.create({
            title,
            description,
            budget,
            niche,

            createdBy:req.user._id
        });
        res.status(201).json({
            message:"Campaign created successfully",
            campaign:{
                id:campaign._id,
                title:campaign.title,
                description:campaign.description,
                budget:campaign.budget,
                niche:campaign.niche,
                status:campaign.status
            }
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
};

//function to get all campaigns

export const getAllCampaigns = async(req, res)=>{
    try {
        const campaigns = await Campaign.find().populate(
            "createdBy",
            "name email"
        );

        res.status(200).json({
            count:campaigns.length,
            campaigns
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};


//apply campaings

export const applyCampaign = async(req, res)=>{
    try {
        const{campaignId} = req.body;

        // check campaignId
        if(!campaignId)
        {
            return res.status(400).json({
                message:"campignId is required"
            });
        }

        //check duplicate apply

        const existingApplication = await Application.findOne({
            campaignId,
            influencerId:req.user._id
     });
     if(existingApplication)
     {
        res.status(400).json({
            message:"you already applied"
        });
     }

     //create application

     const application = await Application.create({

            campaignId,
            influencerId:req.user._id
        });

        res.status(201).json({
            message:"Applied successfully",
            application
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//get applicants

export const getApplicants = async(req, res)=>{
    try {
        const {campaignId} = req.params;
        const applications = await Application.find({
            campaignId
        })
        .populate(
            "influencerId",
            "name email role"
        );
        res.status(200).json({
            count:applications.length,
            applications
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};
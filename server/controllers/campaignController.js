import {
  sendAcceptanceEmail,
  sendRejectionEmail,
} from "../services/emailService.js";
import Notification from "../models/Notification.js";
import Campaign from "../models/campaign.js";
import Application from "../models/Application.js";
import { application, response } from "express";
export const createCampaign = async (req, res) => {
  try {
    const { title, description, budget, niche } = req.body;

    if (!title || !description || !budget || !niche) {
      return res.status(400).json({
        message: "please fill all fields",
      });
    }

    const campaign = await Campaign.create({
      title,
      description,
      budget,
      niche,

      createdBy: req.user._id,
    });
    res.status(201).json({
      message: "Campaign created successfully",
      campaign: {
        id: campaign._id,
        title: campaign.title,
        description: campaign.description,
        budget: campaign.budget,
        niche: campaign.niche,
        status: campaign.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//function to get all campaigns

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("createdBy", "name email");

    res.status(200).json({
      count: campaigns.length,
      campaigns,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//apply campaings

export const applyCampaign = async (req, res) => {
  try {
    const { campaignId } = req.body;

    // check campaignId
    if (!campaignId) {
      return res.status(400).json({
        message: "campignId is required",
      });
    }

    //check duplicate apply

    const existingApplication = await Application.findOne({
      campaignId: campaignId,
      influencerId: req.user._id,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "you already applied",
      });
    }

    //create application

    const application = await Application.create({
      campaignId: campaignId,
      influencerId: req.user._id,
    });

    res.status(201).json({
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get applicants

export const getApplicants = async (req, res) => {
  try {
    const { campaignId } = req.params;

    console.log("Campaign ID:", campaignId);

    const applications = await Application.find({
      campaignId: campaignId,
    }).populate("influencerId", "name email role");

    console.log("Applications:", applications);

    res.status(200).json({
      count: applications.length,

      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update applicationstatus function

export const updateApplicationStatus = async (req, res) => {

  try {

    const { applicationId } = req.params;

    const { status, rejectionReason } = req.body;


    if (
      !["accepted", "rejected"].includes(status)
    ) {

      return res.status(400).json({

        message: "Invalid status",

      });

    }


    const application =
      await Application.findById(applicationId)

        .populate(
          "influencerId",
          "name email"
        )

        .populate(
          "campaignId",
          "title"
        );


    if (!application) {

      return res.status(404).json({

        message: "Application not found",

      });

    }


    // update status
    application.status = status;


    // save rejection reason only when rejected
    if (status === "rejected") {

      application.rejectionReason =
        rejectionReason;

    }


    // send acceptance email
    if (status === "accepted") {

      await sendAcceptanceEmail(

        application.influencerId.email,

        application.influencerId.name,

        application.campaignId.title

      );
      await Notification.create({
        recipient:application.influencerId._id,

        title:
         "Application Accepted 🎉",

         message:
            `Your application for "${application.campaignId.title}" has been accepted.`,

        type:
        "application"

      });

    }


    // send rejection email
    if (status === "rejected") {

      await sendRejectionEmail(

        application.influencerId.email,

        application.influencerId.name,

        application.campaignId.title

      );
      await Notification.create({

    recipient:
    application.influencerId._id,

    title:
    "Application Rejected",

    message:
    `Your application for "${application.campaignId.title}" was not selected.`,

    type:
    "application"

});

    }


    await application.save();


    res.status(200).json({

      message: "Application updated",

      application,

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

//get my applications function logic

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      influencerId: req.user._id,
    }).populate("campaignId", "title budget niche");
    //console.log(applications);

    const formattedApplications = applications.map((app) => {
      const response = {
        id: app._id,

        campaign: app.campaignId,

        status: app.status,
      };

      // rejectionReason only if rejected

      if (app.status === "rejected") {
        response.rejectionReason = app.rejectionReason;
      }

      return response;
    });

    res.status(200).json({
      count: formattedApplications.length,

      applications: formattedApplications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

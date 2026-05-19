import mongoose from "mongoose";
import Campaign from "./campaign.js";

const applicationSchema = new mongoose.Schema(
    {
        campaignId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Campaign",
            required:true
        },
        influencerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        status:{
            type:String,
            enum:["pending", "accepted", "rejected"],
            defauld:"pending"
        }
    },
    {
        timestamps:true
    }
);

const Application = mongoose.model(
    "Application",
    applicationSchema
);

export default Application;
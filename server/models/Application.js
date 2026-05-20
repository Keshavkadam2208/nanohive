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
            ref:"User",
            required:true
        },
        status:{
            type:String,
            enum:["pending", "accepted", "rejected"],
            default:"pending"
        },
        rejectionReason:{
            type:String,
            default:""
        }
    },
    {
        timestamps:true
    }
);

//duplicate prevention

applicationSchema.index({
    campaignId:1,
    influencerId:1
},
{
    unique:true
});

const Application = mongoose.model(
    "Application",
    applicationSchema
);

export default Application;
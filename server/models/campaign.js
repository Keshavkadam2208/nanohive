import mongoose, { mongo } from "mongoose";
import moongose from "mongoose";

const campaignSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true
        },
        budget:{
            type:Number,
            required:true
        },

        niche:{
            type:String,
            required:true
        },

        status:{
            type:String,
            enum:["open", "closed"],
            default:"open"
        },

        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },
    {
        timestamps:true
    }
);

const Campaign = mongoose.model(
    "Campaign",
    campaignSchema
);

export default Campaign;
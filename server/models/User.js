import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["brand","influencer", "admin"],
        default:"influencer"
    },
    bio:{
        type:String,
        default:""
    },
    instagramHandle:{
        type:String,
        default:""
    },
    followers:{
        type:Number,
        default:0
    },
    engagementRate:{
        type:Number,
        default:0
    },
    niche:{
        type:String,
        default:""
    },
    profileImage:{
        type:String,
        default:""
    },
    website:{
        type:String,
        default:""
    },
    profileCompleted:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
}
);

const User = mongoose.model("User", userSchema)

export default User;
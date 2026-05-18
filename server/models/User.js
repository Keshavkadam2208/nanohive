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
    }
},
{
    timestamps:true
}
);

const User = mongoose.model("User", userSchema)

export default User;
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

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

    // Password Reset Fields
    resetPasswordToken:{
        type:String,
    },

    resetPasswordExpire:{
        type:Date,
    },

    role:{
        type:String,
        enum:["brand","influencer","admin"],
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


// =========================
// HASH PASSWORD BEFORE SAVE
// =========================
userSchema.pre("save", async function(){

    if(!this.isModified("password")){
        return;
    }

    this.password = await bcrypt.hash(
        this.password,
        10
    );

});


// =========================
// COMPARE PASSWORD
// Login ke time use hoga
// =========================
userSchema.methods.matchPassword =
async function(enteredPassword){

    return await bcrypt.compare(
        enteredPassword,
        this.password
    );

};


// =========================
// GENERATE RESET TOKEN
// Forgot Password ke liye
// =========================
userSchema.methods.generateResetPasswordToken =
function(){

    const resetToken =
    crypto.randomBytes(20).toString("hex");

    // DB me hashed token save karenge
    this.resetPasswordToken =
    crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    // 15 min expiry
    this.resetPasswordExpire =
    Date.now() + 15 * 60 * 1000;

    return resetToken;

};

const User =
mongoose.model(
    "User",
    userSchema
);

export default User;
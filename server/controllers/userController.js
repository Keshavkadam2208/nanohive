import User from "../models/User.js";
export const updateProfile = async(req, res)=>{
    try {
        const{
            bio,
            instagramHandle,
            followers,
            engagementRate,
            niche,
            website
        }=req.body;

        const user = await User.findById(req.user._id);
        if(!user)
        {
            return res.status(404).json({
                message:"User not found"
            });
        }

        user.bio = bio ?? user.bio;
        user.instagramHandle = instagramHandle ?? user.instagramHandle;
        user.followers = followers ?? user.followers;
        user.engagementRate = engagementRate ?? user.engagementRate;
        user.niche = niche ?? user.niche;
        user.website = website ?? user.website;
        await user.save();
        res.status(200).json({
            message:"Profile updated successfully!",
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//get profile function to see the profile

export const getProfile = async(req,res)=>{
    try {
        const user = await User.findById(
            req.user._id
        ).select("-password");

        if(!user)
        {
            return res.status(404).json({
                message:"User not found"
            });
        }
        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const searchInfluencers = async(req, res)=>{
    try {
        const{
            niche,
            followers,
            engagement,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {
            role:"influencer"
        };
        const skip = (Number(page) - 1) * Number(limit);
        if(niche)
        {
            filter.niche = niche;
        }
        if(followers)
        {
            filter.followers = {
                $gte:Number(followers)
            };
        }
        if(engagement)
        {
            filter.engagementRate = {
                $gte:Number(engagement)
            };
        }

        const users = await User.find(filter
        )
        .select("name bio instagramHandle followers engagementRate niche profileImage website")
        .skip(skip)
        .limit(Number(limit));
        
        res.status(200).json({
            count:users.length,
            currentPage:Number(page),
            limit:Number(limit),
            users
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

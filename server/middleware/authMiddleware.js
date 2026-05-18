import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {

    let token;

    try {

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }

        if (!token) {

            return res.status(401).json({
                message: "Not authorized, token missing"
            });

        }

        // token verify

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // database se user lao
        // password response me mat bhejo

        req.user=await User.findById(decoded.id)
.select("-password -__v");

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};


export const authorize = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role))
        {
            return res.status(403).json({
                message:"Access Denied"
            });
        }
        next();
    };
};

export default protect;
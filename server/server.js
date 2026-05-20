import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import protect, {
    authorize
} from "./middleware/authMiddleware.js";

import campaignRoutes from "./routes/campaignRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(
    "/api/campaign",
    campaignRoutes
)
app.use("/api/user", userRoutes);


// profile route

app.get(
    "/api/profile",
    protect,

    (req,res)=>{

        res.json({

            message:"Protected route accessed",

            user:req.user

        });

    }
);


// admin route

app.get(
    "/api/admin",
    protect,
    authorize("admin"),

    (req,res)=>{

        res.json({

            message:"Welcome Admin"

        });

    }
);


// brand route

app.get(
    "/api/brand",
    protect,
    authorize("brand"),

    (req,res)=>{

        res.json({

            message:"Welcome Brand"

        });

    }
);


// influencer route

app.get(
    "/api/influencer",
    protect,
    authorize("influencer"),

    (req,res)=>{

        res.json({

            message:"Welcome Influencer"

        });

    }
);


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

    console.log(
        `Server running on ${PORT}`
    );

});
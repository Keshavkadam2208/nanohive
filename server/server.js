import helmet from "helmet";
import rateLimit
from "express-rate-limit";
import "./config/env.js";
import express from "express";

import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import protect, { authorize } from "./middleware/authMiddleware.js";

import campaignRoutes from "./routes/campaignRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import path from "path";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// dotenv.config();

const app = express();

connectDB();

//rate limiter
const limiter = rateLimit({
  windowMs:15 * 60 * 1000,
  max:100,
  standardHeaders:true,
  legacyHeaders:false,
  message:"Too many requests, please try again later."
});
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/user", userRoutes);


app.use(
   "/api/analytics",
   analyticsRoutes
);

app.use(
  "/uploads",

  express.static(path.join(process.cwd(), "..", "uploads")),
);

app.use(
  "/api/notifications",
  notificationRoutes
);

// profile route

app.get(
  "/api/profile",
  protect,

  (req, res) => {
    res.json({
      message: "Protected route accessed",

      user: req.user,
    });
  },
);

// admin route

app.get(
  "/api/admin",
  protect,
  authorize("admin"),

  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  },
);

// brand route

app.get(
  "/api/brand",
  protect,
  authorize("brand"),

  (req, res) => {
    res.json({
      message: "Welcome Brand",
    });
  },
);

// influencer route

app.get(
  "/api/influencer",
  protect,
  authorize("influencer"),

  (req, res) => {
    res.json({
      message: "Welcome Influencer",
    });
  },
);



//errorHandler-yeh sbse niche rahega kyu? req->routes->error hua?->errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

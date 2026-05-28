import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import {rateLimit} from "express-rate-limit"

import express from "express";
import cors from "cors";
import userAuthRoutes from "./assets/routes/user.auth.routes.js";
import adminRoutes from "./assets/routes/admin.routes.js"
import roomsRoutes from "./assets/routes/room.routes.js"
import paymentRoutes from "./assets/routes/checkout.sessions.routes.js"
import bookingRoutes from "./assets/routes/booking.routes.js"
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 5000;

const origin = [process.env.CLIENT_URL || "http://localhost:5173",
  process.env.ADMIN_URL || "http://localhost:5176"
];


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

app.use(
  cors({
    origin: origin,
    credentials: true, // ✅ MUST be lowercase
  }),
);
app.use(limiter);
app.use(express.json());
app.use(cookieParser())

app.use("/api", userAuthRoutes);
app.use("/api", adminRoutes);
app.use("/api", roomsRoutes);
app.use("/api", paymentRoutes);
app.use("/api",bookingRoutes)




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

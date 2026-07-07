import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import crypto from "crypto";

import { rateLimit } from "express-rate-limit";
import { createServer } from "http";
import { Server } from "socket.io";

// Routes
import userAuthRoutes from "./assets/routes/user.auth.routes.js";
import adminRoutes from "./assets/routes/admin.routes.js";
import roomsRoutes from "./assets/routes/room.routes.js";
import paymentRoutes from "./assets/routes/checkout.sessions.routes.js";
import bookingRoutes from "./assets/routes/booking.routes.js";

const app = express();

// ─────────────────────────────────────────────
// CONFIGURATION & CONSTANTS
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

// Cleaned origins: Removed trailing slashes to prevent browser CORS mismatch errors
const allowedOrigins = ["https://hotel-booking-client-4dhd45s26-mhadi-developers-projects.vercel.app",
     "https://hotel-booking-six-green.vercel.app",
 "https://hotel-booking-253f-admin-d1u0x3i9a-mhadi-developers-projects.vercel.app",
  "https://hotel-booking-253f-admin.vercel.app",
];

// ─────────────────────────────────────────────
// HTTP SERVER
// ─────────────────────────────────────────────
const httpServer = createServer(app);

// ─────────────────────────────────────────────
// SOCKET IO
// ─────────────────────────────────────────────
export const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-admin-room", () => {
    socket.join("admin");
  });
});

// ─────────────────────────────────────────────
// RATE LIMITER
// ─────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: {
    message: "Too many requests",
  },
});

// ─────────────────────────────────────────────
// MIDDLEWARES (Executed in Order)
// ─────────────────────────────────────────────
app.set("io", io);

// Apply CORS Configuration
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options(/.*/, cors()); // Handle global preflight OPTIONS requests

// Parsing and Limiting Middlewares
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Server is running successfully!",
  });
});

app.use("/api", userAuthRoutes);
app.use("/api", adminRoutes);
app.use("/api", roomsRoutes);
app.use("/api", paymentRoutes);
app.use("/api", bookingRoutes);

// ─────────────────────────────────────────────
// SERVER START
// ─────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

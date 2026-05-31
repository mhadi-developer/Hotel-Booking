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
// HTTP SERVER
// ─────────────────────────────────────────────

const httpServer = createServer(app);

// ─────────────────────────────────────────────
// SOCKET IO
// ─────────────────────────────────────────────

export const io = new Server(httpServer, {
  cors: {
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      process.env.ADMIN_URL || "http://localhost:5176",
    ],
    credentials: true,
  },
});

// ─────────────────────────────────────────────
// SOCKET CONNECTION
// ─────────────────────────────────────────────
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-admin-room", () => {
    socket.join("admin"); // ✅ FIXED
  });
});

// ─────────────────────────────────────────────
// PORT
// ─────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────

const origin = [
  process.env.CLIENT_URL || "http://localhost:5173",
  process.env.ADMIN_URL || "http://localhost:5176",
];

// ─────────────────────────────────────────────
// RATE LIMITER
// ─────────────────────────────────────────────

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: {
    message: "Too many requests",
  },
});

// ─────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────
app.set("io", io);
app.use(
  cors({
    origin,
    credentials: true,
  }),
);

app.use(limiter);
app.use(express.json());
app.use(cookieParser());

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────

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

import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";

import express from "express";
import cors from "cors";
import userAuthRoutes from "./assets/routes/user.auth.routes.js";
import adminRoutes from "./assets/routes/admin.routes.js"
import roomsRoutes from "./assets/routes/room.routes.js"
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 5000;

const origin = [process.env.CLIENT_URL || "http://localhost:5173",
  process.env.ADMIN_URL || "http://localhost:5176"
];

app.use(
  cors({
    origin: origin,
    credentials: true, // ✅ MUST be lowercase
  }),
);

app.use(express.json());
app.use(cookieParser())

app.use("/api", userAuthRoutes);
app.use("/api", adminRoutes);
app.use("/api", roomsRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

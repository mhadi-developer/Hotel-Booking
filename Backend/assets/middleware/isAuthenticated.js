import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    console.log({ token });

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized, no token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Unauthorized, invalid token",
    });
  }
};

import { loginRateLimiter } from "../middleware/rateLimiter.js";
import {
  registerUser,
  loginUser,
  getLoggedInUser,
  updateUser,
  logoutUser,
} from "../controllers/user.auth.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import express from "express";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginRateLimiter, loginUser);
router.route("/logout").post(logoutUser);
router.route("/login/get").get(isAuthenticated, getLoggedInUser);
router.route("/update/user/:id").patch(isAuthenticated, updateUser);



export default router;

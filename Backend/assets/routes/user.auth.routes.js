import {
  registerUser,
  loginUser,
  getLoggedInUser,
  logoutUser,
} from "../controllers/user.auth.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import express from "express";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/login/get").get(isAuthenticated,getLoggedInUser);


export default router;

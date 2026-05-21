import express from "express";
import upload from "../middleware/multer.js";
import { createRoom } from "../controllers/admin.controller.js";
const router = express.Router();



router.route("/admin/add/room").post(upload.array("images", 5), createRoom);



export default router;
import express from "express";
const router = express.Router();
import {
  getAllRooms,
  
} from "../controllers/rooms.controller.js";


router.route("/get/rooms").get(getAllRooms);
// router.route("/get/room/:id").get();


export default router;
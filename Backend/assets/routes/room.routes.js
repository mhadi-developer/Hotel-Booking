import express from "express";
const router = express.Router();
import {
  getAllRooms,
  getRoomDetailById,
} from "../controllers/rooms.controller.js";


router.route("/get/rooms").get(getAllRooms);
router.route("/get/room/details/:id").get(getRoomDetailById);


export default router;
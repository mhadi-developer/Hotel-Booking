import express from "express";
const router = express.Router();
import {
  getAllRooms,
  getRoomDetailById,
  getLatestRooms,
} from "../controllers/rooms.controller.js";


router.route("/get/rooms").get(getAllRooms);
router.route("/get/rooms/latest").get(getLatestRooms);

router.route("/get/room/details/:id").get(getRoomDetailById);


export default router;
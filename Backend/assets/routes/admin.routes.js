import express from "express";
import upload from "../middleware/multer.js";
import {
  createRoom,
  deleteBookingById,
  getAllBookings,
  getBookingById,
  updateBookingById,
} from "../controllers/admin.controller.js";
const router = express.Router();



router.route("/admin/add/room").post(upload.array("images", 5), createRoom);
router.route("/admin/get/bookings").get(getAllBookings);
router.route("/admin/get/booking/:id").get(getBookingById);
router.route("/admin/update/booking/:id").patch(updateBookingById);
router.route("/admin/delete/booking/:id").delete(deleteBookingById);







export default router;
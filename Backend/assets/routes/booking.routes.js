import express from "express"
const router = express.Router();
import {
  getAllUserBooking,
  getBookingById,
} from "../controllers/booking.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

router.route('/get/bookings').get(isAuthenticated, getAllUserBooking);
router.route("/get/booking/:id").get( getBookingById);


export default router;

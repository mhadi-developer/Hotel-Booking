import express from "express";
const router = express.Router();
import {createCheckoutSession} from "../controllers/payment.controller.js"

router.route('/booking/checkout/session').post(createCheckoutSession);



export default router;
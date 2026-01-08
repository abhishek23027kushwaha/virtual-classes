import express from "express"
import { RazorpayOrder, verifyPayment } from "../controllers/Order.controller.js";
import isAuth from "../middlewares/isAuth.js"
const OrderRoutes = express.Router();

OrderRoutes.post("/order",isAuth,RazorpayOrder);
OrderRoutes.post("/verify",isAuth,verifyPayment);

export default OrderRoutes
import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

import { userAuth, adminAuth } from "../middleware/authMiddleware.js";

router.route("/")
  .post(userAuth, createOrder)
  .get(userAuth, adminAuth, getAllOrders);

router.route("/mine").get(userAuth, getUserOrders);
router.route("/:id/delivered").put(userAuth, markOrderAsDelivered);

export default router;

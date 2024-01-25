import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

import { userAuth, adminAuth } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(userAuth, createOrder)
  .get(userAuth, adminAuth, getAllOrders);

router.route("/mine").get(userAuth, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get(userAuth, findOrderById);
router.route("/:id/pay").put(userAuth, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(userAuth, adminAuth, markOrderAsDelivered);

export default router;

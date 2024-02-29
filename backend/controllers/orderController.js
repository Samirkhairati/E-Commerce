import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, user, shippingAddress, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("@createOrder ERROR: No order items");
  }
  if (!shippingAddress) {
    res.status(400);
    throw new Error("@createOrder ERROR: No shipping address");
  }
  if (!totalPrice) {
    res.status(400);
    throw new Error("@createOrder ERROR: No total price");
  }
  if (!user) {
    res.status(400);
    throw new Error("@createOrder ERROR: No user");
  }

  const order = new Order({
    orderItems,
    user,
    shippingAddress,
    totalPrice,
  });
  await order.populate("user")
  await order.populate("orderItems.product");
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
}, '@createOrder ERROR: definition');

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "Pending" }).populate("user").populate("orderItems.product");;
  res.json(orders);
}, '@getAllOrders ERROR: definition');

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = "Delivered";
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }

}, '@markOrderAsDelivered ERROR: definition');

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  markOrderAsDelivered,
};

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

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  markOrderAsDelivered,
};

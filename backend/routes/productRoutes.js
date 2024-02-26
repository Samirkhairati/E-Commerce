import express from "express";
const router = express.Router();

// controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  searchProducts,
  fetchProductById,
  fetchAllProducts,
} from "../controllers/productController.js";
import { userAuth, adminAuth } from "../middleware/authMiddleware.js";

router.route("/")
  .get(searchProducts)
  .post(userAuth, adminAuth, addProduct);

router.route("/all").get(fetchAllProducts);

router.route("/:id")
  .get(fetchProductById)
  .put(userAuth, adminAuth, updateProductDetails)
  .delete(userAuth, adminAuth, removeProduct);


export default router;

import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts, //search
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";
import { userAuth, adminAuth } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.route("/")
  .get(fetchProducts)
  .post(userAuth, adminAuth, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(userAuth, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(userAuth, adminAuth, formidable(), updateProductDetails)
  .delete(userAuth, adminAuth, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;

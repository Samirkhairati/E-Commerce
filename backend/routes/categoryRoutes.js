import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";
import { fetchProductsByCategoryId } from "../controllers/productController.js";

import { userAuth, adminAuth } from "../middleware/authMiddleware.js";

router.route("/")
  .post(userAuth, adminAuth, createCategory)
  .get(listCategory);
router.route("/:categoryId")
  .put(userAuth, adminAuth, updateCategory)
  .delete(userAuth, adminAuth, removeCategory)
  .get(fetchProductsByCategoryId);

export default router;
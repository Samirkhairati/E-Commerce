import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { userAuth, adminAuth } from "../middleware/authMiddleware.js";

router.route("/").post(userAuth, adminAuth, createCategory);
router.route("/:categoryId").put(userAuth, adminAuth, updateCategory);
router.route("/:categoryId").delete(userAuth, adminAuth, removeCategory);
router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
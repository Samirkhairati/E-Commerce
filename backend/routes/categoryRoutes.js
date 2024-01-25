import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { userAuth, adminAuth } from "../middlewares/authMiddleware.js";

router.route("/").post(userAuth, adminAuth, createCategory);
router.route("/:categoryId").put(authenticate, adminAuth, updateCategory);
router.route("/:categoryId").delete(authenticate, adminAuth, removeCategory);
router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
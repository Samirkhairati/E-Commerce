import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('@createCategory ERROR: Name is required');
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
        res.status(400);
        throw new Error('@createCategory ERROR: Category already exists');
    }

    const category = await new Category({ name }).save();
    res.json(category);
}, "@createCategory ERROR: definition: ");

const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
        res.status(400);
        throw new Error('@updateCategory ERROR: Category does not exist');
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
}, "@updateCategory ERROR: definition: ");

const removeCategory = asyncHandler(async (req, res) => {
    const removed = await Category.findById(req.params.categoryId);
    if (removed) {
        await Category.deleteOne({ _id: req.params.id });
    } else {
        throw new Error('@removeCategory ERROR: cannot find category');
    }
    res.status(200).json(removed);
}, "@removeCategory ERROR: definition: ");

const listCategory = asyncHandler(async (req, res) => {
    const all = await Category.find({});
    console.log(all)
    res.json(all);
}, "@listCategory ERROR: definition: ");

const readCategory = asyncHandler(async (req, res) => { 
    const category = await Category.findOne({ _id: req.params.categoryId });
    res.json(category);
}, "@readCategory ERROR: definition: ");

export {
    createCategory,
    updateCategory,
    removeCategory,
    listCategory,
    readCategory,
};

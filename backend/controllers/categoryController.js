import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('@createUser ERORR: Please provide all fields');
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
        res.status(400);
        throw new Error('@createUser ERORR: Category already exists');
    }

    const category = await new Category({ name }).save();
    res.json(category);
}, "@createCategory ERROR: definition: ");

const updateCategory = asyncHandler(async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400)
        throw new Error('@createUser ERROR: User already exists');
    }
}, "@updateCategory ERROR: definition: ");

const removeCategory = asyncHandler(async (req, res) => {
    try {
        const removed = await Category.findByIdAndRemove(req.params.categoryId);
        res.status(200).json(removed);
    } catch (error) {
        res.status(500)
        throw new Error('@removeCategory ERROR: cannot find category');
    }
}, "@removeCategory ERROR: definition: ");

const listCategory = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({});
        res.json(all);
    } catch (error) {
        res.status(500)
        throw new Error('@listCategory ERROR: cannot find category');
    }
}, "@listCategory ERROR: definition: ");

const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        res.json(category);
    } catch (error) {
        res.status(500)
        throw new Error('@readCategory ERROR: cannot find category');
    }
}, "@readCategory ERROR: definition: ");

export {
    createCategory,
    updateCategory,
    removeCategory,
    listCategory,
    readCategory,
};

import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    const { name, image } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('@createCategory ERROR: Name is required');
    }
    if (!image) {
        res.status(400);
        throw new Error('@createCategory ERROR: Image is required');
        //image = 'https://res.cloudinary.com/dkytadhg9/image/upload/v1708770896/uafdn2h4erwsqjjdruyp.png'
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        res.status(400);
        throw new Error('@createCategory ERROR: Category already exists');
    }
    console.log(name, image)
    const category = new Category({ name, image });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory); 
    } catch (error) {
        throw new Error('@createCategory ERROR: Category could not be created');
    }
}, "@createCategory ERROR: definition: ");



const updateCategory = asyncHandler(async (req, res) => {
    const { name, image } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
        res.status(400);
        throw new Error('@updateCategory ERROR: Category does not exist');
    }

    category.name = name || category.name;
    category.image = image || category.image;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
}, "@updateCategory ERROR: definition: ");

const removeCategory = asyncHandler(async (req, res) => {
    const removed = await Category.findById(req.params.categoryId);
    if (removed) {
        await Category.deleteOne({ _id: req.params.categoryId });
        res.status(200).json({ message: 'Category removed'});
    } else {
        throw new Error('@removeCategory ERROR: cannot find category');
    }
    
}, "@removeCategory ERROR: definition: ");

const listCategory = asyncHandler(async (req, res) => {
    const all = await Category.find({});
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

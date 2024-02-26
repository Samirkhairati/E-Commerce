import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  let { name, description, price, discount, image, category, count, sold } = req.body;

  // Validation
  switch (true) {
    case !name:
      throw new Error("@addProduct ERROR: Name is required");
    case !description:
      throw new Error("@addProduct ERROR: Description is required");
    case !price:
      throw new Error("@addProduct ERROR: Price is required");
    case !category:
      throw new Error("@addProduct ERROR: Category is required");
    case !image:
      throw new Error("@addProduct ERROR: Image is required");
    case !discount:
      discount = 0;
    case !count:
      count = 0;
    case !sold:
      sold = 0;
  }

  const product = new Product({ name, description, price, discount, image, category, count, sold });
  await product.save();
  res.json(product);
}, '@addProduct ERROR: definition: ');

const updateProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { name, description, price, discount, image, category, count, sold } = req.body;
  // Validation

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discount = discount || product.discount;
    product.image = image || product.image;
    product.category = category || product.category;
    product.count = count || product.count;
    product.sold = sold || product.sold;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    throw new Error("@updateProductDetails ERROR: Product not found");
  }

}, '@updateProductDetails ERROR: definition: ');

const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json(product);

}, '@removeProduct ERROR: definition: ');

const searchProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const pageSize = parseInt(req.query.pageSize) || 6; // Number of products per page

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const skip = (page - 1) * pageSize; // Number of products to skip
  const products = await Product.find({ ...keyword }).skip(skip).limit(pageSize);

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize), // Calculate total number of pages
    hasMore: page * pageSize < count // Determine if there are more pages
  });
}, '@fetchProducts ERROR: definition: ');


const fetchProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }

});
// for admins
const fetchAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate("category")
    .limit(12)
    .sort({ createAt: -1 });
  res.json(products);
}, '@fetchAllProducts ERROR: definition: ');

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  searchProducts,
  fetchProductById,
  fetchAllProducts,
};

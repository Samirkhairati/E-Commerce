import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;


const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: [String], required: true },
    count: { type: Number, required: true },
    discount: { type: Number, required: false, default: 0},
    category: { type: ObjectId, ref: "Category", required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    sold: { type: Number, required: false, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

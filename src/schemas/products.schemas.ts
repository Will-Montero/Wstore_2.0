import mongoose from "mongoose";
import { Product } from "../types/products.types";

const productSchema = new mongoose.Schema<Product>({
    name: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: String, required: true},
    section: {type: String, required: true},
})

const ProductSchema = mongoose.model("Product", productSchema);
export { ProductSchema };
import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    thumbnail: String,
    name: String,
    description: String,
    price: Number,
  },
  { timestamps: true }
);

const model = mongoose.model("AdminProduct", ProductSchema);

export default model;

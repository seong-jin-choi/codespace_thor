import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: String,
    content: String,
  },
  { timestamps: true }
);

const model = mongoose.model("Magazine", ProductSchema);

export default model;

import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    thumbnail: String,
    name: String,
    description: String,
    price: Number,
    brand: String,
    discountRate: Number,
    category: { type: String, enum: ["고양이", "개", "원숭이", "사자", "코알라", "기린", "판다", "호랑이", "코끼리", "말"] },
  },
  { timestamps: true }
);

const model = mongoose.model("Product", ProductSchema);

export default model;

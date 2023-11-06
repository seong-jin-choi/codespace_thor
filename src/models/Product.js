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
    category: { type: String, enum: ["가디건", "니트/베스트", "셔츠/남방", "자켓", "점퍼/패딩", "정장/수트", "코트", "맨투맨/후드/티셔츠", "팬츠"] },
  },
  { timestamps: true }
);

const model = mongoose.model("Product", ProductSchema);

export default model;

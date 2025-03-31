import mongoose, { Schema, models, model } from "mongoose";

const cartItemSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    products: [cartItemSchema],
  },
  { timestamps: true }
);

export const Cart = models.Cart || model("Cart", cartSchema);
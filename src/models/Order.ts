import mongoose, { Schema, models, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // gość
    },
    extOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    total: Number,
    shippingMethod: String,
    paymentMethod: String,
    status: {
      type: String,
      enum: ["pending", "paid", "canceled", "failed"],
      default: "pending",
    },
    customer: {
      name: String,
      email: String,
      phone: String,
      address: {
        street: String,
        city: String,
        country: String,
      },
    },
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", orderSchema);

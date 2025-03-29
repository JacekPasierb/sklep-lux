// /models/Order.ts

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
  userId?: Types.ObjectId | null;
  products: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  formData: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    shipping: string;
    payment: string;
  };
  status: "pending" | "paid" | "failed";
  createdAt: Date;
}

const OrderSchema: Schema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  formData: {
    name: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    country: String,
    shipping: String,
    payment: String,
  },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

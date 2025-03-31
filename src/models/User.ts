// models/User.ts
import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  cart: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
      image: String,
    },
  ],
});

export const User = models.User || model("User", userSchema);

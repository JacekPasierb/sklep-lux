// /pages/api/user/cart/add.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { CartItem } from "../../../../types/cart";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await connectToDatabase();

    const { product } = req.body; 

    if (!product?.id) return res.status(400).json({ message: "Brakuje danych produktu" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Czy produkt już istnieje w koszyku?
    const existingItem = user.cart.find((item: CartItem) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ ...product, quantity: 1 });
    }

    await user.save();

    res.status(200).json({ message: "Dodano do koszyka" });
  } catch (err) {
    console.error("Błąd dodawania do koszyka:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
}
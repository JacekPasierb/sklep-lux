import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { CartItem } from "../../../../types/cart";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return res.status(405).end("Method Not Allowed");

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await connectToDatabase();

    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: "Brakuje ID produktu" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = user.cart.find((item: CartItem) => item.id === productId);
    if (!product) return res.status(404).json({ message: "Produkt nie znaleziony w koszyku" });

    product.quantity += 1;

    await user.save();

    return res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error("Błąd inkrementacji:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
}

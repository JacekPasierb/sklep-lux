import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { CartItem } from "../../../../types/cart";



export type UserWithCart = {
  _id: string;
  email: string;
  cart: CartItem[];
};

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await connectToDatabase();

    const user = await User.findById(decoded.userId).lean<UserWithCart>();

    if (!user || !user.cart) {
      return res.status(404).json({ message: "Koszyk nie znaleziony" });
    }

    return res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error("Błąd przy pobieraniu koszyka:", err);
    return res.status(500).json({ message: "Błąd serwera" });
  }
}

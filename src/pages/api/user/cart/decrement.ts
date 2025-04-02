import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return res.status(405).end("Method Not Allowed");

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) return res.status(401).json({ message: "Brak tokena (niezalogowany)" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await connectToDatabase();

    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: "Brak ID produktu" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "Nie znaleziono użytkownika" });

    const item = user.cart.find((item: any) => item.id === productId);
    if (!item) return res.status(404).json({ message: "Produkt nie znaleziony w koszyku" });

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // Jeśli ilość = 1, to usuń z koszyka
      user.cart = user.cart.filter((item: any) => item.id !== productId);
    }

    await user.save();

    res.status(200).json({ message: "Ilość zmniejszona", cart: user.cart });
  } catch (err) {
    console.error("Błąd podczas zmniejszania ilości:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
}

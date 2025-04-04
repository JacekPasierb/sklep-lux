import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) return res.status(401).json({ message: "Brak tokenu" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await connectToDatabase();

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "Nie znaleziono użytkownika" });

    const cartCount = user.cart?.length || 0;

    res.status(200).json({ count: cartCount });
  } catch (err) {
    console.error("Błąd pobierania ilości koszyka:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
}

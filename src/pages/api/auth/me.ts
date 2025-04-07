import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

// Możesz stworzyć typ użytkownika na podstawie schematu:
type UserType = {
  _id: string;
  email: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    await connectToDatabase();

    // ✅ Dodaj lean z typem
    const user = await User.findById(decoded.userId).lean<UserType>();

    if (!user || !user.email) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch  {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

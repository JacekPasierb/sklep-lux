import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

import { User } from "@/models/User";
import { connectToDatabase } from "../../../lib/mongoose";


const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "User not found" });
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });



  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  // 🍪 Ustawiamy cookie z JWT
  res.setHeader("Set-Cookie", serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dni
  }));


  res.status(200).json({ user: { id: user._id, email: user.email } });
}

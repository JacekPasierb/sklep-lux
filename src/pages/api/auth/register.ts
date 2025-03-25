// pages/api/auth/register.ts

import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import User from "../../../models/User"; // Model użytkownika
import connectMongoDB from "../../../lib/mongoose";

const saltRounds = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Połącz z MongoDB
  await connectMongoDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hashowanie hasła
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Tworzenie nowego użytkownika
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

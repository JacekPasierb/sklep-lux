import type {NextApiRequest, NextApiResponse} from "next";
import bcrypt from "bcryptjs";

import {User} from "@/models/User";
import {connectToDatabase} from "../../../lib/mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const {username, email, password} = req.body;

  await connectToDatabase();

  const existing = await User.findOne({email});
  if (existing) return res.status(400).json({message: "User already exists"});

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({username, email, passwordHash});

  res
    .status(201)
    .json({
      message: "User created",
      user: {id: user._id, username: user.username, email: user.email},
    });
}

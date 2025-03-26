import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    // ⛔ zamień na dane z bazy danych
    return res.status(200).json({ user: { id: decoded.userId, email: "test@example.com" } });
  } catch  {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

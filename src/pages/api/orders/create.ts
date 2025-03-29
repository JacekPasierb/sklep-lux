// /pages/api/orders/create.ts

import type {NextApiRequest, NextApiResponse} from "next";
import {connectToDatabase} from "@/lib/mongoose";
import {Order} from "../../../models/Order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({message: "Method not allowed"});
  }

  try {
    await connectToDatabase();

    const order = await Order.create(req.body);

    return res.status(201).json(order);
  } catch (err) {
    console.error("❌ Błąd zapisu zamówienia:", err);
    return res.status(500).json({message: "Błąd serwera"});
  }
}

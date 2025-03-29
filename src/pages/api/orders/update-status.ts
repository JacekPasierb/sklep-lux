// /pages/api/orders/update-status.ts

import type {NextApiRequest, NextApiResponse} from "next";

import {Order} from "../../../models/Order";
import {connectToDatabase} from "../../../lib/mongoose";
import {log} from "node:console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const {extOrderId, status} = req.body;
  console.log("11status", extOrderId);

  if (!extOrderId) {
    return res.status(400).json({message: "Brakuje wymaganych danych"});
  }

  try {
    console.log("przed connect");

    await connectToDatabase();
    console.log("po connect");

    const updated = await Order.findOneAndUpdate(
      {extOrderId},
      {status: "paid"},
      {new: true}
    );
    console.log("po update");

    if (!updated) {
      return res.status(404).json({message: "Zamówienie nie znalezione"});
    }

    return res
      .status(200)
      .json({message: "Status zaktualizowany", order: updated});
  } catch (err) {
    console.error("Błąd aktualizacji statusu zamówienia:", err);
    return res.status(500).json({message: "Błąd serwera"});
  }
}

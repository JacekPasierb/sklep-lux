import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const notification = req.body;
console.log("noti",notification);

    const extOrderId = notification.order?.extOrderId;
    const status = notification.order?.status;

    if (!extOrderId || !status) {
      return res.status(400).json({ message: "Brakuje danych" });
    }

    await connectToDatabase();

    await Order.findOneAndUpdate(
      { extOrderId },
      { status }
    );

    res.status(200).json({ message: "OK" });
  } catch (err) {
    console.error("Błąd webhooka PayU:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
}

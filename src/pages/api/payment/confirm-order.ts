// pages/api/payment/confirm-order.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  try {
    const { cart, formData } = req.body;

    // 🛒 Tutaj zapisz zamówienie do bazy danych (np. MongoDB)
    console.log("Zamówienie potwierdzone:", formData.email, cart);

    return res.status(200).json({ message: "Zamówienie zapisane" });
  } catch (err) {
    console.error("❌ Błąd przy zapisie zamówienia:", err);
    return res.status(500).json({ message: "Błąd zapisu zamówienia" });
  }
}

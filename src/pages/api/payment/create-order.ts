// /pages/api/payment/create-order.ts

import type {NextApiRequest, NextApiResponse} from "next";
import {v4 as uuidv4} from "uuid";

const PAYU_CLIENT_ID = process.env.PAYU_CLIENT_ID!;
const PAYU_CLIENT_SECRET = process.env.PAYU_CLIENT_SECRET!;
const PAYU_POS_ID = process.env.PAYU_POS_ID!;
const PAYU_AUTH_URL =
  "https://secure.snd.payu.com/pl/standard/user/oauth/authorize";
const PAYU_ORDER_URL = "https://secure.snd.payu.com/api/v2_1/orders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  try {
    const {cart, formData} = req.body;

    // 1. Pobierz token dostępu
    const tokenRes = await fetch(PAYU_AUTH_URL, {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: PAYU_CLIENT_ID,
        client_secret: PAYU_CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenRes.json();
    console.log("TOKEN1", tokenData);
    
    const access_token = tokenData.access_token;

    if (!access_token) {
      console.error("❌ Brak access_token z PayU:", tokenData);
      return res.status(500).json({message: "Błąd autoryzacji z PayU."});
    }

    // 2. Przygotuj dane zamówienia
    const totalAmount = cart.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    const order = {
      customerIp: "127.0.0.1",
      merchantPosId: PAYU_POS_ID,
      description: "Zamówienie w sklepie luksusowym",
      currencyCode: "PLN",
      totalAmount: (totalAmount * 100).toString(),
      extOrderId: uuidv4(), // unikalne ID zamówienia
      continueUrl: "http://localhost:3000?payment=success",

      buyer: {
        email: formData.email,
        phone: formData.phone,
        firstName: formData.name,
        language: "pl",
      },
      products: cart.map((item: any) => ({
        name: item.name,
        unitPrice: (item.price * 100).toString(),
        quantity: item.quantity,
      })),
    };

    console.log("✅ ACCESS TOKEN:", access_token);
    console.log("✅ ORDER BODY:", JSON.stringify(order, null, 2));
console.log("Moj order", order);
console.log("Moj order z stringify", JSON.stringify(order));

    // 3. Stwórz zamówienie
    const orderRes = await fetch(PAYU_ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(order),
    });
    console.log("pokaz co zwraca order", orderRes);
   // Upewniamy się, że odpowiedź to JSON
  

   console.log("➡️ Odpowiedź PayU:", orderRes.status, orderRes.statusText);
   console.log("➡️ Redirected:", orderRes.redirected);
   console.log("➡️ Redirect URL:", orderRes.url);
   
   const redirectUri = orderRes.url;
   
   if (!redirectUri || !orderRes.ok) {
     return res.status(500).json({message: "Błąd przy tworzeniu zamówienia w PayU."});
   }
   
   return res.status(200).json({redirectUri});
   

  
  } catch (err) {
    console.error("PayU Error:", err);
    return res.status(500).json({message: "Błąd przy tworzeniu zamówienia."});
  }
}

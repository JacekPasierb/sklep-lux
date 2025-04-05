import {CartItem, FormData} from "../types/cart";



export const createOrder = async (
  cart: CartItem[],
  formData: FormData,
  extOrderId: string,
  userId: string | null,
  shippingCost: number
) => {
  const res = await fetch("/api/payment/create-order", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      cart,
      formData,
      extOrderId,
      userId,
      shippingCost,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.redirectUri) {
    throw new Error("Nie udało się stworzyć zamówienia");
  }

  return data.redirectUri;
};

export const updateOrderStatus = async (extOrderId: string) => {
  const res = await fetch("/api/orders/update-status", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({extOrderId}),
  });

  if (!res.ok) {
    throw new Error("Nie udało się zaktualizować statusu zamówienia");
  }

  return res.json();
};

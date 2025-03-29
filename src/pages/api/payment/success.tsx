// pages/payment/success.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Po ładowniu strony zapisujemy zamówienie i otwieramy modal
    const cart = localStorage.getItem("cart"); // tylko jeśli jeszcze jest
    const userData = localStorage.getItem("formData");

    if (cart && userData) {
      fetch("/api/payment/confirm-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: JSON.parse(cart),
          formData: JSON.parse(userData),
        }),
      });

      // Możesz np. otworzyć modal przez Redux / context / query param
      router.push("/?payment=success");
    } else {
      router.push("/?payment=error");
    }
  }, [router]);

  return <p>Przekierowuję...</p>;
}

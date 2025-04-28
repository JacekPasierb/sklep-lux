"use client";
import React, {createContext, useContext, useState, useEffect} from "react";
import {CartItem} from "@/types/cart";
import {useUser} from "@/hooks/useUser";
import {toast} from "react-toastify";

interface CartContextProps {
  cart: CartItem[];
  fetchCart: () => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const {user} = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    if (!user?._id) return;
    try {
      const res = await fetch("/api/user/cart");
      const data = await res.json();
      setCart(data.cart);
    } catch {
      console.error("Błąd przy pobieraniu koszyka");
      toast.error("Nie udało się załadować koszyka");
    }
  };

  useEffect(() => {
    if (user?._id) fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <CartContext.Provider value={{cart, fetchCart}}>
      {children}
    </CartContext.Provider>
  );
};

// 🔁 Hook do użycia w dowolnym komponencie
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

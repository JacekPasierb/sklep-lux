import React, {useEffect, useState} from "react";
import style from "./ShopMenu.module.css";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import AuthModal from "../AuthModal/AuthModal";
import CartModal from "../CartModal/CartModal";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../redux/cart/selectors";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ShopMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [forceStep, setForceStep] = useState<"success" | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const extOrderId = searchParams?.get("order");
    if (searchParams?.get("payment") === "success" ) {
      fetch("/api/orders/update-status", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ extOrderId}),
      });
      setIsCartOpen(true);         // otwieramy modal
      setForceStep("success");     // od razu pokazujemy success
      router.replace("/", { scroll: false }); // czyścimy adres
    }
  }, [searchParams, router]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = useSelector(selectCartCount);

  return (
    <>
      <div className={style.shopMenu}>
        <FaShoppingCart onClick={openCart} className={style.icon}/>   <FaUser onClick={openModal} className={style.icon}/>
        {cartCount > 0 && <span className={style.badge}>{cartCount}</span>}
      </div>
      <AuthModal isOpen={isModalOpen} closeModal={closeModal} />
      <CartModal isOpen={isCartOpen} closeModal={closeCart} forceStep={forceStep}/>
    </>
  );
};

export default ShopMenu;

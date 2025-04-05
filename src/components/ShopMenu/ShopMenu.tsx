import React, {useEffect, useState} from "react";
import style from "./ShopMenu.module.css";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import AuthModal from "../AuthModal/AuthModal";
import CartModal from "../CartModal/CartModal";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../redux/cart/selectors";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {useUser} from "../../hooks/useUser";
import {useCart} from "../../context/CartContext";
import {updateOrderStatus} from "../../services/orderAPI";

const ShopMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [forceStep, setForceStep] = useState<"success" | null>(null);

  const {user} = useUser();
  const reduxCartItems = useSelector(selectCartItems);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const extOrderId = searchParams?.get("order");
    if (searchParams?.get("payment") === "success") {
      try {
        updateOrderStatus(extOrderId as string);

        setIsCartOpen(true);
        setForceStep("success");
        router.replace("/", {scroll: false});
      } catch (error) {
        console.error("Płatność nie dokonana", error);
      }
    }
  }, [searchParams, router]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const {cart: mongoCart} = useCart();

  const cartCount = user?._id
    ? mongoCart.reduce((sum, item) => sum + item.quantity, 0)
    : reduxCartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className={style.shopMenu}>
        <FaShoppingCart onClick={openCart} className={style.icon} />{" "}
        <FaUser onClick={openModal} className={style.icon} />
        {cartCount > 0 && <span className={style.badge}>{cartCount}</span>}
      </div>
      <AuthModal isOpen={isModalOpen} closeModal={closeModal} />
      <CartModal
        isOpen={isCartOpen}
        closeModal={closeCart}
        forceStep={forceStep}
      />
    </>
  );
};

export default ShopMenu;

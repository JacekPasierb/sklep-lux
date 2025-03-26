import React, {useState} from "react";
import style from "./ShopMenu.module.css";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import AuthModal from "../AuthModal/AuthModal";
import CartModal from "../CartModal/CartModal";

const ShopMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      <div className={style.shopMenu}>
        <FaShoppingCart onClick={openCart}/>   <FaUser onClick={openModal}/>
      </div>
      <AuthModal isOpen={isModalOpen} closeModal={closeModal} />
      <CartModal isOpen={isCartOpen} closeModal={closeCart} />
    </>
  );
};

export default ShopMenu;

import React, {useState} from "react";
import style from "./ShopMenu.module.css";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import AuthModal from "../AuthModal/AuthModal";

const ShopMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={style.shopMenu}>
        <FaShoppingCart />   <FaUser onClick={openModal}/>
      </div>
      <AuthModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default ShopMenu;

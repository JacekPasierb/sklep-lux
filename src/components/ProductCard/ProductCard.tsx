import React from "react";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import {addToCart} from "../../redux/cart/cartSlice";
import {useDispatch} from "react-redux";
import {useUser} from "../../hooks/useUser";
import {toast} from "react-toastify";
import {addProductToCart} from "../../services/cartAPI";
import {useCart} from "../../context/CartContext";

interface ProductCardProps {
  imageSrc: string;
  modelName: string;
  modelDetails: string;
  description: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  modelName,
  modelDetails,
  description,
  price,
}) => {
  const {isLoggedIn} = useUser();
  const dispatch = useDispatch();
  const {fetchCart} = useCart();

  const handleAddToCart = async (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    if (!isLoggedIn) {
      dispatch(addToCart(product));

      return;
    }
    try {
      await addProductToCart(product);

      await fetchCart();
    } catch {
      toast.error("Błąd przy dodawaniu produktu");
    }
  };
  return (
    <div className={styles.productCard}>
      <Image
        src={imageSrc}
        alt={modelName}
        width={500}
        height={500}
        sizes="(max-width: 991px) 100vw, 50vw"
        className={styles.productImage}
      />

      <div className={styles.productDetails}>
        <h3 className={styles.modelName}>{modelName}</h3>
        <p className={styles.modelDetails}>{modelDetails}</p>
        <p className={styles.productDescription}>{description}</p>
        <div className={styles.priceAndButton}>
          <span className={styles.price}>{price} zł</span>
          <button
            className={styles.addToCartButton}
            onClick={() =>
              handleAddToCart({
                id: modelName,
                name: modelName,
                price: parseFloat(price),
                image: imageSrc,
              })
            }
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

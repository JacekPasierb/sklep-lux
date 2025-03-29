import React from 'react'
import styles from "./ProductCard.module.css"
import Image from 'next/image'
import { addToCart } from '../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useUser } from '../../hooks/useUser';
import { toast } from 'react-toastify';

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
  
    const handleAddToCart = async (product: {
      id: string;
      name: string;
      price: number;
      image:string;
    }) => {
      if (!isLoggedIn) {
        dispatch(addToCart(product));
        toast.success("Dodano produkt do lokalnego koszyka!");
        return;
      }
  
      // 🔸 Tu później dodamy fetch do /api/cart/add
      toast.success(`Dodano ${product.name} do koszyka!`);
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
      <p className={styles.modelDetails}>
      {modelDetails}
      </p>
      <p className={styles.productDescription}>
      {description}
      </p>
      <div className={styles.priceAndButton}>
        <span className={styles.price}>{price}</span>
        <button className={styles.addToCartButton} onClick={() =>
                              handleAddToCart({
                                id: modelName,
                                name: modelName,
                                price: parseFloat(price),
                                image: imageSrc
                              })
                            }>
          Dodaj do koszyka
        </button>
      </div>
    </div>
  </div>
  )
}

export default ProductCard
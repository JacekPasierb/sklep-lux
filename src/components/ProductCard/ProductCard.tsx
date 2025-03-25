import React from 'react'
import styles from "./ProductCard.module.css"
import Image from 'next/image'

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
        <button className={styles.addToCartButton}>
          Dodaj do koszyka
        </button>
      </div>
    </div>
  </div>
  )
}

export default ProductCard
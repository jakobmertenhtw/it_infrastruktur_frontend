import React from "react";
import "./App.css";
import { Product } from "./ViewProducts";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const imageUrl = `https://jakob-team-product-images.s3.eu-west-1.amazonaws.com/${product.id}`;
  const [imageExists, setImageExists] = React.useState(false);

  const handleImageLoad = () => {
    setImageExists(true);
  };

  const handleImageError = () => {
    setImageExists(false);
  };

  return (
    <div className="product">
      {/* Hidden image just to check if it loads */}
      <img
        src={imageUrl}
        alt={product.name}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: "none" }}
      />

      {/* Only render actual product image if it exists */}
      {imageExists && (
        <img src={imageUrl} alt={product.name} className="product-image" />
      )}
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">{product.price}</p>
    </div>
  );
};

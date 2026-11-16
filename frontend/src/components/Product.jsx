import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeartIcon = ({ filled = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const Product = ({ product, onAddToCart }) => {
  const [liked, setLiked] = useState(false);

  if (!product) return null;

  const price = Number(product.price);
  const displayPrice = Number.isFinite(price) ? price.toFixed(2) : "0.00";

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLiked((current) => !current);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (typeof onAddToCart === "function") {
      onAddToCart(product);
    }
  };

  return (
    <article className={`boutique-product-card ${liked ? "is-liked" : ""}`}>
      <div className="boutique-image-shell">
        <Link
          to={`/product/${product._id}`}
          className="boutique-image-link"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        <button
          type="button"
          className={`boutique-heart ${liked ? "liked" : ""}`}
          aria-label={
            liked
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={liked}
          onClick={handleWishlist}
        >
          <HeartIcon filled={liked} />
        </button>
      </div>

      <div className="boutique-product-info">
        <Link
          to={`/product/${product._id}`}
          className="boutique-product-name"
        >
          {product.name}
        </Link>

        <div className="boutique-product-bottom">
          <strong>${displayPrice}</strong>

          <button
            type="button"
            className="boutique-add-button"
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAdd}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Product;
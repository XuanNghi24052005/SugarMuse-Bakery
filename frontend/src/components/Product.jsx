import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../Context/Cartcontext";
import { useWishlist } from "../Context/Wishlistcontext";

const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
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
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const Product = ({ product }) => {
  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const navigate = useNavigate();

  const liked = isWishlisted(product._id);

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <article className="boutique-product-card">
      <div className="boutique-image-shell">
        <Link
          to={`/product/${product._id}`}
          className="boutique-image-link"
        >
          <img
            src={product.image}
            alt={product.name}
          />
        </Link>

        <button
          type="button"
          className={
            liked
              ? "boutique-heart liked"
              : "boutique-heart"
          }
          onClick={() =>
            toggleWishlist(product)
          }
          aria-label={
            liked
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
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
          <strong>
            ${Number(product.price).toFixed(2)}
          </strong>

          <button
            type="button"
            className="boutique-add-button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Product;
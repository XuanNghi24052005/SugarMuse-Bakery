import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../Context/Cartcontext";
import { useWishlist } from "../Context/Wishlistcontext";

import "../pageStyles/Wishlist.css";

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6 18 20H6L5 6" />
    <path d="M10 10v6" />
    <path d="M14 10v6" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m14 7 5 5-5 5" />
  </svg>
);

const Wishlist = () => {
  const { addToCart } = useCart();

  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <main className="wishlist-page">
      <section className="wishlist-banner">
        <div className="wishlist-banner-image">
          <img
            src="/images/products/peach-cake.jpg"
            alt="Sugar Muse peach cake wishlist"
          />
        </div>

        <div className="wishlist-banner-overlay" />

        <div className="wishlist-banner-content">
          <span>SAVED WITH LOVE</span>

          <h1>
            Your
            <em>Wishlist</em>
          </h1>

          <p>
            A little collection of the Sugar Muse treats you love most.
          </p>
        </div>

        <div className="wishlist-banner-heart">
          <HeartIcon />
        </div>
      </section>

      {wishlistItems.length === 0 ? (
        <section className="wishlist-empty">
          <div className="wishlist-empty-heart">
            <HeartIcon />
          </div>

          <span className="wishlist-eyebrow">
            YOUR FAVORITES
          </span>

          <h2>Your wishlist is empty</h2>

          <p>
            Save your favorite cakes, pastries and treats so you can
            easily find them again.
          </p>

          <Link
            to="/products"
            className="wishlist-shop-button"
          >
            Explore Our Bakes
            <ArrowIcon />
          </Link>
        </section>
      ) : (
        <section className="wishlist-content">
          <div className="wishlist-toolbar">
            <span>
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1
                ? "favorite"
                : "favorites"}
            </span>

            <button
              type="button"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </button>
          </div>

          <div className="wishlist-grid">
            {wishlistItems.map((product) => (
              <article
                className="wishlist-card"
                key={product._id}
              >
                <div className="wishlist-image">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </Link>

                  <button
                    type="button"
                    className="wishlist-remove"
                    onClick={() =>
                      removeFromWishlist(product._id)
                    }
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <TrashIcon />
                  </button>

                  <span className="wishlist-heart">
                    <HeartIcon />
                  </span>
                </div>

                <div className="wishlist-card-info">
                  <Link
                    to={`/product/${product._id}`}
                    className="wishlist-product-name"
                  >
                    {product.name}
                  </Link>

                  <div className="wishlist-card-bottom">
                    <strong>
                      ${Number(product.price).toFixed(2)}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >
                      Add to Cart
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="wishlist-footer">
            <Link to="/products">
              ← Continue Shopping
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default Wishlist;
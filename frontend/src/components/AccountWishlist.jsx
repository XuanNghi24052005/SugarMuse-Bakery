import React from "react";

import { useWishlist } from "../Context/Wishlistcontext";
import { useCart } from "../Context/Cartcontext";

const AccountWishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const {
    addToCart,
  } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
  };

  if (!wishlistItems?.length) {
    return (
      <section className="account-wishlist-section">
        <div className="account-wishlist-heading">
          <span>MY WISHLIST</span>

          <h2>My Wishlist</h2>

          <p>
            A little collection of the Sugar Muse treats you love most.
          </p>
        </div>

        <div className="account-wishlist-empty">
          <div className="account-wishlist-empty-icon">
            ♡
          </div>

          <h3>
            Your wishlist is empty
          </h3>

          <p>
            Save your favorite Sugar Muse treats and they will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="account-wishlist-section">
      <div className="account-wishlist-heading">
        <span>MY WISHLIST</span>

        <h2>My Wishlist</h2>

        <p>
          A little collection of the Sugar Muse treats you love most.
        </p>
      </div>

      <div className="account-wishlist-toolbar">
        <strong>
          {wishlistItems.length}{" "}
          {wishlistItems.length === 1
            ? "favorite"
            : "favorites"}
        </strong>

        <button
          type="button"
          className="account-clear-wishlist"
          onClick={clearWishlist}
        >
          <span className="account-wishlist-trash-icon">
            ♢
          </span>

          Clear Wishlist
        </button>
      </div>

      <div className="account-wishlist-grid">
        {wishlistItems.map((product, index) => (
          <article
            className="account-wishlist-card"
            key={product.id || product._id || product.name || index}
          >
            <div className="account-wishlist-image-wrap">
              <img
                src={product.image}
                alt={product.name}
                className="account-wishlist-image"
              />

              <button
                type="button"
                className="account-wishlist-remove"
                onClick={() =>
                  handleRemove(product)
                }
                aria-label={`Remove ${product.name} from wishlist`}
              >
                ×
              </button>
            </div>

            <div className="account-wishlist-card-content">
              <h3>
                {product.name}
              </h3>

              <div className="account-wishlist-card-bottom">
                <strong>
                  $
                  {Number(
                    product.price
                  ).toFixed(2)}
                </strong>

                <button
                  type="button"
                  className="account-wishlist-cart"
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >
                  Add to Cart
                  <span>→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AccountWishlist;
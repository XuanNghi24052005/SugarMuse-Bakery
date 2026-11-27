import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/Cartcontext";
import {
  getRecentlyViewed,
  removeRecentlyViewed,
  clearRecentlyViewed,
} from "../utils/recentlyViewed";
import { showToast } from "../utils/showToast";
import "../pageStyles/recentlyViewed.css";

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ width: 16, height: 16 }}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
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
    style={{ width: 16, height: 16 }}
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v5" />
    <path d="M14 11v5" />
  </svg>
);

const RecentlyViewed = () => {
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const viewed = getRecentlyViewed();
    setItems(viewed);
  }, []);

  const handleClearHistory = () => {
    clearRecentlyViewed();
    setItems([]);
    showToast.success("Viewing history cleared");
  };

  const handleRemoveItem = (productId) => {
    const updated = removeRecentlyViewed(productId);
    setItems(updated);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast.success(`Added ${product.name} to cart!`);
  };

  return (
    <main className="recently-viewed-page">
      {/* Hero Banner */}
      <section className="recently-viewed-hero">
        <div className="recently-viewed-hero-content">
          <span>RECENTLY VIEWED</span>
          <h1>
            Your Recent <em>Treats</em>
          </h1>
          <p>
            Pick up where you left off and rediscover the Sugar Muse treats you've recently explored.
          </p>
        </div>

        <div className="recently-viewed-hero-image">
          <img
            src="/images/products/peach-cake.jpg"
            alt="Sugar Muse peach cake"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/sugar-muse-favicon.svg";
            }}
          />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="recently-viewed-content">
        <div className="recently-viewed-header">
          <div>
            <div className="recently-viewed-title-row">
              <h2>Recently Viewed</h2>

              {items.length > 0 && (
                <span className="recently-viewed-count">
                  <ClockIcon />
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              )}
            </div>

            <p>Products you have recently viewed will appear here.</p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              className="recently-viewed-clear"
              onClick={handleClearHistory}
            >
              <TrashIcon />
              Clear History
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="recently-viewed-empty">
            <div className="recently-viewed-empty-icon">
              <ClockIcon />
            </div>

            <h3>Nothing here yet</h3>

            <p>
              Start exploring Sugar Muse and your recently viewed treats will appear here.
            </p>

            <Link to="/products" className="recently-viewed-shop">
              Explore Treats <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="recently-viewed-grid">
            {items.map((product) => (
              <article className="recently-viewed-card" key={product.id}>
                <div className="recently-viewed-image-wrap">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image || "/images/sugar-muse-favicon.svg"}
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/sugar-muse-favicon.svg";
                      }}
                    />
                  </Link>

                  <button
                    type="button"
                    className="recently-viewed-remove"
                    onClick={() => handleRemoveItem(product.id)}
                    aria-label={`Remove ${product.name} from recently viewed`}
                    title="Remove from history"
                  >
                    ×
                  </button>
                </div>

                <div className="recently-viewed-card-content">
                  <Link
                    to={`/product/${product.id}`}
                    className="recently-viewed-product-name"
                  >
                    {product.name}
                  </Link>

                  {(product.subcategory || product.category) && (
                    <span className="recently-viewed-category">
                      {product.subcategory || product.category}
                    </span>
                  )}

                  <div className="recently-viewed-card-bottom">
                    <strong>${Number(product.price || 0).toFixed(2)}</strong>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default RecentlyViewed;

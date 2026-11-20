import React from "react";
import { Link } from "react-router-dom";

import "../pageStyles/NewCollection.css";

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

const editProducts = [
  {
    id: 1,
    name: "Strawberry Tart",
    price: 26,
    image: "/images/products/strawberry-tart.jpg",
  },
  {
    id: 2,
    name: "Strawberry Macaron Box",
    price: 24,
    image: "/images/products/strawberry-macaron-box.jpg",
  },
  {
    id: 3,
    name: "Strawberry Mini Cake",
    price: 30,
    image: "/images/products/strawberry-mini-cake.jpg",
  },
];

const NewCollection = () => {
  return (
    <main className="new-collection-page">

      <section className="collection-hero">
        <div className="collection-hero-copy">
          <span className="collection-label">
            NEW COLLECTION
          </span>

          <div className="collection-season">
            <span />
            <strong>SPRING 2027</strong>
            <span />
          </div>

          <h1>
            Strawberry
            <em>Reverie</em>
          </h1>

          <p>
            A seasonal collection inspired by strawberries,
            flowers and slow spring mornings.
          </p>

          <a
            href="#strawberry-collection"
            className="collection-primary-button"
          >
            Discover the Collection
            <ArrowIcon />
          </a>
        </div>

        <div className="collection-hero-image">
          <img
            src="/images/products/strawberry-hero.jpg"
            alt="Strawberry Reverie Collection"
          />
        </div>
      </section>

      <div className="collection-content-shell">

        <section
          className="collection-feature-list"
          id="strawberry-collection"
        >
          <article className="collection-feature-item">
            <div className="collection-feature-image">
              <img
                src="/images/products/strawberry-shortcake.jpg"
                alt="Strawberry Shortcake"
              />
            </div>

            <div className="collection-feature-content">
              <div className="collection-feature-number-row">
                <span>01</span>
              </div>

              <h2>
                Strawberry
                <em>Shortcake</em>
              </h2>

              <p>
                Soft vanilla sponge, fresh cream and juicy strawberries.
              </p>

              <div className="collection-feature-price">
                $28.00
              </div>

              <Link
                to="/products"
                className="collection-feature-link"
              >
                View Details
                <ArrowIcon />
              </Link>
            </div>
          </article>

          <article className="collection-feature-item reverse">
            <div className="collection-feature-image">
              <img
                src="/images/products/strawberry-roll.jpg"
                alt="Strawberry Roll"
              />
            </div>

            <div className="collection-feature-content">
              <div className="collection-feature-number-row">
                <span>02</span>
              </div>

              <h2>
                Strawberry
                <em>Roll</em>
              </h2>

              <p>
                Light strawberry sponge wrapped around fresh cream
                and berries.
              </p>

              <div className="collection-feature-price">
                $22.00
              </div>

              <Link
                to="/products"
                className="collection-feature-link"
              >
                View Details
                <ArrowIcon />
              </Link>
            </div>
          </article>
        </section>

        <section className="collection-edit-section">
          <div className="collection-edit-heading">
            <span>THE EDIT</span>
          </div>

          <div className="collection-edit-grid">
            {editProducts.map((product) => (
              <Link
                key={product.id}
                to="/products"
                className="collection-edit-card"
              >
                <div className="collection-edit-card-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <h3>
                  {product.name}
                </h3>

                <p>
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="next-collection">
          <div className="next-collection-copy">
            <span className="collection-label">
              NEXT COLLECTION
            </span>

            <h2>
              Summer Berry
            </h2>

            <p>
              Coming June 2027
            </p>

            <button
              type="button"
              className="next-collection-button"
            >
              Stay Tuned
              <ArrowIcon />
            </button>
          </div>

          <div className="next-collection-image">
            <img
              src="/images/products/summer-berry.jpg"
              alt="Summer Berry upcoming collection"
            />
          </div>
        </section>

      </div>
    </main>
  );
};

export default NewCollection;
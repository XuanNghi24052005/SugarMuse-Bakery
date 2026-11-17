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

const collectionEdit = [
  {
    id: "strawberry-tart",
    name: "Strawberry Tart",
    price: 26,
    image: "/images/new-collection/strawberry-tart.jpg",
  },
  {
    id: "strawberry-macaron-box",
    name: "Strawberry Macaron Box",
    price: 24,
    image: "/images/new-collection/strawberry-macaron-box.jpg",
  },
  {
    id: "strawberry-mini-cake",
    name: "Strawberry Mini Cake",
    price: 30,
    image: "/images/new-collection/strawberry-mini-cake.jpg",
  },
];

const NewCollection = () => {
  return (
    <main className="new-collection-page">

      {/* HERO */}

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
            src="/images/new-collection/strawberry-hero.jpg"
            alt="Strawberry Reverie collection"
          />
        </div>
      </section>

      {/* FEATURE 01 */}

      <section
        className="collection-feature collection-feature-one"
        id="strawberry-collection"
      >
        <div className="collection-feature-image">
          <img
            src="/images/new-collection/strawberry-shortcake.jpg"
            alt="Strawberry Shortcake"
          />
        </div>

        <div className="collection-feature-copy">
          <div className="collection-feature-number">
            <span>01</span>
            <i />
          </div>

          <h2>
            Strawberry
            <em>Shortcake</em>
          </h2>

          <p>
            Soft vanilla sponge, fresh cream and juicy strawberries.
          </p>

          <strong className="collection-price">
            $28.00
          </strong>

          <Link
            to="/products/strawberry-shortcake"
            className="collection-detail-link"
          >
            View Details
            <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* FEATURE 02 */}

      <section className="collection-feature collection-feature-two">
        <div className="collection-feature-copy">
          <div className="collection-feature-number">
            <span>02</span>
            <i />
          </div>

          <h2>
            Strawberry
            <em>Roll</em>
          </h2>

          <p>
            Light strawberry sponge wrapped around fresh cream and berries.
          </p>

          <strong className="collection-price">
            $22.00
          </strong>

          <Link
            to="/products/strawberry-roll"
            className="collection-detail-link"
          >
            View Details
            <ArrowIcon />
          </Link>
        </div>

        <div className="collection-feature-image">
          <img
            src="/images/new-collection/strawberry-roll.jpg"
            alt="Strawberry Roll"
          />
        </div>
      </section>

      {/* THE EDIT */}

      <section className="collection-edit-section">
        <div className="collection-edit-heading">
          <span />
          <strong>
            THE EDIT
          </strong>
          <span />
        </div>

        <div className="collection-edit-grid">
          {collectionEdit.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="collection-edit-item"
            >
              <div className="collection-edit-image">
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

      {/* NEXT COLLECTION */}

      <section className="next-collection-section">
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
            src="/images/new-collection/summer-berry.jpg"
            alt="Summer Berry upcoming collection"
          />
        </div>
      </section>

    </main>
  );
};

export default NewCollection;
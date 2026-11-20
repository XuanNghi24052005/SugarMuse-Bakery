import React from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../Context/Cartcontext";
import "../pageStyles/NewCollection.css";

const strawberryShortcake = {
  _id: "collection-1",
  name: "Strawberry Shortcake",
  price: 28,
  image: "/images/products/strawberry-shortcake.jpg",
};

const strawberryRoll = {
  _id: "collection-2",
  name: "Strawberry Roll",
  price: 22,
  image: "/images/products/strawberry-roll.jpg",
};

const editProducts = [
  {
    _id: "collection-3",
    name: "Strawberry Tart",
    price: 18,
    image: "/images/products/strawberry-tart.jpg",
    description: "Buttery tart, vanilla cream and fresh strawberries.",
  },
  {
    _id: "collection-4",
    name: "Strawberry Macaron Box",
    price: 24,
    image: "/images/products/strawberry-macaron-box.jpg",
    description: "Delicate strawberry macarons made for gifting.",
  },
  {
    _id: "collection-5",
    name: "Strawberry Mini Cake",
    price: 20,
    image: "/images/products/strawberry-mini-cake.jpg",
    description: "A petite celebration cake with strawberry cream.",
  },
];

const NewCollection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <main className="new-collection-page">
      <section className="collection-hero">
        <div className="collection-hero-copy">
          <span>NEW COLLECTION</span>
          <small>SPRING 2027</small>

          <h1>
            Strawberry
            <em>Reverie</em>
          </h1>

          <p>
            A seasonal collection inspired by strawberries,
            flowers and slow spring mornings.
          </p>

          <a href="#collection-story">
            Discover the Collection
          </a>
        </div>

        <div className="collection-hero-image">
          <img
            src="/images/products/strawberry-hero.jpg"
            alt="Strawberry Reverie collection"
          />
        </div>
      </section>

      <div
        className="collection-content-shell"
        id="collection-story"
      >
        <section className="collection-feature">
          <div className="collection-feature-image">
            <img
              src={strawberryShortcake.image}
              alt={strawberryShortcake.name}
            />
          </div>

          <div className="collection-feature-copy">
            <span>01</span>

            <h2>
              Strawberry
              <em>Shortcake</em>
            </h2>

            <p>
              Soft vanilla sponge, fresh cream and juicy
              strawberries.
            </p>

            <strong>
              ${strawberryShortcake.price.toFixed(2)}
            </strong>

            <button
              type="button"
              className="collection-detail-link"
            >
              View Details →
            </button>

            <button
              type="button"
              className="collection-add-cart"
              onClick={() =>
                handleAddToCart(strawberryShortcake)
              }
            >
              Add to Cart +
            </button>
          </div>
        </section>

        <section className="collection-feature collection-feature-two">
          <div className="collection-feature-copy">
            <span>02</span>

            <h2>
              Strawberry
              <em>Roll</em>
            </h2>

            <p>
              Light strawberry sponge wrapped around fresh
              cream and berries.
            </p>

            <strong>
              ${strawberryRoll.price.toFixed(2)}
            </strong>

            <button
              type="button"
              className="collection-detail-link"
            >
              View Details →
            </button>

            <button
              type="button"
              className="collection-add-cart"
              onClick={() =>
                handleAddToCart(strawberryRoll)
              }
            >
              Add to Cart +
            </button>
          </div>

          <div className="collection-feature-image">
            <img
              src={strawberryRoll.image}
              alt={strawberryRoll.name}
            />
          </div>
        </section>

        <section className="collection-edit-section">
          <div className="collection-edit-heading">
            <span>THE EDIT</span>
            <h2>Made for Spring</h2>
          </div>

          <div className="collection-edit-grid">
            {editProducts.map((product) => (
              <article
                className="collection-edit-item"
                key={product._id}
              >
                <div className="collection-edit-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <strong>
                  ${product.price.toFixed(2)}
                </strong>

                <button
                  type="button"
                  className="collection-add-cart"
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >
                  Add to Cart +
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="next-collection">
          <div className="next-collection-copy">
            <span>NEXT COLLECTION</span>

            <h2>
              Summer
              <em>Berry</em>
            </h2>

            <p>
              A fresh summer edit of berries, cream and
              delicate seasonal flavors.
            </p>
          </div>

          <div className="next-collection-image">
            <img
              src="/images/products/summer-berry.jpg"
              alt="Summer Berry collection"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default NewCollection;
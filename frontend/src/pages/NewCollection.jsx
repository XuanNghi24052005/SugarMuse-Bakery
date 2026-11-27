import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { useCart } from "../Context/Cartcontext";
import { showToast } from "../utils/showToast";
import "../pageStyles/NewCollection.css";

const strawberryShortcake = {
  _id: "collection-1",
  id: "collection-1",
  name: "Strawberry Shortcake",
  price: 28,
  stock: 25,
  category: "Cake",
  flavor: "Strawberry Vanilla",
  image: "/images/products/strawberry-shortcake.jpg",
  description: "Soft vanilla sponge, fresh Hokkaido whipped cream and hand-picked strawberries.",
};

const strawberryRoll = {
  _id: "collection-2",
  id: "collection-2",
  name: "Strawberry Roll",
  price: 22,
  stock: 20,
  category: "Pastry",
  flavor: "Strawberry Cream",
  image: "/images/products/strawberry-roll.jpg",
  description: "Light strawberry sponge wrapped around fresh whipped cream and berries.",
};

const editProducts = [
  {
    _id: "collection-3",
    id: "collection-3",
    name: "Strawberry Tart",
    price: 18,
    stock: 15,
    category: "Pastry",
    flavor: "Strawberry Vanilla",
    image: "/images/products/strawberry-tart.jpg",
    description: "Buttery tart crust, rich vanilla bean pastry cream and glazed fresh strawberries.",
  },
  {
    _id: "collection-4",
    id: "collection-4",
    name: "Strawberry Macaron Box",
    price: 24,
    stock: 18,
    category: "Gift Box",
    flavor: "Strawberry White Chocolate",
    image: "/images/products/strawberry-macaron-box.jpg",
    description: "Delicate Parisian strawberry macarons made for gifting.",
  },
  {
    _id: "collection-5",
    id: "collection-5",
    name: "Strawberry Mini Cake",
    price: 20,
    stock: 12,
    category: "Cake",
    flavor: "Strawberry Chiffon",
    image: "/images/products/strawberry-mini-cake.jpg",
    description: "A petite celebration cake with fresh strawberry cream and edible flowers.",
  },
];

const NewCollection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(
      {
        ...product,
        _id: product._id || product.id,
        id: product._id || product.id,
        stock: product.stock || 25,
        price: Number(product.price) || 0,
      },
      1
    );
    showToast.success(`Added ${product.name} to cart!`);
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product._id || product.id}`);
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
        {/* Feature 01 */}
        <section className="collection-feature">
          <div
            className="collection-feature-image"
            style={{ cursor: "pointer" }}
            onClick={() => handleViewDetails(strawberryShortcake)}
            title={`View details of ${strawberryShortcake.name}`}
          >
            <img
              src={strawberryShortcake.image}
              alt={strawberryShortcake.name}
            />
          </div>

          <div className="collection-feature-copy">
            <span>01</span>

            <h2
              style={{ cursor: "pointer" }}
              onClick={() => handleViewDetails(strawberryShortcake)}
              title={`View details of ${strawberryShortcake.name}`}
            >
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
              onClick={() => handleViewDetails(strawberryShortcake)}
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

        {/* Feature 02 */}
        <section className="collection-feature collection-feature-two">
          <div className="collection-feature-copy">
            <span>02</span>

            <h2
              style={{ cursor: "pointer" }}
              onClick={() => handleViewDetails(strawberryRoll)}
              title={`View details of ${strawberryRoll.name}`}
            >
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
              onClick={() => handleViewDetails(strawberryRoll)}
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

          <div
            className="collection-feature-image"
            style={{ cursor: "pointer" }}
            onClick={() => handleViewDetails(strawberryRoll)}
            title={`View details of ${strawberryRoll.name}`}
          >
            <img
              src={strawberryRoll.image}
              alt={strawberryRoll.name}
            />
          </div>
        </section>

        {/* The Edit Grid */}
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
                <div
                  className="collection-edit-image"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewDetails(product)}
                  title={`View details of ${product.name}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewDetails(product)}
                  title={`View details of ${product.name}`}
                >
                  {product.name}
                </h3>

                <p>{product.description}</p>

                <strong>
                  ${product.price.toFixed(2)}
                </strong>

                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "12px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="collection-detail-link"
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details →
                  </button>
                  <button
                    type="button"
                    className="collection-add-cart"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    Add to Cart +
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Next Collection Banner */}
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

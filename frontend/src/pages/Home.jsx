import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../pageStyles/Home.css";
import { useCart } from "../Context/Cartcontext";
import { useWishlist } from "../Context/Wishlistcontext";

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

const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

const categories = [
  {
    name: "Cakes",
    image: "/images/products/strawberry-cake.jpg",
    link: "/products?category=Cake",
  },
  {
    name: "Pastries",
    image: "/images/products/croissant.jpg",
    link: "/products?category=Pastry",
  },
  {
    name: "Savory",
    image: "/images/products/ham-cheese-croissant.jpg",
    link: "/products?category=Savory",
  },
  {
    name: "Gift Boxes",
    image: "/images/products/macaron-box.jpg",
    link: "/products?category=Gift Box",
  },
];

const bestSellers = [
  {
    _id: "2",
    name: "Strawberry Cream Cake",
    price: 32,
    image: "/images/products/strawberry-cake.jpg",
  },
  {
    _id: "9",
    name: "Butter Croissant",
    price: 4.5,
    image: "/images/products/croissant.jpg",
  },
  {
    _id: "12",
    name: "Fresh Fruit Tart",
    price: 8,
    image: "/images/products/fruit-tart.jpg",
  },
  {
    _id: "25",
    name: "Macaron Gift Box",
    price: 24,
    image: "/images/products/macaron-box.jpg",
  },
];

const Home = () => {
  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <main className="sugar-muse-home">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="home-eyebrow">
            BAKED WITH A LITTLE LOVE
          </span>

          <h1>
            Sweet Moments,
            <em>Made Fresh</em>
          </h1>

          <p>
            Cakes, pastries and thoughtful little treats,
            freshly made for everyday moments and special celebrations.
          </p>

          <div className="home-hero-actions">
            <Link
              to="/products"
              className="home-primary-button"
            >
              Shop Our Bakes
              <ArrowIcon />
            </Link>

            <Link
              to="/custom-cakes"
              className="home-secondary-button"
            >
              Custom Cakes
            </Link>
          </div>
        </div>

        <div className="home-hero-image">
          <img
            src="/images/products/strawberry-hero.jpg"
            alt="Sugar Muse strawberry cake"
          />
        </div>
      </section>

      <section className="home-benefits">
        <div className="home-benefit">
          <span>♡</span>

          <div>
            <strong>Made Fresh Daily</strong>
            <p>Small-batch baking every day</p>
          </div>
        </div>

        <div className="home-benefit">
          <span>✦</span>

          <div>
            <strong>Premium Ingredients</strong>
            <p>Simple ingredients, beautiful flavors</p>
          </div>
        </div>

        <div className="home-benefit">
          <span>🎀</span>

          <div>
            <strong>Beautifully Wrapped</strong>
            <p>Perfect for gifting and celebrations</p>
          </div>
        </div>

        <div className="home-benefit">
          <span>♡</span>

          <div>
            <strong>Made for You</strong>
            <p>Custom cakes for special moments</p>
          </div>
        </div>
      </section>

      <section className="home-section home-category-section">
        <div className="home-section-heading">
          <span className="heading-line" />

          <div>
            <span className="home-section-label">
              SOMETHING FOR EVERY CRAVING
            </span>

            <h2>Shop by Category</h2>
          </div>

          <span className="heading-line" />
        </div>

        <div className="home-category-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="home-category-card"
            >
              <div className="home-category-image">
                <img
                  src={category.image}
                  alt={category.name}
                />
              </div>

              <div className="home-category-bottom">
                <h3>{category.name}</h3>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-best-section">
        <div className="home-section-heading">
          <span className="heading-line" />

          <div>
            <span className="home-section-label">
              OUR FAVORITES
            </span>

            <h2>Best Sellers</h2>
          </div>

          <span className="heading-line" />
        </div>

        <div className="home-product-grid">
          {bestSellers.map((product) => {
            const liked = isWishlisted(product._id);

            return (
              <article
                className="home-product-card"
                key={product._id}
              >
                <div className="home-product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <button
                    type="button"
                    className={
                      liked
                        ? "home-product-heart liked"
                        : "home-product-heart"
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

                <div className="home-product-info">
                  <div>
                    <h3>{product.name}</h3>

                    <strong>
                      ${product.price.toFixed(2)}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="home-product-add"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    +
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="home-view-all">
          <Link to="/products">
            View All Products
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <section
        className="custom-cake-section"
        id="custom-cakes"
      >
        <div className="custom-cake-image">
          <img
            src="/images/products/custom-bakery.jpg"
            alt="Sugar Muse custom cake"
          />
        </div>

        <div className="custom-cake-content">
          <span className="home-section-label">
            CUSTOM CAKES
          </span>

          <h2>
            Create Your
            <br />
            Dream Cake
          </h2>

          <p>
            Personalized cakes for your special moments,
            made just the way you imagine.
          </p>

          <Link
            to="/custom-cakes"
            className="home-primary-button"
          >
            Design Your Cake
            <ArrowIcon />
          </Link>
        </div>

        <span className="custom-decoration">
          ♡
        </span>
      </section>

      <section className="home-new-collection">
        <div className="home-new-collection-copy">
          <div className="home-new-collection-top">
            <span className="home-new-collection-label">
              NEW COLLECTION
            </span>

            <span className="home-new-collection-line" />
          </div>

          <span className="home-new-collection-season">
            SPRING 2027
          </span>

          <h2>
            Cherry Blossom
            <em>Delight</em>
          </h2>

          <p>
            A dreamy seasonal collection of cherry blossoms,
            light cream and delicate spring flavors.
          </p>

          <Link
            to="/new-collection"
            className="home-new-collection-button"
          >
            Discover the Collection
            <ArrowIcon />
          </Link>
        </div>

        <div className="home-new-collection-image">
          <img
            src="/images/products/cherry-blossom-cake.jpg"
            alt="Cherry Blossom Delight Cake"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
          import React, { useEffect, useState } from "react";
          import "../pageStyles/Home.css";

          /* =====================================================
            HERO SLIDER
          ===================================================== */

          const heroSlides = [
            {
              id: 1,
              image: "/images/hero/hero-strawberry-cake.jpg",
              eyebrow: "ARTISAN BAKERY",
              title: "Sweet Moments Made for You",
              description:
                "Handcrafted cakes, delicate pastries and savory favorites made fresh with quality ingredients and a passion for baking.",
            },

            {
              id: 2,
              image: "/images/products/chocolate-cake.jpg",
              eyebrow: "OUR SIGNATURE BAKES",
              title: "Made Fresh, Made Beautiful",
              description:
                "From rich chocolate cakes to buttery pastries, every Sugar Muse creation is prepared with care.",
            },

            {
              id: 3,
              image: "/images/banners/birthday-banner.jpg",
              eyebrow: "CELEBRATE YOUR WAY",
              title: "Cakes for Every Special Moment",
              description:
                "Birthdays, anniversaries and memorable celebrations deserve a cake designed especially for you.",
            },
          ];

          /* =====================================================
            CATEGORY
          ===================================================== */

                  const categories = [
          {
            id: 1,
            name: "Cakes",
            image: "/images/products/cake-category.jpg",
            link: "/products?category=Cake",
          },

          {
            id: 2,
            name: "Pastries",
            image: "/images/products/pastry-category.jpg",
            link: "/products?category=Pastry",
          },

          {
            id: 3,
            name: "Savory",
            image: "/images/products/savory-category.jpg",
            link: "/products?category=Savory",
          },

          {
            id: 4,
            name: "Gift Boxes",
            image: "/images/products/gift-box-category.jpg",
            link: "/products?category=Gift Box",
          },
        ];
          /* =====================================================
            BEST SELLERS
          ===================================================== */

                const bestSellers = [
        {
          id: 1,
          name: "Chocolate Cake",
          price: 35,
          label: "Best Seller",
          image: "/images/products/chocolate-cake.jpg",
        },
        {
          id: 2,
          name: "Strawberry Cake",
          price: 32,
          label: "Popular",
          image: "/images/products/strawberry-cake.jpg",
        },
        {
          id: 3,
          name: "Croissant",
          price: 4.5,
          label: "Fresh Daily",
          image: "/images/products/croissant.jpg",
        },
        {
          id: 4,
          name: "Tiramisu",
          price: 18,
          label: "Staff Pick",
          image: "/images/products/tiramisu.jpg",
        },
      ];

          const bakeryImage =
            "/images/banners/birthday-banner.jpg";

          /* =====================================================
            HELPERS
          ===================================================== */

          const formatPrice = (price) => {
            return `$${Number(price).toFixed(2)}`;
          };

          /* =====================================================
            CART ICON
          ===================================================== */

          function CartIcon() {
            return (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6" />
                <circle cx="10" cy="20" r="1.2" />
                <circle cx="18" cy="20" r="1.2" />
              </svg>
            );
          }

          /* =====================================================
            HOME
          ===================================================== */

          const Home = () => {
            const [currentSlide, setCurrentSlide] =
              useState(0);

            const [favorites, setFavorites] =
              useState([]);

            /* AUTO SLIDER */

            useEffect(() => {
              const interval = setInterval(() => {
                setCurrentSlide((prev) =>
                  prev === heroSlides.length - 1
                    ? 0
                    : prev + 1
                );
              }, 4500);

              return () => clearInterval(interval);
            }, []);

            const currentHero =
              heroSlides[currentSlide];

            const nextSlide = () => {
              setCurrentSlide((prev) =>
                prev === heroSlides.length - 1
                  ? 0
                  : prev + 1
              );
            };

            const previousSlide = () => {
              setCurrentSlide((prev) =>
                prev === 0
                  ? heroSlides.length - 1
                  : prev - 1
              );
            };

            const toggleFavorite = (id) => {
              setFavorites((prev) =>
                prev.includes(id)
                  ? prev.filter(
                      (item) => item !== id
                    )
                  : [...prev, id]
              );
            };

            return (
              <main className="sugar-muse-page">

                {/* =================================================
                    HERO
                ================================================== */}

                <section className="hero-section">

                  {/* LEFT CONTENT */}

                  <div className="hero-text">

                    <span className="hero-eyebrow">
                      {currentHero.eyebrow}
                    </span>

                    <h1>
                      {currentHero.title}
                    </h1>

                    <p>
                      {currentHero.description}
                    </p>

                    <div className="hero-actions">

                      <a
                        href="/products"
                        className="primary-button"
                      >
                        Shop Now
                        <span>→</span>
                      </a>

                      <a
                        href="#custom-cakes"
                        className="outline-button"
                      >
                        Custom Cakes
                      </a>

                    </div>

                    {/* SLIDER DOTS */}

                    <div className="hero-dots">

                      {heroSlides.map(
                        (slide, index) => (
                          <button
                            key={slide.id}
                            type="button"
                            className={`hero-dot ${
                              currentSlide === index
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              setCurrentSlide(index)
                            }
                            aria-label={`Slide ${
                              index + 1
                            }`}
                          />
                        )
                      )}

                    </div>

                  </div>

                  {/* RIGHT IMAGE */}

                  <div className="hero-visual">

                    {heroSlides.map(
                      (slide, index) => (
                        <div
                          key={slide.id}
                          className={`hero-slide ${
                            currentSlide === index
                              ? "active"
                              : ""
                          }`}
                        >
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="hero-image"
                          />
                        </div>
                      )
                    )}

                    <button
                      type="button"
                      className="hero-arrow hero-arrow-left"
                      onClick={previousSlide}
                      aria-label="Previous slide"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      className="hero-arrow hero-arrow-right"
                      onClick={nextSlide}
                      aria-label="Next slide"
                    >
                      ›
                    </button>

                  </div>

                </section>

                {/* =================================================
                    BENEFITS
                ================================================== */}

                <section className="benefit-strip">

                  <div className="benefit-item">

                    <span className="benefit-icon">
                      🌿
                    </span>

                    <div>
                      <h4>
                        Quality Ingredients
                      </h4>

                      <p>
                        Fresh & carefully selected
                      </p>
                    </div>

                  </div>

                  <div className="benefit-item">

                    <span className="benefit-icon">
                      ♨
                    </span>

                    <div>
                      <h4>
                        Handmade Daily
                      </h4>

                      <p>
                        Baked with love every day
                      </p>
                    </div>

                  </div>

                  <div className="benefit-item">

                    <span className="benefit-icon">
                      🎁
                    </span>

                    <div>
                      <h4>
                        Perfect for Any Occasion
                      </h4>

                      <p>
                        Birthdays, celebrations & more
                      </p>
                    </div>

                  </div>

                  <div className="benefit-item">

                    <span className="benefit-icon">
                      🚚
                    </span>

                    <div>
                      <h4>
                        Fast & Reliable Delivery
                      </h4>

                      <p>
                        Fresh to your doorstep
                      </p>
                    </div>

                  </div>

                </section>

                {/* =================================================
                    CATEGORY
                ================================================== */}

                <section className="home-section category-section">

                  <div className="section-heading">

                    <span className="heading-line" />

                    <h2>
                      Shop by Category
                    </h2>

                    <span className="heading-line" />

                  </div>

                  <div className="category-grid">

                    {categories.map(
                      (category) => (
                        <a
                          href={category.link}
                          key={category.id}
                          className="category-card"
                        >

                          <div className="category-image-wrap">

                            <img
                              src={category.image}
                              alt={category.name}
                            />

                          </div>

                          <div className="category-bottom">

                            <h3>
                              {category.name}
                            </h3>

                            <span>
                              →
                            </span>

                          </div>

                        </a>
                      )
                    )}

                  </div>

                </section>

                {/* =================================================
                    BEST SELLERS
                ================================================== */}

                <section
                  className="home-section best-section"
                  id="best-sellers"
                >

                  <div className="section-heading">

                    <span className="heading-line" />

                    <div>

                      <span className="mini-heading">
                        CUSTOMER FAVORITES
                      </span>

                      <h2>
                        Our Best Sellers
                      </h2>

                    </div>

                    <span className="heading-line" />

                  </div>

                  <div className="product-grid">

                    {bestSellers.map(
                      (product) => {
                        const liked =
                          favorites.includes(
                            product.id
                          );

                        return (
                          <article
                            className="product-card"
                            key={product.id}
                          >

                            {/* IMAGE */}

                            <div className="product-image-wrap">

                              <img
                                src={product.image}
                                alt={product.name}
                              />

                              <span className="product-label">
                                {product.label}
                              </span>

                              <button
                                type="button"
                                className={`favorite-button ${
                                  liked
                                    ? "liked"
                                    : ""
                                }`}
                                onClick={() =>
                                  toggleFavorite(
                                    product.id
                                  )
                                }
                                aria-label="Favorite"
                              >
                                {liked
                                  ? "♥"
                                  : "♡"}
                              </button>

                            </div>

                            {/* PRODUCT INFO */}

                            <div className="product-content">

                              <div>

                                <h3>
                                  {product.name}
                                </h3>

                                <p>
                                  {formatPrice(
                                    product.price
                                  )}
                                </p>

                              </div>

                              <button
                                type="button"
                                className="product-cart-button"
                                aria-label="Add to cart"
                              >
                                <CartIcon />
                              </button>

                            </div>

                          </article>
                        );
                      }
                    )}

                  </div>

                </section>

                {/* =================================================
                    CUSTOM CAKES
                ================================================== */}

                <section
                  className="custom-cake-section"
                  id="custom-cakes"
                >

                  <div className="custom-cake-image">

                    <img
                      src="/images/products/custom-bakery.jpg"
                      alt="Custom strawberry cake"
                    />

                  </div>

                  <div className="custom-cake-content">

                    <span className="mini-heading">
                      CUSTOM CAKES
                    </span>

                    <h2>
                      Create Your
                      <br />
                      Dream Cake
                    </h2>

                    <p>
                      Personalized cakes for your
                      special moments, made just the
                      way you imagine.
                    </p>

                    <a
                      href="/products"
                      className="primary-button"
                    >
                      Design Your Cake
                      <span>→</span>
                    </a>

                  </div>

                  <div className="custom-decoration">
                    ♡
                  </div>

                </section>

                {/* =================================================
                    OUR BAKERY
                ================================================== */}

                <section
                  className="story-section"
                  id="our-bakery"
                >

                  <div className="story-image">

                    <img
                      src="/images/products/our-bakery-section.jpg"
                      alt="Sugar Muse bakery"
                    />

                  </div>

                  <div className="story-content">

                    <span className="mini-heading">
                      OUR BAKERY
                    </span>

                    <h2>
                      Baked Fresh Every Morning
                    </h2>

                    <p>
                      Every cake and pastry at Sugar
                      Muse is made in small batches
                      with quality ingredients, so
                      each bite tastes as good as it
                      looks.
                    </p>

                    <a
                      href="/products"
                      className="story-link"
                    >
                      Explore Our Bakes
                      <span>→</span>
                    </a>

                  </div>

                </section>

                {/* =================================================
                    FOOTER
                ================================================== */}

                <footer
                  className="footer"
                  id="footer"
                >

                  <div className="footer-wave" />

                  <div className="footer-main">

                    {/* BRAND */}

                    <div className="footer-brand">

                      <div className="footer-brand-name">

                        <span className="footer-bow">
                          ♡
                        </span>

                        <div>

                          <h2>
                            Sugar Muse
                          </h2>

                          <small>
                            BAKERY
                          </small>

                        </div>

                      </div>

                      <p>
                        Freshly baked, always with love ♡
                      </p>

                    </div>

                    {/* SHOP */}

                    <div className="footer-column">

                      <h4>
                        Shop
                      </h4>

                      <a href="/products?category=Cake">
                        Cakes
                      </a>

                      <a href="/products?category=Pastry">
                        Pastries
                      </a>

                      <a href="/products?category=Savory">
                        Savory
                      </a>

                      <a href="/products?category=Gift Box">
                        Gift Boxes
                      </a>

                    </div>

                    {/* COMPANY */}

                    <div className="footer-column">

                      <h4>
                        Company
                      </h4>

                      <a href="#our-bakery">
                        Our Bakery
                      </a>

                      <a href="#footer">
                        Contact
                      </a>

                      <a href="#footer">
                        FAQs
                      </a>

                    </div>

                    {/* SOCIAL */}

                    <div className="footer-column">

                      <h4>
                        Follow Us
                      </h4>

                      <div className="social-links">

                        <a href="#footer">
                          IG
                        </a>

                        <a href="#footer">
                          f
                        </a>

                        <a href="#footer">
                          ♪
                        </a>

                        <a href="#footer">
                          ▶
                        </a>

                      </div>

                    </div>

                  </div>

                  <div className="footer-bottom">
                    © 2026 Sugar Muse Bakery.
                    All rights reserved.
                  </div>

                </footer>

              </main>
            );
          };

          export default Home;
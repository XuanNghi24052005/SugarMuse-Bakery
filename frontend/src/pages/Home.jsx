import React from "react";
import "../pageStyles/Home.css";

const categories = [
    {
        name: "Cakes",
        icon: "🎂",
        className: "category-pink",
        link: "/products?category=Cake",
    },
    {
        name: "Pastries",
        icon: "🥐",
        className: "category-yellow",
        link: "/products?category=Pastry",
    },
    {
        name: "Savory",
        icon: "🥧",
        className: "category-green",
        link: "/products?category=Savory",
    },
    {
        name: "Combos",
        icon: "🎁",
        className: "category-purple",
        link: "/products?category=Combo",
    },
];

const bestSellers = [
    {
        id: 1,
        name: "Chocolate Cake",
        price: 350000,
        image: "/images/products/chocolate-cake.jpg",
    },
    {
        id: 2,
        name: "Strawberry Cake",
        price: 320000,
        image: "/images/products/strawberry-cake.jpg",
    },
    {
        id: 3,
        name: "Croissant",
        price: 45000,
        image: "/images/products/croissant.jpg",
    },
    {
        id: 4,
        name: "Tiramisu",
        price: 180000,
        image: "/images/products/tiramisu.jpg",
    },
];

const freshProducts = [
    {
        id: 1,
        name: "Cookies",
        image: "/images/products/cookies.jpg",
    },
    {
        id: 2,
        name: "Cupcake",
        image: "/images/products/cupcake.jpg",
    },
    {
        id: 3,
        name: "Fruit Tart",
        image: "/images/products/fruit-tart.jpg",
    },
    {
        id: 4,
        name: "Cinnamon Roll",
        image: "/images/products/cinnamon-roll.jpg",
    },
];

const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
};

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.7-3.7" />
        </svg>
    );
}

function CartIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6" />
            <circle cx="10" cy="20" r="1.2" />
            <circle cx="18" cy="20" r="1.2" />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="21"
            height="21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
        </svg>
    );
}

const Home = () => {
    return (
        <div className="sugar-muse-page">

            {/* =========================
                DECORATIVE STRIP
            ========================== */}
            <div className="bakery-awning" />

            {/* =========================
                NAVBAR
            ========================== */}
            <header className="main-header">
                <a href="/" className="brand">
                    <div className="brand-icon">🎂</div>

                    <div className="brand-text">
                        <span>Sugar Muse</span>
                        <small>BAKERY</small>
                    </div>
                </a>

                <nav className="main-nav">
                    <a href="/" className="nav-item active">
                        <span className="nav-icon">⌂</span>
                        Home
                    </a>

                    <a
                        href="/products?category=Cake"
                        className="nav-item"
                    >
                        <span className="nav-icon">🎂</span>
                        Cakes
                    </a>

                    <a
                        href="/products?category=Pastry"
                        className="nav-item"
                    >
                        <span className="nav-icon">🥐</span>
                        Pastries
                    </a>

                    <a
                        href="/products?category=Savory"
                        className="nav-item"
                    >
                        <span className="nav-icon">🥧</span>
                        Savory
                    </a>

                    <a
                        href="/products?category=Combo"
                        className="nav-item"
                    >
                        <span className="nav-icon">🎁</span>
                        Combos
                    </a>

                    <span className="nav-divider" />

                    <a href="#about" className="nav-simple">
                        About
                    </a>

                    <a href="#footer" className="nav-simple">
                        Contact
                    </a>
                </nav>

                <div className="nav-actions">
                    <button
                        type="button"
                        className="nav-action-btn"
                        aria-label="Search"
                    >
                        <SearchIcon />
                    </button>

                    <a
                        href="/cart"
                        className="nav-action-btn cart-button"
                        aria-label="Cart"
                    >
                        <CartIcon />

                        <span className="cart-count">
                            2
                        </span>
                    </a>

                    <a
                        href="/login"
                        className="nav-action-btn"
                        aria-label="Account"
                    >
                        <UserIcon />
                    </a>
                </div>
            </header>

            {/* =========================
                HERO
            ========================== */}
            <section className="hero-section">
                <div className="hero-content">

                    <div className="hero-label">
                        FRESHLY BAKED · EVERY DAY
                    </div>

                    <h1>
                        Sweet moments,
                        <br />
                        made from scratch.
                    </h1>

                    <p>
                        Handcrafted cakes, pastries and savory treats
                        made fresh with carefully selected ingredients.
                    </p>

                    <div className="hero-buttons">
                        <a
                            href="/products?category=Cake"
                            className="hero-btn primary"
                        >
                            <span>🛒</span>
                            Shop Cakes
                        </a>

                        <a
                            href="#categories"
                            className="hero-btn secondary"
                        >
                            <span>▤</span>
                            Explore Menu
                        </a>
                    </div>

                    <div className="hero-dots">
                        <span className="dot active" />
                        <span className="dot" />
                        <span className="dot" />
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <img
                        src="/images/hero/hero-strawberry-cake.jpg"
                        alt="Sugar Muse strawberry cake"
                        className="hero-image"
                    />

                    <span className="hero-heart">
                        ♡
                    </span>
                </div>
            </section>

            {/* =========================
                CATEGORY
            ========================== */}
            <section
                className="section category-section"
                id="categories"
            >
                <div className="section-title">
                    <span className="title-line" />
                    <h2>Shop by Category</h2>
                    <span className="title-line" />
                </div>

                <div className="category-grid">
                    {categories.map((category) => (
                        <a
                            href={category.link}
                            key={category.name}
                            className={`category-card ${category.className}`}
                        >
                            <span className="category-icon">
                                {category.icon}
                            </span>

                            <span className="category-name">
                                {category.name}
                            </span>
                        </a>
                    ))}
                </div>
            </section>

            {/* =========================
                BEST SELLERS
            ========================== */}
            <section className="section best-seller-section">
                <div className="section-title">
                    <span className="title-decoration">
                        ❧
                    </span>

                    <h2>Our Best Sellers</h2>

                    <span className="title-decoration right">
                        ❧
                    </span>
                </div>

                <div className="product-grid">
                    {bestSellers.map((product) => (
                        <article
                            className="product-card"
                            key={product.id}
                        >
                            <div className="product-image-wrapper">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />

                                <button
                                    className="favorite-button"
                                    type="button"
                                    aria-label="Add to favourites"
                                >
                                    <HeartIcon />
                                </button>
                            </div>

                            <div className="product-info">
                                <div>
                                    <h3>{product.name}</h3>

                                    <p>
                                        {formatPrice(product.price)}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="small-cart-button"
                                    aria-label={`Add ${product.name} to cart`}
                                >
                                    <CartIcon />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* =========================
                PROMO BANNER
            ========================== */}
            <section className="promo-section">
                <img
                    src="/images/banners/birthday-banner.jpg"
                    alt="Birthday celebration cake"
                />

                <div className="promo-overlay" />

                <div className="promo-content">
                    <span>
                        BAKED FOR YOUR
                    </span>

                    <h2>
                        Special Moments
                    </h2>

                    <p>
                        Birthday cakes, celebration boxes
                        <br />
                        and handcrafted treats for every occasion.
                    </p>

                    <a href="/products" className="promo-btn">
                        Order Now
                        <span>→</span>
                    </a>
                </div>
            </section>

            {/* =========================
                FRESH FROM OVEN
            ========================== */}
            <section className="section fresh-section">
                <div className="section-title">
                    <span className="title-line" />

                    <h2>
                        <span className="chef-icon">
                            ♨
                        </span>
                        Fresh From The Oven
                    </h2>

                    <span className="title-line" />
                </div>

                <p className="section-subtitle">
                    Newly baked pastries and treats,
                    prepared fresh every morning.
                </p>

                <div className="fresh-grid">
                    {freshProducts.map((product) => (
                        <a
                            href="/products"
                            className="fresh-card"
                            key={product.id}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <h3>
                                {product.name}
                            </h3>
                        </a>
                    ))}
                </div>
            </section>

            {/* =========================
                ABOUT
            ========================== */}
            <section className="about-section" id="about">
                <div className="about-intro">
                    <div className="about-illustration">
                        ♡
                    </div>

                    <div>
                        <h2>
                            About Sugar Muse
                        </h2>

                        <p>
                            A bakery where every treat is crafted
                            with passion, quality ingredients and
                            a little extra love.
                        </p>
                    </div>
                </div>

                <div className="about-features">
                    <div className="feature">
                        <span>🌿</span>
                        <p>
                            Fresh
                            <br />
                            Ingredients
                        </p>
                    </div>

                    <div className="feature">
                        <span>👩‍🍳</span>
                        <p>
                            Handcrafted
                            <br />
                            Daily
                        </p>
                    </div>

                    <div className="feature">
                        <span>♡</span>
                        <p>
                            Made
                            <br />
                            with Love
                        </p>
                    </div>
                </div>
            </section>

            {/* =========================
                FOOTER
            ========================== */}
            <footer className="footer" id="footer">
                <div className="footer-main">

                    <div className="footer-brand">
                        <div className="footer-logo-row">
                            <span className="footer-logo-icon">
                                🎂
                            </span>

                            <div>
                                <h2>
                                    Sugar Muse
                                </h2>

                                <span>
                                    BAKERY
                                </span>
                            </div>
                        </div>

                        <p>
                            Freshly baked with love. ♡
                        </p>
                    </div>

                    <div className="footer-column">
                        <h3>Shop</h3>
                        <a href="/products?category=Cake">
                            Cakes
                        </a>
                        <a href="/products?category=Pastry">
                            Pastries
                        </a>
                        <a href="/products?category=Savory">
                            Savory
                        </a>
                        <a href="/products?category=Combo">
                            Combos
                        </a>
                    </div>

                    <div className="footer-column">
                        <h3>Help</h3>
                        <a href="#footer">FAQs</a>
                        <a href="#footer">Delivery</a>
                        <a href="#footer">
                            Return & Refund
                        </a>
                        <a href="#footer">
                            Contact Us
                        </a>
                    </div>

                    <div className="footer-column">
                        <h3>Follow Us</h3>

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
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    © 2026 Sugar Muse Bakery.
                    All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
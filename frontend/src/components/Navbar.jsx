import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cartcontext";
import "../pageStyles/Navbar.css";

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.2-6 8-6s6.5 2 8 6" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 7h15l-2 8H8L6 3H3" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </svg>
);

const ChevronDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m7 10 5 5 5-5" />
  </svg>
);

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <>
      <div className="announcement-bar">
        <span>Freshly baked every day</span>

        <span className="announcement-divider" />

        <span>Made with a little love ♡</span>

        <span className="announcement-divider" />

        <span>Pickup & delivery available</span>
      </div>

      <header className="main-header">
        <Link to="/" className="brand">
          <span className="brand-symbol">♡</span>

          <div className="brand-text">
            <span>Sugar Muse</span>
            <small>BAKERY</small>
          </div>
        </Link>

        <nav className="main-nav">
          <Link to="/" className="nav-link">
            HOME
          </Link>

          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-link dropdown-trigger"
            >
              SHOP
              <ChevronDown />
            </button>

            <div className="dropdown-menu">
              <Link to="/products">
                All Products
              </Link>

              <Link to="/products?category=Cake">
                Cakes
              </Link>

              <Link to="/products?category=Pastry">
                Pastries
              </Link>

              <Link to="/products?category=Savory">
                Savory
              </Link>

              <Link to="/products?category=Gift Box">
                Gift Boxes
              </Link>
            </div>
          </div>

          <Link
            to="/new-collection"
            className="nav-link"
          >
            NEW COLLECTION
          </Link>

          <Link
            to="/custom-cakes"
            className="nav-link"
          >
            CUSTOM CAKES
          </Link>

          <Link
            to="/contact"
            className="nav-link"
          >
            CONTACT
          </Link>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-icon-button"
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          <Link
            to="/login"
            className="nav-icon-button"
            aria-label="Account"
          >
            <UserIcon />
          </Link>

          <Link
            to="/cart"
            className="nav-icon-button"
            aria-label="Shopping cart"
          >
            <CartIcon />

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
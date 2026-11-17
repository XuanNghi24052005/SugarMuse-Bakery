import React from "react";
import { Link } from "react-router-dom";

import "../componentStyles/Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="sugar-topbar">
        <span>
          ♡ Free delivery on orders from 500.000đ
        </span>

        <span className="topbar-divider" />

        <span>
          ✦ 10% off your first custom cake order
        </span>
      </div>

      <header className="sugar-navbar">
        <Link
          to="/"
          className="sugar-brand"
        >
          <div className="brand-heart">
            ♡
          </div>

          <div className="brand-copy">
            <span>
              Sugar Muse
            </span>

            <small>
              BAKERY
            </small>
          </div>
        </Link>

        <nav className="sugar-nav-menu">
          <Link
            to="/"
            className="sugar-nav-link"
          >
            HOME
          </Link>

          <div className="sugar-dropdown">
            <button
              type="button"
              className="sugar-nav-link"
            >
              SHOP

              <span className="dropdown-arrow">
                ⌄
              </span>
            </button>

            <div className="sugar-dropdown-menu">
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
            to="/#custom-cakes"
            className="sugar-nav-link"
          >
            CUSTOM CAKES
          </Link>

          <Link
            to="/new-collection"
            className="sugar-nav-link"
          >
            NEW COLLECTION
          </Link>
       

          <Link
            to="/contact"
            className="sugar-nav-link"
          >
            CONTACT
          </Link>
          </nav>

        <div className="sugar-nav-actions">
          <button
            type="button"
            className="sugar-icon-button"
            aria-label="Search"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="m20 20-3.8-3.8" />
            </svg>
          </button>

          <Link
            to="/login"
            className="sugar-icon-button"
            aria-label="Account"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle
                cx="12"
                cy="8"
                r="4"
              />

              <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
            </svg>
          </Link>

          <Link
            to="/cart"
            className="sugar-icon-button cart-icon"
            aria-label="Cart"
          >
            <svg
              viewBox="0 0 24 24"
              width="23"
              height="23"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6" />

              <circle
                cx="10"
                cy="20"
                r="1.2"
              />

              <circle
                cx="18"
                cy="20"
                r="1.2"
              />
            </svg>

            <span className="cart-number">
              2
            </span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
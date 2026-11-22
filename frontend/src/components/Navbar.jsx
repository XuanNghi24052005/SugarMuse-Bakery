import React, { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useCart,
} from "../Context/Cartcontext";

import {
  useWishlist,
} from "../Context/Wishlistcontext";

import {
  useAuth,
} from "../Context/Authcontext";

import "../pageStyles/Navbar.css";

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
    />

    <path d="m20 20-3.5-3.5" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="8"
      r="4"
    />

    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </svg>
);

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle
      cx="9"
      cy="20"
      r="1"
    />

    <circle
      cx="18"
      cy="20"
      r="1"
    />

    <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 7H6" />
  </svg>
);

const Navbar = () => {
  const {
    cartCount,
  } = useCart();

  const {
    wishlistCount,
  } = useWishlist();

  const {
    isAuthenticated,
  } = useAuth();

  const navigate =
    useNavigate();

  const [
    searchValue,
    setSearchValue,
  ] = useState("");

  const handleSearch = (
    event
  ) => {
    event.preventDefault();

    const keyword =
      searchValue.trim();

    if (!keyword) {
      navigate("/products");
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(
        keyword
      )}`
    );
  };

  return (
    <header className="main-header">
      <Link
        to="/"
        className="brand"
      >
        <span className="brand-symbol">
          ♡
        </span>

        <span className="brand-text">
          <span>
            Sugar Muse
          </span>

          <small>
            BAKERY
          </small>
        </span>
      </Link>

      <nav className="main-nav">
        <Link
          to="/"
          className="nav-link"
        >
          HOME
        </Link>

        <Link
          to="/products"
          className="nav-link"
        >
          SHOP
        </Link>

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

      <div className="nav-right">
        <form
          className="navbar-inline-search"
          onSubmit={
            handleSearch
          }
        >
          <SearchIcon />

          <input
            type="text"
            placeholder="Search cakes, pastries..."
            value={
              searchValue
            }
            onChange={(
              event
            ) =>
              setSearchValue(
                event.target.value
              )
            }
          />

          {searchValue && (
            <button
              type="submit"
              className="navbar-search-go"
            >
              Search
            </button>
          )}
        </form>

        <div className="nav-actions">
          <Link
            to={
              isAuthenticated
                ? "/account"
                : "/login"
            }
            className="nav-icon-button"
            aria-label={
              isAuthenticated
                ? "My account"
                : "Sign in"
            }
          >
            <UserIcon />
          </Link>

          <Link
            to="/wishlist"
            className="nav-icon-button"
            aria-label="Wishlist"
          >
            <HeartIcon />

            {wishlistCount > 0 && (
              <span className="cart-badge">
                {
                  wishlistCount
                }
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="nav-icon-button"
            aria-label="Shopping cart"
          >
            <CartIcon />

            {cartCount > 0 && (
              <span className="cart-badge">
                {
                  cartCount
                }
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
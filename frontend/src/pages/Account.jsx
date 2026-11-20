import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../Context/Authcontext";

import "../pageStyles/Account.css";

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
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </svg>
);

const OrderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m4 7 8-4 8 4-8 4-8-4Z" />
    <path d="M4 7v10l8 4 8-4V7" />
    <path d="M12 11v10" />
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

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 17l5-5-5-5" />
    <path d="M15 12H3" />
    <path d="M14 3h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6" />
  </svg>
);

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 7h3l1.5-2h7L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const Account = () => {
  const {
    user,
    isAuthenticated,
    logout,
    updateUser,
  } = useAuth();

  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState("profile");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  }, [
    isAuthenticated,
    user,
    navigate,
  ]);

  if (!isAuthenticated) {
    return null;
  }

  const displayName =
    user?.fullName || "Muse";

  const firstLetter =
    displayName
      .trim()
      .charAt(0)
      .toUpperCase() || "M";

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    updateUser(formData);
  };

  const handleCancel = () => {
    setFormData({
      fullName:
        user?.fullName || "",
      email:
        user?.email || "",
      phone:
        user?.phone || "",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="account-page">
      <section className="account-hero">
        <div className="account-hero-image">
          <img
            src="/images/products/peach-cake.jpg"
            alt="Sugar Muse peach cake"
          />
        </div>

        <div className="account-hero-overlay" />

        <div className="account-hero-content">
          <span>
            MY ACCOUNT
          </span>

          <h1>
            Hello,
            <em>
              {displayName}!
            </em>
          </h1>

          <p>
            Manage your profile, orders and favorite treats in one place.
          </p>
        </div>
      </section>

      <section className="account-layout">
        <aside className="account-sidebar">
          <div className="account-user-block">
            <div className="account-avatar">
              <span>
                {firstLetter}
              </span>

              <button
                type="button"
                aria-label="Change avatar"
              >
                <CameraIcon />
              </button>
            </div>

            <h2>
              {displayName}
            </h2>

            <p>
              {user?.email}
            </p>

            <div className="account-user-divider">
              <span />
              <HeartIcon />
              <span />
            </div>
          </div>

          <nav className="account-menu">
            <button
              type="button"
              className={
                activeSection === "profile"
                  ? "account-menu-item active"
                  : "account-menu-item"
              }
              onClick={() =>
                setActiveSection(
                  "profile"
                )
              }
            >
              <UserIcon />
              <span>
                My Profile
              </span>
            </button>

            <button
              type="button"
              className={
                activeSection === "orders"
                  ? "account-menu-item active"
                  : "account-menu-item"
              }
              onClick={() =>
                setActiveSection(
                  "orders"
                )
              }
            >
              <OrderIcon />
              <span>
                My Orders
              </span>
            </button>

            <Link
              to="/wishlist"
              className="account-menu-item"
            >
              <HeartIcon />
              <span>
                My Wishlist
              </span>
            </Link>

            <button
              type="button"
              className={
                activeSection === "addresses"
                  ? "account-menu-item active"
                  : "account-menu-item"
              }
              onClick={() =>
                setActiveSection(
                  "addresses"
                )
              }
            >
              <LocationIcon />
              <span>
                Addresses
              </span>
            </button>
          </nav>

          <div className="account-sidebar-bottom">
            <button
              type="button"
              className="account-menu-item account-logout"
              onClick={
                handleLogout
              }
            >
              <LogoutIcon />

              <span>
                Logout
              </span>
            </button>
          </div>
        </aside>

        <section className="account-main-card">
          {activeSection ===
            "profile" && (
            <>
              <div className="account-section-heading">
                <h2>
                  Personal Information
                </h2>

                <p>
                  View and update your account details.
                </p>
              </div>

              <div className="account-profile-layout">
                <div className="account-profile-visual">
                  <div className="account-profile-art">
                    <div className="account-art-shape" />

                    <img
                      src="/images/products/peach-cake.jpg"
                      alt="Peach cake"
                    />
                  </div>
                </div>

                <form
                  className="account-profile-form"
                  onSubmit={
                    handleSave
                  }
                >
                  <div className="account-field">
                    <label htmlFor="account-name">
                      Full Name
                    </label>

                    <input
                      id="account-name"
                      type="text"
                      name="fullName"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="account-field">
                    <label htmlFor="account-email">
                      Email Address
                    </label>

                    <input
                      id="account-email"
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="account-field">
                    <label htmlFor="account-phone">
                      Phone Number
                    </label>

                    <input
                      id="account-phone"
                      type="text"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="account-form-actions">
                    <button
                      type="submit"
                      className="account-save-button"
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      className="account-cancel-button"
                      onClick={
                        handleCancel
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {activeSection ===
            "orders" && (
            <div className="account-simple-section">
              <span>
                MY ORDERS
              </span>

              <h2>
                Your Orders
              </h2>

              <p>
                Your recent Sugar Muse orders will appear here.
              </p>

              <Link to="/products">
                Continue Shopping
              </Link>
            </div>
          )}

          {activeSection ===
            "addresses" && (
            <div className="account-simple-section">
              <span>
                DELIVERY DETAILS
              </span>

              <h2>
                Your Addresses
              </h2>

              <p>
                Save your delivery addresses for a faster checkout.
              </p>

              <button type="button">
                Add New Address
              </button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default Account;
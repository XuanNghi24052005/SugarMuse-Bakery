import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../Context/Cartcontext";
import { useAuth } from "../Context/Authcontext";

import "../pageStyles/Checkout.css";

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

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect
      x="5"
      y="10"
      width="14"
      height="11"
      rx="2"
    />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const CardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
    />
    <path d="M2 10h20" />
  </svg>
);

const CashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="6"
      width="18"
      height="12"
      rx="2"
    />
    <circle
      cx="12"
      cy="12"
      r="2.5"
    />
    <path d="M7 9H5v2" />
    <path d="M17 15h2v-2" />
  </svg>
);

const Checkout = () => {
  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const {
    user,
    isAuthenticated,
  } = useAuth();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("cash");

  const [submitted, setSubmitted] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      note: "",
    });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?redirect=/checkout"
      );

      return;
    }

    setFormData((current) => ({
      ...current,
      fullName:
        user?.fullName || "",
      email:
        user?.email || "",
      phone:
        user?.phone || "",
    }));
  }, [
    isAuthenticated,
    navigate,
    user,
  ]);

  const shippingFee =
    cartItems.length > 0
      ? 5
      : 0;

  const total = useMemo(
    () =>
      Number(cartTotal) +
      shippingFee,
    [
      cartTotal,
      shippingFee,
    ]
  );

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      return;
    }

    setSubmitted(true);

    localStorage.setItem(
      "sugarMuseLastOrder",
      JSON.stringify({
        customer:
          formData,
        items:
          cartItems,
        subtotal:
          cartTotal,
        shipping:
          shippingFee,
        total,
        paymentMethod,
        createdAt:
          new Date().toISOString(),
      })
    );

    clearCart();
  };

  if (!isAuthenticated) {
    return null;
  }

  if (submitted) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <div className="checkout-success-heart">
            ♡
          </div>

          <span>
            ORDER CONFIRMED
          </span>

          <h1>
            Thank You,
            <em>
              {formData.fullName}!
            </em>
          </h1>

          <p>
            Your Sugar Muse order has been received.
            We&apos;ll begin preparing your treats with
            a little extra love.
          </p>

          <div className="checkout-success-actions">
            <Link
              to="/products"
              className="checkout-primary-button"
            >
              Continue Shopping
              <ArrowIcon />
            </Link>

            <Link
              to="/account"
              className="checkout-secondary-button"
            >
              My Account
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <span>
            YOUR CART
          </span>

          <h1>
            Nothing to
            <em>
              Checkout
            </em>
          </h1>

          <p>
            Your cart is currently empty.
            Add something sweet before checking out.
          </p>

          <Link
            to="/products"
            className="checkout-primary-button"
          >
            Shop Our Bakes
            <ArrowIcon />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-heading">
        <span>
          ALMOST YOURS
        </span>

        <h1>
          Sweet
          <em>
            Checkout
          </em>
        </h1>

        <p>
          Complete your delivery details and we&apos;ll
          take care of the rest.
        </p>
      </section>

      <form
        className="checkout-layout"
        onSubmit={
          handleSubmit
        }
      >
        <div className="checkout-left">
          <section className="checkout-card">
            <div className="checkout-card-heading">
              <span className="checkout-step">
                01
              </span>

              <div>
                <h2>
                  Contact Information
                </h2>

                <p>
                  We&apos;ll use these details for your order.
                </p>
              </div>
            </div>

            <div className="checkout-fields-grid">
              <div className="checkout-field">
                <label htmlFor="checkout-name">
                  Full Name
                </label>

                <input
                  id="checkout-name"
                  type="text"
                  name="fullName"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-phone">
                  Phone Number
                </label>

                <input
                  id="checkout-phone"
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="checkout-field checkout-field-full">
                <label htmlFor="checkout-email">
                  Email Address
                </label>

                <input
                  id="checkout-email"
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>
            </div>
          </section>

          <section className="checkout-card">
            <div className="checkout-card-heading">
              <span className="checkout-step">
                02
              </span>

              <div>
                <h2>
                  Delivery Address
                </h2>

                <p>
                  Where should we send your sweet order?
                </p>
              </div>
            </div>

            <div className="checkout-fields-grid">
              <div className="checkout-field checkout-field-full">
                <label htmlFor="checkout-address">
                  Street Address
                </label>

                <input
                  id="checkout-address"
                  type="text"
                  name="address"
                  placeholder="House number, street..."
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-city">
                  City
                </label>

                <input
                  id="checkout-city"
                  type="text"
                  name="city"
                  placeholder="Ho Chi Minh City"
                  value={
                    formData.city
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-district">
                  District
                </label>

                <input
                  id="checkout-district"
                  type="text"
                  name="district"
                  placeholder="District"
                  value={
                    formData.district
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="checkout-field checkout-field-full">
                <label htmlFor="checkout-note">
                  Order Note
                </label>

                <textarea
                  id="checkout-note"
                  name="note"
                  rows="4"
                  placeholder="Delivery notes, birthday message..."
                  value={
                    formData.note
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>
            </div>
          </section>

          <section className="checkout-card">
            <div className="checkout-card-heading">
              <span className="checkout-step">
                03
              </span>

              <div>
                <h2>
                  Payment
                </h2>

                <p>
                  Choose how you&apos;d like to pay.
                </p>
              </div>
            </div>

            <div className="checkout-payment-options">
              <button
                type="button"
                className={
                  paymentMethod === "cash"
                    ? "checkout-payment active"
                    : "checkout-payment"
                }
                onClick={() =>
                  setPaymentMethod(
                    "cash"
                  )
                }
              >
                <span className="checkout-payment-icon">
                  <CashIcon />
                </span>

                <span>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <small>
                    Pay when your order arrives
                  </small>
                </span>

                <i />
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "card"
                    ? "checkout-payment active"
                    : "checkout-payment"
                }
                onClick={() =>
                  setPaymentMethod(
                    "card"
                  )
                }
              >
                <span className="checkout-payment-icon">
                  <CardIcon />
                </span>

                <span>
                  <strong>
                    Card Payment
                  </strong>

                  <small>
                    Credit or debit card
                  </small>
                </span>

                <i />
              </button>
            </div>
          </section>
        </div>

        <aside className="checkout-summary">
          <div className="checkout-summary-heading">
            <span>
              YOUR ORDER
            </span>

            <h2>
              Order Summary
            </h2>
          </div>

          <div className="checkout-summary-items">
            {cartItems.map(
              (product) => (
                <div
                  className="checkout-summary-item"
                  key={
                    product._id
                  }
                >
                  <div className="checkout-summary-image">
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                    />

                    <span>
                      {
                        product.quantity
                      }
                    </span>
                  </div>

                  <div className="checkout-summary-product">
                    <strong>
                      {
                        product.name
                      }
                    </strong>

                    <small>
                      Qty{" "}
                      {
                        product.quantity
                      }
                    </small>
                  </div>

                  <b>
                    $
                    {(
                      Number(
                        product.price
                      ) *
                      product.quantity
                    ).toFixed(2)}
                  </b>
                </div>
              )
            )}
          </div>

          <div className="checkout-summary-divider" />

          <div className="checkout-summary-row">
            <span>
              Subtotal
            </span>

            <strong>
              $
              {Number(
                cartTotal
              ).toFixed(2)}
            </strong>
          </div>

          <div className="checkout-summary-row">
            <span>
              Delivery
            </span>

            <strong>
              $
              {shippingFee.toFixed(
                2
              )}
            </strong>
          </div>

          <div className="checkout-summary-total">
            <span>
              Total
            </span>

            <strong>
              $
              {total.toFixed(
                2
              )}
            </strong>
          </div>

          <button
            type="submit"
            className="checkout-place-order"
          >
            <LockIcon />

            <span>
              Place Order
            </span>

            <ArrowIcon />
          </button>

          <div className="checkout-secure-note">
            <LockIcon />

            <span>
              Secure checkout
            </span>
          </div>

          <Link
            to="/cart"
            className="checkout-back-cart"
          >
            ← Back to Cart
          </Link>
        </aside>
      </form>
    </main>
  );
};

export default Checkout;
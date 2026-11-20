import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useAuth } from "../Context/Authcontext";

import "../pageStyles/Auth.css";

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

const EyeIcon = ({ visible }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
    <circle cx="12" cy="12" r="2.7" />

    {visible && (
      <path d="M4 4 20 20" />
    )}
  </svg>
);

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

const Auth = () => {
  const {
    login,
    register,
  } = useAuth();

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const initialMode =
    searchParams.get("mode") ===
    "signup"
      ? "signup"
      : "login";

  const [mode, setMode] =
    useState(initialMode);

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

  const redirect =
    searchParams.get("redirect") ||
    "/account";

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleModeChange = (
    nextMode
  ) => {
    setMode(nextMode);
    setError("");
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (mode === "login") {
      const result = login({
        email:
          formData.email,
        password:
          formData.password,
      });

      if (!result.success) {
        setError(
          result.message
        );

        return;
      }

      navigate(redirect);

      return;
    }

    const result = register({
      fullName:
        formData.fullName,
      email:
        formData.email,
      phone:
        formData.phone,
      password:
        formData.password,
      confirmPassword:
        formData.confirmPassword,
    });

    if (!result.success) {
      setError(
        result.message
      );

      return;
    }

    navigate(redirect);
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-visual">
          <img
            src="/images/products/peach-cake.jpg"
            alt="Sugar Muse peach cake"
          />

          <div className="auth-visual-overlay" />

          <Link
            to="/"
            className="auth-brand"
          >
            <span className="auth-brand-heart">
              ♡
            </span>

            <span className="auth-brand-copy">
              <strong>
                Sugar Muse
              </strong>

              <small>
                BAKERY
              </small>
            </span>
          </Link>

          <div className="auth-visual-content">
            <span>
              SWEET MOMENTS AWAIT
            </span>

            <h2>
              Welcome to
              <em>
                Sugar Muse
              </em>
            </h2>

            <p>
              Sign in to save your
              favorite treats, manage
              orders and make checkout
              a little sweeter.
            </p>
          </div>

          <div className="auth-floating-heart">
            <HeartIcon />
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-panel-inner">
            <div className="auth-heading">
              <span>
                {mode === "login"
                  ? "WELCOME BACK"
                  : "JOIN SUGAR MUSE"}
              </span>

              <h1>
                {mode === "login"
                  ? "Sign In"
                  : "Create Account"}
              </h1>

              <p>
                {mode === "login"
                  ? "Sign in to continue to your Sugar Muse account."
                  : "Create your account and keep all your sweet favorites in one place."}
              </p>
            </div>

            <div className="auth-tabs">
              <button
                type="button"
                className={
                  mode === "login"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleModeChange(
                    "login"
                  )
                }
              >
                Sign In
              </button>

              <button
                type="button"
                className={
                  mode === "signup"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleModeChange(
                    "signup"
                  )
                }
              >
                Create Account
              </button>
            </div>

            <form
              className="auth-form"
              onSubmit={
                handleSubmit
              }
            >
              {mode ===
                "signup" && (
                <>
                  <div className="auth-field">
                    <label htmlFor="auth-name">
                      Full Name
                    </label>

                    <input
                      id="auth-name"
                      type="text"
                      name="fullName"
                      placeholder="Your name"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="auth-field">
                    <label htmlFor="auth-phone">
                      Phone Number
                    </label>

                    <input
                      id="auth-phone"
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>
                </>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">
                  Email Address
                </label>

                <input
                  id="auth-email"
                  type="email"
                  name="email"
                  placeholder="muse@example.com"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="auth-field">
                <label htmlFor="auth-password">
                  Password
                </label>

                <div className="auth-password-field">
                  <input
                    id="auth-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                    aria-label="Show password"
                  >
                    <EyeIcon
                      visible={
                        showPassword
                      }
                    />
                  </button>
                </div>
              </div>

              {mode ===
                "signup" && (
                <div className="auth-field">
                  <label htmlFor="auth-confirm-password">
                    Confirm Password
                  </label>

                  <div className="auth-password-field">
                    <input
                      id="auth-confirm-password"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={
                        formData.confirmPassword
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) =>
                            !current
                        )
                      }
                      aria-label="Show confirm password"
                    >
                      <EyeIcon
                        visible={
                          showConfirmPassword
                        }
                      />
                    </button>
                  </div>
                </div>
              )}

              {mode ===
                "login" && (
                <div className="auth-extra-row">
                  <label>
                    <input
                      type="checkbox"
                    />

                    <span>
                      Remember me
                    </span>
                  </label>

                  <button
                    type="button"
                    className="auth-forgot"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit"
              >
                <span>
                  {mode === "login"
                    ? "Sign In"
                    : "Create Account"}
                </span>

                <ArrowIcon />
              </button>
            </form>

            <div className="auth-switch">
              <span>
                {mode === "login"
                  ? "New to Sugar Muse?"
                  : "Already have an account?"}
              </span>

              <button
                type="button"
                onClick={() =>
                  handleModeChange(
                    mode === "login"
                      ? "signup"
                      : "login"
                  )
                }
              >
                {mode === "login"
                  ? "Create Account"
                  : "Sign In"}
              </button>
            </div>

            <Link
              to="/products"
              className="auth-back-shop"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;
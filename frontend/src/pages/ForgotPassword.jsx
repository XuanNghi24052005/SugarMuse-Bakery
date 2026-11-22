import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import "../pageStyles/ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] =
    useState("email");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const handleCheckEmail = (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );

      return;
    }

    try {
      const savedAccount =
        localStorage.getItem(
          "sugarMuseAccount"
        );

      if (!savedAccount) {
        setError(
          "We couldn't find an account with this email."
        );

        return;
      }

      const account =
        JSON.parse(
          savedAccount
        );

      if (
        account.email.toLowerCase() !==
        email
          .trim()
          .toLowerCase()
      ) {
        setError(
          "We couldn't find an account with this email."
        );

        return;
      }

      setStep("reset");
    } catch {
      setError(
        "Unable to verify your account."
      );
    }
  };

  const handleResetPassword = (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please enter and confirm your new password."
      );

      return;
    }

    if (
      password.length < 6
    ) {
      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    try {
      const savedAccount =
        localStorage.getItem(
          "sugarMuseAccount"
        );

      const account =
        JSON.parse(
          savedAccount
        );

      localStorage.setItem(
        "sugarMuseAccount",
        JSON.stringify({
          ...account,
          password,
        })
      );

      setStep("success");
    } catch {
      setError(
        "Unable to reset your password."
      );
    }
  };

  return (
    <main className="forgot-page">
      <section className="forgot-card">
        <Link
          to="/"
          className="forgot-logo"
        >
          <span>
            ♡
          </span>

          <div>
            <strong>
              Sugar Muse
            </strong>

            <small>
              BAKERY
            </small>
          </div>
        </Link>

        {step === "email" && (
          <>
            <span className="forgot-eyebrow">
              ACCOUNT RECOVERY
            </span>

            <h1>
              Forgot your
              <em>
                Password?
              </em>
            </h1>

            <p className="forgot-description">
              Enter the email
              address associated
              with your Sugar Muse
              account.
            </p>

            <form
              className="forgot-form"
              onSubmit={
                handleCheckEmail
              }
            >
              <div className="forgot-field">
                <label htmlFor="forgot-email">
                  Email Address
                </label>

                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(
                    event
                  ) => {
                    setEmail(
                      event.target
                        .value
                    );

                    setError("");
                  }}
                  placeholder="muse@example.com"
                />
              </div>

              {error && (
                <div className="forgot-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="forgot-primary"
              >
                Continue →
              </button>
            </form>
          </>
        )}

        {step === "reset" && (
          <>
            <span className="forgot-eyebrow">
              CREATE NEW PASSWORD
            </span>

            <h1>
              Reset
              <em>
                Password
              </em>
            </h1>

            <p className="forgot-description">
              Create a new password
              for{" "}
              <strong>
                {email}
              </strong>
              .
            </p>

            <form
              className="forgot-form"
              onSubmit={
                handleResetPassword
              }
            >
              <div className="forgot-field">
                <label htmlFor="new-password">
                  New Password
                </label>

                <input
                  id="new-password"
                  type="password"
                  value={
                    password
                  }
                  onChange={(
                    event
                  ) => {
                    setPassword(
                      event.target
                        .value
                    );

                    setError("");
                  }}
                  placeholder="Enter new password"
                />
              </div>

              <div className="forgot-field">
                <label htmlFor="confirm-new-password">
                  Confirm Password
                </label>

                <input
                  id="confirm-new-password"
                  type="password"
                  value={
                    confirmPassword
                  }
                  onChange={(
                    event
                  ) => {
                    setConfirmPassword(
                      event.target
                        .value
                    );

                    setError("");
                  }}
                  placeholder="Confirm new password"
                />
              </div>

              {error && (
                <div className="forgot-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="forgot-primary"
              >
                Reset Password
              </button>
            </form>
          </>
        )}

        {step === "success" && (
          <div className="forgot-success">
            <div className="forgot-success-icon">
              ✓
            </div>

            <span className="forgot-eyebrow">
              PASSWORD UPDATED
            </span>

            <h1>
              All
              <em>
                Set!
              </em>
            </h1>

            <p>
              Your password has
              been changed
              successfully.
            </p>

            <button
              type="button"
              className="forgot-primary"
              onClick={() =>
                navigate(
                  "/login"
                )
              }
            >
              Back to Sign In →
            </button>
          </div>
        )}

        {step !== "success" && (
          <Link
            to="/login"
            className="forgot-back"
          >
            ← Back to Sign In
          </Link>
        )}
      </section>
    </main>
  );
};

export default ForgotPassword;
import React, { useState, useMemo } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../Context/Cartcontext";
import { useAuth } from "../Context/Authcontext";
import axiosInstance from "../utils/axiosInstance";

const Cart = () => {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const {
    isAuthenticated,
  } = useAuth();

  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("appliedCoupon")) || null;
    } catch {
      return null;
    }
  });

  const subtotal = Number(cartTotal) || 0;

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percent") {
      return Number(((subtotal * appliedCoupon.value) / 100).toFixed(2));
    }
    if (appliedCoupon.type === "fixed") {
      return Math.min(subtotal, Number(appliedCoupon.value) || 0);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const finalTotal = useMemo(
    () => Math.max(0, subtotal - discountAmount),
    [subtotal, discountAmount]
  );

  const handleApplyCoupon = async (e) => {
    if (e) e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    setCouponLoading(true);
    setCouponError("");

    try {
      const { data } = await axiosInstance.post("/api/v1/coupon/apply", {
        code,
        subTotal: subtotal,
      });

      if (data.success && data.coupon) {
        const cp = {
          code: data.coupon.code,
          type: data.coupon.discountType,
          value: data.coupon.value,
          label: data.coupon.label,
        };
        setAppliedCoupon(cp);
        sessionStorage.setItem("appliedCoupon", JSON.stringify(cp));
        setCouponCode("");
        setCouponError("");
      }
    } catch (err) {
      setCouponError(err.response?.data?.message || "Invalid coupon code.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    sessionStorage.removeItem("appliedCoupon");
    setCouponError("");
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <main
        style={{
          width: "100%",
          minHeight: "70vh",
          padding: "70px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffaf6",
          color: "#57231c",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "12px",
            color: "#c95f5c",
            fontSize: "48px",
          }}
        >
          ♡
        </div>

        <h1
          style={{
            margin: "0 0 10px",
            fontFamily: '"DM Serif Display", serif',
            fontSize: "42px",
            fontWeight: "400",
          }}
        >
          Your Cart
        </h1>

        <p
          style={{
            margin: "0 0 25px",
            color: "#785247",
            fontSize: "14px",
          }}
        >
          Your cart is empty. Add something sweet to get started.
        </p>

        <Link
          to="/products"
          style={{
            minHeight: "46px",
            padding: "0 24px",
            borderRadius: "25px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#c95f5c",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: "800",
            textDecoration: "none",
          }}
        >
          Continue Shopping →
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "60px 0 90px",
        background: "#fffaf6",
        color: "#57231c",
      }}
    >
      <section
        style={{
          width: "min(1180px, calc(100% - 80px))",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "35px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "#c95f5c",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "3px",
            }}
          >
            YOUR SWEET PICKS
          </span>

          <h1
            style={{
              margin: "7px 0 8px",
              fontFamily: '"DM Serif Display", serif',
              fontSize: "48px",
              fontWeight: "400",
            }}
          >
            Shopping Cart
          </h1>

          <p
            style={{
              margin: "0",
              color: "#785247",
              fontSize: "14px",
            }}
          >
            Review your treats before checking out.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 330px",
            gap: "35px",
            alignItems: "start",
          }}
        >
          <div>
            {cartItems.map((item, index) => (
              <article
                key={item._id || item.id || item.name || index}
                style={{
                  marginBottom: "18px",
                  padding: "18px",
                  display: "grid",
                  gridTemplateColumns: "130px minmax(0, 1fr) auto",
                  gap: "22px",
                  alignItems: "center",
                  borderRadius: "22px",
                  background: "#ffffff",
                  boxShadow: "0 8px 26px rgba(94, 45, 34, 0.08)",
                }}
              >
                <div
                  style={{
                    width: "130px",
                    height: "115px",
                    overflow: "hidden",
                    borderRadius: "18px",
                    background: "#f8e1dc",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div>
                  <h3
                    style={{
                      margin: "0 0 7px",
                      fontFamily: '"DM Serif Display", serif',
                      fontSize: "21px",
                      fontWeight: "400",
                    }}
                  >
                    {item.name}
                  </h3>

                  <strong
                    style={{
                      display: "block",
                      marginBottom: "15px",
                      color: "#a84645",
                      fontSize: "14px",
                    }}
                  >
                    ${Number(item.price).toFixed(2)}
                  </strong>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "13px",
                      padding: "4px",
                      border: "1px solid #ead4ce",
                      borderRadius: "25px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "none",
                        borderRadius: "50%",
                        background: "#f9e3df",
                        color: "#57231c",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>

                    <span
                      style={{
                        minWidth: "18px",
                        textAlign: "center",
                        fontSize: "13px",
                        fontWeight: "800",
                      }}
                    >
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "none",
                        borderRadius: "50%",
                        background: "#f9e3df",
                        color: "#57231c",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    minWidth: "110px",
                    textAlign: "right",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      marginBottom: "15px",
                      fontFamily: '"DM Serif Display", serif',
                      fontSize: "19px",
                      fontWeight: "400",
                    }}
                  >
                    $
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                    style={{
                      padding: "0",
                      border: "none",
                      borderBottom: "1px solid #c95f5c",
                      background: "transparent",
                      color: "#c95f5c",
                      fontSize: "11px",
                      fontWeight: "800",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}

            <div
              style={{
                marginTop: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <Link
                to="/products"
                style={{
                  color: "#a84645",
                  fontSize: "12px",
                  fontWeight: "800",
                  textDecoration: "none",
                }}
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                onClick={clearCart}
                style={{
                  padding: "0",
                  border: "none",
                  borderBottom: "1px solid #b68c83",
                  background: "transparent",
                  color: "#8c6860",
                  fontSize: "11px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          <aside
            style={{
              padding: "28px",
              borderRadius: "24px",
              background: "#fae7e2",
              position: "sticky",
              top: "110px",
            }}
          >
            <span
              style={{
                color: "#a84645",
                fontSize: "9px",
                fontWeight: "900",
                letterSpacing: "2.5px",
              }}
            >
              ORDER SUMMARY
            </span>

            <h2
              style={{
                margin: "8px 0 25px",
                fontFamily: '"DM Serif Display", serif',
                fontSize: "30px",
                fontWeight: "400",
              }}
            >
              Your Order
            </h2>

            {/* Voucher Box */}
            {!appliedCoupon ? (
              <div style={{ margin: "0 0 20px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    placeholder="Voucher Code..."
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleApplyCoupon(e);
                      }
                    }}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      height: "40px",
                      padding: "0 14px",
                      border: "1px solid #e3beb5",
                      borderRadius: "20px",
                      background: "#ffffff",
                      color: "#57231c",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                    style={{
                      height: "40px",
                      padding: "0 16px",
                      border: "none",
                      borderRadius: "20px",
                      background: "#c95f5c",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: "800",
                      cursor: "pointer",
                    }}
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>
                {couponError && (
                  <div style={{ margin: "6px 0 0", color: "#c95f5c", fontSize: "11px", fontWeight: "600" }}>
                    {couponError}
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  margin: "0 0 20px",
                  padding: "10px 14px",
                  borderRadius: "14px",
                  background: "rgba(115, 132, 53, 0.12)",
                  border: "1px solid rgba(115, 132, 53, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      background: "#738435",
                      color: "#ffffff",
                      padding: "2px 7px",
                      borderRadius: "6px",
                      fontSize: "10px",
                      fontWeight: "700",
                      marginRight: "6px",
                    }}
                  >
                    {appliedCoupon.code}
                  </span>
                  <span style={{ color: "#4a5c18", fontSize: "12px", fontWeight: "700" }}>
                    {appliedCoupon.label || "Voucher Applied"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#c95f5c",
                    fontSize: "11px",
                    fontWeight: "700",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Remove
                </button>
              </div>
            )}

            <div
              style={{
                paddingBottom: "17px",
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                borderBottom: "1px solid #e3beb5",
              }}
            >
              <span
                style={{
                  color: "#785247",
                  fontSize: "13px",
                }}
              >
                Subtotal
              </span>

              <strong
                style={{
                  fontSize: "14px",
                }}
              >
                ${subtotal.toFixed(2)}
              </strong>
            </div>

            {appliedCoupon && discountAmount > 0 && (
              <div
                style={{
                  padding: "15px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  borderBottom: "1px solid #e3beb5",
                  color: "#4a5c18",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: "700" }}>
                  Discount ({appliedCoupon.label || appliedCoupon.code})
                </span>
                <strong style={{ fontSize: "14px", color: "#4a5c18" }}>
                  -${discountAmount.toFixed(2)}
                </strong>
              </div>
            )}

            <div
              style={{
                padding: "17px 0",
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                borderBottom: "1px solid #e3beb5",
              }}
            >
              <span
                style={{
                  color: "#785247",
                  fontSize: "13px",
                }}
              >
                Delivery
              </span>

              <span
                style={{
                  color: "#785247",
                  fontSize: "11px",
                  textAlign: "right",
                }}
              >
                {appliedCoupon?.type === "freeship" ? "Free (Voucher)" : "Calculated at checkout"}
              </span>
            </div>

            <div
              style={{
                padding: "20px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <strong
                style={{
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: "22px",
                  fontWeight: "400",
                }}
              >
                Total
              </strong>

              <strong
                style={{
                  color: "#a84645",
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: "24px",
                  fontWeight: "400",
                }}
              >
                ${finalTotal.toFixed(2)}
              </strong>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              style={{
                width: "100%",
                minHeight: "48px",
                border: "none",
                borderRadius: "25px",
                background: "#c95f5c",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "900",
                cursor: "pointer",
              }}
            >
              Checkout →
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Cart;
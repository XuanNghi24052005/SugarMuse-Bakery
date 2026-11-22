import React from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../Context/Cartcontext";
import { useAuth } from "../Context/Authcontext";

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
            {cartItems.map((item) => (
              <article
                key={item._id}
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
                ${Number(cartTotal).toFixed(2)}
              </strong>
            </div>

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
                Calculated at checkout
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
                ${Number(cartTotal).toFixed(2)}
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
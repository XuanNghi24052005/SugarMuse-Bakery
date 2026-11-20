import React from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useCart,
} from "../Context/Cartcontext";

import {
  useAuth,
} from "../Context/Authcontext";

const MinusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6 18 20H6L5 6" />
    <path d="M10 11v5" />
    <path d="M14 11v5" />
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

  const navigate =
    useNavigate();

  const subtotal =
    Number(cartTotal) || 0;

  const shippingFee =
    subtotal >= 60 ||
    subtotal === 0
      ? 0
      : 4;

  const total =
    subtotal +
    shippingFee;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  if (
    cartItems.length === 0
  ) {
    return (
      <main
        style={{
          minHeight:
            "calc(100vh - 78px)",
          padding:
            "80px 24px",
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          background:
            "#fffaf6",
          fontFamily:
            '"Nunito", sans-serif',
          color:
            "#57231c",
        }}
      >
        <section
          style={{
            width:
              "min(620px, 100%)",
            textAlign:
              "center",
          }}
        >
          <span
            style={{
              display:
                "block",
              marginBottom:
                "14px",
              color:
                "#c95f5c",
              fontSize:
                "10px",
              fontWeight:
                "900",
              letterSpacing:
                "4px",
            }}
          >
            YOUR SWEET PICKS
          </span>

          <h1
            style={{
              margin:
                "0 0 18px",
              fontFamily:
                '"DM Serif Display", serif',
              fontSize:
                "clamp(48px, 6vw, 72px)",
              fontWeight:
                "400",
              lineHeight:
                "1",
            }}
          >
            Your Cart is
            <em
              style={{
                display:
                  "block",
                color:
                  "#d96560",
                fontWeight:
                  "400",
              }}
            >
              Empty
            </em>
          </h1>

          <p
            style={{
              maxWidth:
                "440px",
              margin:
                "0 auto 28px",
              color:
                "#80615a",
              fontSize:
                "14px",
              lineHeight:
                "1.7",
            }}
          >
            Looks like you
            haven&apos;t added
            any Sugar Muse
            treats yet.
          </p>

          <Link
            to="/products"
            style={{
              minHeight:
                "48px",
              padding:
                "0 28px",
              borderRadius:
                "999px",
              display:
                "inline-flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              gap:
                "9px",
              background:
                "#d96560",
              color:
                "#ffffff",
              fontSize:
                "11px",
              fontWeight:
                "900",
              textDecoration:
                "none",
            }}
          >
            Shop Our Bakes

            <span
              style={{
                width:
                  "15px",
                height:
                  "15px",
                display:
                  "flex",
              }}
            >
              <ArrowIcon />
            </span>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main
      style={{
        width: "100%",
        minHeight:
          "100vh",
        padding:
          "58px 0 90px",
        background:
          "#fffaf6",
        color:
          "#57231c",
        fontFamily:
          '"Nunito", sans-serif',
      }}
    >
      <section
        style={{
          width:
            "min(1380px, calc(100% - 100px))",
          margin:
            "0 auto 42px",
          textAlign:
            "center",
        }}
      >
        <span
          style={{
            display:
              "block",
            marginBottom:
              "10px",
            color:
              "#c95f5c",
            fontSize:
              "10px",
            fontWeight:
              "900",
            letterSpacing:
              "4px",
          }}
        >
          YOUR SWEET PICKS
        </span>

        <h1
          style={{
            margin: 0,
            fontFamily:
              '"DM Serif Display", serif',
            fontSize:
              "clamp(50px, 5vw, 68px)",
            fontWeight:
              "400",
            lineHeight:
              "1",
          }}
        >
          Shopping{" "}

          <em
            style={{
              color:
                "#d96560",
              fontWeight:
                "400",
            }}
          >
            Cart
          </em>
        </h1>

        <p
          style={{
            margin:
              "14px 0 0",
            color:
              "#80615a",
            fontSize:
              "14px",
          }}
        >
          A little collection
          of treats waiting
          just for you.
        </p>
      </section>

      <section
        style={{
          width:
            "min(1380px, calc(100% - 100px))",
          margin:
            "0 auto",
          display:
            "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) 390px",
          gap:
            "28px",
          alignItems:
            "start",
        }}
      >
        <div>
          <div
            style={{
              display:
                "flex",
              flexDirection:
                "column",
              gap:
                "18px",
            }}
          >
            {cartItems.map(
              (product) => (
                <article
                  key={
                    product._id
                  }
                  style={{
                    minHeight:
                      "160px",
                    padding:
                      "18px",
                    border:
                      "1px solid #efd1ca",
                    borderRadius:
                      "28px",
                    display:
                      "grid",
                    gridTemplateColumns:
                      "145px minmax(0, 1fr) auto",
                    alignItems:
                      "center",
                    gap:
                      "22px",
                    background:
                      "#fffaf7",
                  }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    style={{
                      width:
                        "145px",
                      height:
                        "125px",
                      overflow:
                        "hidden",
                      borderRadius:
                        "22px",
                      background:
                        "#f8e3de",
                    }}
                  >
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      style={{
                        width:
                          "100%",
                        height:
                          "100%",
                        display:
                          "block",
                        objectFit:
                          "cover",
                      }}
                    />
                  </Link>

                  <div>
                    <Link
                      to={`/product/${product._id}`}
                      style={{
                        color:
                          "#57231c",
                        fontFamily:
                          '"DM Serif Display", serif',
                        fontSize:
                          "24px",
                        fontWeight:
                          "400",
                        lineHeight:
                          "1.2",
                        textDecoration:
                          "none",
                      }}
                    >
                      {
                        product.name
                      }
                    </Link>

                    <p
                      style={{
                        margin:
                          "8px 0 16px",
                        color:
                          "#c75450",
                        fontSize:
                          "14px",
                        fontWeight:
                          "900",
                      }}
                    >
                      $
                      {Number(
                        product.price
                      ).toFixed(
                        2
                      )}
                    </p>

                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap:
                          "10px",
                      }}
                    >
                      <div
                        style={{
                          height:
                            "40px",
                          padding:
                            "0 7px",
                          border:
                            "1px solid #ebc6bf",
                          borderRadius:
                            "999px",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          background:
                            "#fffaf7",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              product._id
                            )
                          }
                          style={{
                            width:
                              "30px",
                            height:
                              "30px",
                            padding:
                              "7px",
                            border:
                              "0",
                            borderRadius:
                              "50%",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            background:
                              "transparent",
                            color:
                              "#57231c",
                            cursor:
                              "pointer",
                          }}
                        >
                          <MinusIcon />
                        </button>

                        <span
                          style={{
                            minWidth:
                              "34px",
                            textAlign:
                              "center",
                            fontSize:
                              "12px",
                            fontWeight:
                              "900",
                          }}
                        >
                          {
                            product.quantity
                          }
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              product._id
                            )
                          }
                          style={{
                            width:
                              "30px",
                            height:
                              "30px",
                            padding:
                              "7px",
                            border:
                              "0",
                            borderRadius:
                              "50%",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            background:
                              "#f8dfda",
                            color:
                              "#c75450",
                            cursor:
                              "pointer",
                          }}
                        >
                          <PlusIcon />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            product._id
                          )
                        }
                        style={{
                          width:
                            "40px",
                          height:
                            "40px",
                          padding:
                            "10px",
                          border:
                            "0",
                          borderRadius:
                            "50%",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          background:
                            "#fff0ec",
                          color:
                            "#c75450",
                          cursor:
                            "pointer",
                        }}
                        aria-label={`Remove ${product.name}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>

                  <strong
                    style={{
                      paddingRight:
                        "15px",
                      color:
                        "#57231c",
                      fontFamily:
                        '"DM Serif Display", serif',
                      fontSize:
                        "22px",
                      fontWeight:
                        "400",
                    }}
                  >
                    $
                    {(
                      Number(
                        product.price
                      ) *
                      product.quantity
                    ).toFixed(
                      2
                    )}
                  </strong>
                </article>
              )
            )}
          </div>

          <div
            style={{
              marginTop:
                "24px",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              gap:
                "15px",
            }}
          >
            <Link
              to="/products"
              style={{
                minHeight:
                  "44px",
                padding:
                  "0 22px",
                border:
                  "1px solid #d96560",
                borderRadius:
                  "999px",
                display:
                  "inline-flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                color:
                  "#c75450",
                fontSize:
                  "11px",
                fontWeight:
                  "900",
                textDecoration:
                  "none",
              }}
            >
              ← Continue Shopping
            </Link>

            <button
              type="button"
              onClick={
                clearCart
              }
              style={{
                minHeight:
                  "44px",
                padding:
                  "0 22px",
                border:
                  "0",
                background:
                  "transparent",
                color:
                  "#a96d65",
                fontFamily:
                  '"Nunito", sans-serif',
                fontSize:
                  "11px",
                fontWeight:
                  "900",
                cursor:
                  "pointer",
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>

        <aside
          style={{
            padding:
              "30px",
            position:
              "sticky",
            top:
              "105px",
            border:
              "1px solid #edc9c2",
            borderRadius:
              "30px",
            background:
              "#f9ded8",
          }}
        >
          <span
            style={{
              display:
                "block",
              color:
                "#c75450",
              fontSize:
                "9px",
              fontWeight:
                "900",
              letterSpacing:
                "3px",
            }}
          >
            YOUR ORDER
          </span>

          <h2
            style={{
              margin:
                "6px 0 28px",
              fontFamily:
                '"DM Serif Display", serif',
              fontSize:
                "34px",
              fontWeight:
                "400",
            }}
          >
            Order Summary
          </h2>

          <div
            style={{
              paddingBottom:
                "20px",
              borderBottom:
                "1px solid rgba(87, 35, 28, .12)",
            }}
          >
            <div
              style={{
                marginBottom:
                  "14px",
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                color:
                  "#785247",
                fontSize:
                  "12px",
              }}
            >
              <span>
                Subtotal
              </span>

              <strong
                style={{
                  color:
                    "#57231c",
                }}
              >
                $
                {subtotal.toFixed(
                  2
                )}
              </strong>
            </div>

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                color:
                  "#785247",
                fontSize:
                  "12px",
              }}
            >
              <span>
                Delivery
              </span>

              <strong
                style={{
                  color:
                    "#57231c",
                }}
              >
                {shippingFee ===
                0
                  ? "Free"
                  : `$${shippingFee.toFixed(
                      2
                    )}`}
              </strong>
            </div>
          </div>

          <div
            style={{
              padding:
                "22px 0 0",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
            }}
          >
            <span
              style={{
                fontFamily:
                  '"DM Serif Display", serif',
                fontSize:
                  "24px",
              }}
            >
              Total
            </span>

            <strong
              style={{
                color:
                  "#c75450",
                fontFamily:
                  '"DM Serif Display", serif',
                fontSize:
                  "30px",
                fontWeight:
                  "400",
              }}
            >
              $
              {total.toFixed(
                2
              )}
            </strong>
          </div>

          <button
            type="button"
            onClick={
              handleCheckout
            }
            style={{
              width:
                "100%",
              height:
                "52px",
              marginTop:
                "25px",
              padding:
                "0 20px",
              border:
                "0",
              borderRadius:
                "999px",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              gap:
                "9px",
              background:
                "#d96560",
              color:
                "#ffffff",
              fontFamily:
                '"Nunito", sans-serif',
              fontSize:
                "11px",
              fontWeight:
                "900",
              cursor:
                "pointer",
            }}
          >
            <span
              style={{
                width:
                  "15px",
                height:
                  "15px",
                display:
                  "flex",
              }}
            >
              <LockIcon />
            </span>

            Checkout

            <span
              style={{
                width:
                  "15px",
                height:
                  "15px",
                display:
                  "flex",
              }}
            >
              <ArrowIcon />
            </span>
          </button>

          <p
            style={{
              margin:
                "13px 0 0",
              color:
                "#927169",
              fontSize:
                "9px",
              textAlign:
                "center",
            }}
          >
            Secure checkout
          </p>

          {subtotal <
            60 && (
            <div
              style={{
                marginTop:
                  "22px",
                padding:
                  "14px 16px",
                borderRadius:
                  "16px",
                background:
                  "rgba(255,250,247,.65)",
                color:
                  "#785247",
                fontSize:
                  "10px",
                lineHeight:
                  "1.5",
                textAlign:
                  "center",
              }}
            >
              Add{" "}
              <strong
                style={{
                  color:
                    "#c75450",
                }}
              >
                $
                {(
                  60 -
                  subtotal
                ).toFixed(
                  2
                )}
              </strong>{" "}
              more for free
              delivery.
            </div>
          )}
        </aside>
      </section>
    </main>
  );
};

export default Cart;
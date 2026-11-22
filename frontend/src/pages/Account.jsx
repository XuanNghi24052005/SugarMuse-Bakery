import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../Context/Authcontext";

import "../pageStyles/Account.css";
import AccountWishlist from "../components/AccountWishlist";

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

  const [
    activeSection,
    setActiveSection,
  ] = useState("profile");

  const [
    formData,
    setFormData,
  ] = useState({
    fullName: "Muse",
    email: "muse@sugarmuse.com",
    phone: "+1 (234) 567-8901",
  });

  const [
    profileSaved,
    setProfileSaved,
  ] = useState(false);

  const [
    addresses,
    setAddresses,
  ] = useState(() => {
    try {
      const savedAddresses =
        localStorage.getItem(
          "sugarMuseAddresses"
        );

      return savedAddresses
        ? JSON.parse(
            savedAddresses
          )
        : [];
    } catch {
      return [];
    }
  });

  const [
    orders,
    setOrders,
  ] = useState(() => {
    try {
      const savedOrders =
        localStorage.getItem(
          "sugarMuseOrders"
        );

      return savedOrders
        ? JSON.parse(
            savedOrders
          )
        : [];
    } catch {
      return [];
    }
  });

  const [
    showAddressForm,
    setShowAddressForm,
  ] = useState(false);

  const [
    editingAddressId,
    setEditingAddressId,
  ] = useState(null);

  const [
    addressForm,
    setAddressForm,
  ] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    isDefault: false,
  });

  useEffect(() => {
  if (!user) {
    return;
  }

  setFormData({
    fullName:
      user.fullName || "",
    email:
      user.email || "",
    phone:
      user.phone || "",
  });
}, [user]);

  useEffect(() => {
    localStorage.setItem(
      "sugarMuseAddresses",
      JSON.stringify(
        addresses
      )
    );
  }, [addresses]);

  const displayName =
    user?.fullName?.trim() ||
    "Muse";

  const firstLetter =
    displayName
      .charAt(0)
      .toUpperCase() || "M";

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );

    setProfileSaved(false);
  };

  const handleSave = (
    event
  ) => {
    event.preventDefault();

    if (isAuthenticated) {
      updateUser({
        fullName:
          formData.fullName,
        email:
          formData.email,
        phone:
          formData.phone,
      });
    }

    setProfileSaved(true);
  };

  const handleCancel = () => {
    setFormData({
      fullName:
        user?.fullName ||
        "Muse",
      email:
        user?.email ||
        "muse@sugarmuse.com",
      phone:
        user?.phone ||
        "+1 (234) 567-8901",
    });

    setProfileSaved(false);
  };

  const handleLogout = () => {
    if (isAuthenticated) {
      logout();
    }

    navigate("/");
  };

  const handleAddressChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setAddressForm(
      (current) => ({
        ...current,
        [name]:
          type ===
          "checkbox"
            ? checked
            : value,
      })
    );
  };

  const resetAddressForm =
    () => {
      setAddressForm({
        fullName:
          user?.fullName ||
          "Muse",
        phone:
          user?.phone ||
          "+1 (234) 567-8901",
        address: "",
        city: "",
        district: "",
        isDefault: false,
      });

      setEditingAddressId(
        null
      );

      setShowAddressForm(
        false
      );
    };

  const handleAddAddress =
    () => {
      setAddressForm({
        fullName:
          user?.fullName ||
          "Muse",
        phone:
          user?.phone ||
          "+1 (234) 567-8901",
        address: "",
        city: "",
        district: "",
        isDefault:
          addresses.length ===
          0,
      });

      setEditingAddressId(
        null
      );

      setShowAddressForm(
        true
      );
    };

  const handleSaveAddress = (
    event
  ) => {
    event.preventDefault();

    if (
      !addressForm.fullName.trim() ||
      !addressForm.phone.trim() ||
      !addressForm.address.trim()
    ) {
      return;
    }

    if (editingAddressId) {
      setAddresses(
        (current) =>
          current.map(
            (item) => {
              if (
                addressForm.isDefault &&
                item.id !==
                  editingAddressId
              ) {
                return {
                  ...item,
                  isDefault:
                    false,
                };
              }

              if (
                item.id ===
                editingAddressId
              ) {
                return {
                  ...addressForm,
                  id:
                    editingAddressId,
                };
              }

              return item;
            }
          )
      );
    } else {
      const newAddress = {
        ...addressForm,
        id: Date.now(),
      };

      setAddresses(
        (current) => {
          const updated =
            addressForm.isDefault
              ? current.map(
                  (item) => ({
                    ...item,
                    isDefault:
                      false,
                  })
                )
              : current;

          return [
            ...updated,
            newAddress,
          ];
        }
      );
    }

    resetAddressForm();
  };

  const handleEditAddress = (
    address
  ) => {
    setAddressForm({
      fullName:
        address.fullName,
      phone:
        address.phone,
      address:
        address.address,
      city:
        address.city || "",
      district:
        address.district ||
        "",
      isDefault:
        Boolean(
          address.isDefault
        ),
    });

    setEditingAddressId(
      address.id
    );

    setShowAddressForm(
      true
    );
  };

  const handleDeleteAddress = (
    addressId
  ) => {
    setAddresses(
      (current) => {
        const target =
          current.find(
            (item) =>
              item.id ===
              addressId
          );

        const remaining =
          current.filter(
            (item) =>
              item.id !==
              addressId
          );

        if (
          target?.isDefault &&
          remaining.length > 0
        ) {
          return remaining.map(
            (
              item,
              index
            ) => ({
              ...item,
              isDefault:
                index === 0,
            })
          );
        }

        return remaining;
      }
    );
  };

  const handleSetDefaultAddress =
    (addressId) => {
      setAddresses(
        (current) =>
          current.map(
            (item) => ({
              ...item,
              isDefault:
                item.id ===
                addressId,
            })
          )
      );
    };

  const formatOrderDate = (
    date
  ) => {
    return new Intl.DateTimeFormat(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    ).format(
      new Date(date)
    );
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
            Manage your profile,
            orders and favorite
            treats in one place.
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
              {user?.email ||
                "muse@sugarmuse.com"}
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
                activeSection ===
                "profile"
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
                activeSection ===
                "orders"
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
                activeSection ===
                "addresses"
                  ? "account-menu-item active"
                  : "account-menu-item"
              }
              onClick={() => {
                setActiveSection(
                  "addresses"
                );

                setShowAddressForm(
                  false
                );

                setEditingAddressId(
                  null
                );
              }}
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
                  View and update your
                  account details.
                </p>
              </div>

              <div className="account-profile-layout">
                <div className="account-profile-visual">
                <div className="account-profile-circle">
                    <img
                    src="/images/products/peach-cake.jpg"
                    alt="Sugar Muse cake"
                    className="account-profile-cake"
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
                      required
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
                      required
                    />
                  </div>

                  <div className="account-field">
                    <label htmlFor="account-phone">
                      Phone Number
                    </label>

                    <input
                      id="account-phone"
                      type="tel"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  {profileSaved && (
                    <div className="account-profile-success">
                      Your profile has
                      been updated.
                    </div>
                  )}

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
            <div className="account-orders-section">
              <div className="account-address-header">
                <div>
                  <span>
                    MY ORDERS
                  </span>

                  <h2>
                    Order History
                  </h2>

                  <p>
                    Track and review
                    your Sugar Muse
                    orders.
                  </p>
                </div>
              </div>

              {orders.length ===
              0 ? (
                <div className="account-orders-empty">
                  <div className="account-orders-icon">
                    <OrderIcon />
                  </div>

                  <h3>
                    No orders yet
                  </h3>

                  <p>
                    Your Sugar Muse
                    orders will appear
                    here once you place
                    your first order.
                  </p>

                  <Link to="/products">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="account-order-list">
                  {orders.map(
                    (order) => (
                      <article
                        className="account-order-card"
                        key={
                          order.id
                        }
                      >
                        <div className="account-order-top">
                          <div>
                            <span>
                              ORDER
                            </span>

                            <h3>
                              #
                              {
                                order.id
                              }
                            </h3>
                          </div>

                          <span className="account-order-status">
                            {
                              order.status
                            }
                          </span>
                        </div>

                        <div className="account-order-meta">
                          <div>
                            <span>
                              Order Date
                            </span>

                            <strong>
                              {formatOrderDate(
                                order.createdAt
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Items
                            </span>

                            <strong>
                              {order.items.reduce(
                                (
                                  totalQuantity,
                                  item
                                ) =>
                                  totalQuantity +
                                  item.quantity,
                                0
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Payment
                            </span>

                            <strong>
                              {order.paymentMethod ===
                              "cash"
                                ? "Cash on Delivery"
                                : "Card Payment"}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Total
                            </span>

                            <strong>
                              $
                              {Number(
                                order.total
                              ).toFixed(
                                2
                              )}
                            </strong>
                          </div>
                        </div>

                        <div className="account-order-products">
                          {order.items.map(
                            (
                              product
                            ) => (
                              <div
                                className="account-order-product"
                                key={
                                  product._id
                                }
                              >
                                <img
                                  src={
                                    product.image
                                  }
                                  alt={
                                    product.name
                                  }
                                />

                                <div>
                                  <strong>
                                    {
                                      product.name
                                    }
                                  </strong>

                                  <span>
                                    Qty{" "}
                                    {
                                      product.quantity
                                    }
                                  </span>
                                </div>

                                <b>
                                  $
                                  {(
                                    Number(
                                      product.price
                                    ) *
                                    product.quantity
                                  ).toFixed(
                                    2
                                  )}
                                </b>
                              </div>
                            )
                          )}
                        </div>

                        <div className="account-order-bottom">
                          <div>
                            <span>
                              Deliver to
                            </span>

                            <p>
                              {
                                order.customer
                                  ?.address
                              }

                              {order.customer
                                ?.district &&
                                `, ${order.customer.district}`}

                              {order.customer
                                ?.city &&
                                `, ${order.customer.city}`}
                            </p>
                          </div>

                          <Link to="/products">
                            Buy Again
                          </Link>
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          {activeSection ===
            "addresses" && (
            <div className="account-address-section">
              <div className="account-address-header">
                <div>
                  <span>
                    DELIVERY DETAILS
                  </span>

                  <h2>
                    My Addresses
                  </h2>

                  <p>
                    Save your delivery
                    addresses for a
                    faster checkout.
                  </p>
                </div>

                {!showAddressForm && (
                  <button
                    type="button"
                    className="account-add-address"
                    onClick={
                      handleAddAddress
                    }
                  >
                    + Add New Address
                  </button>
                )}
              </div>

              {showAddressForm ? (
                <form
                  className="account-address-form"
                  onSubmit={
                    handleSaveAddress
                  }
                >
                  <div className="account-address-form-grid">
                    <div className="account-field">
                      <label htmlFor="address-name">
                        Full Name
                      </label>

                      <input
                        id="address-name"
                        type="text"
                        name="fullName"
                        value={
                          addressForm.fullName
                        }
                        onChange={
                          handleAddressChange
                        }
                        required
                      />
                    </div>

                    <div className="account-field">
                      <label htmlFor="address-phone">
                        Phone Number
                      </label>

                      <input
                        id="address-phone"
                        type="tel"
                        name="phone"
                        value={
                          addressForm.phone
                        }
                        onChange={
                          handleAddressChange
                        }
                        required
                      />
                    </div>

                    <div className="account-field account-address-full">
                      <label htmlFor="address-street">
                        Street Address
                      </label>

                      <input
                        id="address-street"
                        type="text"
                        name="address"
                        placeholder="House number, street..."
                        value={
                          addressForm.address
                        }
                        onChange={
                          handleAddressChange
                        }
                        required
                      />
                    </div>

                    <div className="account-field">
                      <label htmlFor="address-city">
                        City
                      </label>

                      <input
                        id="address-city"
                        type="text"
                        name="city"
                        placeholder="Ho Chi Minh City"
                        value={
                          addressForm.city
                        }
                        onChange={
                          handleAddressChange
                        }
                      />
                    </div>

                    <div className="account-field">
                      <label htmlFor="address-district">
                        District
                      </label>

                      <input
                        id="address-district"
                        type="text"
                        name="district"
                        placeholder="District"
                        value={
                          addressForm.district
                        }
                        onChange={
                          handleAddressChange
                        }
                      />
                    </div>
                  </div>

                  <label className="account-default-address">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={
                        addressForm.isDefault
                      }
                      onChange={
                        handleAddressChange
                      }
                    />

                    <span>
                      Set as default
                      address
                    </span>
                  </label>

                  <div className="account-form-actions">
                    <button
                      type="submit"
                      className="account-save-button"
                    >
                      {editingAddressId
                        ? "Save Address"
                        : "Add Address"}
                    </button>

                    <button
                      type="button"
                      className="account-cancel-button"
                      onClick={
                        resetAddressForm
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : addresses.length ===
                0 ? (
                <div className="account-address-empty">
                  <div className="account-address-empty-icon">
                    <LocationIcon />
                  </div>

                  <h3>
                    No addresses yet
                  </h3>

                  <p>
                    Add your delivery
                    address to make
                    checkout faster.
                  </p>

                  <button
                    type="button"
                    onClick={
                      handleAddAddress
                    }
                  >
                    Add Your First
                    Address
                  </button>
                </div>
              ) : (
                <div className="account-address-list">
                  {addresses.map(
                    (address) => (
                      <article
                        className={
                          address.isDefault
                            ? "account-address-card default"
                            : "account-address-card"
                        }
                        key={
                          address.id
                        }
                      >
                        <div className="account-address-card-top">
                          <div className="account-address-card-icon">
                            <LocationIcon />
                          </div>

                          {address.isDefault && (
                            <span className="account-address-badge">
                              DEFAULT
                            </span>
                          )}
                        </div>

                        <h3>
                          {
                            address.fullName
                          }
                        </h3>

                        <p>
                          {
                            address.phone
                          }
                        </p>

                        <address>
                          {
                            address.address
                          }

                          {(address.district ||
                            address.city) && (
                            <>
                              <br />

                              {[
                                address.district,
                                address.city,
                              ]
                                .filter(
                                  Boolean
                                )
                                .join(
                                  ", "
                                )}
                            </>
                          )}
                        </address>

                        <div className="account-address-actions">
                          <button
                            type="button"
                            onClick={() =>
                              handleEditAddress(
                                address
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteAddress(
                                address.id
                              )
                            }
                          >
                            Delete
                          </button>

                          {!address.isDefault && (
                            <button
                              type="button"
                              onClick={() =>
                                handleSetDefaultAddress(
                                  address.id
                                )
                              }
                            >
                              Set Default
                            </button>
                          )}
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default Account;
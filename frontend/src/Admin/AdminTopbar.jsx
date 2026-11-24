import React, {
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
    <path d="M10 21h4" />
  </svg>
);

const pageTitles = {
  "/admin/dashboard": {
    eyebrow: "OVERVIEW",
    title: "Dashboard",
  },
  "/admin/products": {
    eyebrow: "CATALOG",
    title: "Products",
  },
  "/admin/product/create": {
    eyebrow: "CATALOG",
    title: "Add New Cake",
  },
  "/admin/orders": {
    eyebrow: "SALES",
    title: "Orders",
  },
  "/admin/users": {
    eyebrow: "CUSTOMERS",
    title: "Customers",
  },
  "/admin/reviews": {
    eyebrow: "FEEDBACK",
    title: "Reviews",
  },
  "/admin/vouchers": {
    eyebrow: "PROMOTIONS",
    title: "Vouchers",
  },
  "/admin/voucher/create": {
    eyebrow: "PROMOTIONS",
    title: "Create Voucher",
  },
};

const AdminTopbar = ({
  onMenuClick,
}) => {
  const location =
    useLocation();

  const [
    search,
    setSearch,
  ] = useState("");

  const current =
    pageTitles[
      location.pathname
    ] || {
      eyebrow: "ADMIN",
      title: "Sugar Muse",
    };

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button
          type="button"
          className="admin-mobile-menu"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>

        <div>
          <span className="admin-page-eyebrow">
            {current.eyebrow}
          </span>

          <h1>
            {current.title}
          </h1>
        </div>
      </div>

      <div className="admin-topbar-right">
        <div className="admin-topbar-search">
          <SearchIcon />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />
        </div>

        <button
          type="button"
          className="admin-notification-button"
          aria-label="Notifications"
        >
          <BellIcon />

          <span />
        </button>

        <div className="admin-topbar-profile">
          <div className="admin-topbar-avatar">
            A
          </div>

          <div>
            <strong>
              Admin
            </strong>

            <span>
              Sugar Muse
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
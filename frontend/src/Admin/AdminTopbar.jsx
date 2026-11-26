import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../features/notification/notificationSlice";
import { fetchAdminProducts, fetchAllOrders } from "../features/admin/adminSlice";

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const pageTitles = {
  "/admin/dashboard": { eyebrow: "OVERVIEW", title: "Dashboard" },
  "/admin/products": { eyebrow: "CATALOG", title: "Products" },
  "/admin/product/create": { eyebrow: "CATALOG", title: "Add New Cake" },
  "/admin/orders": { eyebrow: "SALES", title: "Orders" },
  "/admin/users": { eyebrow: "CUSTOMERS", title: "Customers" },
  "/admin/reviews": { eyebrow: "FEEDBACK", title: "Reviews" },
  "/admin/vouchers": { eyebrow: "PROMOTIONS", title: "Vouchers" },
  "/admin/voucher/create": { eyebrow: "PROMOTIONS", title: "Create Voucher" },
};

const AdminTopbar = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products = [], orders = [] } = useSelector((state) => state.admin);
  const { notifications = [] } = useSelector((state) => state.notification);

  const [search, setSearch] = useState("");
  const [showSearchDrop, setShowSearchDrop] = useState(false);
  const [showNotifDrop, setShowNotifDrop] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);

  // Fetch initial notifications and catalog for quick search
  useEffect(() => {
    dispatch(fetchNotifications());
    if (!products || products.length === 0) {
      dispatch(fetchAdminProducts());
    }
    if (!orders || orders.length === 0) {
      dispatch(fetchAllOrders());
    }
  }, [dispatch]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDrop(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = useMemo(() => {
    return (notifications || []).filter((n) => !n.isRead).length;
  }, [notifications]);

  // Search filter
  const matchedProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return (products || [])
      .filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.flavor?.toLowerCase().includes(q) ||
          p._id?.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [products, search]);

  const matchedOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return (orders || [])
      .filter(
        (o) =>
          o._id?.toLowerCase().includes(q) ||
          o.orderItems?.some((item) => item.name?.toLowerCase().includes(q))
      )
      .slice(0, 3);
  }, [orders, search]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = search.trim();
    if (!query) return;

    setShowSearchDrop(false);

    if (location.pathname.startsWith("/admin/orders")) {
      navigate(`/admin/orders?search=${encodeURIComponent(query)}`);
    } else {
      navigate(`/admin/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClearSearch = (e) => {
    e.stopPropagation();
    setSearch("");
    setShowSearchDrop(false);
  };

  const handleToggleNotif = () => {
    if (!showNotifDrop) {
      dispatch(fetchNotifications());
    }
    setShowNotifDrop(!showNotifDrop);
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    dispatch(markAllNotificationsAsRead());
  };

  const handleNotifClick = (item) => {
    if (!item.isRead) {
      dispatch(markNotificationAsRead(item._id));
    }
    setShowNotifDrop(false);

    if (item.link) {
      navigate(item.link);
    } else if (item.type === "order") {
      navigate("/admin/orders");
    } else if (item.type === "review") {
      navigate("/admin/reviews");
    }
  };

  const handleDeleteNotif = (id, e) => {
    e.stopPropagation();
    dispatch(deleteNotification(id));
  };

  const formatNotifTime = (timeStr) => {
    if (!timeStr) return "Just now";
    try {
      const d = new Date(timeStr);
      if (isNaN(d.getTime())) return "Recently";
      const now = new Date();
      const diffMs = now - d;
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recently";
    }
  };

  const current = pageTitles[location.pathname] || {
    eyebrow: "ADMIN",
    title: "Sugar Muse",
  };

  const hasSearchMatches = matchedProducts.length > 0 || matchedOrders.length > 0;

  return (
    <header className="admin-topbar">
      {/* Left: Mobile Toggle & Page Title */}
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
          <span className="admin-page-eyebrow">{current.eyebrow}</span>
          <h1>{current.title}</h1>
        </div>
      </div>

      {/* Right: Search, Notifications & Profile */}
      <div className="admin-topbar-right">
        {/* Search Bar with live dropdown */}
        <div ref={searchRef} style={{ position: "relative" }}>
          <form
            className="admin-topbar-search"
            onSubmit={handleSearchSubmit}
            autoComplete="off"
          >
            <SearchIcon />
            <input
              type="text"
              placeholder="Search cakes, orders, IDs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSearchDrop(e.target.value.trim().length > 0);
              }}
              onFocus={() => {
                if (search.trim().length > 0) setShowSearchDrop(true);
              }}
            />
            {search && (
              <button
                type="button"
                className="admin-topbar-search-clear"
                onClick={handleClearSearch}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </form>

          {/* Search Dropdown / Spotlight Preview */}
          {showSearchDrop && (
            <div className="admin-search-dropdown">
              {hasSearchMatches ? (
                <>
                  {matchedProducts.length > 0 && (
                    <div>
                      <div className="admin-search-group-title">
                        Bakery Products ({matchedProducts.length})
                      </div>
                      {matchedProducts.map((p) => {
                        const img =
                          p.image?.[0]?.url ||
                          p.images?.[0]?.url ||
                          "/images/sugar-muse-favicon.svg";
                        return (
                          <div
                            key={p._id}
                            className="admin-search-item"
                            onClick={() => {
                              setShowSearchDrop(false);
                              navigate(`/admin/product/update/${p._id}`);
                            }}
                          >
                            <img src={img} alt={p.name} className="admin-search-thumb" />
                            <div className="admin-search-item-info">
                              <span className="admin-search-item-title">{p.name}</span>
                              <div className="admin-search-item-sub">
                                <span>{p.category || "Cake"}</span>
                                <span className="admin-search-item-price">
                                  ${Number(p.price || 0).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {matchedOrders.length > 0 && (
                    <div>
                      <div className="admin-search-group-title">
                        Orders ({matchedOrders.length})
                      </div>
                      {matchedOrders.map((o) => (
                        <div
                          key={o._id}
                          className="admin-search-item"
                          onClick={() => {
                            setShowSearchDrop(false);
                            navigate(`/admin/order/${o._id}`);
                          }}
                        >
                          <div
                            className="admin-search-thumb"
                            style={{
                              background: "#fde8e5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "16px",
                            }}
                          >
                            📦
                          </div>
                          <div className="admin-search-item-info">
                            <span className="admin-search-item-title">
                              Order #{o._id?.slice(-6).toUpperCase()}
                            </span>
                            <div className="admin-search-item-sub">
                              <span>{o.orderStatus || "Processing"}</span>
                              <span className="admin-search-item-price">
                                ${Number(o.totalPrice || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className="admin-search-footer"
                    onClick={handleSearchSubmit}
                  >
                    View all matching results in Catalog (Press Enter) ➔
                  </div>
                </>
              ) : (
                <div className="admin-search-empty">
                  No matching cakes or orders for "<strong>{search}</strong>"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications Button & Dropdown */}
        <div className="admin-notification-wrap" ref={notifRef}>
          <button
            type="button"
            className={`admin-notification-button ${showNotifDrop ? "is-active" : ""}`}
            onClick={handleToggleNotif}
            aria-label="Notifications"
            title="View store notifications"
          >
            <BellIcon />
            {unreadCount > 0 && (
              <span className="admin-notification-badge">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifDrop && (
            <div className="admin-notification-dropdown">
              <div className="admin-notif-header">
                <h4>
                  <span>🔔 Notifications</span>
                  {unreadCount > 0 && (
                    <span className="admin-notif-unread-pill">{unreadCount} new</span>
                  )}
                </h4>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    className="admin-notif-mark-read-btn"
                    onClick={handleMarkAllRead}
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="admin-notif-list">
                {notifications && notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className={`admin-notif-item ${!item.isRead ? "unread" : ""}`}
                      onClick={() => handleNotifClick(item)}
                    >
                      <div className={`admin-notif-icon-box ${item.type || "system"}`}>
                        {item.type === "order" ? "🛍️" : item.type === "review" ? "⭐" : "🔔"}
                      </div>
                      <div className="admin-notif-content">
                        <h5 className="admin-notif-title">{item.title}</h5>
                        <p className="admin-notif-msg">{item.message}</p>
                        <span className="admin-notif-time">
                          {formatNotifTime(item.createdAt)}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="admin-notif-del-btn"
                        onClick={(e) => handleDeleteNotif(item._id, e)}
                        title="Delete notification"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="admin-notif-empty">
                    <div className="admin-notif-empty-icon">🍰</div>
                    <h5>All caught up!</h5>
                    <p>No new notifications right now. Order and review alerts will appear here.</p>
                  </div>
                )}
              </div>

              <div className="admin-notif-footer">
                <Link
                  to="/admin/orders"
                  onClick={() => setShowNotifDrop(false)}
                >
                  View All Orders ➔
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="admin-topbar-profile">
          <div className="admin-topbar-avatar">A</div>
          <div>
            <strong>Admin</strong>
            <span>Sugar Muse</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;

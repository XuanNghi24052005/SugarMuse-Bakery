import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  fetchAllOrders,
  fetchUsers,
} from "../features/admin/adminSlice";
import "../AdminStyles/AdminDashboard.css";

/* SVG Icons matching Sugar Muse Bakery Theme */
const RevenueIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const OrderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h12v18H6z" />
    <path d="M9 7h6" />
    <path d="M9 11h6" />
    <path d="M9 15h4" />
  </svg>
);

const CakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 21h16" />
    <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
    <circle cx="12" cy="3" r="1" />
  </svg>
);

const CustomerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products = [],
    orders = [],
    users = [],
    totalAmount = 0,
    loading = false,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Status counts
  const totalProducts = products.length;
  const inStock = products.filter((p) => Number(p.stock) > 0).length;
  const outOfStock = products.filter((p) => Number(p.stock) === 0).length;
  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (o) => (o.orderStatus || "").toLowerCase() === "delivered"
  ).length;
  const preparingOrders = orders.filter((o) => {
    const s = (o.orderStatus || "").toLowerCase();
    return s === "processing" || s === "preparing" || s === "baked";
  }).length;
  const shippingOrders = orders.filter(
    (o) => (o.orderStatus || "").toLowerCase() === "shipping" || (o.orderStatus || "").toLowerCase() === "shipped"
  ).length;
  const cancelledOrders = orders.filter(
    (o) => (o.orderStatus || "").toLowerCase() === "cancelled"
  ).length;

  // Donut percentage calculation
  const donutGradient = useMemo(() => {
    if (totalOrders === 0) {
      return "conic-gradient(#e8d6d2 0 100%)";
    }
    const pPreparing = Math.round((preparingOrders / totalOrders) * 100);
    const pShipping = Math.round((shippingOrders / totalOrders) * 100);
    const pDelivered = Math.round((deliveredOrders / totalOrders) * 100);

    const stop1 = pPreparing;
    const stop2 = stop1 + pShipping;
    const stop3 = stop2 + pDelivered;

    return `conic-gradient(#d56560 0% ${stop1}%, #e5a467 ${stop1}% ${stop2}%, #789873 ${stop2}% ${stop3}%, #b6a6a2 ${stop3}% 100%)`;
  }, [totalOrders, preparingOrders, shippingOrders, deliveredOrders]);

  // Today formatted
  const todayFormatted = useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  // Recent 5 orders
  const recentOrders = useMemo(() => {
    return [...orders].slice(0, 5);
  }, [orders]);

  // Top products (or first 4)
  const topProducts = useMemo(() => {
    return [...products].slice(0, 4);
  }, [products]);

  // Weekly mockup bar data
  const weeklyDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekHeights = [45, 60, 35, 75, 90, 100, 80];

  const getStatusBadgeClass = (status = "") => {
    const s = status.toLowerCase();
    if (s === "delivered") return "delivered";
    if (s === "shipping" || s === "shipped") return "shipping";
    if (s === "cancelled") return "cancelled";
    return "preparing";
  };

  return (
    <div className="admin-dashboard">
      {/* 1. Welcome Banner */}
      <section className="admin-dashboard-welcome">
        <div>
          <span>ARTISAN BAKERY DASHBOARD</span>
          <h2>Welcome to Sugar Muse Bakery</h2>
          <p>
            Here is what's baking and brewing at Sugar Muse today. Manage products, monitor orders, and view sales insights.
          </p>
        </div>

        <div className="admin-dashboard-date">
          <small>TODAY'S DATE</small>
          <strong>{todayFormatted}</strong>
        </div>
      </section>

      {/* 2. KPI Stat Cards */}
      <section className="admin-stat-grid">
        {/* Total Revenue */}
        <article className="admin-stat-card">
          <div className="admin-stat-card-top">
            <div className="admin-stat-icon">
              <RevenueIcon />
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/orders")}
              title="View sales"
            >
              <ArrowRightIcon />
            </button>
          </div>
          <span className="admin-stat-label">TOTAL REVENUE</span>
          <strong className="admin-stat-value">
            ${Number(totalAmount || 0).toFixed(2)}
          </strong>
          <div className="admin-stat-meta">
            <span>+12.8%</span>
            <small>All-time sales</small>
          </div>
        </article>

        {/* Total Orders */}
        <article className="admin-stat-card">
          <div className="admin-stat-card-top">
            <div className="admin-stat-icon">
              <OrderIcon />
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/orders")}
              title="View orders"
            >
              <ArrowRightIcon />
            </button>
          </div>
          <span className="admin-stat-label">TOTAL ORDERS</span>
          <strong className="admin-stat-value">{totalOrders}</strong>
          <div className="admin-stat-meta">
            <span>{deliveredOrders} Done</span>
            <small>{preparingOrders} in oven</small>
          </div>
        </article>

        {/* Bakery Products */}
        <article className="admin-stat-card">
          <div className="admin-stat-card-top">
            <div className="admin-stat-icon">
              <CakeIcon />
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              title="View products"
            >
              <ArrowRightIcon />
            </button>
          </div>
          <span className="admin-stat-label">BAKERY ITEMS</span>
          <strong className="admin-stat-value">{totalProducts}</strong>
          <div className="admin-stat-meta">
            <span>{inStock} Available</span>
            {outOfStock > 0 && (
              <span className="warning">{outOfStock} Out of Stock</span>
            )}
          </div>
        </article>

        {/* Total Customers */}
        <article className="admin-stat-card">
          <div className="admin-stat-card-top">
            <div className="admin-stat-icon">
              <CustomerIcon />
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              title="View customers"
            >
              <ArrowRightIcon />
            </button>
          </div>
          <span className="admin-stat-label">CUSTOMERS</span>
          <strong className="admin-stat-value">{users.length}</strong>
          <div className="admin-stat-meta">
            <span>Active</span>
            <small>Registered foodies</small>
          </div>
        </article>
      </section>

      {/* 3. Middle Section: Sales Chart & Order Status Donut */}
      <section className="admin-dashboard-middle">
        {/* Sales Activity Overview */}
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>WEEKLY PERFORMANCE</span>
              <h3>Sales Overview</h3>
            </div>
            <div className="admin-revenue-summary">
              <strong>${Number(totalAmount || 0).toFixed(0)}</strong>
              <span>Live Sync</span>
            </div>
          </div>

          <div className="admin-chart">
            <div className="admin-chart-lines">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="admin-chart-bars">
              {weeklyDays.map((day, idx) => (
                <div className="admin-chart-column" key={day}>
                  <div className="admin-chart-bar-wrap">
                    <div
                      className="admin-chart-bar"
                      style={{ height: `${weekHeights[idx]}%` }}
                      title={`${day}: ${weekHeights[idx]}% capacity`}
                    />
                  </div>
                  <span>{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Status Donut */}
        <div className="admin-panel admin-order-status-panel">
          <div className="admin-panel-heading">
            <div>
              <span>FULFILLMENT</span>
              <h3>Order Status</h3>
            </div>
          </div>

          <div className="admin-order-total">
            <div
              className="admin-order-donut"
              style={{ background: donutGradient }}
            >
              <div>
                <strong>{totalOrders}</strong>
                <span>TOTAL</span>
              </div>
            </div>
          </div>

          <div className="admin-status-list">
            <div>
              <span>
                <i className="preparing" /> In Oven / Preparing
              </span>
              <strong>{preparingOrders}</strong>
            </div>
            <div>
              <span>
                <i className="shipping" /> On Delivery
              </span>
              <strong>{shippingOrders}</strong>
            </div>
            <div>
              <span>
                <i className="delivered" /> Delivered Fresh
              </span>
              <strong>{deliveredOrders}</strong>
            </div>
            <div>
              <span>
                <i className="cancelled" /> Cancelled
              </span>
              <strong>{cancelledOrders}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Section: Recent Orders & Best Selling Bakery Items */}
      <section className="admin-dashboard-bottom">
        {/* Recent Orders Table */}
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>LATEST ACTIVITY</span>
              <h3>Recent Orders</h3>
            </div>
            <button
              type="button"
              className="admin-text-button"
              onClick={() => navigate("/admin/orders")}
            >
              View All Orders <ArrowRightIcon />
            </button>
          </div>

          <div className="admin-table-wrap">
            {recentOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 10px", color: "#8a6d66" }}>
                <p style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
                  No customer orders have been placed yet.
                </p>
                <small style={{ color: "#b19791" }}>
                  New orders will automatically appear here once customers checkout.
                </small>
              </div>
            ) : (
              <table className="admin-orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((ord) => {
                    const customerName = ord.user?.name || ord.shippingInfo?.name || "Guest";
                    const initial = customerName.charAt(0).toUpperCase();
                    const badgeClass = getStatusBadgeClass(ord.orderStatus);
                    const formattedDate = ord.createdAt
                      ? new Date(ord.createdAt).toLocaleDateString()
                      : "Recently";

                    return (
                      <tr key={ord._id}>
                        <td>
                          <strong>#{ord._id.slice(-6).toUpperCase()}</strong>
                        </td>
                        <td>
                          <div className="admin-customer-cell">
                            <div>{initial}</div>
                            <span>{customerName}</span>
                          </div>
                        </td>
                        <td>{formattedDate}</td>
                        <td>
                          <strong>${Number(ord.totalPrice || 0).toFixed(2)}</strong>
                        </td>
                        <td>
                          <span className={`admin-order-badge ${badgeClass}`}>
                            {ord.orderStatus || "Processing"}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/admin/order/${ord._id}`}
                            className="admin-text-button"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Best Selling Products / Quick Catalog */}
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>MENU CATALOG</span>
              <h3>Bakery Items</h3>
            </div>
            <button
              type="button"
              className="admin-text-button"
              onClick={() => navigate("/admin/product/create")}
            >
              <PlusIcon /> Add Cake
            </button>
          </div>

          <div className="admin-best-seller-list">
            {topProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 10px", color: "#8a6d66" }}>
                <p style={{ margin: "0 0 15px 0", fontSize: "13px" }}>
                  Database is clean! No products created yet.
                </p>
                <Link
                  to="/admin/product/create"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    background: "#c95b56",
                    color: "#fff",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  <PlusIcon /> Thêm Bánh Đầu Tiên
                </Link>
              </div>
            ) : (
              topProducts.map((p, idx) => {
                const imgUrl =
                  p.image?.[0]?.url || p.images?.[0]?.url || "/images/sugar-muse-favicon.svg";

                return (
                  <div className="admin-best-seller-item" key={p._id || idx}>
                    <span className="admin-best-rank">0{idx + 1}</span>
                    <img src={imgUrl} alt={p.name} />
                    <div className="admin-best-copy">
                      <strong>{p.name}</strong>
                      <span>
                        {p.category} {p.subcategory ? `• ${p.subcategory}` : ""}
                      </span>
                    </div>
                    <div className="admin-best-sales">
                      <strong>${Number(p.price || 0).toFixed(2)}</strong>
                      <span>{p.stock} in stock</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

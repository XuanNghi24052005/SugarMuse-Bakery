import React from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../features/admin/adminSlice";

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="3" width="7" height="7" rx="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" />
  </svg>
);

const ProductIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7 12 3l8 4-8 4-8-4Z" />
    <path d="m4 7 8 4 8-4" />
    <path d="M4 7v10l8 4 8-4V7" />
    <path d="M12 11v10" />
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

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </svg>
);

const ReviewIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16v13H8l-4 4V4Z" />
    <path d="m9 10 2 2 4-4" />
  </svg>
);

const VoucherIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16v4a2.5 2.5 0 0 0 0 5v4H4v-4a2.5 2.5 0 0 0 0-5V7Z" />
    <path d="M9 8v11" strokeDasharray="2 2" />
  </svg>
);

const StoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 10h16" />
    <path d="M5 10v10h14V10" />
    <path d="M3 10 5 4h14l2 6" />
    <path d="M9 20v-6h6v6" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M10 4H5v16h5" />
    <path d="M14 8l4 4-4 4" />
    <path d="M8 12h10" />
  </svg>
);

const navItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: <ProductIcon />,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: <OrderIcon />,
  },
  {
    label: "Customers",
    path: "/admin/users",
    icon: <UserIcon />,
  },
  {
    label: "Reviews",
    path: "/admin/reviews",
    icon: <ReviewIcon />,
  },
  {
    label: "Vouchers",
    path: "/admin/vouchers",
    icon: <VoucherIcon />,
  },
];

const AdminSidebar = ({
  sidebarOpen,
  closeSidebar,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.admin);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  const adminName = adminInfo?.name || "Sugar Muse Admin";
  const initial = adminName.charAt(0).toUpperCase();

  return (
    <aside
      className={
        sidebarOpen
          ? "admin-sidebar open"
          : "admin-sidebar"
      }
    >
      <div className="admin-sidebar-brand">
        <div className="admin-brand-heart">
          ♡
        </div>

        <div>
          <strong>Sugar Muse</strong>
          <span>ADMIN PANEL</span>
        </div>
      </div>

      <div className="admin-sidebar-section-label">
        MANAGEMENT
      </div>

      <nav className="admin-sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? "admin-sidebar-link active"
                : "admin-sidebar-link"
            }
          >
            <span className="admin-sidebar-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-bottom">
        <button
          type="button"
          className="admin-store-link"
          onClick={() =>
            navigate("/")
          }
        >
          <StoreIcon />
          <span>View Store</span>
        </button>

        <div className="admin-sidebar-profile">
          <div className="admin-sidebar-avatar">
            {initial}
          </div>

          <div className="admin-sidebar-profile-copy">
            <strong>
              {adminName}
            </strong>
            <span>
              Administrator
            </span>
          </div>

          <button
            type="button"
            className="admin-sidebar-logout"
            aria-label="Log out"
            title="Log out"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
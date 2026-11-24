import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, removeErrors } from "../features/admin/adminSlice";
import { showToast } from "../utils/showToast";
import "../AdminStyles/AdminLogin.css";

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
    <circle cx="12" cy="12" r="2.7" />
    {visible && <path d="M4 4 20 20" />}
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAdminAuthenticated, adminAuthLoading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAdminAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      showToast.error(error);
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      showToast.error("Please enter both email and password.");
      return;
    }
    dispatch(adminLogin({ email, password }))
      .unwrap()
      .then(() => {
        showToast.success("Welcome back, Administrator!");
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        showToast.error(err || "Authentication failed.");
      });
  };

  return (
    <div className="admin-portal-login-wrapper">
      <div className="admin-portal-login-card">
        {/* Brand Header */}
        <div className="admin-portal-brand">
          <div className="admin-portal-symbol">♡</div>
          <h2>Sugar Muse</h2>
          <span className="admin-portal-badge">ADMIN PORTAL • RESTRICTED</span>
        </div>

        <p className="admin-portal-desc">
          Sign in with your official bakery administrator credentials to manage orders, catalog, and inventory.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-portal-form">
          <div className="admin-portal-field">
            <label htmlFor="admin-email">Admin Email Address</label>
            <input
              id="admin-email"
              type="email"
              placeholder="admin@sugarmuse.vn"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="admin-portal-field">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-password-wrap">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-portal-submit-btn"
            disabled={adminAuthLoading}
          >
            <LockIcon />
            {adminAuthLoading ? "Authenticating..." : "Access Admin Dashboard"}
          </button>
        </form>

        {/* Footer info */}
        <div className="admin-portal-footer">
          <Link to="/" className="admin-portal-back-link">
            <ArrowLeftIcon /> Return to Bakery Storefront
          </Link>
          <small className="admin-security-note">
            🔒 Secure session with encrypted authorization tokens.
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../Context/Authcontext";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import "../AdminStyles/AdminLayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAdminAuthenticated, adminInfo } = useSelector((state) => state.admin);
  const { user: reduxUser } = useSelector((state) => state.user);
  const { user: authUser } = useAuth();

  const localUser = (() => {
    try {
      const u =
        localStorage.getItem("sugarMuseUser") ||
        localStorage.getItem("user") ||
        localStorage.getItem("adminInfo");
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  })();

  const currentUser = authUser || reduxUser || adminInfo || localUser;
  const isAdmin = currentUser?.role === "admin" || isAdminAuthenticated;

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="admin-main">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

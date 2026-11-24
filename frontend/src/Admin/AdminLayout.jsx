import React, {
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

import "../../AdminStyles/AdminLayout.css";

const AdminLayout = () => {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <div className="admin-shell">
      <AdminSidebar
        sidebarOpen={
          sidebarOpen
        }
        closeSidebar={() =>
          setSidebarOpen(
            false
          )
        }
      />

      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          aria-label="Close menu"
          onClick={() =>
            setSidebarOpen(
              false
            )
          }
        />
      )}

      <div className="admin-main">
        <AdminTopbar
          onMenuClick={() =>
            setSidebarOpen(
              true
            )
          }
        />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
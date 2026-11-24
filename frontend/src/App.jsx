import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import RecentlyViewed from "./pages/RecentlyViewed";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import CustomCakes from "./pages/CustomCakes";
import NewCollection from "./pages/NewCollection";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import ForgotPassword from "./pages/ForgotPassword";
import {
  Navigate,
} from "react-router-dom";

import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import ProductList from "./Admin/ProductList";
import OrdersList from "./Admin/OrdersList";
import UsersList from "./Admin/UsersList";
import ReviewList from "./Admin/ReviewList";
import VoucherList from "./Admin/VoucherList";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/recently-viewed"
          element={<recentlyViewed />}
        />  

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/custom-cakes"
          element={<CustomCakes />}
        />

        <Route
          path="/new-collection"
          element={<NewCollection />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/login"
          element={<Auth />}
        />

        <Route
          path="/account"
          element={<Account />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route
          index
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={
            <AdminDashboard />
          }
        />

        <Route
          path="products"
          element={
            <ProductList />
          }
        />

        <Route
          path="orders"
          element={
            <OrdersList />
          }
        />

        <Route
          path="users"
          element={
            <UsersList />
          }
        />

        <Route
          path="reviews"
          element={
            <ReviewList />
          }
        />

        <Route
          path="vouchers"
          element={
            <VoucherList />
          }
        />
      </Route>
      </Routes>
    </>
  );
}

export default App;
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
          element={<RecentlyViewed />}
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
      </Routes>
    </>
  );
}

export default App;
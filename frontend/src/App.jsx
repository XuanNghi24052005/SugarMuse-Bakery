import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import CustomCakes from "./pages/CustomCakes";
import NewCollection from "./pages/NewCollection";
import Cart from "./pages/Cart";

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
      </Routes>
    </>
  );
}

export default App;
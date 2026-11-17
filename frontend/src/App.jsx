import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CustomCakes from "./pages/CustomCakes";

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

      </Routes>
    </>
  );
}

export default App;
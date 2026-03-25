import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

const isAuth = localStorage.getItem("token");

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={isAuth ? <Admin /> : <Navigate to="/login" />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
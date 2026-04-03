import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Admin from "./pages/Admin";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Address from "./pages/Address";
import CustomerCare from "./pages/CustomerCare";
import Terms from "./pages/Terms";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";



const isAuth = localStorage.getItem("token");

function App() {
  const location = useLocation(); // ⭐ current route

  const hideLayoutRoutes = ["/login", "/signup"]; // ⭐ routes to hide navbar/footer

  return (
    <>
      {/* ✅ Navbar */}
      {!hideLayoutRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/address" element={<Address />} />
        <Route path="/support" element={<CustomerCare />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route
          path="/admin"
          element={isAuth ? <Admin /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* ✅ Footer */}
      {!hideLayoutRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;

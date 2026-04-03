import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Scroll to collections
  const handleCollectionsClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("categories")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById("categories")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Profile click logic
  const handleProfileClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="bg-[#EDE8E1] shadow-sm px-10 py-3 flex justify-between items-center">
      
      {/* LOGO */}
      <Link to="/">
        <img src={logo} alt="Velora Logo" className="h-16" />
      </Link>

      {/* MENU */}
      <ul className="flex gap-8 text-gray-700 font-medium items-center">

        <Link to="/" className="hover:text-pink-600">
          Home
        </Link>

        <li
          onClick={handleCollectionsClick}
          className="cursor-pointer hover:text-pink-600"
        >
          Collections
        </li>

        <Link to="/wishlist" className="hover:text-pink-600">
          Wishlist 
        </Link>

        <Link to="/cart" className="hover:text-pink-600">
          Cart 
        </Link>

        {/* ✅ DYNAMIC PROFILE */}
        <li
          onClick={handleProfileClick}
          className="cursor-pointer hover:text-pink-600"
        >
          {user ? " Profile" : "Login"}
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
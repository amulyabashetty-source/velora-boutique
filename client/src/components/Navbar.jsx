import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// ✅ React Icons
import { FiSearch, FiArrowRight } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Categories (can later come from backend)
  const categories = [
    "Sarees",
    "Pattu Sarees",
    "Lehengas",
    "Kurtis",
    "Anarkalis",
    "Accessories",
    "Handbags",
    "Footwear",
  ];

  // ✅ Check login state
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location.pathname]);

  // 🔍 SEARCH LOGIC
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = categories.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  // 👉 Suggestion click
  const handleSuggestionClick = (item) => {
    setSearch("");
    setSuggestions([]);

    const formatted = item.toLowerCase().replace(/\s+/g, "");
    navigate(`/category/${formatted}`);
  };

  // 👉 Enter press
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      const formatted = search.toLowerCase().replace(/\s+/g, "");
      navigate(`/category/${formatted}`);
      setSuggestions([]);
    }
  };

  // ✅ Scroll to categories
  const handleCollectionsClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("categories")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    } else {
      document.getElementById("categories")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // ✅ Profile click
  const handleProfileClick = () => {
    user ? navigate("/profile") : navigate("/login");
  };

  return (
    <nav className="bg-[#EDE8E1] shadow-sm px-10 py-3 flex items-center justify-between relative">

      {/* 🔥 LOGO */}
      <Link to="/">
        <img src={logo} className="h-16" alt="logo" />
      </Link>

      {/* 🔍 SEARCH BAR */}
      <div className="relative w-[420px]">

        {/* Search Box */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md border border-gray-200 
                        focus-within:ring-2 focus-within:ring-[#2f4f4f] transition-all duration-200">

          <FiSearch className="text-gray-400 mr-2 text-lg" />

          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            placeholder="Search sarees, lehengas, kurtis..."
            className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
          />
        </div>

        {/* 🔥 SUGGESTIONS */}
        {suggestions.length > 0 && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-2xl rounded-xl overflow-hidden z-50 border border-gray-100">

            {suggestions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="px-4 py-3 hover:bg-[#f3eee9] cursor-pointer text-sm transition flex items-center justify-between group"
              >
                <span className="text-gray-700 group-hover:text-[#2f4f4f]">
                  {item}
                </span>

                <FiArrowRight className="text-gray-400 group-hover:text-[#2f4f4f]" />
              </div>
            ))}

          </div>
        )}
      </div>

      {/* 🔥 MENU */}
      <ul className="flex gap-8 text-gray-700 font-medium items-center">

        <Link to="/" className="hover:text-[#2f4f4f] transition">
          Home
        </Link>

        <li
          onClick={handleCollectionsClick}
          className="cursor-pointer hover:text-[#2f4f4f] transition"
        >
          Collections
        </li>

        <Link to="/wishlist" className="hover:text-[#2f4f4f] transition">
          Wishlist
        </Link>

        <Link to="/cart" className="hover:text-[#2f4f4f] transition">
          Cart
        </Link>

        <li
          onClick={handleProfileClick}
          className="cursor-pointer font-semibold text-[#2F4F2F] hover:opacity-80 transition"
        >
          {user ? "Profile" : "Login"}
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
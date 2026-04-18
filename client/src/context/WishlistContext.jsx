import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate(); 

  // Load
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("wishlist"));
      if (data) setWishlist(data);
    } catch (err) {
      console.log("Wishlist load error:", err);
    }
  }, []);

  //  Save
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // PROTECTED TOGGLE
  const toggleWishlist = (product) => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    const exists = wishlist.find((p) => p._id === product._id);

    if (exists) {
      setWishlist(wishlist.filter((p) => p._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((p) => p._id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
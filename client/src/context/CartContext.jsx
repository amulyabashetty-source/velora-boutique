import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    try {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ FRONTEND SIZE LOGIC (NO BACKEND)
  const getSizesByCategory = (category) => {
    if (!category) return [];

    const cat = category.toLowerCase();

    if (["kurtis", "anarkalis", "lehengas"].includes(cat)) {
      return ["S", "M", "L", "XL", "XXL"];
    }

    if (cat === "footwear") {
      return ["6", "7", "8", "9", "10"];
    }

    return []; // sarees, accessories
  };

  // ✅ ADD TO CART
  const addToCart = (product, size) => {

    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first ❌");
      return;
    }

    // 🔥 FIXED (category based, not product.sizes)
    const categorySizes = getSizesByCategory(product.category);
    const requiresSize = categorySizes.length > 0;

    if (requiresSize && !size) {
      alert("Please select size ❌");
      return;
    }

    const finalSize = requiresSize ? size : null;

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          item.size === finalSize
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id &&
          item.size === finalSize
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      const imageToStore =
        product.images?.[0] || product.image || "";

      const fixedImage = imageToStore
        ? imageToStore.startsWith("http")
          ? imageToStore
          : `http://localhost:5000/${imageToStore.replace(/\\/g, "/")}`
        : "";

      return [
        ...prev,
        {
          ...product,
          image: fixedImage,
          size: finalSize,
          qty: 1,
        },
      ];
    });

    alert("Product added to cart ✅");
  };

  // ✅ REMOVE
  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item._id === id && item.size === size)
      )
    );
  };

  // ✅ UPDATE QTY
  const updateQty = (id, size, qty) => {
    if (qty < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.size === size
          ? { ...item, qty }
          : item
      )
    );
  };

  // ✅ CLEAR
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
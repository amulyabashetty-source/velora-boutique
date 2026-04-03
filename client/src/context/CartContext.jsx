import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  // ✅ Load cart once (no blinking)
  const [cart, setCart] = useState(() => {
    try {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // ✅ Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ ADD TO CART
  const addToCart = (product, size) => {

    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first ❌");
      return;
    }

    if (!size) {
      alert("Please select size ❌");
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id && item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      // 🔥 FIX IMAGE (handles array + single + windows path)
      const imageToStore =
        product.images && product.images.length > 0
          ? product.images[0]
          : product.image || "";

      let fixedImage = "";

      if (imageToStore) {
        const cleanPath = imageToStore.replace(/\\/g, "/"); // ⭐ IMPORTANT

        fixedImage = cleanPath.startsWith("http")
          ? cleanPath
          : `http://localhost:5000/${cleanPath}`;
      }

      return [
        ...prev,
        {
          ...product,
          image: fixedImage,
          size,
          qty: 1,
        },
      ];
    });
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
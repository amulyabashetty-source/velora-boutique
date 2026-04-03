import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // ✅ Load addresses
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(data);
  }, []);

  // ✅ Total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Place Order
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    if (!selectedAddress) {
      alert("Please select address ❌");
      return;
    }

    const newOrder = {
  id: Date.now(),
  items: cart,
  address: selectedAddress,
  total,
  paymentMethod,   // ⭐ ADD THIS
  status: "Pending",
  date: new Date().toLocaleDateString(),
};
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder]),
    );

    clearCart();

clearCart();

navigate("/success", {
  state: { orderId: newOrder.id }
});
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] p-6">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      {/* 🛒 EMPTY CART */}
      {cart.length === 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 text-center">
          <p className="text-gray-500 mb-3">Your cart is empty</p>
          <button
            onClick={() => navigate("/collections")}
            className="bg-pink-600 text-white px-5 py-2 rounded-lg"
          >
            Shop Now
          </button>
        </div>
      )}

      {/* 🧾 ORDER SUMMARY */}
      {cart.length > 0 && (
        <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
          <h3 className="font-semibold mb-3">Order Summary</h3>

          {cart.map((item) => (
            <div
              key={item._id + item.size}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.name} ({item.size}) x{item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr className="my-2" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      )}

      {/* 📍 ADDRESS */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Select Address</h3>

          <button
            onClick={() => navigate("/address")}
            className="text-sm text-pink-600 font-medium"
          >
            + Add New
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-3">No address found</p>

            <button
              onClick={() => navigate("/address")}
              className="bg-pink-600 text-white px-5 py-2 rounded-lg"
            >
              Add Address
            </button>
          </div>
        ) : (
          addresses.map((a) => (
            <div
              key={a.id}
              onClick={() => setSelectedAddress(a)}
              className={`p-4 border rounded-lg mb-3 cursor-pointer transition ${
                selectedAddress?.id === a.id
                  ? "border-[#2F4F2F] bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-medium">{a.name}</p>
              <p className="text-sm text-gray-600">{a.phone}</p>

              <p className="text-sm text-gray-600 mt-1">
                {a.street}, {a.city}
              </p>
              <p className="text-sm text-gray-600">
                {a.state} - {a.pincode}
              </p>
            </div>
          ))
        )}
      </div>

      {/* PAYMENT METHOD */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
        <h3 className="font-semibold mb-3">Select Payment Method</h3>

        {["COD", "UPI", "CARD"].map((method) => (
          <div
            key={method}
            onClick={() => setPaymentMethod(method)}
            className={`p-3 border rounded mb-2 cursor-pointer ${
              paymentMethod === method ? "border-green-700 bg-green-50" : ""
            }`}
          >
            {method === "COD" && "Cash on Delivery"}
            {method === "UPI" && "UPI Payment"}
            {method === "CARD" && "Credit / Debit Card"}
          </div>
        ))}
      </div>

      {/* 🚀 PLACE ORDER */}
      <button
        onClick={handlePlaceOrder}
        disabled={cart.length === 0}
        className="w-full bg-[#2F4F2F] text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;

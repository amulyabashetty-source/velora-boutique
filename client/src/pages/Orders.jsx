import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data.reverse()); // latest first
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F2] p-6">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-gray-500">No orders yet</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-xl shadow-sm mb-5"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-3 text-sm text-gray-500">
              <span>Date: {order.date}</span>
              <span className="text-green-600 font-medium">
                {order.status || "Placed"}
              </span>
            </div>

            {/* ITEMS */}
            {order.items.map((item) => (
              <div
                key={item._id + item.size}
                className="flex justify-between text-sm mt-2"
              >
                <span>
                  {item.name} ({item.size}) x{item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            {/* TOTAL */}
            <p className="font-semibold mt-3">
              Total: ₹{order.total}
            </p>

            {/* PAYMENT */}
            <p className="text-sm text-gray-600 mt-1">
              Payment: {order.paymentMethod || "COD"}
            </p>

            {/* ADDRESS */}
            <div className="text-sm text-gray-500 mt-2">
              <p>{order.address?.name}</p>
              <p>
                {order.address?.street}, {order.address?.city}
              </p>
              <p>
                {order.address?.state} - {order.address?.pincode}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
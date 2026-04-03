import { useNavigate, useLocation } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-xl shadow-md text-center w-[350px]">

        {/* ✅ ICON */}
        <div className="text-green-600 text-5xl mb-4">✔</div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-2">
          Order Placed!
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-4">
          Your order has been successfully placed.
        </p>

        {/* ORDER ID */}
        <p className="text-sm text-gray-500 mb-6">
          Order ID: {orderId}
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="bg-[#2F4F2F] text-white py-2 rounded-lg"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/collections")}
            className="border py-2 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
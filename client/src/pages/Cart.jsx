import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={`${item._id}-${item.size}`}
              className="flex items-center justify-between bg-white p-4 mb-4 shadow rounded"
            >
              {/* LEFT */}
              <div className="flex gap-4 items-center">

                {/* ✅ IMAGE */}
                <img
                  src={item.image ? item.image : "/no-image.png"}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = "/no-image.png";
                  }}
                  className="w-24 h-24 object-cover rounded"
                />

                {/* DETAILS */}
                <div>
                  <h3
                    className="font-semibold cursor-pointer hover:underline"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    {item.name}
                  </h3>

                  <p className="text-pink-600 font-bold">
                    ₹ {item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQty(item._id, item.size, item.qty - 1)
                      }
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        updateQty(item._id, item.size, item.qty + 1)
                      }
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <button
                onClick={() =>
                  removeFromCart(item._id, item.size)
                }
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* CHECKOUT */}
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-700 text-white px-6 py-2 rounded mt-4"
          >
            Checkout
          </button>

          {/* TOTAL */}
          <h3 className="text-xl font-bold mt-6">
            Total: ₹ {total}
          </h3>
        </>
      )}
    </div>
  );
}

export default Cart;
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between bg-white p-4 mb-4 shadow rounded"
        >
          <div className="flex gap-4 items-center">
            <img
              src={item.image}
              className="w-20 h-20 object-cover"
            />

            <div>
              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>

              <input
                type="number"
                value={item.qty}
                min="1"
                onChange={(e) =>
                  updateQty(item._id, Number(e.target.value))
                }
                className="border w-16 mt-2"
              />
            </div>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <h3 className="text-xl font-bold mt-6">
        Total: ₹ {total}
      </h3>
    </div>
  );
}

export default Cart;
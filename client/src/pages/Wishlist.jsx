import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty ❤️</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            
            //  IMAGE FIX (handles both backend + cloud links)
            const imageUrl =
              item.images?.[0]?.startsWith("http")
                ? item.images[0]
                : item.images?.[0]
                ? `${import.meta.env.VITE_API_URL}/${item.images[0]}`
                : item.image?.startsWith("http")
                ? item.image
                : item.image
                ? `${import.meta.env.VITE_API_URL}/${item.image}`
                : "/no-image.png";

            return (
              <div
                key={item._id}
                className="bg-white p-3 rounded shadow-sm hover:shadow-md transition"
              >
                
                {/* IMAGE CLICK */}
                <img
                  src={imageUrl}
                  alt={item.name}
                  onClick={() => navigate(`/product/${item._id}`)}
                  onError={(e) => (e.target.src = "/no-image.png")}
                  className="h-60 w-full object-cover rounded cursor-pointer"
                />

                {/*  NAME CLICK */}
                <h3
                  className="mt-2 text-sm font-medium cursor-pointer hover:underline"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  {item.name}
                </h3>

                <p className="text-pink-600 font-semibold">
                  ₹{item.price}
                </p>

                {/*  REMOVE BUTTON */}
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
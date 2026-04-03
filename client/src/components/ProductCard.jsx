import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isWishlisted = wishlist.some((p) => p._id === product._id);

  const imageUrl =
    product.images?.length > 0
      ? product.images[0]
      : product.image ||
        "https://dummyimage.com/400x500/cccccc/000000&text=No+Image";

  const mrp = Math.floor(product.price * 1.3);
  const discount = Math.floor(((mrp - product.price) / mrp) * 100);

  return (
    <div className="bg-white rounded-md hover:shadow-md transition overflow-hidden relative">
      
      {/* ❤️ Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent navigation
          toggleWishlist(product);
        }}
        className="absolute top-2 right-2 text-lg"
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      {/* CARD CLICK */}
      <div onClick={() => navigate(`/product/${product._id}`)}>
        
        {/* IMAGE */}
        <div className="w-full h-[320px] bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-top hover:scale-105 transition duration-300"
          />
        </div>

        {/* CONTENT */}
        <div className="p-3">
          <p className="text-gray-400 text-xs uppercase">
            {product.category}
          </p>

          <h2 className="text-sm font-medium text-gray-800 mt-1 line-clamp-2">
            {product.name}
          </h2>

          <div className="mt-2 flex items-center gap-2">
            <span className="font-semibold">₹{product.price}</span>
            <span className="line-through text-gray-400 text-sm">
              ₹{mrp}
            </span>
            <span className="text-green-600 text-xs">
              {discount}% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isWishlisted = wishlist.some((p) => p._id === product._id);

  const getImage = (img) => {
    if (!img) return "/no-image.png";
    return img.startsWith("http")
      ? img
      : `http://localhost:5000/${img}`;
  };

  const imageUrl = product.images?.[0];

  const mrp = Math.floor(product.price * 1.3);
  const discount = Math.floor(((mrp - product.price) / mrp) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden relative group cursor-pointer">

      {/* ❤️ Wishlist */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-3 right-3 text-xl z-10"
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      <div onClick={() => navigate(`/product/${product._id}`)}>

        {/* IMAGE */}
        <div className="h-[300px] bg-[#f8f6f2] flex items-center justify-center p-4">
          <img
            src={getImage(imageUrl)}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* CONTENT */}
        <div className="p-4">

          <p className="text-xs text-gray-400 uppercase mb-1">
            {product.category}
          </p>

          <h2 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
            {product.name}
          </h2>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#2F4F2F]">
              ₹{product.price}
            </span>

            <span className="line-through text-gray-400 text-sm">
              ₹{mrp}
            </span>

            <span className="text-green-600 text-xs font-medium">
              {discount}% OFF
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="font-semibold text-lg truncate">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-pink-600 font-bold text-lg">
            ₹{product.price}
          </p>

          {/* Wishlist icon */}
          <span className="text-gray-400 group-hover:text-pink-500 transition">
            ♥
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
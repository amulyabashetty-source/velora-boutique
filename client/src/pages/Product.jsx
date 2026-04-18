import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Product() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [similar, setSimilar] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  //  FRONTEND SIZE LOGIC
  const getSizesByCategory = (category) => {
    if (!category) return [];

    const cat = category.toLowerCase();

    if (["kurtis", "anarkalis", "lehengas"].includes(cat)) {
      return ["S", "M", "L", "XL", "XXL"];
    }

    if (cat === "footwear") {
      return ["6", "7", "8", "9", "10"];
    }

    return []; // sarees, accessories
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
      );
      setProduct(res.data);
      setMainImage(res.data.images?.[0] || res.data.image);
      setSelectedSize("");
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!product) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`,
      );

      const filtered = res.data
        .filter(
          (p) =>
            p.category?.toLowerCase() === product.category?.toLowerCase() &&
            p._id !== product._id,
        )
        .slice(0, 8);

      setSimilar(filtered);
    };

    fetchSimilar();
  }, [product]);

  if (!product) return <p className="p-10">Loading...</p>;

  const isWishlisted = wishlist.some((p) => p._id === product._id);

  const getImage = (img) => {
    if (!img) return "/no-image.png";
    return img.startsWith("http")
  ? img
  : `${import.meta.env.VITE_API_URL}/${img}`;
  };

  //  NEW (replace backend sizes)
  const sizes = getSizesByCategory(product.category);
  const requiresSize = sizes.length > 0;

  const category = (product.category || "").toLowerCase();

  const imageStyle = ["footwear", "handbags", "accessories"].includes(category)
    ? "object-cover object-center w-full h-full"
    : "object-contain";

  return (
    <div className="px-10 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {(product.images || [product.image]).map((img, i) => (
              <img
                key={i}
                src={getImage(img)}
                onClick={() => setMainImage(img)}
                className="w-16 h-16 object-cover border rounded cursor-pointer"
              />
            ))}
          </div>

          <div
            className="w-full h-[500px] bg-white rounded flex items-center justify-center overflow-hidden"
            onClick={() => setShowModal(true)}
          >
            <img
              src={getImage(mainImage)}
              className={`max-h-full max-w-full ${imageStyle}`}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <p className="text-yellow-500 mt-2">★★★★★</p>
          <p className="text-gray-400 text-sm">0 reviews</p>

          <h2 className="text-2xl font-bold mt-3">₹ {product.price}</h2>

          {/*  SIZE UI */}
          {requiresSize && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Select Size</p>

              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size ? "bg-[#2F4F2F] text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => addToCart(product, selectedSize)}
              className="bg-[#2F4F2F] text-white px-6 py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="border px-6 py-2 rounded"
            >
              {isWishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
            </button>
          </div>

          {/* DETAILS */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Product Details</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <b>Fabric:</b> {product.fabric || "N/A"}
              </p>
              <p>
                <b>Pattern:</b> {product.pattern || "N/A"}
              </p>
              <p>
                <b>Occasion:</b> {product.occasion || "N/A"}
              </p>
              <p>
                <b>Care:</b> {product.care || "N/A"}
              </p>
              <p>
                <b>Origin:</b> {product.origin || "India"}
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Description</h3>

            <p className="text-gray-600 text-sm">
              {showFullDesc
                ? product.description
                : product.description?.slice(0, 120)}
            </p>

            {product.description?.length > 120 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-green-700 mt-2 text-sm"
              >
                {showFullDesc ? "Show Less ▲" : "Read More ▼"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SIMILAR */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Similar Styles</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {similar.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-5 right-8 text-white text-3xl"
          >
            ✕
          </button>

          <img
            src={getImage(mainImage)}
            className="max-h-[90%] max-w-[90%] object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default Product;

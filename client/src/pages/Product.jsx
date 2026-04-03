import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import StarRating from "../components/StarRating";
import ReviewForm from "../components/ReviewForm";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [showZoom, setShowZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  // FETCH PRODUCT
  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:5000/api/products/${id}`);
    setProduct(res.data);

    if (res.data?.images?.length > 0) {
      setSelectedImage(res.data.images[0]);
    } else {
      setSelectedImage(res.data.image);
    }
  };

  // FETCH ALL PRODUCTS
  const fetchAllProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProduct();
    fetchAllProducts();
  }, [id]);

  // AUTO SLIDER
  useEffect(() => {
    const slider = document.getElementById("slider");
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  if (!product) return <p className="p-10">Loading...</p>;

  const images =
    product.images?.length > 0 ? product.images : [product.image];

  const isWishlisted = wishlist.find((p) => p._id === product._id);

  const getImage = (img) => {
    if (!img) return "/no-image.png";
    return img.startsWith("http")
      ? img
      : `http://localhost:5000/${img}`;
  };

  const similarProducts = products.filter(
    (p) =>
      p.category === product.category && p._id !== product._id
  );

  return (
    <div className="p-10">

      {/* MAIN SECTION */}
      <div className="flex flex-col md:flex-row gap-10">

        {/* LEFT IMAGES */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={getImage(img)}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-24 object-cover rounded cursor-pointer border ${
                  selectedImage === img ? "border-black" : ""
                }`}
              />
            ))}
          </div>

          <div className="w-[350px] h-[450px] rounded-lg overflow-hidden">
            <img
              src={getImage(selectedImage)}
              onClick={() => setShowZoom(true)}
              className="w-full h-full object-cover hover:scale-110 transition duration-500 cursor-zoom-in"
            />
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="max-w-md">
          <h1 className="text-2xl font-semibold mb-2">
            {product.name}
          </h1>

          <StarRating rating={product.averageRating} />

          <p className="text-gray-500 text-sm mb-2">
            {product.reviews?.length || 0} reviews
          </p>

          <p className="text-xl text-pink-600 font-bold mb-2">
            ₹ {product.price}
          </p>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          {/* SIZE */}
          <div className="mb-4">
            <p className="mb-2 font-medium">Select Size</p>

            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (!selectedSize) {
                  alert("Select size ❌");
                  return;
                }
                addToCart(product, selectedSize);
                navigate("/cart");
              }}
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
        </div>
      </div>

      {/* ZOOM */}
      {showZoom && (
        <div
          onClick={() => setShowZoom(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img
            src={getImage(selectedImage)}
            className="max-h-[90%] max-w-[90%]"
          />
        </div>
      )}

      {/* 🔥 SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className="mt-16 relative">

          <h2 className="text-xl font-semibold mb-4">
            Similar Styles
          </h2>

          {/* LEFT ARROW */}
          <button
            onClick={() =>
              document.getElementById("slider").scrollBy({
                left: -300,
                behavior: "smooth",
              })
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                       bg-white/90 hover:bg-white shadow-md 
                       p-2 rounded-full transition"
          >
            <span className="text-gray-700 text-lg">&#8592;</span>
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() =>
              document.getElementById("slider").scrollBy({
                left: 300,
                behavior: "smooth",
              })
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                       bg-white/90 hover:bg-white shadow-md 
                       p-2 rounded-full transition"
          >
            <span className="text-gray-700 text-lg">&#8594;</span>
          </button>

          {/* SLIDER */}
          <div
            id="slider"
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-10"
          >
            {similarProducts.slice(0, 8).map((p) => {
              const img = p.images?.[0] || p.image;

              return (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="min-w-[180px] cursor-pointer"
                >
                  <img
                    src={getImage(img)}
                    className="h-52 w-full object-cover rounded"
                  />

                  <h3 className="text-sm mt-2 line-clamp-2">
                    {p.name}
                  </h3>

                  <p className="text-pink-600 font-semibold">
                    ₹ {p.price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
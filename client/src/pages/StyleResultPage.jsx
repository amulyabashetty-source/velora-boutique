import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function StyleResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [hairstyles, setHairstyles] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  //  Load Hairstyles from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("hairstyles")) || [];
    setHairstyles(data);
  }, []);

  // Load Products from Backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
  .then((res) => res.json())
  .then((data) => setProducts(data))
  .catch((err) => console.log(err));
  }, []);

  if (!state) return <div className="p-10">No data found</div>;

  const { faceShape, occasion } = state;

  //  Category Mapping
  const categoryMap = {
    Wedding: ["sarees", "lehengas"],
    Daily: ["kurtis"],
    Party: ["anarkalis"],
    Festive: ["sarees", "anarkalis"],
  };

  const selectedCategories = categoryMap[occasion] || [];

  //  Filter Outfits
  const outfits = products.filter((p) =>
    selectedCategories.includes(p.category?.toLowerCase())
  );

  //  Accessories
  const accessories = products.filter((p) =>
    ["accessories", "handbags", "footwear"].includes(
      p.category?.toLowerCase()
    )
  );

  //  Hairstyles
  const filteredHair = hairstyles.filter(
    (h) => h.faceShape === faceShape
  );

  return (
    <div className="bg-[#f3eee9] min-h-screen p-6">

      {/*  HEADER */}
      <div className="bg-white rounded-2xl p-5 shadow mb-10 flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            Face Shape: <b>{faceShape}</b>
          </p>
          <p className="text-gray-600">
            Occasion: <b>{occasion}</b>
          </p>
        </div>

        <button
          onClick={() => navigate("/style-match")}
          className="bg-[#2f4f4f] text-white px-5 py-2 rounded-full"
        >
          Refine
        </button>
      </div>

      {/*  OUTFITS */}
      <h2 className="text-2xl font-semibold mb-6 text-[#2f4f4f]">
        Recommended Outfits
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-14">
        {outfits.length === 0 ? (
          <p>No outfits available</p>
        ) : (
          outfits.slice(0, 8).map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer flex flex-col overflow-hidden"
            >
              {/* IMAGE */}
              <div className="w-full h-[450px] bg-[#f8f5f2] flex items-center justify-center p-4">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* TEXT */}
              <div className="p-4">
                <p className="text-sm font-medium leading-snug line-clamp-2">
                  {p.name}
                </p>
                <p className="text-[#2f4f4f] font-semibold mt-2">
                  ₹ {p.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/*  ACCESSORIES */}
      <h2 className="text-xl font-semibold mb-4 text-[#2f4f4f]">
        Complete Your Look
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
        {accessories.length === 0 ? (
          <p>No accessories found</p>
        ) : (
          accessories.slice(0, 4).map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer overflow-hidden"
            >
              <div className="h-[180px] flex items-center justify-center bg-[#f8f5f2] p-2">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <p className="text-xs text-center p-2">{p.name}</p>
            </div>
          ))
        )}
      </div>

      {/*  HAIRSTYLES */}
      <h2 className="text-xl font-semibold mb-4 text-[#2f4f4f]">
        Hairstyles for You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredHair.length === 0 ? (
          <p>No hairstyles found</p>
        ) : (
          filteredHair.map((h, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(h.image)}
              className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            >
              <div className="h-[350px] flex items-center justify-center bg-[#f8f5f2] p-4">
                <img
                  src={h.image}
                  alt={h.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <p className="text-center p-3 font-medium">{h.name}</p>
            </div>
          ))
        )}
      </div>

      {/*  IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 bg-white px-3 py-1 rounded-full shadow"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-[80vh] max-w-[90vw] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default StyleResultPage;
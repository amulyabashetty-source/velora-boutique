import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p._id === id);

  if (!product) return <h2 className="p-10">Product not found</h2>;

  // ✅ FIX IMAGE
  const mainImage =
    product.image?.startsWith("http")
      ? product.image
      : `http://localhost:5000/${product.image}`;

  // ✅ SIMILAR PRODUCTS
  const similarProducts = products.filter(
    (p) =>
      p.category === product.category && p._id !== product._id
  );

  return (
    <div className="p-10 max-w-6xl mx-auto">

      {/* 🔥 PRODUCT SECTION */}
      <div className="flex flex-col md:flex-row gap-10">

        {/* IMAGE */}
        <img
          src={mainImage}
          alt={product.name}
          className="w-full md:w-96 rounded-lg object-cover"
        />

        {/* DETAILS */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {product.name}
          </h2>

          <p className="text-xl text-pink-600 font-bold mb-2">
            ₹ {product.price}
          </p>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <button className="bg-[#2F4F2F] text-white px-6 py-2 rounded">
            Add to Cart
          </button>
        </div>

      </div>

      {/* 🔥 SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            Similar Styles
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-2">

            {similarProducts.map((p) => {
              const image =
                p.image?.startsWith("http")
                  ? p.image
                  : `http://localhost:5000/${p.image}`;

              return (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="min-w-[180px] cursor-pointer"
                >
                  <img
                    src={image}
                    alt={p.name}
                    className="h-52 w-full object-cover rounded"
                  />

                  <h3 className="text-sm mt-2 line-clamp-2">
                    {p.name}
                  </h3>

                  <p className="font-semibold text-pink-600">
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

export default ProductDetails;
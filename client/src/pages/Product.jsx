import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products`
        );

        // find selected product
        const found = res.data.find((p) => p._id === id);
        setProduct(found);

      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="grid md:grid-cols-2 gap-8">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-lg"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-gray-600 mt-2">
            {product.description}
          </p>

          <p className="text-2xl text-pink-600 font-bold mt-4">
            ₹{product.price}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Category: {product.category}
          </p>

          {/* BUTTON */}
          <button className="mt-6 bg-pink-600 text-white px-6 py-2 rounded">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default Product;
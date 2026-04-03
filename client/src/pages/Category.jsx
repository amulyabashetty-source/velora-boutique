import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Category() {
  const { name } = useParams();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [priceRange, setPriceRange] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");

      const data = res.data.filter(
        (p) =>
          p.category?.toLowerCase().trim() ===
          name.toLowerCase().trim()
      );

      setProducts(data);
      setFiltered(data);
    };

    fetchProducts();
  }, [name]);

  // ✅ FILTER LOGIC
  useEffect(() => {
    let result = [...products];

    if (priceRange) {
      result = result.filter((p) => p.price <= priceRange);
    }

    if (color) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(color)
      );
    }

    setFiltered(result);
  }, [priceRange, color, products]);

  return (
    <div className="px-8 py-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {name}
      </h2>

      {/* 🔥 SIMPLE FILTER BAR */}
      <div className="flex gap-4 mb-6">

        {/* PRICE */}
        <select
          onChange={(e) => setPriceRange(e.target.value)}
          className="border px-4 py-2 rounded-md bg-white"
        >
          <option value="">All Prices</option>
          <option value="1000">Below ₹1000</option>
          <option value="3000">Below ₹3000</option>
          <option value="5000">Below ₹5000</option>
          <option value="10000">Below ₹10000</option>
        </select>

        {/* COLOR */}
        <select
          onChange={(e) => setColor(e.target.value)}
          className="border px-4 py-2 rounded-md bg-white"
        >
          <option value="">All Colors</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="white">White</option>
          <option value="pink">Pink</option>
        </select>

        {/* RESET */}
        <button
          onClick={() => {
            setPriceRange("");
            setColor("");
          }}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* PRODUCTS */}
      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
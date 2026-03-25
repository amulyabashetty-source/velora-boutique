import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Category() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");

      // ✅ FIX: normalize both sides
      const filtered = res.data.filter(
        (p) =>
          p.category.toLowerCase().trim() === name.toLowerCase().trim()
      );

      setProducts(filtered);
    };

    fetchProducts();
  }, [name]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">{name}</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
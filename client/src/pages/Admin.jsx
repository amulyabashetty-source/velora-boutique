import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    images: [],
    imageUrls: "",
    description: "",
    fabric: "",
    occasion: "",
    pattern: "",
    care: "",
    origin: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  //  FIXED FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);

      console.log("ADMIN API RESPONSE:", res.data);

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        console.error("Invalid API format:", res.data);
        setProducts([]);
      }

    } catch (err) {
      console.log(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value || "" });
  };

  // FILE CHANGE
  const handleFileChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Login first ❌");
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (key !== "images") {
        formData.append(key, form[key] || "");
      }
    });

    if (form.images && form.images.length > 0) {
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }
    }

    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Product Updated ");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/products/add`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Product Added ");
      }

      setForm({
        name: "",
        price: "",
        category: "",
        images: [],
        imageUrls: "",
        description: "",
        fabric: "",
        occasion: "",
        pattern: "",
        care: "",
        origin: "",
      });

      setEditingId(null);
      fetchProducts();

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      {editingId && (
        <p className="text-yellow-600 font-semibold mb-3">
          ✏️ Editing Product
        </p>
      )}

      {/* FORM */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2" />

        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-2" />

        <select name="category" value={form.category} onChange={handleChange} className="w-full border p-2">
          <option value="">Select Category</option>
          <option value="anarkalis">Anarkalis</option>
          <option value="kurtis">Kurtis</option>
          <option value="lehengas">Lehengas</option>
          <option value="pattu-sarees">Pattu-Sarees</option>
          <option value="sarees">Sarees</option>
          <option value="accessories">Accessories</option>
          <option value="handbag">Hand-Bag</option>
          <option value="footwear">Footwear</option>
        </select>

        <input type="file" multiple onChange={handleFileChange} className="w-full border p-2" />

        <input name="imageUrls" value={form.imageUrls} onChange={handleChange} placeholder="Image URLs" className="w-full border p-2" />

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" />

        <input name="fabric" value={form.fabric} onChange={handleChange} placeholder="Fabric" className="w-full border p-2" />
        <input name="occasion" value={form.occasion} onChange={handleChange} placeholder="Occasion" className="w-full border p-2" />
        <input name="pattern" value={form.pattern} onChange={handleChange} placeholder="Pattern" className="w-full border p-2" />
        <input name="care" value={form.care} onChange={handleChange} placeholder="Care Instructions" className="w-full border p-2" />
        <input name="origin" value={form.origin} onChange={handleChange} placeholder="Country of Origin" className="w-full border p-2" />

        <div className="flex gap-3">
          <button className="bg-pink-600 text-white px-6 py-2 rounded">
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({
                  name: "",
                  price: "",
                  category: "",
                  images: [],
                  imageUrls: "",
                  description: "",
                  fabric: "",
                  occasion: "",
                  pattern: "",
                  care: "",
                  origin: "",
                });
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* PRODUCTS */}
      <h2 className="text-xl font-bold mt-10 mb-4">All Products</h2>

      {/* ✅ SAFE MAP FIX */}
      {Array.isArray(products) && products.map((p) => {

        const imageUrl =
          p.images?.[0]?.startsWith("http")
            ? p.images[0]
            : p.images?.[0]
            ? `${import.meta.env.VITE_API_URL}/${p.images[0]}`
            : "/no-image.png";

        return (
          <div key={p._id} className="flex justify-between items-center bg-white p-4 shadow rounded mb-4">

            <div className="flex gap-4 items-center">

              <img
                src={imageUrl}
                alt={p.name}
                onClick={() => navigate(`/product/${p._id}`)}
                onError={(e) => (e.target.src = "/no-image.png")}
                className="w-24 h-24 object-cover rounded cursor-pointer"
              />

              <div>
                <h3 className="cursor-pointer hover:underline" onClick={() => navigate(`/product/${p._id}`)}>
                  {p.name}
                </h3>

                <p>₹ {p.price}</p>
                <p className="text-sm text-gray-400">{p.category}</p>
              </div>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => {
                  setForm({
                    name: p.name || "",
                    price: p.price || "",
                    category: p.category || "",
                    description: p.description || "",
                    imageUrls: "",
                    images: [],
                    fabric: p.fabric || "",
                    occasion: p.occasion || "",
                    pattern: p.pattern || "",
                    care: p.care || "",
                    origin: p.origin || "",
                  });

                  setEditingId(p._id);

                  formRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="bg-yellow-400 px-4 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Admin;
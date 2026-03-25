import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Admin() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
    description: ""
  });

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const formRef = useRef();

  const token = localStorage.getItem("token");

  // 🔹 fetch products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // 🔹 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("description", form.description);

      // ✅ FILE or URL
      if (form.image instanceof File) {
        formData.append("image", form.image);
      } else if (typeof form.image === "string") {
        formData.append("image", form.image);
      }

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          formData,
          {
            headers: { Authorization: token },
          }
        );
        alert("Product updated ✅");
      } else {
        await axios.post(
          "http://localhost:5000/api/products/add",
          formData,
          {
            headers: { Authorization: token },
          }
        );
        alert("Product added ✅");
      }

      setForm({
        name: "",
        price: "",
        category: "",
        image: null,
        description: ""
      });

      setEditingId(null);
      fetchProducts();

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  // 🔹 delete
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      {
        headers: { Authorization: token },
      }
    );

    fetchProducts();
  };

  // 🔹 edit
  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      category: p.category,
      image: "",
      description: p.description
    });

    setEditingId(p._id);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      {/* FORM */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2"
        />

        {/* FILE */}
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border p-2"
        />

        {/* URL */}
        <input
          type="text"
          name="image"
          placeholder="Or paste image URL"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
        />

        <button className="bg-pink-600 text-white px-6 py-2 rounded">
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </form>

      {/* PRODUCTS */}
      <h2 className="text-xl font-bold mt-10 mb-4">All Products</h2>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
          >

            <div className="flex items-center gap-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p>₹ {p.price}</p>
                <p className="text-sm text-gray-400">{p.category}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Admin;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  //  Load addresses
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(data);
  }, []);

  //  Save addresses
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    setAddresses([...addresses, { ...form, id: Date.now() }]);

    setForm({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: ""
    });

    setShowForm(false);
  };

  // delete
  const handleDelete = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-600 hover:text-black"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold mb-6">My Addresses</h2>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700"
      >
        + Add Address
      </button>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm mb-6 grid gap-3"
        >
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="street"
            placeholder="Street / Area"
            value={form.street}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button className="bg-[#2F4F2F] text-white py-2 rounded-lg hover:opacity-90">
            Save Address
          </button>
        </form>
      )}

      {/* ADDRESS LIST */}
      {addresses.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-gray-500">No saved addresses</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((a) => (
            <div
              key={a.id}
              className="bg-white p-5 rounded-xl shadow-sm"
            >
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-gray-600">{a.phone}</p>

              <p className="text-sm text-gray-600 mt-2">
                {a.street}, {a.city}
              </p>
              <p className="text-sm text-gray-600">
                {a.state} - {a.pincode}
              </p>

              <button
                onClick={() => handleDelete(a.id)}
                className="text-red-500 text-sm mt-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Address;
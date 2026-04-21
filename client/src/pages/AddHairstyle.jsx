import { useState } from "react";

function AddHairstyle() {
  const [form, setForm] = useState({
    name: "",
    faceShape: "",
    occasion: "",
    image: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.faceShape || !form.occasion || !form.image) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/hairstyles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();
      console.log("Saved:", data);

      setForm({
        name: "",
        faceShape: "",
        occasion: "",
        image: "",
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.log(err);
      alert("Error saving hairstyle");
    }
  };

  return (
    <div className="bg-[#f3eee9] min-h-screen p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#2f4f4f]">
          Add Hairstyle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Hairstyle Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <select
            name="faceShape"
            value={form.faceShape}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Face Shape</option>
            <option value="Round">Round</option>
            <option value="Oval">Oval</option>
            <option value="Square">Square</option>
            <option value="Heart">Heart</option>
            <option value="Diamond">Diamond</option>
          </select>

          <select
            name="occasion"
            value={form.occasion}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Occasion</option>
            <option value="Wedding">Wedding</option>
            <option value="Party">Party</option>
            <option value="Daily">Daily</option>
            <option value="Festive">Festive</option>
          </select>

          <input
            type="text"
            name="image"
            placeholder="Paste Cloudinary Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button className="w-full bg-[#2f4f4f] text-white py-3 rounded-lg">
            Add Hairstyle
          </button>

          {success && (
            <p className="text-green-600 text-center">
              Hairstyle added successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddHairstyle;

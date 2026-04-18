import { useState } from "react";

function AddHairstyle() {
  const [form, setForm] = useState({
    name: "",
    faceShape: "",
    image: "",
  });

  const [success, setSuccess] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.faceShape || !form.image) {
      alert("Please fill all fields");
      return;
    }

    // get existing data
    const existing =
      JSON.parse(localStorage.getItem("hairstyles")) || [];

    // add new hairstyle
    const updated = [...existing, form];

    // save to localStorage
    localStorage.setItem("hairstyles", JSON.stringify(updated));

    console.log("Saved Hairstyles:", updated);

    // reset form
    setForm({
      name: "",
      faceShape: "",
      image: "",
    });

    // success message
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="bg-[#f3eee9] min-h-screen p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl">

        <h2 className="text-2xl font-semibold mb-6 text-center text-[#2f4f4f]">
          Add Hairstyle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Hairstyle Name */}
          <input
            type="text"
            name="name"
            placeholder="Hairstyle Name (e.g. Soft Layers)"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4f4f]"
          />

          {/* Face Shape */}
          <select
            name="faceShape"
            value={form.faceShape}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4f4f]"
          >
            <option value="">Select Face Shape</option>
            <option value="Round">Round</option>
            <option value="Oval">Oval</option>
            <option value="Square">Square</option>
            <option value="Heart">Heart</option>
            <option value="Diamond">Diamond</option>
          </select>

          {/* Image URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL (Cloudinary / Pinterest)"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4f4f]"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#2f4f4f] text-white py-3 rounded-lg hover:bg-[#3d6363] transition"
          >
            Add Hairstyle
          </button>

          {/* Success Message */}
          {success && (
            <p className="text-green-600 text-center mt-2">
              Hairstyle added successfully!
            </p>
          )}

        </form>
      </div>
    </div>
  );
}

export default AddHairstyle;
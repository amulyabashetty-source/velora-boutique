import { useEffect, useState } from "react";

function AdminHairstyles() {
  const [hairstyles, setHairstyles] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/hairstyles`)
      .then((res) => res.json())
      .then((data) => {
        setHairstyles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this hairstyle?");
    if (!confirmDelete) return;

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/hairstyles/${id}`,
        {
          method: "DELETE",
        }
      );

      setHairstyles((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-[#f3eee9] min-h-screen p-6">
      
      {/* TITLE */}
      <h2 className="text-3xl font-semibold mb-6 text-[#2f4f4f]">
        Manage Hairstyles
      </h2>

      {/* LOADING / EMPTY */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : hairstyles.length === 0 ? (
        <p className="text-center text-gray-500">No hairstyles found</p>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {hairstyles.map((h) => (
            <div
              key={h._id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
            >
              
              {/* IMAGE (PRODUCT STYLE FIX) */}
              <div className="w-full h-72 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={h.image}
                  alt={h.name}
                  className="max-h-full object-contain"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/250x300?text=No+Image")
                  }
                />
              </div>

              {/* DETAILS */}
              <div className="mt-3 text-center">
                <p className="font-medium text-gray-800 text-sm">
                  {h.name}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {h.faceShape} • {h.occasion}
                </p>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(h._id)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
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

export default AdminHairstyles;
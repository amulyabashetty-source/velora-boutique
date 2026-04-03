import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ FIX: Redirect safely
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Prevent crash before redirect
  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Get initials
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // ✅ Menu items with navigation
  const menuItems = [
    { name: "Orders", path: "/orders" },
    { name: "Customer Care", path: "/support" },
    { name: "Address", path: "/address" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-white p-5 text-lg font-semibold shadow-sm">
        My Account
      </div>

      {/* PROFILE CARD */}
      <div className="bg-[#EDE8E1] p-5 flex items-center gap-4">

        {/* AVATAR */}
        <div className="w-16 h-16 bg-[#2F4F2F] text-white flex items-center justify-center rounded-full text-xl font-semibold shadow-md border-2 border-white">
          {getInitials(user.name)}
        </div>

        {/* USER INFO */}
        <div>
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-gray-600 text-sm">{user.email}</p>
          {user.phone && (
            <p className="text-gray-600 text-sm">{user.phone}</p>
          )}
        </div>
      </div>

      {/* MENU LIST */}
      <div className="bg-white mt-2">

        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="flex justify-between items-center px-5 py-4 border-b cursor-pointer hover:bg-gray-50 transition"
          >
            <span className="text-gray-700">{item.name}</span>
            <span className="text-gray-400 text-lg">›</span>
          </div>
        ))}

      </div>

      {/* LOGOUT */}
      <div className="p-5">
        <button
          onClick={handleLogout}
          className="w-full border border-[#2F4F2F] text-[#2F4F2F] py-3 rounded-lg hover:bg-[#2F4F2F] hover:text-white transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Profile;
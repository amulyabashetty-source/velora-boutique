import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  //  Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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

      {/* PROFILE */}
      <div className="bg-[#EDE8E1] p-6 flex items-center gap-4">

        <div className="w-16 h-16 bg-[#2F4F2F] text-white flex items-center justify-center rounded-full text-xl font-semibold">
          {getInitials(user.name)}
        </div>

        <div>
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* MENU */}
      <div className="bg-white mt-2">
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="flex justify-between px-5 py-4 border-b cursor-pointer hover:bg-gray-50"
          >
            {item.name}
            <span>›</span>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="p-5">
        <button
          onClick={handleLogout}
          className="w-full bg-[#2F4F2F] text-white py-3 rounded hover:bg-[#244024]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
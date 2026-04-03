import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import hero1 from "../assets/hero1.jpg";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/user/register",
        form
      );

      alert("Signup successful ✅");
      navigate("/login");
    } catch {
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">

      {/* MAIN CARD */}
      <div className="w-[850px] h-[520px] bg-white rounded-2xl shadow-xl flex overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="w-1/2">
          <img
            src={hero1}
            alt="fashion"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-1/2 flex flex-col justify-center px-10">

          <div className="flex justify-center mb-4">
            <img src={logo} alt="Velora" className="w-16" />
          </div>

          <h2 className="text-xl font-semibold text-center mb-6 text-[#2F4F2F]">
            Create Account
          </h2>

          <form onSubmit={handleSignup}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F4F2F]"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F4F2F]"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F4F2F]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F4F2F]"
            />

            <button className="w-full bg-[#2F4F2F] text-white py-3 rounded-lg hover:opacity-90">
              Signup
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#2F4F2F] cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;
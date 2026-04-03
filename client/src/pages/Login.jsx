import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import hero from "../assets/hero1.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">

      {/* MAIN CARD */}
      <div className="flex w-[900px] rounded-2xl overflow-hidden shadow-xl bg-white animate-fadeIn">

        {/* LEFT IMAGE */}
        <div className="w-1/2 h-[520px] relative">
          <img
            src={hero}
            alt="fashion"
            className="w-full h-full object-cover object-center"
          />

          {/* OVERLAY TEXT */}
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-sm opacity-80">
              Discover elegance. Shop your style.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-1/2 flex items-center justify-center">

          <div className="w-[80%]">

            {/* LOGO */}
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Velora" className="w-16" />
            </div>

            <h2 className="text-xl font-semibold text-center mb-6 text-[#2F4F2F]">
              Login to your account
            </h2>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full border p-3 mb-3 rounded-lg outline-none focus:ring-2 focus:ring-[#2F4F2F]/30"
              />

              {/* PASSWORD */}
              <div className="relative mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#2F4F2F]/30"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="flex justify-between items-center text-sm mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  Remember me
                </label>

                <span
                  className="text-[#2F4F2F] cursor-pointer"
                  onClick={() => alert("Forgot password later 🔐")}
                >
                  Forgot?
                </span>
              </div>

              {/* LOGIN BUTTON */}
              <button className="w-full bg-[#2F4F2F] text-white py-3 rounded-lg hover:scale-[1.02] hover:shadow-md transition duration-300">
                Login
              </button>

            </form>

            {/* GOOGLE BUTTON */}
            <div className="mt-4">
              <button className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </div>

            {/* NAVIGATION */}
            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-[#2F4F2F] cursor-pointer font-medium"
              >
                Signup
              </span>
            </p>

          </div>
        </div>

      </div>

      {/* ANIMATION */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
}

export default Login;
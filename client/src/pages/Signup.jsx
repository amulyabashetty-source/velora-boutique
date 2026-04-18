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
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill required fields");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        form,
      );

      setMessage("Signup successful ✅");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      setError("Signup failed ❌");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
      <div className="w-[850px] h-[520px] bg-white rounded-2xl shadow-xl flex overflow-hidden">
        <div className="w-1/2">
          <img src={hero1} className="w-full h-full object-cover" />
        </div>

        <div className="w-1/2 flex flex-col justify-center px-10">
          <div className="flex justify-center mb-4">
            <img src={logo} className="w-16" />
          </div>

          <h2 className="text-xl font-semibold text-center mb-6 text-[#2F4F2F]">
            Create Account
          </h2>

          {message && (
            <p className="text-green-600 text-sm text-center mb-2">{message}</p>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}

          <form onSubmit={handleSignup}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded-lg"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded-lg"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded-lg"
            />

            <button className="w-full bg-[#2F4F2F] text-white py-3 rounded-lg">
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

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
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      //  STORE ONLY IN localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/profile");   //  go to profile

    } catch {
      setError("Invalid email or password");
    }
  };

  const handleForgotPassword = async () => {
    try {
      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/users/forgot-password`,
        {
          email: forgotEmail,
        }
      );

      setMessage("Reset link sent to your email");
      setError("");
    } catch {
      setError("User not found");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
      <div className="flex w-[900px] rounded-2xl overflow-hidden shadow-xl bg-white">

        {/* LEFT */}
        <div className="w-1/2 h-[520px]">
          <img src={hero} className="w-full h-full object-cover" />
        </div>

        {/* RIGHT */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-[80%]">

            <div className="flex justify-center mb-4">
              <img src={logo} className="w-16" />
            </div>

            <h2 className="text-xl font-semibold text-center mb-4">
              Welcome Back
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center mb-2">
                {error}
              </p>
            )}

            <form onSubmit={handleLogin}>

              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full border p-3 mb-3 rounded-lg"
              />

              <div className="relative mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm mb-4">

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    onChange={handleChange}
                  />
                  Remember me
                </label>

                <span
                  className="text-[#2F4F2F] cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  Forgot Password?
                </span>
              </div>

              <button className="w-full bg-[#2F4F2F] text-white py-3 rounded-lg mb-3">
                Login
              </button>

            </form>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <span
                className="text-[#2F4F2F] cursor-pointer font-medium"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[350px] shadow-xl">

            <h2 className="text-lg font-semibold mb-3 text-center">
              Forgot Password
            </h2>

            <input
              type="email"
              placeholder="Enter your registered email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full border p-3 rounded-lg mb-3"
            />

            {message && (
              <p className="text-green-600 text-sm text-center">
                {message}
              </p>
            )}

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <div className="flex justify-between mt-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleForgotPassword}
                className="px-4 py-2 bg-[#2F4F2F] text-white rounded-lg"
              >
                Send Link
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // ✅ FIXED
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      window.location.href = "/admin"; // 🔥 redirect

    } catch (err) {
      console.log(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow-md rounded space-y-4 w-80">

        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button className="bg-pink-600 text-white w-full py-2 rounded">
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;
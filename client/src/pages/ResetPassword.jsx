import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (!password) {
      setError("Please enter a new password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/reset-password/${token}`,
        { password },
      );

      setMessage("Password updated successfully ✅");
      setError("");

      // redirect after 2 sec
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong ❌");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px] text-center">
        <h2 className="text-xl font-semibold mb-4 text-[#2F4F2F]">
          Reset Password
        </h2>

        {/* MESSAGE */}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        {/* ERROR */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={handleReset}
          className="w-full bg-[#2F4F2F] text-white py-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;

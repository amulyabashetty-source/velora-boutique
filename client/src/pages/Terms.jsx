import { useNavigate } from "react-router-dom";

function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5F2] p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-600 hover:text-black"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold mb-6">
        Terms & Conditions
      </h2>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-3 text-gray-600 leading-relaxed">

        <p>
          Welcome to Velora Boutique. By using our platform, you agree to follow our policies and guidelines.
        </p>

        <p>
          We ensure high-quality products, secure payments, and smooth delivery experience.
        </p>

        <p>
          Orders once placed cannot be modified after shipping.
        </p>

        <p>
          Returns are accepted within 7 days of delivery.
        </p>

      </div>
    </div>
  );
}

export default Terms;
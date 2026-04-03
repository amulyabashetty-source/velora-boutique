import { useNavigate } from "react-router-dom";

function CustomerCare() {
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
        Customer Support
      </h2>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">

        <div className="flex items-center gap-3">
          <span className="text-xl">📞</span>
          <p className="text-gray-700">
            +91 9876543210
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">📧</span>
          <p className="text-gray-700">
            support@velora.com
          </p>
        </div>

        <hr />

        <div>
          <p className="font-medium mb-2">FAQs</p>
          <ul className="text-gray-600 space-y-1 text-sm">
            <li>• How to return a product?</li>
            <li>• How to track my order?</li>
            <li>• Refund process details</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CustomerCare;
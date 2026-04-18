import { useNavigate } from "react-router-dom";
import {
  FiPhone,
  FiMail,
  FiHelpCircle,
  FiArrowLeft,
} from "react-icons/fi";

function CustomerCare() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5F2] p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-sm text-gray-600 hover:text-black"
      >
        <FiArrowLeft /> Back
      </button>

      {/* TITLE */}
      <h2 className="text-3xl font-semibold mb-6 text-[#2F4F2F]">
        Customer Support
      </h2>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">

        {/* CONTACT INFO */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* PHONE */}
          <div className="flex items-start gap-4 p-4 border rounded-xl hover:shadow-sm transition">
            <div className="bg-[#EDE8E1] p-3 rounded-full">
              <FiPhone className="text-xl text-[#2F4F2F]" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p className="text-gray-600 text-sm">
                Available 9 AM – 8 PM
              </p>
              <p className="text-[#2F4F2F] font-medium mt-1">
                +91 98765 43210
              </p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-start gap-4 p-4 border rounded-xl hover:shadow-sm transition">
            <div className="bg-[#EDE8E1] p-3 rounded-full">
              <FiMail className="text-xl text-[#2F4F2F]" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">Email Support</h3>
              <p className="text-gray-600 text-sm">
                We usually respond within 24 hours
              </p>
              <p className="text-[#2F4F2F] font-medium mt-1">
                support@velora.com
              </p>
            </div>
          </div>

        </div>

        <hr />

        {/* FAQ */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FiHelpCircle className="text-lg text-[#2F4F2F]" />
            <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">

            <div className="p-3 bg-[#f9f7f4] rounded-lg">
              <p className="font-medium">How can I return a product?</p>
              <p className="text-gray-600">
                You can request a return from your Orders page within 7 days of delivery.
              </p>
            </div>

            <div className="p-3 bg-[#f9f7f4] rounded-lg">
              <p className="font-medium">How do I track my order?</p>
              <p className="text-gray-600">
                Go to “My Orders” and click on your order to see tracking details.
              </p>
            </div>

            <div className="p-3 bg-[#f9f7f4] rounded-lg">
              <p className="font-medium">When will I get my refund?</p>
              <p className="text-gray-600">
                Refunds are processed within 5–7 business days after approval.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* EXTRA HELP */}
      <div className="text-center mt-8 text-sm text-gray-600">
        Need more help? Reach out to us anytime — we’re happy to assist you.
      </div>

    </div>
  );
}

export default CustomerCare;
import {
  FiRefreshCw,
  FiHeart,
  FiCheckCircle,
} from "react-icons/fi";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#748873] text-white mt-16">

      {/* Top Features */}
      <div className="grid md:grid-cols-3 text-center py-10 border-b border-gray-500">
        
        <div className="flex flex-col items-center">
          <FiRefreshCw size={28} />
          <h3 className="font-semibold mt-2">Easy Exchange</h3>
        </div>

        <div className="flex flex-col items-center">
          <FiHeart size={28} />
          <h3 className="font-semibold mt-2">100% Handpicked</h3>
        </div>

        <div className="flex flex-col items-center">
          <FiCheckCircle size={28} />
          <h3 className="font-semibold mt-2">Assured Quality</h3>
        </div>

      </div>

      {/* Links Section */}
      <div className="grid md:grid-cols-4 gap-8 px-10 py-10 text-sm">

        <div>
          <h2 className="font-bold mb-4">Velora</h2>
          <p className="hover:underline cursor-pointer">About Us</p>
          <p className="hover:underline cursor-pointer">Terms & Conditions</p>
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
          <p className="hover:underline cursor-pointer">Blog</p>
        </div>

        <div>
          <h2 className="font-bold mb-4">Help</h2>
          <p className="hover:underline cursor-pointer">Track Order</p>
          <p className="hover:underline cursor-pointer">Returns</p>
          <p className="hover:underline cursor-pointer">Payments</p>
          <p className="hover:underline cursor-pointer">Customer Care</p>
        </div>

        <div>
          <h2 className="font-bold mb-4">Shop</h2>
          <p className="hover:underline cursor-pointer">All Products</p>
          <p className="hover:underline cursor-pointer">Sarees</p>
          <p className="hover:underline cursor-pointer">Kurtis</p>
          <p className="hover:underline cursor-pointer">Lehengas</p>
        </div>

        <div>
          <h2 className="font-bold mb-4">Follow Us</h2>

          <div className="flex gap-4 mt-2">
            <FaInstagram size={20} className="cursor-pointer hover:text-gray-300" />
            <FaFacebookF size={20} className="cursor-pointer hover:text-gray-300" />
            <FaTwitter size={20} className="cursor-pointer hover:text-gray-300" />
            <FaPinterestP size={20} className="cursor-pointer hover:text-gray-300" />
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="text-center py-4 border-t border-gray-500 text-sm">
        © 2026 Velora Boutique. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
function Footer() {
  return (
    <footer className="bg-[#748873] text-white mt-16">
      
      {/* Top Features */}
      <div className="grid md:grid-cols-3 text-center py-10 border-b border-gray-500">
        <div>
          <p className="text-xl">🔄</p>
          <h3 className="font-semibold mt-2">Easy Exchange</h3>
        </div>

        <div>
          <p className="text-xl">❤️</p>
          <h3 className="font-semibold mt-2">100% Handpicked</h3>
        </div>

        <div>
          <p className="text-xl">✔</p>
          <h3 className="font-semibold mt-2">Assured Quality</h3>
        </div>
      </div>

      {/* Links Section */}
      <div className="grid md:grid-cols-4 gap-8 px-10 py-10 text-sm">
        
        <div>
          <h2 className="font-bold mb-4">Velora</h2>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Blog</p>
        </div>

        <div>
          <h2 className="font-bold mb-4">Help</h2>
          <p>Track Order</p>
          <p>Returns</p>
          <p>Payments</p>
          <p>Customer Care</p>
        </div>

        <div>
          <h2 className="font-bold mb-4">Shop</h2>
          <p>All Products</p>
          <p>Sarees</p>
          <p>Kurtis</p>
          <p>Lehengas</p>
        </div>

        <div>
          <h2 className="font-bold mb-4">Follow Us</h2>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Pinterest</p>
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
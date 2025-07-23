import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo and Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold flex items-center space-x-2">
            <span>AgriCare AI</span>
          </h3>
          <p className="text-sm text-green-200 mt-2">Empowering farmers with AI-driven plant care</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 text-xl">
          <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
            <FaWhatsapp />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-sm text-green-200 mt-6">
        © {new Date().getFullYear()} AgriCare AI. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

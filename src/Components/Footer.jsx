import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBasket, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-1.5 focus:outline-none">
              <div className="bg-linear-to-br from-brand-primary to-blue-600 p-1.5 rounded-xl">
                <ShoppingBasket className="text-white" size={22} strokeWidth={1} />
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white flex items-baseline">
                Urban<span className="text-brand-primary">Cart</span>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-primary rounded-full ml-0.5 mb-1 md:mb-1.5"></div>
              </h1>
            </Link>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              Your ultimate destination for fashion, electronics, and lifestyle products. We bring you the best deals with premium quality.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-gray-400">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-gray-400">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-gray-400">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-gray-400">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 flex items-center">
              <span className="bg-brand-primary w-1 h-5 rounded-full mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Contact Us', 'Terms & Conditions', 'Privacy Policy', 'FAQ', 'Blog'].map((link, idx) => (
                <li key={idx}>
                  <Link to="#" className="text-gray-400 hover:text-brand-primary transition-colors text-sm flex items-center before:content-[''] before:w-1 before:h-1 before:bg-brand-primary before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 before:transition-opacity">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 flex items-center">
              <span className="bg-blue-500 w-1 h-5 rounded-full mr-2"></span>
              Popular Categories
            </h3>
            <ul className="space-y-3">
              {['Women\'s Fashion', 'Men\'s Fashion', 'Electronics', 'Home & Lifestyle', 'Kids & Babies', 'Groceries'].map((category, idx) => (
                <li key={idx}>
                  <Link to={`/category/${category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-").replace(/'/g, "")}`} className="text-gray-400 hover:text-brand-primary transition-colors text-sm flex items-center before:content-[''] before:w-1 before:h-1 before:bg-blue-500 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 before:transition-opacity">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 flex items-center">
              <span className="bg-yellow-500 w-1 h-5 rounded-full mr-2"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-primary shrink-0 mt-0.5" size={20} />
                <span className="text-sm text-gray-400">123 Commerce Avenue, Building 4,<br />Tech Park, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-primary shrink-0" size={20} />
                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-primary shrink-0" size={20} />
                <span className="text-sm text-gray-400">support@urbancart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} UrbanCart. All rights reserved.
          </p>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all bg-white px-2 rounded-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all bg-white px-2 rounded-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" alt="PayPal" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all bg-white px-2 rounded-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

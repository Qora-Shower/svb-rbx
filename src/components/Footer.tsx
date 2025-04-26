
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">&copy; 2025 SVB & MBU Roblox. Alle Rechte vorbehalten.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/tos" className="text-gray-600 hover:text-[#33C3F0]">
            AGB |
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-[#33C3F0]">
              Datenschutz
            </Link>
            <a
              href="https://discord.com/channels/1358033580068044811/1358033584170205184"
              className="text-gray-600 hover:text-[#33C3F0]"
              target="_blank"
              rel="noopener noreferrer"
            >
            | Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const TestNav = () => {
  return (
    <div className="container mx-auto px-6 py-5">
      <nav className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-lg">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s"
            alt="TradeHub Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-xl font-bold text-gray-800 hover:text-indigo-300 transition-colors duration-300">
            HealthAI
          </span>
        </Link>
        <ul
          className={`lg:flex lg:items-center lg:justify-between lg:space-x-6 w-full lg:w-auto lg:flex-row flex flex-col lg:ml-auto mt-4 lg:mt-0`}
        >
          <li>
            <Link
              to="/"
              className="text-gray-200 hover:text-indigo-300 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-200 hover:text-indigo-300 transition-colors duration-300"
            >
              Find Care
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-200 hover:text-indigo-300 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/auth"
              className="text-gray-200 hover:text-indigo-300 transition-colors duration-300"
            >
              Autb
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TestNav;

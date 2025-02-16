import React from "react";
import { Link } from "react-router-dom";

const TestNav = () => {
  return (
    <div className="w-full">
      <nav className="flex justify-center items-center bg-gradient-to-b from-gray-100 to-white text-gray-900 py-4 px-6 w-full shadow-md">
        <div className="flex justify-between items-center w-full max-w-screen-xl">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s"
              alt="HealthAI Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-bold text-gray-900 hover:text-blue-500 transition-colors duration-300">
              HealthAI
            </span>
          </Link>

          <ul className="lg:flex lg:items-center lg:space-x-6 hidden w-full justify-center mt-4 lg:mt-0">
            <li>
              <Link
                to="/"
                className="text-gray-900 hover:text-blue-500 transition-colors duration-300 px-4 py-2"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/care"
                className="text-gray-900 hover:text-blue-500 transition-colors duration-300 px-4 py-2"
              >
                Find Care
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-900 hover:text-blue-500 transition-colors duration-300 px-4 py-2"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="text-gray-900 hover:text-blue-500 transition-colors duration-300 px-4 py-2"
              >
                Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default TestNav;

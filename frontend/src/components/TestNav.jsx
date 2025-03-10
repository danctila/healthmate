import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for hamburger menu
import LoginSignupModals from "../pages/LoginSignupModals";

const TestNav = () => {
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle mobile menu

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center bg-gradient-to-b from-gray-100 to-white text-gray-900 py-4 px-6 w-full shadow-md">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex lg:items-center lg:space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-500 px-4 py-2"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/care"
              className="text-gray-900 hover:text-blue-500 px-4 py-2"
            >
              Find Care
            </Link>
          </li>
          <li>
            <Link
              to="/doctors"
              className="text-gray-900 hover:text-blue-500 px-4 py-2"
            >
              Find My Doctors
            </Link>
          </li>
          <li>
            <Link
              to="/emergency"
              className="text-gray-900 hover:text-blue-500 px-4 py-2"
            >
              Find Emergency Care
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-900 hover:text-blue-500 px-4 py-2"
            >
              About Us
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-900 focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col bg-white shadow-md py-4 px-6">
          <Link
            to="/"
            className="py-2 text-gray-900 hover:text-blue-500"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/care"
            className="py-2 text-gray-900 hover:text-blue-500"
            onClick={toggleMenu}
          >
            Find Care
          </Link>
          <Link
            to="/doctors"
            className="py-2 text-gray-900 hover:text-blue-500"
            onClick={toggleMenu}
          >
            Find My Doctors
          </Link>
          <Link
            to="/emergency"
            className="py-2 text-gray-900 hover:text-blue-500"
            onClick={toggleMenu}
          >
            Find Emergency Care
          </Link>
          <Link
            to="/about"
            className="py-2 text-gray-900 hover:text-blue-500"
            onClick={toggleMenu}
          >
            About Us
          </Link>
        </div>
      )}

      <LoginSignupModals showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default TestNav;

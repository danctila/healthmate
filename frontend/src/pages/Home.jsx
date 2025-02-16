import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const services = [
    {
      title: "Online Consultations",
      description: "Connect with top doctors instantly.",
      icon: "💬",
    },
    {
      title: "Get My Care",
      description: "Based on your symptoms, get personalized care.",
      icon: "🩺",
    },
    {
      title: "View Emergency Care Hospitals",
      description: "Find the nearest emergency care hospitals.",
      icon: "🏥",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900 px-6">
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Your One-Stop Healthcare Solution
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Consult doctors, order medicines, book lab tests – all in one place.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link
            to="/login"
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-6 py-3 rounded-lg text-lg shadow-md transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg text-lg shadow-md transition duration-300"
          >
            Signup
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-500">{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;

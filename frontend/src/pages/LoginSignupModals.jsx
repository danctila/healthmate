import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const LoginSignupModals = ({ showModal, closeModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Using navigate instead of history.push
      closeModal();
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
      closeModal();
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
      closeModal();
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <div className="mb-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <button
              className="w-full mt-4 bg-gray-300 text-gray-700 py-2 rounded-lg"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Switch to Sign Up" : "Switch to Login"}
            </button>
          </div>

          <button
            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center"
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/Google_logo_2020.png"
              alt="Google Logo"
              className="h-6 mr-2"
            />
            Sign in with Google
          </button>

          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            X
          </button>
        </div>
      </div>
    )
  );
};

export default LoginSignupModals;

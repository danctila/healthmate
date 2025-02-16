import { useState } from "react";
import { useAuth } from "../components/auth/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const { currentUser, signup, login, logout, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Toggle between login & sign-up states
  const [isLogin, setIsLogin] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Sign Up or Log In
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // If sign up, make sure passwords match
    if (!isLogin && password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      if (isLogin) {
        // Log In
        await login(email, password);
        setSuccess("Logged in successfully!");
      } else {
        // Sign Up
        await signup(email, password);
        setSuccess("Account created successfully!");
      }

      // Clear form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect after success
      navigate("/"); // Change to any route you prefer
    } catch (err) {
      // Handle common Firebase Auth errors
      if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please provide a valid email address.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
      setSuccess("Logged in successfully with Google!");
      navigate("/");
    } catch (err) {
      setError("Failed to log in with Google. Please try again.");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    setError("");
    setSuccess("");
    try {
      await logout();
      navigate("/"); // e.g., back to home page
    } catch (err) {
      setError("Failed to log out. Please try again.");
    }
  };

  // -----------------------------------
  // If user is already logged in:
  // -----------------------------------
  if (currentUser) {
    return (
      <div className="">
        <h2>Account Details</h2>
        {error && <p className="">{error}</p>}
        {success && <p className="">{success}</p>}

        <p>
          Logged in as <strong>{currentUser.email}</strong>
        </p>

        <button onClick={handleLogout} className="">
          Log Out
        </button>
      </div>
    );
  }

  // -----------------------------------
  // If user is NOT logged in:
  // -----------------------------------
  return (
    <div className="">
      <h2>{isLogin ? "Log In" : "Sign Up"}</h2>

      {error && <p className="">{error}</p>}
      {success && <p className="">{success}</p>}

      <form onSubmit={handleSubmit} className="">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isLogin && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>

      <button onClick={handleGoogleSignIn} className="">
        Sign in with Google
      </button>

      <div className="">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <button onClick={() => setIsLogin(false)}>Sign Up</button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setIsLogin(true)}>Log In</button>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;

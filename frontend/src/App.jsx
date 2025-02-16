import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import "./App.css";
import ContactDirectory from "./pages/ContactDirectory";
import Home from "./pages/Home";
import FindCare from "./pages/FindCare";
import Account from "./pages/Account";
import TestNav from "./components/TestNav";
import AuthPage from "./pages/AuthPage";
import AboutUs from "./pages/AboutUs";
import LoginSignupModals from "./pages/LoginSignupModals";

function App() {
  return (
    <>
      <AuthProvider>
        <TestNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactDirectory />} />
          <Route path="/care" element={<FindCare />} />
          <Route path="/account" element={<Account />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<LoginSignupModals />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

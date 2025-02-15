import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import "./App.css";
import ContactDirectory from "./pages/ContactDirectory";
import Home from "./pages/Home";
import FindCare from "./pages/FindCare";
import Account from "./pages/Account";
import TestNav from "./components/TestNav";
import AuthPage from "./pages/AuthPage";

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
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

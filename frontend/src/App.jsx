import { Routes, Route } from "react-router-dom";
import "./App.css";
import ContactDirectory from "./pages/ContactDirectory";
import Home from "./pages/Home";
import FindCare from "./pages/FindCare";
import Account from "./pages/Account";
import TestNav from "./components/TestNav";

function App() {
  return (
    <>
      <TestNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactDirectory />} />
        <Route path="/care" element={<FindCare />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;

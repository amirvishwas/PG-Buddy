import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import PGDetails from "./pages/PGDetails";
import Navbar from "./components/Navbar";
import "./App.css";
import AddPGForm from "./pages/AddPGForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/pg/:id" element={<PGDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />{" "}
      </Routes>
      <AddPGForm />
    </Router>
  );
}

export default App;

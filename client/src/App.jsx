import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Listings from "./pages/Listings"; // Keep this import if needed elsewhere
import FeaturedPGs from "./components/FeaturedPGs";
import PGDetails from "./pages/PGDetails";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pg/:id" element={<PGDetails />} />
        <Route path="/featured" element={<FeaturedPGs />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PGDetails from "./pages/PGDetails";
import Navbar from "./components/Navbar";
import "./App.css";
import ImageGallery from "./pages/ImageGallery";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browsepg" element={<Listings />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/pg/:id" element={<PGDetails />} />
        <Route path="/pg/:id/images" element={<ImageGallery />} />
      </Routes>
    </Router>
  );
}

export default App;

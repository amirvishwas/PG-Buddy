import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PGDetails from "./pages/PGDetails";
import Navbar from "./components/Navbar";
import ImageGallery from "./pages/ImageGallery";
import MyBookings from "./pages/MyBookings";
import PgReg from "./components/PgReg";
import Layout from "./pages/pgOwner/Layout";
import Dashboard from "./pages/pgOwner/Dashboard";
import AddRoom from "./pages/pgOwner/AddRoom";
import ListRoom from "./pages/pgOwner/ListRoom";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <div>
      {/* {true && <PgReg />} */}
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browsepg" element={<Listings />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/pg/:id" element={<PGDetails />} />
            <Route path="/gallery/:id" element={<ImageGallery />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/about" element={<About />} />

            <Route path="/owner" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="addroom" element={<AddRoom />} />{" "}
              <Route path="listroom" element={<ListRoom />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

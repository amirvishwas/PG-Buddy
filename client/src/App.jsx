import { Routes, Route } from "react-router-dom";
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
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext.jsx";
import About from "./pages/About.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const { showPgReg } = useAppContext();

  return (
    <div>
      <Toaster />
      {showPgReg && <PgReg />}

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browsepg" element={<Listings />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/pg/:id" element={<PGDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery/:id" element={<ImageGallery />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="addroom" element={<AddRoom />} />
          <Route path="listroom" element={<ListRoom />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(null);
  const [showPgReg, setShowPgReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [pgs, setPgs] = useState([]);
  const [loadingPgs, setLoadingPgs] = useState(true);

  const fetchPgs = async () => {
    try {
      setLoadingPgs(true);
      const { data } = await axios.get("/api/rooms");

      if (data?.success) {
        setPgs(data.rooms || []);
      } else {
        setPgs([]);
      }
    } catch (error) {
      console.error("Failed to fetch PGs:", error);
      setPgs([]);
    } finally {
      setLoadingPgs(false);
    }
  };

  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      const token = await getToken();

      if (!token) {
        setIsOwner(false);
        return;
      }

      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success) {
        setIsOwner(data.role === "owner");
        setSearchedCities(data.searchedCities || []);
      } else {
        setIsOwner(false);
      }
    } catch (error) {
      console.log("User fetch error:", error?.response?.status);
      setIsOwner(false);
      if (error?.response?.status !== 404 && error?.response?.status !== 401) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch user data"
        );
      }
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    } else {
      setIsOwner(false);
      setLoadingUser(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPgs();
  }, []);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showPgReg,
    setShowPgReg,
    axios,
    searchedCities,
    setSearchedCities,
    loadingUser,
    pgs,
    setPgs,
    loadingPgs,
    fetchPgs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};

export default AppContext;

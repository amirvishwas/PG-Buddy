import React, { useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const PgReg = () => {
  const { setShowPgReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const cities = [
    "Patna",
    "Lucknow",
    "Ambala",
    "Noida",
    "Kolkata",
    "Delhi",
    "Bangalore",
    "Mumbai",
    "Chandigarh",
  ];

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !phone || !address || !city) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/pg",
        {
          name,
          address,
          city,
          contact: phone,
          gender: "both",
          startingPrice: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowPgReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to register PG");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col md:flex-row bg-white rounded-xl max-w-4xl w-full mx-4 overflow-hidden"
      >
        {/* Left Image - Using a gradient placeholder instead of broken image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">🏠 List Your PG</h2>
            <p className="text-blue-100">
              Join thousands of PG owners on PGBuddy
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <button
            type="button"
            onClick={() => setShowPgReg(false)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <p className="text-2xl font-semibold mt-6">Register Your PG</p>

          <div className="w-full mt-6 space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                PG Name
              </label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter PG name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Phone
              </label>
              <input
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="text"
                placeholder="Enter contact number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Address
              </label>
              <input
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
                placeholder="Enter full address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                City
              </label>
              <select
                id="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PgReg;

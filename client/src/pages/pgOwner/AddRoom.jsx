import React, { useState } from "react";
import { X, Upload, Image as ImageIcon, Check } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

export default function AddRoom() {
  const { axios, getToken, fetchPgs } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerBed: "",
    totalBeds: "",
    availableBeds: "",
    gender: "",
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      Laundry: false,
      AC: false,
      Food: false,
    },
  });

  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = {};
    const previews = [];

    files.slice(0, 4).forEach((file, index) => {
      newImages[index + 1] = file;
      previews.push(URL.createObjectURL(file));
    });

    setImages((prev) => ({ ...prev, ...newImages }));
    setPreviewImages(previews);
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => ({ ...prev, [index + 1]: null }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerBed ||
      !inputs.totalBeds ||
      !inputs.availableBeds ||
      !inputs.gender
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (parseInt(inputs.availableBeds) > parseInt(inputs.totalBeds)) {
      toast.error("Available beds cannot exceed total beds");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerBed", inputs.pricePerBed);
      formData.append("totalBeds", inputs.totalBeds);
      formData.append("availableBeds", inputs.availableBeds);
      formData.append("gender", inputs.gender);

      const amenitiesArray = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenitiesArray));

      Object.values(images).forEach((img) => {
        if (img) formData.append("images", img);
      });

      const token = await getToken();

      const { data } = await axios.post("/api/rooms", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success("Room added successfully");
        fetchPgs();

        setInputs({
          roomType: "",
          pricePerBed: "",
          totalBeds: "",
          availableBeds: "",
          gender: "",
          amenities: {
            "Free WiFi": false,
            "Free Breakfast": false,
            "Room Cleaning Service": false,
            Laundry: false,
            AC: false,
            Food: false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
        setPreviewImages([]);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 font-[Poppins] bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Room</h1>
          <p className="text-gray-500 mt-2">
            Enter the details below to list a new room.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          {/* Card 1: Basic Details */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              Room Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={inputs.roomType}
                    onChange={(e) =>
                      setInputs({ ...inputs, roomType: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select type</option>
                    <option value="single">Single Bed</option>
                    <option value="double">Double Bed</option>
                    <option value="triple">Triple Sharing</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender Preference <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={inputs.gender}
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select gender</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price per Bed <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={inputs.pricePerBed}
                    onChange={(e) =>
                      setInputs({ ...inputs, pricePerBed: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    /month
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Beds <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={inputs.totalBeds}
                    onChange={(e) =>
                      setInputs({ ...inputs, totalBeds: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={inputs.availableBeds}
                    onChange={(e) =>
                      setInputs({ ...inputs, availableBeds: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Amenities */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-purple-500 rounded-full" />
              Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(inputs.amenities).map((item) => (
                <label
                  key={item}
                  className={`
                    relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group
                    ${
                      inputs.amenities[item]
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-gray-100"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={inputs.amenities[item]}
                    onChange={() =>
                      setInputs({
                        ...inputs,
                        amenities: {
                          ...inputs.amenities,
                          [item]: !inputs.amenities[item],
                        },
                      })
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${
                      inputs.amenities[item]
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {inputs.amenities[item] && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      inputs.amenities[item] ? "text-blue-700" : "text-gray-600"
                    }`}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Card 3: Images */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-500 rounded-full" />
              Room Images
            </h2>

            <div className="space-y-4">
              <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:bg-gray-50 transition-colors text-center group cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  SVG, PNG, JPG or GIF (max 4 images)
                </p>
              </div>

              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transform hover:scale-110 transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <Check size={20} />
                  Create Room Listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

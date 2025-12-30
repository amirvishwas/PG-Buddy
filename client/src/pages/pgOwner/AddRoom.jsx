import React, { useState } from "react";
import { X } from "lucide-react";
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
    <div className="p-6 font-[Poppins]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">
        Add New Room
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6">
        <form
          onSubmit={onSubmitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Room Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Room Type <span className="text-red-500">*</span>
            </label>
            <select
              value={inputs.roomType}
              onChange={(e) =>
                setInputs({ ...inputs, roomType: e.target.value })
              }
              className="border rounded-lg px-3 py-2 w-full mt-1"
            >
              <option value="">Select type</option>
              <option value="single">Single Bed</option>
              <option value="double">Double Bed</option>
              <option value="triple">Triple Sharing</option>
            </select>
          </div>

          {/* Gender Preference */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Gender Preference <span className="text-red-500">*</span>
            </label>
            <select
              value={inputs.gender}
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
              className="border rounded-lg px-3 py-2 w-full mt-1"
            >
              <option value="">Select gender</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          {/* Price per Bed */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Price per Bed (₹/month) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={inputs.pricePerBed}
              onChange={(e) =>
                setInputs({ ...inputs, pricePerBed: e.target.value })
              }
              placeholder="Enter price"
              className="border rounded-lg px-3 py-2 w-full mt-1"
            />
          </div>

          {/* Total Beds */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Total Beds <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={inputs.totalBeds}
              onChange={(e) =>
                setInputs({ ...inputs, totalBeds: e.target.value })
              }
              placeholder="e.g., 4"
              className="border rounded-lg px-3 py-2 w-full mt-1"
            />
          </div>

          {/* Available Beds */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Available Beds <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={inputs.availableBeds}
              onChange={(e) =>
                setInputs({ ...inputs, availableBeds: e.target.value })
              }
              placeholder="e.g., 2"
              className="border rounded-lg px-3 py-2 w-full mt-1"
            />
          </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {Object.keys(inputs.amenities).map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
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
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Room Images (up to 4)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

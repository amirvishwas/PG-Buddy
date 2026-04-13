import React, { useState } from "react";
import { X, Upload, Check, Loader2 } from "lucide-react";
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
        (key) => inputs.amenities[key],
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

  const labelClass =
    "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2";
  const inputClass =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:outline-none transition-all";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  const ChevronDown = () => (
    <svg
      className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#fafaf8] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-1">
            Owner
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            Add new room
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Fill in the details below to list a new room.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              <p className="text-sm font-semibold text-slate-900">
                Room information
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>
                  Room type <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={inputs.roomType}
                    onChange={(e) =>
                      setInputs({ ...inputs, roomType: e.target.value })
                    }
                    className={selectClass}
                  >
                    <option value="">Select type</option>
                    <option value="single">Single bed</option>
                    <option value="double">Double bed</option>
                    <option value="triple">Triple sharing</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Gender preference <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={inputs.gender}
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }
                    className={selectClass}
                  >
                    <option value="">Select gender</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Price per bed <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={inputs.pricePerBed}
                    onChange={(e) =>
                      setInputs({ ...inputs, pricePerBed: e.target.value })
                    }
                    placeholder="0"
                    className={`${inputClass} pl-8 pr-16`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    /month
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>
                    Total beds <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={inputs.totalBeds}
                    onChange={(e) =>
                      setInputs({ ...inputs, totalBeds: e.target.value })
                    }
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Available <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={inputs.availableBeds}
                    onChange={(e) =>
                      setInputs({ ...inputs, availableBeds: e.target.value })
                    }
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 bg-slate-400 rounded-full" />
              <p className="text-sm font-semibold text-slate-900">Amenities</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.keys(inputs.amenities).map((item) => {
                const checked = inputs.amenities[item];
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      checked
                        ? "border-slate-900 bg-slate-50"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setInputs({
                          ...inputs,
                          amenities: { ...inputs.amenities, [item]: !checked },
                        })
                      }
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        checked
                          ? "bg-slate-900 border-slate-900"
                          : "border-slate-300"
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span
                      className={`text-xs font-medium ${checked ? "text-slate-900" : "text-slate-600"}`}
                    >
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 bg-green-500 rounded-full" />
              <p className="text-sm font-semibold text-slate-900">
                Room images
              </p>
            </div>

            <div className="relative border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-2xl p-8 text-center transition-colors cursor-pointer group mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-11 h-11 bg-slate-100 group-hover:bg-slate-200 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                <Upload className="w-5 h-5 text-slate-500" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG, GIF — up to 4 images
              </p>
            </div>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {previewImages.map((src, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200"
                  >
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="bg-white text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2 pb-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Create room listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

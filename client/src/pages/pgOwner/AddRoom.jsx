import React, { useState } from "react";
import { X } from "lucide-react";

export default function AddRoom() {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 font-[Poppins]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">
        Add New Room
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Room Name
            </label>
            <input
              type="text"
              placeholder="Enter room title"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Room Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select type</option>
              <option value="Single">Single Bed</option>
              <option value="Double">Double Bed</option>
              <option value="Triple">Triple Sharing</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Price (per month)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Capacity */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <input
              type="number"
              placeholder="Number of persons allowed"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Amenities */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2 text-gray-700">
              {[
                "Wi-Fi",
                "Air Conditioning",
                "Attached Bathroom",
                "Kitchen",
                "Parking",
                "Laundry",
                "Power Backup",
                "CCTV",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Upload Room Images
            </label>

            {/* Highlighted Upload Box */}
            <div className="border-2 border-dashed border-blue-500 rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full cursor-pointer"
              />
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {previewImages.map((src, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg shadow-md"
                  >
                    <img
                      src={src}
                      alt="Room Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />

                    {/* Delete Button */}
                    <button
                      onClick={() => removeImage(index)}
                      type="button"
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

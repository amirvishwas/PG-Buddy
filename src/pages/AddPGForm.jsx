import React, { useState } from "react";

const AddPGForm = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add PG / Hostel
        </h2>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              PG Name
            </label>
            <input
              type="text"
              placeholder="Enter PG name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Monthly Rent (₹)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Facilities */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Facilities
            </label>
            <textarea
              placeholder="Enter facilities (e.g., WiFi, AC, Food)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              rows="3"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Room Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />

            {/* Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add PG / Hostel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPGForm;

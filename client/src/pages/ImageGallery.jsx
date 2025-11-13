import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import properties from "../data/properties";

const ImageGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pg = properties.find((p) => p.id === Number(id));
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!pg) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <p>PG not found.</p>
      </div>
    );
  }

  const images = pg.images?.length ? pg.images : [pg.image];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/70 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-lg font-semibold truncate">{pg.name}</h1>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Image Viewer */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="relative w-full max-w-5xl mx-auto">
          <img
            src={images[currentIndex]}
            alt={`PG image ${currentIndex + 1}`}
            className="w-full h-[80vh] object-contain transition-all duration-300"
          />

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Image Thumbnails */}
        <div className="flex gap-2 mt-6 overflow-x-auto px-4 pb-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`border-2 rounded-lg overflow-hidden ${
                currentIndex === index
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt={`Thumb ${index + 1}`}
                className="w-20 h-20 object-cover hover:opacity-80 transition"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

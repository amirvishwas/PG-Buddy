import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import properties from "../data/properties";

const ImageGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pg = properties.find((p) => p.id === Number(id));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  if (!pg) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <p>PG not found.</p>
      </div>
    );
  }

  const images = pg.images?.length ? pg.images : [pg.image];

  const changeImage = (newIndex) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(true);
    }, 200);
  };

  const nextImage = () => {
    changeImage((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    changeImage((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-white/10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="text-lg font-semibold truncate">{pg.name}</h1>

        <div className="w-10" />
      </div>

      {/* Main Image + Animations */}
      <div className="flex flex-col items-center justify-center h-screen pt-14">
        <div className="relative w-full max-w-5xl mx-auto">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`PG image ${currentIndex + 1}`}
            className={`w-full h-[80vh] object-contain transition-all duration-500 
              ${fade ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          />

          {/* Left arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full backdrop-blur-sm transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full backdrop-blur-sm transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-6 overflow-x-auto px-4 pb-6">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => changeImage(index)}
              className={`border-2 rounded-lg overflow-hidden transition-all 
                ${
                  currentIndex === index
                    ? "border-blue-500 scale-105"
                    : "border-transparent hover:scale-105"
                }`}
            >
              <img
                src={img}
                alt={`Thumb ${index + 1}`}
                className="w-20 h-20 object-cover hover:opacity-90 transition"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";

const ImageGallery = ({ images = [], initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [fade, setFade] = useState(true);

  // Sync internal state if initialIndex changes (optional, but good for stability)
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]); // Re-bind when index changes to ensure fresh state

  const changeImage = (newIndex) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(true);
    }, 200);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    changeImage((currentIndex + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    changeImage((currentIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-50">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <span className="text-gray-400 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>

        <button
          onClick={onClose}
          className="p-2 bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-500 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="flex-1 flex items-center justify-center p-4 relative w-full h-full">
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 hover:scale-110 transition-all z-20 hidden sm:flex"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery view ${currentIndex + 1}`}
            className={`max-w-full max-h-[85vh] object-contain shadow-2xl transition-all duration-300 ease-out
                ${fade ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 hover:scale-110 transition-all z-20 hidden sm:flex"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails Strip */}
      {images.length > 1 && (
        <div className="h-24 bg-black/80 w-full flex items-center justify-center p-4 overflow-x-auto border-t border-white/10">
          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => changeImage(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                  currentIndex === index
                    ? "ring-2 ring-blue-500 opacity-100 scale-110"
                    : "opacity-50 hover:opacity-100 hover:scale-105"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

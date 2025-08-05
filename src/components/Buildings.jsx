import React from "react";

const Buildings = () => {
  return (
    <div>
      <div className="relative">
        <div className="relative w-full h-60  md:h-72">
          {/* 3D Building Container */}
          <div className="absolute inset-0 perspective-1000">
            <div className="relative w-full h-full transform-gpu">
              {/* Main Building */}
              <div className="absolute bottom-0 left-1/2  -translate-x-1/2 w-32 h-64 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t-lg shadow-2xl transform rotate-y-12 animate-float">
                {/* Building floors */}
                <div className="absolute inset-x-2 top-4 space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex space-x-2">
                      <div className="w-4 h-4 bg-yellow-200 rounded-sm shadow-inner"></div>
                      <div className="w-4 h-4 bg-yellow-200 rounded-sm shadow-inner"></div>
                      <div className="w-4 h-4 bg-yellow-200 rounded-sm shadow-inner"></div>
                    </div>
                  ))}
                </div>

                {/* Building top */}
                <div className="absolute -top-2 inset-x-0 h-4 bg-gray-600 rounded-t-lg"></div>
              </div>

              {/* Side Buildings */}
              <div className="absolute bottom-0 left-1/4 w-20 h-40 bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg shadow-xl transform -rotate-y-6 animate-float-delayed">
                <div className="absolute inset-x-1 top-2 space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-200 rounded-sm"></div>
                      <div className="w-2 h-2 bg-yellow-200 rounded-sm"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 right-1/4 w-24 h-48 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-lg shadow-xl transform rotate-y-6 animate-float-slow">
                <div className="absolute inset-x-1 top-2 space-y-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-200 rounded-sm"></div>
                      <div className="w-2 h-2 bg-yellow-200 rounded-sm"></div>
                      <div className="w-2 h-2 bg-yellow-200 rounded-sm"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trees */}
              <div className="absolute bottom-0 left-8 w-6 h-12 bg-green-500 rounded-full shadow-lg"></div>
              <div className="absolute bottom-0 right-8 w-8 h-16 bg-green-600 rounded-full shadow-lg"></div>

              {/* Ground */}
              <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg shadow-inner"></div>

              {/* Floating elements */}
              <div className="absolute top-16 right-16 w-4 h-4 bg-blue-400 rounded-full animate-bounce shadow-lg"></div>
              <div className="absolute top-32 left-16 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .-rotate-y-6 {
          transform: rotateY(-6deg);
        }
        .rotate-y-6 {
          transform: rotateY(6deg);
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotateY(12deg);
          }
          50% {
            transform: translateY(-10px) rotateY(12deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotateY(-6deg);
          }
          50% {
            transform: translateY(-8px) rotateY(-6deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotateY(6deg);
          }
          50% {
            transform: translateY(-6px) rotateY(6deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 0.5s;
        }
        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  );
};

export default Buildings;

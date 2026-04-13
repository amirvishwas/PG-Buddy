import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, FileQuestion } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FileQuestion
            className="w-10 h-10 text-amber-500"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
          Page not found
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed text-sm sm:text-base">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed, renamed, or didn't exist in the first place.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-slate-900 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-sm w-full sm:w-auto"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

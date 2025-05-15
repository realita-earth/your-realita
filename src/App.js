import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/background.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0, opacity: 0.8 }}
      />

      {/* Futuristic Hamburger Dropdown Menu */}
      <div className="absolute top-8 left-8 z-20">
        <div
          className="cursor-pointer flex flex-col gap-2 w-10 h-10 justify-center items-center rounded-lg shadow-lg border border-[#406060] backdrop-blur-md transition-all hover:shadow-2xl hover:scale-105"
          style={{ background: "#204040" }}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <div className="w-8 h-1 rounded-full" style={{ background: "#406060" }}></div>
          <div className="w-8 h-1 rounded-full" style={{ background: "#406060" }}></div>
          <div className="w-8 h-1 rounded-full" style={{ background: "#406060" }}></div>
        </div>
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-2 bg-white/80 rounded-lg p-4 shadow-xl border border-[#406060] backdrop-blur-md">
            <a href="#" className="text-[#204040] hover:text-[#406060] transition">Home</a>
            <a href="#" className="text-[#204040] hover:text-[#406060] transition">About</a>
            <a href="#" className="text-[#204040] hover:text-[#406060] transition">Contact</a>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight" style={{ color: "#204040" }}>
          Realita Dashboard
        </h1>
        <p className="text-xs text-gray-500 mb-2 italic">Coming soon</p>
        <p className="text-sm text-black mb-6">
          For details visit Telegram: <span className="font-semibold">@REALITA_PROJECT</span>
        </p>
        <p className="text-xl text-gray-700 mb-8 text-center max-w-xl">
          A cutting-edge, avant-garde homepage—visually artistic, interactive, and spiritually grounded.
        </p>
      </div>
    </div>
  );
}
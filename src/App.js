import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function CountdownWidget() {
  // Set target date to the Sunday after next (not this Sunday, the next one)
  const getNextNextSunday = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    // Days until next Sunday
    const daysUntilNextSunday = (7 - dayOfWeek) % 7 || 7;
    // Days until the Sunday after next
    const daysUntilTarget = daysUntilNextSunday + 7;
    const target = new Date(now);
    target.setDate(now.getDate() + daysUntilTarget);
    target.setHours(20, 0, 0, 0); // Set to 8:00 PM

    // Halve the time between now and the target
    const halfTime = new Date(now.getTime() + (target - now) / 2);
    return halfTime;
  };

  const [timeLeft, setTimeLeft] = useState(getNextNextSunday() - new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getNextNextSunday() - new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft <= 0) return null;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div
      className="mt-10 mx-auto flex flex-col items-center justify-center rounded-2xl shadow-xl border border-gray-400/30 backdrop-blur-md"
      style={{
        width: "340px",
        height: "210px",
        background: "rgba(80, 88, 90, 0.72)", // granite-like, semi-transparent
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        border: "1.5px solid rgba(200, 200, 200, 0.18)",
        color: "#f8fafc",
        fontFamily: "SF Pro Display, Inter, sans-serif",
        fontWeight: 600,
        fontSize: "2.2rem",
        letterSpacing: "0.04em",
        backdropFilter: "blur(12px)",
        opacity: 0.92,
      }}
    >
      <span style={{ fontSize: "1.1rem", color: "#e0e4e8", marginTop: "1.2rem", marginBottom: "0.5rem", letterSpacing: "0.08em" }}>
        Mint/Release in
      </span>
      <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
        <div>
          <span>{days}</span>
          <div style={{ fontSize: "0.9rem", color: "#b0b4b8" }}>days</div>
        </div>
        <div>
          <span>{hours.toString().padStart(2, "0")}</span>
          <div style={{ fontSize: "0.9rem", color: "#b0b4b8" }}>hrs</div>
        </div>
        <div>
          <span>{minutes.toString().padStart(2, "0")}</span>
          <div style={{ fontSize: "0.9rem", color: "#b0b4b8" }}>min</div>
        </div>
        <div>
          <span>{seconds.toString().padStart(2, "0")}</span>
          <div style={{ fontSize: "0.9rem", color: "#b0b4b8" }}>sec</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={process.env.PUBLIC_URL + "/background.png"}
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
          For details visit Telegram:&nbsp;
          <a
            href="https://t.me/realita_project"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:text-[#406060] transition"
          >
            https://t.me/realita_project
          </a>
        </p>
        <p className="text-xl text-gray-700 mb-8 text-center max-w-xl">
          A cutting-edge, avant-garde homepage—visually artistic, interactive, and spiritually grounded.
        </p>
        <CountdownWidget />
      </div>
    </div>
  );
}
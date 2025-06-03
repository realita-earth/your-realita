import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Countdown Widget ---
function CountdownWidget() {
  // Target: halfway to the Sunday after next, 8:00 PM
  const getNextNextSunday = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilNextSunday = (7 - dayOfWeek) % 7 || 7;
    const daysUntilTarget = daysUntilNextSunday + 7;
    const target = new Date(now);
    target.setDate(now.getDate() + daysUntilTarget);
    target.setHours(20, 0, 0, 0);
    // Halve the time between now and the target
    return new Date(now.getTime() + (target - now) / 2);
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
      className="mt-10 mx-auto flex flex-col items-center justify-center rounded-2xl shadow-xl border backdrop-blur-md"
      style={{
        width: "340px",
        height: "210px",
        background: "rgba(35, 40, 43, 0.82)", // granite gray, more opaque
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        border: "1.5px solid rgba(184, 255, 224, 0.18)", // turquoise border
        color: "#b8ffe0", // turquoise text
        fontFamily: "SF Pro Display, Inter, sans-serif",
        fontWeight: 600,
        fontSize: "2.2rem",
        letterSpacing: "0.04em",
        backdropFilter: "blur(12px)",
        opacity: 0.96,
      }}
    >
      <span style={{
        fontSize: "1.1rem",
        color: "#FFD700", // gold accent
        marginTop: "1.2rem",
        marginBottom: "0.5rem",
        letterSpacing: "0.08em",
        textShadow: "0 0 8px #FFD700, 0 0 16px #b8ffe0"
      }}>
        Mint/Release in
      </span>
      <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
        <div>
          <span>{days}</span>
          <div style={{ fontSize: "0.9rem", color: "#b8ffe0", opacity: 0.7 }}>days</div>
        </div>
        <div>
          <span>{hours.toString().padStart(2, "0")}</span>
          <div style={{ fontSize: "0.9rem", color: "#b8ffe0", opacity: 0.7 }}>hrs</div>
        </div>
        <div>
          <span>{minutes.toString().padStart(2, "0")}</span>
          <div style={{ fontSize: "0.9rem", color: "#b8ffe0", opacity: 0.7 }}>min</div>
        </div>
        <div>
          <span>{seconds.toString().padStart(2, "0")}</span>
          <div style={{ fontSize: "0.9rem", color: "#b8ffe0", opacity: 0.7 }}>sec</div>
        </div>
      </div>
    </div>
  );
}

// --- Main App ---
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#23282b]">
      {/* Background Image */}
      <img
        src={process.env.PUBLIC_URL + "/background.png"}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0, opacity: 0.7, filter: "blur(1.5px) brightness(0.7)" }}
      />

      {/* Moroccan/African pattern overlay */}
      <div className="pattern-overlay"></div>

      {/* Futuristic Hamburger Dropdown Menu */}
      <div className="absolute top-8 left-8 z-20">
        <div
          className="cursor-pointer flex flex-col gap-2 w-10 h-10 justify-center items-center rounded-lg shadow-lg border border-[#406060] backdrop-blur-md transition-all hover:shadow-2xl hover:scale-105"
          style={{ background: "#23282b" }}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <div className="w-8 h-1 rounded-full" style={{ background: "#b8ffe0" }}></div>
          <div className="w-8 h-1 rounded-full" style={{ background: "#b8ffe0" }}></div>
          <div className="w-8 h-1 rounded-full" style={{ background: "#FFD700" }}></div>
        </div>
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-2 bg-[#23282b]/90 rounded-lg p-4 shadow-xl border border-[#406060] backdrop-blur-md">
            <a href="#" className="text-[#b8ffe0] hover:text-[#FFD700] transition">Home</a>
            <a href="#" className="text-[#b8ffe0] hover:text-[#FFD700] transition">About</a>
            <a href="#" className="text-[#b8ffe0] hover:text-[#FFD700] transition">Contact</a>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1
          className="text-5xl font-extrabold mb-4 tracking-tight glow"
          style={{
            color: "#b8ffe0",
            textShadow: "0 0 12px #b8ffe0, 0 0 32px #406060"
          }}
        >
          Realita Dashboard
        </h1>
        <p className="text-xs mb-2 italic" style={{ color: "#b8ffe0", opacity: 0.7 }}>Coming soon</p>
        <p className="text-sm mb-6" style={{ color: "#b8ffe0" }}>
          For details visit Telegram:&nbsp;
          <a
            href="https://t.me/realita_project"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:text-[#FFD700] transition"
            style={{ color: "#FFD700" }}
          >
            https://t.me/realita_project
          </a>
        </p>
        <p className="text-xl mb-8 text-center max-w-xl" style={{ color: "#b8ffe0", opacity: 0.85 }}>
          A cutting-edge, avant-garde homepage—visually artistic, interactive, and spiritually grounded.
        </p>
        <CountdownWidget />
      </div>
    </div>
  );
}
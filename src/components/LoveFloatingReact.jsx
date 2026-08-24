import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Sweet milestone messages
const milestones = [
  { count: 5, msg: "5 Hugs sent! 🥰" },
  { count: 10, msg: "Double love combo! 💕" },
  { count: 25, msg: "Sweetest couple ever! ✨" },
  { count: 50, msg: "50 Hugs! Infinite love! 💖" },
  { count: 100, msg: "100 Hugs! Soulmates forever! 💍" },
];

export default function LoveFloatingReact({ nightMode }) {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("mary_rith_love_taps");
    return saved ? parseInt(saved, 10) : 18;
  });
  const [particles, setParticles] = useState([]);
  const [milestonePopup, setMilestonePopup] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTap = (e) => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("mary_rith_love_taps", newCount.toString());

    // Check milestone
    const ms = milestones.find((m) => m.count === newCount);
    if (ms) {
      setMilestonePopup(ms.msg);
      setTimeout(() => setMilestonePopup(null), 2500);
    }

    // Spawn 5 floating particles around tap
    const emojis = ["💖", "💕", "🌸", "✨", "❤️", "🥰", "🌷", "💍"];
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top;

    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: cx + (Math.random() * 60 - 30),
      y: cy,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: 1.2 + Math.random() * 0.8,
      drift: Math.random() * 60 - 30,
      duration: 1.4 + Math.random() * 0.6,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fabBg = nightMode
    ? "linear-gradient(135deg, #7f53ff 0%, #a77dfd 50%, #ff69b4 100%)"
    : "linear-gradient(135deg, #ff69b4 0%, #ff8cb3 50%, #ffd700 100%)";

  const fabShadow = nightMode
    ? "0 8px 30px rgba(127, 83, 255, 0.6), 0 2px 10px rgba(0,0,0,0.4)"
    : "0 8px 30px rgba(255, 105, 180, 0.5), 0 2px 10px rgba(255,182,218,0.4)";

  return (
    <>
      {/* Floating Particles (Rendered in Portal) */}
      {particles.length > 0 &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 999999,
              overflow: "hidden",
            }}
          >
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: "fixed",
                  left: p.x,
                  top: p.y,
                  fontSize: `${p.size}rem`,
                  userSelect: "none",
                  animation: `floatingHeartBurst ${p.duration}s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                  "--drift": `${p.drift}px`,
                }}
              >
                {p.emoji}
              </div>
            ))}
          </div>,
          document.body
        )}

      {/* Floating Buttons Container (Bottom-Right) */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 20,
          zIndex: 8999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Milestone Toast */}
        {milestonePopup && (
          <div
            style={{
              background: nightMode ? "rgba(26, 14, 52, 0.95)" : "rgba(255, 255, 255, 0.95)",
              border: nightMode ? "1.5px solid #a77dfd" : "1.5px solid #ff69b4",
              borderRadius: 20,
              padding: "6px 14px",
              color: nightMode ? "#d6ccff" : "#d72660",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "0.82rem",
              boxShadow: nightMode
                ? "0 8px 30px rgba(127,83,255,0.4)"
                : "0 8px 30px rgba(255,105,180,0.35)",
              animation: "toastPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              whiteSpace: "nowrap",
              backdropFilter: "blur(10px)",
            }}
          >
            {milestonePopup}
          </div>
        )}

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: nightMode ? "rgba(35, 20, 65, 0.85)" : "rgba(255, 255, 255, 0.9)",
              border: nightMode ? "1.5px solid rgba(167,125,253,0.4)" : "1.5px solid rgba(255,182,218,0.7)",
              color: nightMode ? "#cfaeff" : "#ff69b4",
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
              backdropFilter: "blur(8px)",
              transition: "transform 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            ↑
          </button>
        )}

        {/* Floating Heart React Button */}
        <button
          onClick={handleTap}
          aria-label="Send Love Reaction"
          style={{
            position: "relative",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: fabBg,
            boxShadow: fabShadow,
            border: nightMode ? "2px solid rgba(255,255,255,0.3)" : "2px solid rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            cursor: "pointer",
            outline: "none",
            animation: "fabHeartPulse 2.2s ease-in-out infinite",
            transition: "transform 0.15s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        >
          💖

          {/* Love Count Badge */}
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              background: nightMode ? "#ff4b72" : "#ff1493",
              color: "#fff",
              borderRadius: 12,
              padding: "2px 7px",
              fontSize: "0.68rem",
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              border: "1.5px solid #fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              lineHeight: 1.2,
            }}
          >
            {count}
          </span>
        </button>
      </div>

      {/* Floating Keyframes */}
      <style>{`
        @keyframes floatingHeartBurst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 0.9;
            transform: translate(var(--drift), -90px) scale(1.2) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: translate(calc(var(--drift) * 1.5), -190px) scale(0.8) rotate(-15deg);
          }
        }
        @keyframes fabHeartPulse {
          0%, 100% { transform: scale(1); }
          40% { transform: scale(1.08); }
          60% { transform: scale(0.98); }
        }
        @keyframes toastPop {
          0% { opacity: 0; transform: translateY(12px) scale(0.85); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}

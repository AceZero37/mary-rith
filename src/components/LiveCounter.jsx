import { useState, useEffect } from "react";
import AOS from "aos";

const SINCE = "2026-08-20T00:00:00";

const LiveCounter = ({ nightMode }) => {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const calc = () => {
      const diff = Date.now() - new Date(SINCE).getTime();
      if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / 60000) % 60;
      const hours = Math.floor(diff / 3600000) % 24;
      const days = Math.floor(diff / 86400000);
      return { days, hours, minutes, seconds };
    };
    setElapsed(calc());
    const interval = setInterval(() => setElapsed(calc()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Colors
  const accent = nightMode ? "#b993ff" : "#ff69b4";
  const cardBg = nightMode
    ? "rgba(40, 30, 70, 0.45)"
    : "rgba(255, 255, 255, 0.5)";
  const cardBorder = nightMode
    ? "1.5px solid #7f53ff33"
    : "1.5px solid #ffe1ef";
  const cardShadow = nightMode
    ? "0 8px 40px #7f53ff20"
    : "0 8px 40px #ffb3d620";
  const numColor = nightMode ? "#e8deff" : "#5a2d4a";
  const labelColor = nightMode ? "#b993ff" : "#ff69b4";
  const separatorColor = nightMode ? "#7f53ff55" : "#ffb3d655";
  const glowColor = nightMode ? "#7f53ff" : "#ff69b4";
  const subTextColor = nightMode ? "#d6ccff" : "#ba7bc9";

  const units = [
    { label: "Days", value: elapsed.days },
    { label: "Hours", value: elapsed.hours },
    { label: "Minutes", value: elapsed.minutes },
    { label: "Seconds", value: elapsed.seconds },
  ];

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="container pb-4" data-aos="fade-up">
      {/* Title */}
      <div className="text-center mb-3" style={{ marginTop: 26 }}>
        <span
          style={{
            fontFamily: "'Poppins', 'Montserrat', cursive, sans-serif",
            fontWeight: 800,
            fontSize: "1.18rem",
            letterSpacing: "1.1px",
            color: accent,
            textShadow: nightMode
              ? "0 2px 10px #7f53ff33"
              : "0 2px 10px #ff69b420",
            filter: nightMode
              ? "drop-shadow(0 2px 10px #b993ff22)"
              : "drop-shadow(0 2px 10px #fff3)",
            opacity: 0.95,
          }}
        >
          <span role="img" aria-label="clock" style={{ fontSize: 19, marginRight: 6 }}>
            ⏱️
          </span>
          Time We've Been Together
          <span role="img" aria-label="sparkle" style={{ fontSize: 19, marginLeft: 6 }}>
            💫
          </span>
        </span>
      </div>

      {/* Counter Card */}
      <div
        className="mx-auto"
        style={{
          maxWidth: 520,
          borderRadius: 24,
          background: cardBg,
          border: cardBorder,
          boxShadow: cardShadow,
          backdropFilter: "blur(12px)",
          padding: "32px 20px 28px",
          transition: "box-shadow 0.3s, background 0.3s",
        }}
      >
        {/* Heart pulse */}
        <div className="text-center mb-3">
          <span
            style={{
              fontSize: 32,
              display: "inline-block",
              animation: "counterHeartPulse 1.5s ease-in-out infinite",
            }}
          >
            💖
          </span>
        </div>

        {/* Counter Units */}
        <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
          {units.map((unit, idx) => (
            <div key={unit.label} className="d-flex align-items-center">
              {/* Unit box */}
              <div
                className="text-center"
                style={{
                  minWidth: 80,
                  padding: "12px 8px",
                  borderRadius: 16,
                  background: nightMode
                    ? "rgba(127, 83, 255, 0.12)"
                    : "rgba(255, 105, 180, 0.08)",
                  border: nightMode
                    ? "1px solid #7f53ff22"
                    : "1px solid #ff69b418",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow effect behind number */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${glowColor}15, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />
                {/* Number */}
                <div
                  style={{
                    fontFamily: "'Poppins', 'Montserrat', sans-serif",
                    fontSize: unit.label === "Days" ? "2.2rem" : "2rem",
                    fontWeight: 800,
                    color: numColor,
                    lineHeight: 1.1,
                    position: "relative",
                    letterSpacing: "1px",
                    textShadow: `0 0 20px ${glowColor}22`,
                  }}
                  className="counter-num"
                >
                  {unit.label === "Days" ? unit.value : pad(unit.value)}
                </div>
                {/* Label */}
                <div
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: labelColor,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginTop: 4,
                    position: "relative",
                  }}
                >
                  {unit.label}
                </div>
              </div>

              {/* Separator colon */}
              {idx < units.length - 1 && (
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: separatorColor,
                    margin: "0 2px",
                    animation: "colonBlink 1s ease-in-out infinite",
                    lineHeight: 1,
                  }}
                >
                  :
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Since date */}
        <div
          className="text-center mt-3"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: subTextColor,
            letterSpacing: "0.5px",
          }}
        >
          Since August 20, 2026 💕
        </div>

        {/* Fun message */}
        <div
          className="text-center mt-2"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.75rem",
            color: subTextColor,
            opacity: 0.6,
          }}
        >
          Every second with you is a gift ✨
        </div>
      </div>

      {/* Animations */}
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes counterHeartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes colonBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .counter-num {
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
};

export default LiveCounter;

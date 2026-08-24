import React, { useState, useEffect } from "react";

// Constellation data
// Pisces (Rith ♓ - March 2) & Sagittarius (Mary ♐ - December 3)
const piscesStars = [
  { id: "p1", x: 60, y: 140, mx: 50, my: 100, name: "Alrescha (The Knot)", main: true },
  { id: "p2", x: 90, y: 110, mx: 80, my: 75, name: "Torcular" },
  { id: "p3", x: 130, y: 90, mx: 120, my: 60, name: "Gamma Piscium" },
  { id: "p4", x: 170, y: 80, mx: 155, my: 55, name: "Beta Piscium", main: true },
  { id: "p5", x: 155, y: 60, mx: 140, my: 38, name: "Iota Piscium" },
  { id: "p6", x: 120, y: 65, mx: 110, my: 42, name: "Theta Piscium" },
  { id: "p7", x: 80, y: 175, mx: 70, my: 130, name: "Delta Piscium" },
  { id: "p8", x: 110, y: 210, mx: 95, my: 155, name: "Epsilon Piscium" },
  { id: "p9", x: 145, y: 235, mx: 130, my: 175, name: "Zeta Piscium", main: true },
  { id: "p10", x: 175, y: 220, mx: 160, my: 160, name: "Eta Piscium" },
  { id: "p11", x: 160, y: 250, mx: 145, my: 185, name: "Kullat Nunu" },
];

const piscesLines = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2],
  [0, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 8]
];

const sagittariusStars = [
  { id: "s1", x: 630, y: 110, mx: 270, my: 260, name: "Kaus Borealis", main: true },
  { id: "s2", x: 590, y: 155, mx: 240, my: 295, name: "Kaus Media" },
  { id: "s3", x: 605, y: 220, mx: 250, my: 350, name: "Kaus Australis", main: true },
  { id: "s4", x: 675, y: 210, mx: 310, my: 340, name: "Ascella", main: true },
  { id: "s5", x: 685, y: 145, mx: 320, my: 290, name: "Nunki", main: true },
  { id: "s6", x: 540, y: 150, mx: 200, my: 290, name: "Alnasl (Spout)" },
  { id: "s7", x: 730, y: 170, mx: 355, my: 310, name: "Tau Sagittarii" },
  { id: "s8", x: 660, y: 90, mx: 295, my: 245, name: "Phi Sagittarii" },
];

const sagittariusLines = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
  [1, 5], [2, 5],
  [4, 6], [3, 6],
  [0, 7], [4, 7]
];

const cosmicWishes = [
  "May every star in the universe witness our eternal love ✨",
  "Two souls written in the cosmos: Pisces ♓ & Sagittarius ♐ 🌌",
  "A million lightyears of laughter, warmth, and gentle hugs 💕",
  "Every shooting star that falls carries a prayer for our happiness 🌠",
  "You are my favorite universe, today, tomorrow, and forever 🪐",
  "No matter how vast the galaxy, my heart will always find yours 💫",
  "May all our future adventures shine as bright as the northern stars 🌟",
];

const CosmicConstellation = ({ nightMode }) => {
  const [activeStar, setActiveStar] = useState(null);
  const [shootingStars, setShootingStars] = useState([]);
  const [wishModalOpen, setWishModalOpen] = useState(false);
  const [currentWish, setCurrentWish] = useState("");
  const [isWishing, setIsWishing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto trigger shooting stars periodically
  useEffect(() => {
    if (!nightMode) return;
    const interval = setInterval(() => {
      const id = Date.now();
      const top = Math.random() * 60;
      const left = 15 + Math.random() * 70;
      const duration = 1.2 + Math.random() * 0.8;
      setShootingStars((prev) => [...prev.slice(-3), { id, top, left, duration }]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, duration * 1000);
    }, 4500);

    return () => clearInterval(interval);
  }, [nightMode]);

  const handleMakeWish = () => {
    setIsWishing(true);
    const newStars = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      top: 10 + Math.random() * 40,
      left: 10 + Math.random() * 70,
      duration: 1 + Math.random() * 0.6,
    }));
    setShootingStars((prev) => [...prev, ...newStars]);

    const randomWish = cosmicWishes[Math.floor(Math.random() * cosmicWishes.length)];
    setCurrentWish(randomWish);

    setTimeout(() => {
      setIsWishing(false);
      setWishModalOpen(true);
    }, 600);
  };

  if (!nightMode) return null;

  return (
    <div className="container py-3 px-2 my-2 position-relative" data-aos="fade-up">
      {/* Dynamic Shooting Stars */}
      <div className="cosmic-meteor-container" aria-hidden="true">
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="cosmic-shooting-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Header Badge */}
      <div className="text-center mb-3">
        <span
          style={{
            fontFamily: "'Poppins', 'Montserrat', cursive, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.05rem, 3.5vw, 1.25rem)",
            letterSpacing: "1px",
            color: "#cfaeff",
            textShadow: "0 0 16px rgba(167, 125, 253, 0.6)",
            filter: "drop-shadow(0 2px 10px rgba(191, 147, 255, 0.4))",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>✨</span>
          Cosmic Constellations
          <span>✨</span>
        </span>
        <div
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
            color: "#d6ccff",
            opacity: 0.85,
          }}
        >
          Pisces ♓ & Sagittarius ♐ — Written In The Stars
        </div>
      </div>

      {/* Constellation Card / Sky View */}
      <div
        className="cosmic-sky-card mx-auto position-relative p-2 p-md-4"
        style={{
          maxWidth: 960,
          borderRadius: 24,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(53, 28, 92, 0.85) 0%, rgba(18, 12, 40, 0.95) 80%)",
          border: "1.5px solid rgba(167, 125, 253, 0.35)",
          boxShadow:
            "0 12px 50px rgba(111, 66, 193, 0.35), inset 0 0 40px rgba(127, 83, 255, 0.15)",
          backdropFilter: "blur(14px)",
          overflow: "hidden",
        }}
      >
        {/* Nebula Glow Background Orbs */}
        <div
          className="nebula-orb orb-1"
          style={{
            position: "absolute",
            top: "-10%",
            left: "10%",
            width: 220,
            height: 220,
            background: "radial-gradient(circle, rgba(127, 83, 255, 0.28) 0%, transparent 70%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />
        <div
          className="nebula-orb orb-2"
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "10%",
            width: 260,
            height: 260,
            background: "radial-gradient(circle, rgba(234, 76, 137, 0.22) 0%, transparent 70%)",
            filter: "blur(35px)",
            pointerEvents: "none",
          }}
        />

        {/* SVG Starlight Constellation Chart */}
        <div className="w-100 d-flex justify-content-center">
          {isMobile ? (
            /* MOBILE STACKED SVG VIEW */
            <svg
              viewBox="0 0 380 400"
              className="w-100"
              style={{ maxHeight: 380, overflow: "visible" }}
            >
              <defs>
                <filter id="starGlowM" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="loveBridgeGradM" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9f53f9" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ff70a6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffd700" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Celestial Love Bridge for Mobile */}
              <path
                d="M 130 175 Q 190 220, 250 260"
                fill="none"
                stroke="url(#loveBridgeGradM)"
                strokeWidth="2.5"
                strokeDasharray="5 7"
                filter="url(#starGlowM)"
                style={{ animation: "celestialFlow 20s linear infinite" }}
              />

              {/* Center Heart for Mobile */}
              <g transform="translate(190, 220)">
                <circle r="16" fill="rgba(255, 112, 166, 0.25)" filter="url(#starGlowM)" />
                <text
                  textAnchor="middle"
                  dy="5"
                  fontSize="16"
                  style={{
                    filter: "drop-shadow(0 0 8px #ff70a6)",
                    animation: "heartPulseCosmic 2s infinite ease-in-out",
                    cursor: "pointer",
                  }}
                  onClick={handleMakeWish}
                >
                  💖
                </text>
              </g>

              {/* Pisces (Rith) on Top */}
              <g>
                <text x="100" y="22" fill="#d3c6fc" fontFamily="'Poppins', sans-serif" fontWeight="700" fontSize="13">
                  ♓ PISCES (Rith)
                </text>
                {piscesLines.map(([from, to], i) => (
                  <line
                    key={`pml-${i}`}
                    x1={piscesStars[from].mx}
                    y1={piscesStars[from].my}
                    x2={piscesStars[to].mx}
                    y2={piscesStars[to].my}
                    stroke="#a77dfd"
                    strokeWidth="1.8"
                    strokeOpacity="0.75"
                  />
                ))}
                {piscesStars.map((star, idx) => (
                  <g
                    key={`pm-${star.id}`}
                    transform={`translate(${star.mx}, ${star.my})`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveStar(`♓ ${star.name}`)}
                  >
                    <circle
                      r={star.main ? 7 : 4.5}
                      fill={star.main ? "#e8deff" : "#cfaeff"}
                      filter="url(#starGlowM)"
                    />
                  </g>
                ))}
              </g>

              {/* Sagittarius (Mary) at Bottom */}
              <g>
                <text x="240" y="228" fill="#ffe082" fontFamily="'Poppins', sans-serif" fontWeight="700" fontSize="13">
                  ♐ SAGITTARIUS (Mary)
                </text>
                {sagittariusLines.map(([from, to], i) => (
                  <line
                    key={`sml-${i}`}
                    x1={sagittariusStars[from].mx}
                    y1={sagittariusStars[from].my}
                    x2={sagittariusStars[to].mx}
                    y2={sagittariusStars[to].my}
                    stroke="#ffd700"
                    strokeWidth="1.8"
                    strokeOpacity="0.75"
                  />
                ))}
                {sagittariusStars.map((star, idx) => (
                  <g
                    key={`sm-${star.id}`}
                    transform={`translate(${star.mx}, ${star.my})`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveStar(`♐ ${star.name}`)}
                  >
                    <circle
                      r={star.main ? 7 : 4.5}
                      fill={star.main ? "#fff9d2" : "#ffd700"}
                      filter="url(#starGlowM)"
                    />
                  </g>
                ))}
              </g>
            </svg>
          ) : (
            /* DESKTOP WIDE SVG VIEW */
            <svg
              viewBox="0 0 800 300"
              className="w-100"
              style={{ maxHeight: 320, overflow: "visible" }}
            >
              <defs>
                <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="loveBridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9f53f9" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ff70a6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffd700" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              <path
                d="M 170 80 Q 400 240, 605 220"
                fill="none"
                stroke="url(#loveBridgeGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                filter="url(#starGlow)"
                style={{ animation: "celestialFlow 20s linear infinite" }}
              />

              <g transform="translate(390, 160)">
                <circle r="18" fill="rgba(255, 112, 166, 0.25)" filter="url(#starGlow)" />
                <text
                  textAnchor="middle"
                  dy="6"
                  fontSize="18"
                  style={{
                    filter: "drop-shadow(0 0 8px #ff70a6)",
                    animation: "heartPulseCosmic 2s infinite ease-in-out",
                    cursor: "pointer",
                  }}
                  onClick={handleMakeWish}
                >
                  💖
                </text>
                <text
                  textAnchor="middle"
                  dy="28"
                  fontSize="11"
                  fill="#ffd6e9"
                  fontFamily="'Caveat', cursive"
                  fontWeight="700"
                >
                  Eternal Link
                </text>
              </g>

              {/* PISCES CONSTELLATION */}
              <g className="pisces-group">
                {piscesLines.map(([from, to], i) => (
                  <line
                    key={`pl-${i}`}
                    x1={piscesStars[from].x}
                    y1={piscesStars[from].y}
                    x2={piscesStars[to].x}
                    y2={piscesStars[to].y}
                    stroke="#a77dfd"
                    strokeWidth="1.8"
                    strokeOpacity="0.65"
                  />
                ))}
                {piscesStars.map((star, idx) => (
                  <g
                    key={star.id}
                    transform={`translate(${star.x}, ${star.y})`}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setActiveStar(`♓ ${star.name}`)}
                    onMouseLeave={() => setActiveStar(null)}
                    onClick={() => setActiveStar(`♓ ${star.name}`)}
                  >
                    <circle
                      r={star.main ? 7 : 4.5}
                      fill={star.main ? "#e8deff" : "#cfaeff"}
                      filter="url(#starGlow)"
                      style={{
                        animation: `twinkleStar ${2 + (idx % 3) * 0.7}s ease-in-out infinite alternate`,
                      }}
                    />
                  </g>
                ))}
                <text x="120" y="30" fill="#d3c6fc" fontFamily="'Poppins', sans-serif" fontWeight="700" fontSize="15" textAnchor="middle" letterSpacing="1">
                  ♓ PISCES (Rith)
                </text>
                <text x="120" y="46" fill="#a77dfd" fontFamily="'Caveat', cursive" fontSize="13" textAnchor="middle">
                  March 2 • Gentle & Devoted
                </text>
              </g>

              {/* SAGITTARIUS CONSTELLATION */}
              <g className="sagittarius-group">
                {sagittariusLines.map(([from, to], i) => (
                  <line
                    key={`sl-${i}`}
                    x1={sagittariusStars[from].x}
                    y1={sagittariusStars[from].y}
                    x2={sagittariusStars[to].x}
                    y2={sagittariusStars[to].y}
                    stroke="#ffd700"
                    strokeWidth="1.8"
                    strokeOpacity="0.65"
                  />
                ))}
                {sagittariusStars.map((star, idx) => (
                  <g
                    key={star.id}
                    transform={`translate(${star.x}, ${star.y})`}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setActiveStar(`♐ ${star.name}`)}
                    onMouseLeave={() => setActiveStar(null)}
                    onClick={() => setActiveStar(`♐ ${star.name}`)}
                  >
                    <circle
                      r={star.main ? 7 : 4.5}
                      fill={star.main ? "#fff9d2" : "#ffd700"}
                      filter="url(#starGlow)"
                      style={{
                        animation: `twinkleStar ${1.8 + (idx % 3) * 0.8}s ease-in-out infinite alternate`,
                      }}
                    />
                  </g>
                ))}
                <text x="650" y="30" fill="#ffe082" fontFamily="'Poppins', sans-serif" fontWeight="700" fontSize="15" textAnchor="middle" letterSpacing="1">
                  ♐ SAGITTARIUS (Mary)
                </text>
                <text x="650" y="46" fill="#ffd700" fontFamily="'Caveat', cursive" fontSize="13" textAnchor="middle">
                  December 3 • Bright & Pure Joy
                </text>
              </g>
            </svg>
          )}
        </div>

        {/* Hover / Tap Star Tooltip */}
        <div
          className="text-center mt-2 px-2"
          style={{
            minHeight: 28,
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1rem, 3vw, 1.15rem)",
            color: activeStar ? "#ffd6e9" : "#a77dfd",
            transition: "all 0.3s ease",
          }}
        >
          {activeStar ? (
            <span>🌟 Star In View: <b>{activeStar}</b></span>
          ) : (
            <span style={{ opacity: 0.85 }}>
              ✨ Tap or hover over stars to explore • Click heart to make a wish!
            </span>
          )}
        </div>

        {/* Action Button: Make a Wish */}
        <div className="d-flex justify-content-center mt-2 mb-1">
          <button
            onClick={handleMakeWish}
            disabled={isWishing}
            className="btn rounded-pill px-4 py-2"
            style={{
              background: "linear-gradient(135deg, #7f53ff 0%, #ea4c89 100%)",
              color: "#fff",
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(0.82rem, 2.5vw, 0.92rem)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 6px 24px rgba(127, 83, 255, 0.45)",
              letterSpacing: "0.5px",
              cursor: "pointer",
            }}
          >
            {isWishing ? "🌠 Releasing Starlight..." : "🌠 Make A Wish On A Shooting Star"}
          </button>
        </div>
      </div>

      {/* Wish Reveal Modal / Popup */}
      {wishModalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            background: "rgba(10, 6, 25, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 3000,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => setWishModalOpen(false)}
        >
          <div
            className="cosmic-wish-card p-3 p-md-4 rounded-4 text-center position-relative"
            style={{
              maxWidth: 420,
              width: "100%",
              background: "linear-gradient(145deg, #221443, #150b2e)",
              border: "2px solid #a77dfd",
              boxShadow: "0 16px 60px rgba(167, 125, 253, 0.45)",
              animation: "wishCardPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "2.6rem", marginBottom: 6 }}>🌠</div>
            <h4
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                color: "#ffd700",
                fontSize: "clamp(1.15rem, 3.5vw, 1.35rem)",
              }}
            >
              Your Celestial Wish Sent!
            </h4>
            <div
              className="my-3 py-3 px-3 rounded-3"
              style={{
                background: "rgba(127, 83, 255, 0.18)",
                border: "1px dashed rgba(255, 215, 0, 0.4)",
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(1.2rem, 3.8vw, 1.45rem)",
                lineHeight: 1.4,
                color: "#fff0fa",
              }}
            >
              "{currentWish}"
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#cfaeff",
                fontFamily: "'Poppins', sans-serif",
                marginBottom: 16,
              }}
            >
              Pisces & Sagittarius — Blessed by the cosmos ✨
            </p>
            <button
              className="btn btn-outline-light rounded-pill px-4 py-2"
              style={{
                borderColor: "#a77dfd",
                color: "#e8deff",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.85rem",
              }}
              onClick={() => setWishModalOpen(false)}
            >
              Cherish Wish 💖
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes twinkleStar {
          0% { opacity: 0.45; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes celestialFlow {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes heartPulseCosmic {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }
        @keyframes wishCardPop {
          0% { opacity: 0; transform: scale(0.7) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .cosmic-meteor-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }
        .cosmic-shooting-star {
          position: absolute;
          width: 90px;
          height: 2px;
          background: linear-gradient(90deg, #fff, rgba(255, 215, 0, 0.8), transparent);
          transform: rotate(-35deg);
          animation: shootStar linear forwards;
          filter: drop-shadow(0 0 6px #ffd700);
        }
        @keyframes shootStar {
          0% { opacity: 0; transform: rotate(-35deg) translateX(0); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: rotate(-35deg) translateX(260px); }
        }
      `}</style>
    </div>
  );
};

export default CosmicConstellation;

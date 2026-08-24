import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// ---- 30+ Sweet Love Messages ----
const loveMessages = [
  { text: "You have the most beautiful smile in the entire universe. 😊", emoji: "☀️", color: "#ff69b4" },
  { text: "I fall in love with you a little more every single day. 💕", emoji: "🌸", color: "#a77dfd" },
  { text: "Talking to you is the best part of my entire day. 📱", emoji: "🌙", color: "#7f53ff" },
  { text: "Your laugh is genuinely my favorite sound in the world. 😂", emoji: "🎵", color: "#ff69b4" },
  { text: "Just thinking about you makes me smile no matter what. 🥰", emoji: "💖", color: "#ff4b72" },
  { text: "I love the way your eyes light up when you talk about things you love. ✨", emoji: "⭐", color: "#ffd700" },
  { text: "You make ordinary moments feel magical and extraordinary. 🌟", emoji: "🌟", color: "#a77dfd" },
  { text: "Every hug from you feels like home. I never want to let go. 🤗", emoji: "🏡", color: "#ff69b4" },
  { text: "You are the best adventure I have ever said yes to. 🚗", emoji: "🌈", color: "#00b894" },
  { text: "I love how you care so deeply about the people around you. 💝", emoji: "💝", color: "#ff4b72" },
  { text: "Your kindness makes the whole world a brighter and warmer place. 🌞", emoji: "🌻", color: "#ffd700" },
  { text: "I love how you always know just what to say to make me feel better. 💬", emoji: "💬", color: "#74b9ff" },
  { text: "Being with you feels effortless, like we were made for each other. 🌙", emoji: "🌙", color: "#7f53ff" },
  { text: "You are genuinely the prettiest person I have ever seen. 😍", emoji: "🌺", color: "#ff69b4" },
  { text: "I love the little things you do without even realizing it. 🌿", emoji: "🍀", color: "#00b894" },
  { text: "You inspire me to be the best version of myself every day. 🌱", emoji: "🌱", color: "#00b894" },
  { text: "I could listen to your voice talk about anything forever. 🎤", emoji: "🎶", color: "#a77dfd" },
  { text: "You make every single day feel like a warm summer morning. ☀️", emoji: "☀️", color: "#ffd700" },
  { text: "I love your heart. It is the most beautiful thing about you. 💗", emoji: "💗", color: "#ff4b72" },
  { text: "Being loved by you is the greatest gift life has ever given me. 🎁", emoji: "🎁", color: "#7f53ff" },
  { text: "I love how you always make time for the people you care about. ⏰", emoji: "⏰", color: "#ff69b4" },
  { text: "The way you hold my hand makes me feel completely safe. 🤝", emoji: "🤝", color: "#ff4b72" },
  { text: "You are proof that magic is real and beautiful things exist. ✨", emoji: "✨", color: "#ffd700" },
  { text: "My favorite place in the world is wherever you are. 🌍", emoji: "🌍", color: "#00b894" },
  { text: "I love how your smile reaches all the way up to your eyes. 👀", emoji: "🌸", color: "#ff69b4" },
  { text: "Every love song suddenly made sense the moment I met you. 🎵", emoji: "🎵", color: "#a77dfd" },
  { text: "You are my calm in every storm and my sunshine after every rain. 🌈", emoji: "🌈", color: "#74b9ff" },
  { text: "I love waking up knowing I get to see your face today. 🌅", emoji: "🌅", color: "#ffd700" },
  { text: "You make me feel like I am the luckiest person alive. 🍀", emoji: "🍀", color: "#00b894" },
  { text: "My heart only knows one direction and that direction is you. 🧭", emoji: "💕", color: "#ff4b72" },
  { text: "Everything is better, funnier, warmer and sweeter with you. 🍯", emoji: "🍯", color: "#ffd700" },
  { text: "I never knew love could feel this beautiful until I found you. 💫", emoji: "💫", color: "#7f53ff" },
];

// Particle burst on tap
function Particle({ x, y, emoji, onDone }) {
  const angle = Math.random() * 360;
  const dist = 60 + Math.random() * 80;
  const dx = Math.cos((angle * Math.PI) / 180) * dist;
  const dy = Math.sin((angle * Math.PI) / 180) * dist;

  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        fontSize: "1.4rem",
        zIndex: 9999999,
        pointerEvents: "none",
        animation: "particleBurst 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "--dx": `${dx}px`,
        "--dy": `${dy}px`,
      }}
    >
      {emoji}
    </div>
  );
}

// Floating origami note inside jar
function FloatingNote({ delay, emoji }) {
  return (
    <div
      style={{
        position: "absolute",
        animation: `jarFloat ${2.5 + Math.random() * 2}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
        opacity: 0.7 + Math.random() * 0.25,
        left: `${10 + Math.random() * 70}%`,
        top: `${15 + Math.random() * 55}%`,
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
        pointerEvents: "none",
      }}
    >
      {emoji}
    </div>
  );
}

const jarNotes = ["💌", "🌸", "💕", "✨", "💖", "🎀", "💫", "🌷", "💝"];

const LoveJar = ({ nightMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(null);
  const [drawnCount, setDrawnCount] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [showSpark, setShowSpark] = useState(false);
  const jarRef = useRef(null);
  const usedIndices = useRef(new Set());

  const drawMessage = (e) => {
    // Shake animation
    setIsShaking(true);
    setShowSpark(true);
    setTimeout(() => setIsShaking(false), 600);
    setTimeout(() => setShowSpark(false), 800);

    // Spawn particles from jar center
    const rect = jarRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const burstEmojis = ["💕", "✨", "🌸", "💖", "⭐", "🌷"];
    const newParticles = burstEmojis.map((em, i) => ({
      id: Date.now() + i,
      x: cx,
      y: cy,
      emoji: em,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id))), 1000);

    // Pick unused random message
    if (usedIndices.current.size >= loveMessages.length) {
      usedIndices.current.clear();
    }
    let idx;
    do {
      idx = Math.floor(Math.random() * loveMessages.length);
    } while (usedIndices.current.has(idx));
    usedIndices.current.add(idx);

    setCurrentMsg(loveMessages[idx]);
    setDrawnCount((c) => c + 1);
    setTimeout(() => setIsOpen(true), 150);
  };

  // Theme
  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const textColor = nightMode ? "#e8deff" : "#332233";
  const subText = nightMode ? "#bca6e8" : "#9b6882";
  const jarGlow = nightMode
    ? "0 0 60px rgba(127,83,255,0.55), 0 12px 40px rgba(127,83,255,0.3)"
    : "0 0 60px rgba(255,105,180,0.45), 0 12px 40px rgba(255,105,180,0.25)";

  return (
    <>
      <div
        className="position-relative py-5 overflow-hidden"
        style={{
          background: nightMode
            ? "linear-gradient(180deg, rgba(20,10,46,0) 0%, rgba(35,18,70,0.18) 100%)"
            : "linear-gradient(180deg, rgba(255,245,252,0) 0%, rgba(255,228,244,0.14) 100%)",
        }}
      >
        <div className="container px-3 d-flex flex-column align-items-center">
          {/* Section Header */}
          <div className="text-center mb-2">
            <div
              style={{
                fontFamily: "'Poppins', 'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
                color: accent,
                textShadow: nightMode
                  ? "0 2px 14px rgba(127,83,255,0.45)"
                  : "0 2px 10px rgba(255,105,180,0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>🫙</span>
              Love Jar
              <span>🫙</span>
            </div>
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(1rem, 2.8vw, 1.18rem)",
                color: nightMode ? "#d6ccff" : "#b0406a",
                marginTop: 4,
                opacity: 0.85,
              }}
            >
              ✨ Tap the jar to draw a sweet message just for you 💕
            </div>
          </div>

          {/* Drawn Counter */}
          {drawnCount > 0 && (
            <div
              className="mb-3 px-4 py-1 rounded-pill"
              style={{
                background: nightMode
                  ? "rgba(127,83,255,0.15)"
                  : "rgba(255,105,180,0.12)",
                border: nightMode
                  ? "1px solid rgba(167,125,253,0.35)"
                  : "1px solid rgba(255,182,218,0.45)",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "0.78rem",
                color: accent,
              }}
            >
              💌 {drawnCount} sweet message{drawnCount > 1 ? "s" : ""} drawn
            </div>
          )}

          {/* ---- THE JAR ---- */}
          <div
            ref={jarRef}
            onClick={drawMessage}
            style={{
              position: "relative",
              width: "clamp(170px, 38vw, 240px)",
              height: "clamp(200px, 45vw, 290px)",
              cursor: "pointer",
              userSelect: "none",
              animation: isShaking
                ? "jarShake 0.5s cubic-bezier(0.36,0.07,0.19,0.97)"
                : "jarIdle 3s ease-in-out infinite",
              filter: `drop-shadow(${jarGlow})`,
              transition: "filter 0.3s ease",
            }}
          >
            {/* Jar SVG Shape */}
            <svg
              viewBox="0 0 200 240"
              width="100%"
              height="100%"
              style={{ position: "absolute", inset: 0 }}
            >
              {/* Jar body */}
              <defs>
                <linearGradient id="jarGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={nightMode ? "#3d1f7a" : "#fff0fa"} stopOpacity="0.9" />
                  <stop offset="50%" stopColor={nightMode ? "#2a1455" : "#ffe4f4"} stopOpacity="0.75" />
                  <stop offset="100%" stopColor={nightMode ? "#1e0e40" : "#ffd6ee"} stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={nightMode ? "#7f53ff" : "#ff69b4"} />
                  <stop offset="100%" stopColor={nightMode ? "#5b2eff" : "#ff4b72"} />
                </linearGradient>
                <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="30%" stopColor="white" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Jar body shape */}
              <path
                d="M55 50 Q40 55 36 80 L28 200 Q26 225 100 228 Q174 225 172 200 L164 80 Q160 55 145 50 Z"
                fill="url(#jarGrad)"
                stroke={nightMode ? "rgba(167,125,253,0.5)" : "rgba(255,182,218,0.7)"}
                strokeWidth="1.5"
              />

              {/* Jar shimmer highlight */}
              <path
                d="M65 55 Q55 65 52 90 L46 190"
                fill="none"
                stroke="url(#shimmer)"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* Lid base */}
              <rect x="48" y="38" width="104" height="18" rx="5"
                fill={nightMode ? "rgba(127,83,255,0.7)" : "rgba(255,105,180,0.7)"}
                stroke={nightMode ? "#a77dfd" : "#ff8cb3"}
                strokeWidth="1"
              />

              {/* Lid top knob */}
              <rect x="80" y="28" width="40" height="13" rx="6"
                fill="url(#lidGrad)"
                stroke={nightMode ? "#cfaeff" : "#ffd6e9"}
                strokeWidth="1"
              />

              {/* Heart label on jar */}
              <text x="100" y="150" textAnchor="middle" fontSize="36" opacity="0.35">❤️</text>
              <text x="100" y="185" textAnchor="middle"
                fontFamily="'Caveat', cursive"
                fontSize="13"
                fill={nightMode ? "#d6aaff" : "#d72660"}
                opacity="0.7"
              >
                For Mary 💕
              </text>
            </svg>

            {/* Floating notes inside jar */}
            <div
              style={{
                position: "absolute",
                inset: "55px 20px 20px 20px",
                overflow: "hidden",
                borderRadius: "0 0 50% 50% / 0 0 30px 30px",
              }}
            >
              {jarNotes.map((em, i) => (
                <FloatingNote key={i} emoji={em} delay={i * 0.3} />
              ))}
            </div>

            {/* Sparkle burst on tap */}
            {showSpark && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                  animation: "sparkBurst 0.7s ease forwards",
                  pointerEvents: "none",
                }}
              >
                ✨
              </div>
            )}
          </div>

          {/* Tap hint */}
          <div
            className="mt-3"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1.05rem, 3vw, 1.2rem)",
              color: accent,
              opacity: 0.75,
              animation: "hintPulse 2s ease-in-out infinite",
              textAlign: "center",
            }}
          >
            👆 Tap the jar to open a note
          </div>
        </div>
      </div>

      {/* ---- Burst Particles (Portal) ---- */}
      {particles.length > 0 &&
        createPortal(
          <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999999 }}>
            {particles.map((p) => (
              <Particle key={p.id} x={p.x} y={p.y} emoji={p.emoji} />
            ))}
          </div>,
          document.body
        )}

      {/* ---- Message Modal (Portal) ---- */}
      {isOpen && currentMsg &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(18px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              animation: "modalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
            onClick={() => setIsOpen(false)}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 420,
                borderRadius: 28,
                overflow: "hidden",
                background: nightMode
                  ? "rgba(22, 12, 52, 0.97)"
                  : "rgba(255, 252, 255, 0.98)",
                border: `2px solid ${currentMsg.color}55`,
                boxShadow: `0 24px 80px ${currentMsg.color}60, 0 4px 24px rgba(0,0,0,0.4)`,
                animation: "cardPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Top */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${currentMsg.color}, ${currentMsg.color}88)`,
                  padding: "28px 24px 36px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.25)",
                    border: "1.5px solid rgba(255,255,255,0.45)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>

                {/* Emoji */}
                <div
                  style={{
                    fontSize: "3.5rem",
                    marginBottom: 8,
                    animation: "emojiWiggle 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                    display: "inline-block",
                  }}
                >
                  {currentMsg.emoji}
                </div>

                <div
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(0.88rem, 2.5vw, 1rem)",
                    color: "rgba(255,255,255,0.92)",
                    letterSpacing: "0.5px",
                  }}
                >
                  💌 A sweet note from the jar
                </div>
              </div>

              {/* Paper tear */}
              <div
                style={{
                  height: 24,
                  background: nightMode ? "rgba(22, 12, 52, 0.97)" : "rgba(255,252,255,0.98)",
                  marginTop: -16,
                  borderRadius: "50% 50% 0 0 / 20px 20px 0 0",
                }}
              />

              {/* Message body */}
              <div className="px-4 pb-5 pt-0" style={{ marginTop: -4 }}>
                {/* Lined paper message */}
                <div
                  style={{
                    background: nightMode
                      ? `repeating-linear-gradient(transparent, transparent 29px, ${currentMsg.color}20 30px)`
                      : `repeating-linear-gradient(transparent, transparent 29px, ${currentMsg.color}22 30px)`,
                    borderRadius: 16,
                    padding: "16px 18px",
                    border: `1.5px dashed ${currentMsg.color}44`,
                    minHeight: 100,
                    marginBottom: 20,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "clamp(1.15rem, 3.5vw, 1.4rem)",
                      color: nightMode ? "#e8deff" : "#332233",
                      lineHeight: 1.7,
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    {currentMsg.text}
                  </p>
                </div>

                {/* Signed from Rith */}
                <div
                  style={{
                    fontFamily: "'Pacifico', 'Caveat', cursive",
                    fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                    color: currentMsg.color,
                    textAlign: "right",
                    marginBottom: 18,
                    fontWeight: 700,
                  }}
                >
                  — With love, Rith 💕
                </div>

                {/* Draw Another Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => drawMessage(), 200);
                  }}
                  className="w-100 rounded-pill py-2 border-0 mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${currentMsg.color}, ${currentMsg.color}88)`,
                    color: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    boxShadow: `0 6px 20px ${currentMsg.color}55`,
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                >
                  🫙 Draw Another Note
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-100 rounded-pill py-2 border-0"
                  style={{
                    background: nightMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                    color: nightMode ? "#bca6e8" : "#9b6882",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    border: nightMode
                      ? "1.5px solid rgba(255,255,255,0.1)"
                      : "1.5px solid rgba(0,0,0,0.08)",
                  }}
                >
                  💌 Save this note in my heart
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Keyframes */}
      <style>{`
        @keyframes jarIdle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-8px) rotate(-1.5deg); }
          60% { transform: translateY(-3px) rotate(1deg); }
        }
        @keyframes jarShake {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-8deg) scale(1.05); }
          35% { transform: rotate(8deg) scale(1.05); }
          55% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
          90% { transform: rotate(-2deg); }
        }
        @keyframes jarFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(8deg); }
        }
        @keyframes sparkBurst {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes particleBurst {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0.3); opacity: 0; }
        }
        @keyframes hintPulse {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes modalIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cardPop {
          0% { opacity: 0; transform: scale(0.82) translateY(24px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes emojiWiggle {
          0% { transform: scale(0.5) rotate(-15deg); }
          60% { transform: scale(1.2) rotate(8deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </>
  );
};

export default LoveJar;

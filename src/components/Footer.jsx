import React, { useEffect, useState } from "react";

// Animated floating hearts
function FloatingHeart({ style, emoji }) {
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        animation: `footerFloat ${3 + Math.random() * 3}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 3}s`,
        fontSize: "clamp(0.7rem, 2vw, 1rem)",
        opacity: 0.12 + Math.random() * 0.1,
        ...style,
      }}
    >
      {emoji}
    </div>
  );
}

const floaters = [
  { top: "10%", left: "5%", emoji: "💕" },
  { top: "40%", left: "12%", emoji: "🌸" },
  { top: "70%", left: "8%", emoji: "✨" },
  { top: "15%", right: "6%", emoji: "💖" },
  { top: "55%", right: "10%", emoji: "🌙" },
  { top: "80%", right: "5%", emoji: "💫" },
  { top: "30%", left: "50%", emoji: "❤️" },
  { top: "60%", left: "35%", emoji: "🌸" },
];

function Footer({ nightMode }) {
  const [heartBeat, setHeartBeat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartBeat(true);
      setTimeout(() => setHeartBeat(false), 400);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const bg = nightMode
    ? "linear-gradient(180deg, rgba(20,10,46,0.0) 0%, rgba(22,12,50,0.99) 30%)"
    : "linear-gradient(180deg, rgba(255,245,252,0.0) 0%, rgba(255,235,248,0.99) 30%)";

  const borderTop = nightMode
    ? "1px solid rgba(167,125,253,0.25)"
    : "1px solid rgba(255,182,218,0.45)";

  const textColor = nightMode ? "#d6aaff" : "#d72660";
  const subColor = nightMode ? "#a077cc" : "#c06898";
  const dividerColor = nightMode
    ? "rgba(167,125,253,0.2)"
    : "rgba(255,105,180,0.18)";

  return (
    <footer
      style={{
        position: "relative",
        background: bg,
        borderTop,
        paddingTop: 40,
        paddingBottom: 28,
        overflow: "hidden",
      }}
    >
      {/* Floating background hearts */}
      {floaters.map((f, i) => (
        <FloatingHeart key={i} style={{ top: f.top, left: f.left, right: f.right }} emoji={f.emoji} />
      ))}

      {/* Top fade edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          background: nightMode
            ? "linear-gradient(180deg, rgba(0,0,0,0) 0%, transparent 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        {/* ---- Main Heart + Names ---- */}
        <div className="text-center mb-3">
          {/* Big Animated Heart */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: nightMode
                ? "linear-gradient(135deg, rgba(127,83,255,0.2), rgba(167,125,253,0.1))"
                : "linear-gradient(135deg, rgba(255,105,180,0.2), rgba(255,182,218,0.1))",
              border: nightMode
                ? "1.5px solid rgba(167,125,253,0.35)"
                : "1.5px solid rgba(255,182,218,0.55)",
              fontSize: "2.2rem",
              marginBottom: 16,
              transform: heartBeat ? "scale(1.16)" : "scale(1)",
              transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: nightMode
                ? "0 8px 32px rgba(127,83,255,0.25)"
                : "0 8px 32px rgba(255,105,180,0.25)",
            }}
          >
            ❤️
          </div>

          {/* Names */}
          <div
            style={{
              fontFamily: "'Poppins', 'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
              color: textColor,
              textShadow: nightMode
                ? "0 2px 16px rgba(127,83,255,0.4)"
                : "0 2px 12px rgba(255,105,180,0.35)",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span>Sovan Narith</span>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                color: nightMode ? "#cfaeff" : "#ff69b4",
                fontWeight: 400,
              }}
            >
              &amp;
            </span>
            <span>Mary</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1rem, 2.8vw, 1.18rem)",
              color: subColor,
              marginTop: 4,
              opacity: 0.88,
            }}
          >
            Forever & Always 💕 Written in the Stars ✨
          </div>
        </div>

        {/* Divider with stars */}
        <div
          className="d-flex align-items-center justify-content-center gap-3 mb-3"
        >
          <div style={{ flex: 1, height: 1, background: dividerColor, maxWidth: 100 }} />
          <span style={{ fontSize: "1.1rem", opacity: 0.6 }}>🌸 💕 🌸</span>
          <div style={{ flex: 1, height: 1, background: dividerColor, maxWidth: 100 }} />
        </div>

        {/* ---- Love Stats Pills ---- */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
          {[
            { icon: "📅", label: "Together since", value: "Aug 20, 2026" },
            { icon: "📍", label: "Our city", value: "Phnom Penh 🇰🇭" },
            { icon: "💌", label: "Love letters", value: "∞" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: nightMode
                  ? "rgba(127,83,255,0.12)"
                  : "rgba(255,105,180,0.1)",
                border: nightMode
                  ? "1px solid rgba(167,125,253,0.25)"
                  : "1px solid rgba(255,182,218,0.4)",
                borderRadius: 20,
                padding: "5px 14px",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>{stat.icon}</span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(0.65rem, 1.6vw, 0.74rem)",
                  color: subColor,
                  fontWeight: 500,
                }}
              >
                {stat.label}:{" "}
                <strong style={{ color: textColor }}>{stat.value}</strong>
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: 1,
            background: dividerColor,
            marginBottom: 14,
          }}
        />

        {/* ---- Copyright ---- */}
        <div className="text-center">
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
              color: subColor,
              opacity: 0.7,
              letterSpacing: "0.3px",
            }}
          >
            © 2026 crafted with{" "}
            <span
              style={{
                display: "inline-block",
                animation: "footerHeartBeat 1.5s ease-in-out infinite",
              }}
            >
              ❤️
            </span>{" "}
            by{" "}
            <strong
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "0.95rem",
                color: textColor,
              }}
            >
              rith.dev
            </strong>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes footerFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.08); }
        }
        @keyframes footerHeartBeat {
          0%, 100% { transform: scale(1); }
          35% { transform: scale(1.28); }
          55% { transform: scale(0.92); }
        }
      `}</style>
    </footer>
  );
}

export default Footer;

import React, { useState, useEffect } from "react";
import AOS from "aos";

const rithLocation = {
  name: "Rith's Home",
  area: "Phnom Penh",
  tag: "His Safe Place 🏡",
  emoji: "💙",
  color: "#7f53ff",
  avatar: "./assets/images/1.jpg",
  mapUrl: "https://maps.app.goo.gl/xEurTTC7545mDJov6?g_st=ic",
};

const maryLocation = {
  name: "Mary's Home",
  area: "Phnom Penh",
  tag: "Her Sweet Castle 🌸",
  emoji: "💗",
  color: "#ff69b4",
  avatar: "./assets/images/2.jpg",
  mapUrl: "https://maps.app.goo.gl/gB3zJS4REho6FgWh6?g_st=ic",
};

export default function LoveMap({ nightMode }) {
  const [activeTab, setActiveTab] = useState("both"); // 'both' | 'rith' | 'mary'

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const cardBg = nightMode
    ? "radial-gradient(ellipse at 50% 0%, rgba(127,83,255,0.3) 0%, transparent 70%), rgba(22, 12, 48, 0.88)"
    : "radial-gradient(ellipse at 50% 0%, rgba(255,182,218,0.4) 0%, transparent 70%), rgba(255, 255, 255, 0.9)";

  const cardBorder = nightMode
    ? "1.5px solid rgba(167, 125, 253, 0.35)"
    : "1.5px solid rgba(255, 182, 218, 0.55)";

  const textColor = nightMode ? "#f0e8ff" : "#332233";
  const subText = nightMode ? "#c4aef5" : "#8d4568";

  // Google Maps embed URL
  const getEmbedSrc = () => {
    if (activeTab === "rith") {
      return "https://maps.google.com/maps?q=Phnom%20Penh%20Cambodia&t=&z=13&ie=UTF8&iwloc=&output=embed";
    }
    if (activeTab === "mary") {
      return "https://maps.google.com/maps?q=Phnom%20Penh%20Cambodia&t=&z=13&ie=UTF8&iwloc=&output=embed";
    }
    return "https://maps.google.com/maps?q=Phnom%20Penh%20Cambodia&t=&z=12&ie=UTF8&iwloc=&output=embed";
  };

  return (
    <div className="container pb-5" data-aos="fade-up" style={{ maxWidth: 940 }}>
      {/* ── Section Title ── */}
      <div className="text-center mb-3" style={{ marginTop: 24 }}>
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.15rem, 3.8vw, 1.38rem)",
            letterSpacing: "0.8px",
            color: accent,
            textShadow: nightMode
              ? "0 2px 14px rgba(127,83,255,0.45)"
              : "0 2px 10px rgba(255,105,180,0.3)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>📍</span>
          Our Love Map &amp; Locations
          <span>📍</span>
        </div>
        <div
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(0.98rem, 2.6vw, 1.18rem)",
            color: nightMode ? "#d6ccff" : "#b0406a",
            marginTop: 2,
            opacity: 0.88,
          }}
        >
          ✨ Two hearts living in the same city • Connected forever 💕
        </div>
      </div>

      {/* ── Main Map Card ── */}
      <div
        className="position-relative overflow-hidden mx-auto"
        style={{
          borderRadius: "clamp(20px, 4vw, 30px)",
          background: cardBg,
          border: cardBorder,
          boxShadow: nightMode
            ? "0 20px 60px rgba(127,83,255,0.3), 0 4px 20px rgba(0,0,0,0.4)"
            : "0 20px 60px rgba(255,105,180,0.22), 0 4px 20px rgba(255,182,218,0.2)",
          backdropFilter: "blur(20px)",
          padding: "clamp(16px, 3.5vw, 28px)",
        }}
      >
        {/* ── Tab Selector (Single Inline Row) ── */}
        <div
          className="d-flex justify-content-center align-items-center gap-1 gap-md-2 mb-3"
          style={{ overflowX: "auto", paddingBottom: 4 }}
        >
          {[
            { id: "both", label: "🗺️ Both", fullLabel: "🗺️ Both Locations" },
            { id: "rith", label: "📍 Rith's Home", fullLabel: "📍 Rith's Home" },
            { id: "mary", label: "📍 Mary's Home", fullLabel: "📍 Mary's Home" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive
                    ? nightMode
                      ? "linear-gradient(135deg, #7f53ff 0%, #a77dfd 100%)"
                      : "linear-gradient(135deg, #ff69b4 0%, #ff8cb3 100%)"
                    : nightMode
                    ? "rgba(127,83,255,0.14)"
                    : "rgba(255,105,180,0.12)",
                  color: isActive ? "#fff" : textColor,
                  border: isActive
                    ? "none"
                    : nightMode
                    ? "1px solid rgba(167,125,253,0.3)"
                    : "1px solid rgba(255,182,218,0.4)",
                  borderRadius: 20,
                  padding: "5px clamp(8px, 2vw, 14px)",
                  fontSize: "clamp(0.68rem, 1.8vw, 0.8rem)",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.25s ease",
                  boxShadow: isActive
                    ? `0 4px 16px ${nightMode ? "rgba(127,83,255,0.5)" : "rgba(255,105,180,0.4)"}`
                    : "none",
                }}
              >
                {tab.fullLabel}
              </button>
            );
          })}
        </div>

        {/* ── Dual Profile Location Cards (Strictly 2 Columns Inline Side-by-Side) ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(8px, 2vw, 16px)",
            marginBottom: 16,
          }}
        >
          {/* Rith Card */}
          <div
            style={{
              borderRadius: "clamp(14px, 2.5vw, 20px)",
              padding: "clamp(10px, 2vw, 16px)",
              background: nightMode
                ? "rgba(35, 18, 70, 0.65)"
                : "rgba(255, 255, 255, 0.75)",
              border: `1.5px solid ${rithLocation.color}45`,
              boxShadow: `0 6px 20px ${rithLocation.color}18`,
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 1.8vw, 14px)",
              minWidth: 0,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                position: "relative",
                width: "clamp(40px, 9vw, 54px)",
                height: "clamp(40px, 9vw, 54px)",
                borderRadius: "50%",
                padding: 2,
                background: "linear-gradient(135deg, #7f53ff, #00d2d3)",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(127,83,255,0.35)",
              }}
            >
              <img
                src={rithLocation.avatar}
                alt="Rith"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)",
                }}
              >
                📍
              </span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.74rem, 1.9vw, 0.92rem)",
                  color: textColor,
                  lineHeight: 1.15,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {rithLocation.name}
              </div>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "clamp(0.72rem, 1.8vw, 0.88rem)",
                  color: subText,
                  lineHeight: 1.15,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {rithLocation.tag}
              </div>
              <a
                href={rithLocation.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  marginTop: 3,
                  fontSize: "clamp(0.62rem, 1.5vw, 0.72rem)",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  color: rithLocation.color,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Open Maps ↗
              </a>
            </div>
          </div>

          {/* Mary Card */}
          <div
            style={{
              borderRadius: "clamp(14px, 2.5vw, 20px)",
              padding: "clamp(10px, 2vw, 16px)",
              background: nightMode
                ? "rgba(35, 18, 70, 0.65)"
                : "rgba(255, 255, 255, 0.75)",
              border: `1.5px solid ${maryLocation.color}45`,
              boxShadow: `0 6px 20px ${maryLocation.color}18`,
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 1.8vw, 14px)",
              minWidth: 0,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                position: "relative",
                width: "clamp(40px, 9vw, 54px)",
                height: "clamp(40px, 9vw, 54px)",
                borderRadius: "50%",
                padding: 2,
                background: "linear-gradient(135deg, #ff69b4, #ffd700)",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(255,105,180,0.35)",
              }}
            >
              <img
                src={maryLocation.avatar}
                alt="Mary"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)",
                }}
              >
                📍
              </span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.74rem, 1.9vw, 0.92rem)",
                  color: textColor,
                  lineHeight: 1.15,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {maryLocation.name}
              </div>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "clamp(0.72rem, 1.8vw, 0.88rem)",
                  color: subText,
                  lineHeight: 1.15,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {maryLocation.tag}
              </div>
              <a
                href={maryLocation.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  marginTop: 3,
                  fontSize: "clamp(0.62rem, 1.5vw, 0.72rem)",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  color: maryLocation.color,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Open Maps ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── Interactive Google Map Frame with Romantic Styling ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(220px, 42vw, 340px)",
            borderRadius: 18,
            overflow: "hidden",
            border: cardBorder,
            boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          }}
        >
          <iframe
            key={activeTab + (nightMode ? "night" : "light")}
            title="Mary & Rith Love Map"
            src={getEmbedSrc()}
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: nightMode
                ? "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)"
                : "hue-rotate(-10deg) saturate(1.1)",
              display: "block",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Live Distance Banner */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
              background: nightMode
                ? "rgba(22, 10, 46, 0.92)"
                : "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(10px)",
              border: nightMode
                ? "1.5px solid rgba(167,125,253,0.45)"
                : "1.5px solid rgba(255,182,218,0.7)",
              borderRadius: 24,
              padding: "4px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              whiteSpace: "nowrap",
              maxWidth: "94%",
            }}
          >
            <span style={{ fontSize: "1rem", animation: "mapHeartBeat 1.4s ease-in-out infinite" }}>
              💖
            </span>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(0.78rem, 2.2vw, 0.98rem)",
                fontWeight: 700,
                color: nightMode ? "#f0e8ff" : "#5a1a4a",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Phnom Penh · Two hearts, zero distance 💕
            </span>
          </div>
        </div>

        {/* ── Quick Directions Action Bar (Inline Side-by-Side) ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(8px, 2vw, 14px)",
            marginTop: 12,
          }}
        >
          <a
            href={rithLocation.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: nightMode ? "rgba(127,83,255,0.22)" : "rgba(255,105,180,0.15)",
              border: `1px solid ${rithLocation.color}55`,
              color: rithLocation.color,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.68rem, 1.8vw, 0.78rem)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              borderRadius: 20,
              padding: "7px 10px",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            <span>🚗</span> <span>Navigate Rith ↗</span>
          </a>
          <a
            href={maryLocation.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: nightMode ? "rgba(255,105,180,0.22)" : "rgba(255,105,180,0.15)",
              border: `1px solid ${maryLocation.color}55`,
              color: maryLocation.color,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.68rem, 1.8vw, 0.78rem)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              borderRadius: 20,
              padding: "7px 10px",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            <span>🚗</span> <span>Navigate Mary ↗</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes mapHeartBeat {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.25); }
          50% { transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
}

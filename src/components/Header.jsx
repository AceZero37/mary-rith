import React, { useState, useRef, useEffect } from "react";

const HEADER_HEIGHT = 68;

const templates = [
  { id: "all", label: "🌟 Full Story", shortLabel: "🌟 All" },
  { id: "feed", label: "🌸 Moments Feed", shortLabel: "🌸 Feed" },
  { id: "scrapbook", label: "🎞️ Polaroid Scrapbook", shortLabel: "🎞️ Scrapbook" },
  { id: "cinema", label: "🎬 Cinema & Reels", shortLabel: "🎬 Cinema" },
  { id: "photobook", label: "📖 Photobook Magazine", shortLabel: "📖 Book" },
];

const Header = ({ nightMode, setNightMode, currentTemplate, setCurrentTemplate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const audioRef = useRef(null);

  // Scroll listener — adds blur/shadow when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Audio play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // Theme
  const bg = nightMode
    ? scrolled
      ? "rgba(22, 12, 48, 0.95)"
      : "rgba(30, 16, 62, 0.85)"
    : scrolled
    ? "rgba(255, 255, 255, 0.97)"
    : "rgba(255, 255, 255, 0.8)";

  const borderColor = nightMode
    ? "rgba(167, 125, 253, 0.3)"
    : "rgba(255, 182, 218, 0.55)";

  const titleColor = nightMode ? "#d6aaff" : "#d72660";
  const subColor = nightMode ? "#a77dfd" : "#f06498";
  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const textColor = nightMode ? "#e8deff" : "#332233";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9000,
          minHeight: HEADER_HEIGHT,
          background: bg,
          backdropFilter: scrolled ? "blur(18px) saturate(1.6)" : "blur(12px)",
          borderBottom: `1px solid ${borderColor}`,
          boxShadow: scrolled
            ? nightMode
              ? "0 6px 32px rgba(127, 83, 255, 0.3)"
              : "0 6px 32px rgba(255, 105, 180, 0.22)"
            : "none",
          transition: "all 0.35s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "6px 0",
        }}
      >
        <div
          className="container d-flex align-items-center justify-content-between px-2 px-md-4"
          style={{ height: "100%" }}
        >
          {/* ---- LEFT: Logo & Title ---- */}
          <div className="d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
            {/* Pulsing Heart Logo */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: nightMode
                  ? "linear-gradient(135deg, #7f53ff, #a77dfd)"
                  : "linear-gradient(135deg, #ff69b4, #ff8cb3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                boxShadow: nightMode
                  ? "0 4px 16px rgba(127, 83, 255, 0.55)"
                  : "0 4px 16px rgba(255, 105, 180, 0.5)",
                animation: "headerHeartPulse 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            >
              💌
            </div>

            {/* Title */}
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'Poppins', 'Quicksand', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(0.88rem, 2.8vw, 1.12rem)",
                  color: titleColor,
                  letterSpacing: "0.5px",
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textShadow: nightMode
                    ? "0 2px 12px rgba(127,83,255,0.4)"
                    : "0 2px 8px rgba(255,105,180,0.25)",
                }}
              >
                Mary &amp; Rith 💕
              </div>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "clamp(0.72rem, 1.8vw, 0.82rem)",
                  color: subColor,
                  opacity: 0.85,
                  lineHeight: 1,
                }}
              >
                Our Love Story ✨
              </div>
            </div>
          </div>

          {/* ---- CENTER (Desktop): Template Switcher Pills ---- */}
          <div className="d-none d-lg-flex align-items-center gap-1.5 p-1 rounded-pill"
            style={{
              background: nightMode ? "rgba(127,83,255,0.12)" : "rgba(255,105,180,0.08)",
              border: `1px solid ${borderColor}`,
            }}
          >
            {templates.map((tpl) => {
              const isActive = (currentTemplate || "all") === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setCurrentTemplate(tpl.id)}
                  style={{
                    background: isActive
                      ? nightMode
                        ? "linear-gradient(135deg, #7f53ff, #a77dfd)"
                        : "linear-gradient(135deg, #ff69b4, #ff8cb3)"
                      : "transparent",
                    color: isActive ? "#fff" : textColor,
                    border: "none",
                    borderRadius: 20,
                    padding: "4px 12px",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.74rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isActive
                      ? nightMode
                        ? "0 2px 10px rgba(127,83,255,0.4)"
                        : "0 2px 10px rgba(255,105,180,0.4)"
                      : "none",
                  }}
                >
                  {tpl.label}
                </button>
              );
            })}
          </div>

          {/* ---- RIGHT: Template Dropdown (Mobile) + Music + Theme Toggle ---- */}
          <div className="d-flex align-items-center gap-1.5 gap-md-2 position-relative">
            {/* Mobile Template Selector Dropdown Trigger */}
            <div className="d-lg-none position-relative">
              <button
                onClick={() => setShowTemplateDropdown((d) => !d)}
                style={{
                  background: nightMode
                    ? "linear-gradient(135deg, #7f53ff, #a77dfd)"
                    : "linear-gradient(135deg, #ff69b4, #ff8cb3)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 16,
                  padding: "5px 10px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  boxShadow: "0 2px 10px rgba(255,105,180,0.3)",
                }}
              >
                <span>{templates.find((t) => t.id === (currentTemplate || "all"))?.shortLabel}</span>
                <span style={{ fontSize: "0.6rem" }}>▼</span>
              </button>

              {/* Mobile Dropdown Menu */}
              {showTemplateDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: 6,
                    width: 200,
                    background: nightMode ? "#1e0e42" : "#ffffff",
                    border: `1.5px solid ${borderColor}`,
                    borderRadius: 16,
                    padding: 6,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    zIndex: 9999,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {templates.map((tpl) => {
                    const isActive = (currentTemplate || "all") === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        onClick={() => {
                          setCurrentTemplate(tpl.id);
                          setShowTemplateDropdown(false);
                        }}
                        style={{
                          background: isActive ? accent + "25" : "transparent",
                          color: isActive ? accent : textColor,
                          border: "none",
                          borderRadius: 10,
                          padding: "6px 10px",
                          textAlign: "left",
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: isActive ? 700 : 500,
                          fontSize: "0.78rem",
                          cursor: "pointer",
                        }}
                      >
                        {tpl.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Music Player Button */}
            <button
              aria-label={isPlaying ? "Pause music" : "Play music"}
              onClick={() => setIsPlaying((p) => !p)}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                borderRadius: 18,
                border: nightMode
                  ? "1.5px solid rgba(167,125,253,0.45)"
                  : "1.5px solid rgba(255,182,218,0.7)",
                background: isPlaying
                  ? nightMode
                    ? "linear-gradient(135deg, #7f53ff, #a77dfd)"
                    : "linear-gradient(135deg, #ff69b4, #ff8cb3)"
                  : nightMode
                  ? "rgba(127,83,255,0.15)"
                  : "rgba(255,182,218,0.2)",
                color: isPlaying ? "#fff" : nightMode ? "#cfaeff" : "#d72660",
                padding: "5px 10px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.68rem, 1.8vw, 0.76rem)",
                cursor: "pointer",
                boxShadow: isPlaying
                  ? nightMode
                    ? "0 4px 18px rgba(127,83,255,0.55)"
                    : "0 4px 18px rgba(255,105,180,0.5)"
                  : "none",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>
                {isPlaying ? "🎵" : "🎶"}
              </span>
              <span className="d-none d-sm-inline">
                {isPlaying ? "Playing" : "Music"}
              </span>

              {/* Animated Equalizer when playing */}
              {isPlaying && (
                <div className="d-flex gap-1 align-items-end" style={{ height: 12 }}>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 3,
                        borderRadius: 2,
                        background: "#fff",
                        animation: `eqBounce ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>

            <audio ref={audioRef} loop preload="none">
              <source src="./assets/music/anniversary-song.mp3" type="audio/mpeg" />
            </audio>

            {/* Night Mode Toggle */}
            <button
              role="switch"
              aria-checked={nightMode}
              aria-label={nightMode ? "Switch to day mode" : "Switch to night mode"}
              onClick={() => setNightMode(!nightMode)}
              type="button"
              style={{
                position: "relative",
                width: 50,
                height: 28,
                borderRadius: 14,
                border: nightMode
                  ? "1.5px solid rgba(167,125,253,0.5)"
                  : "1.5px solid rgba(255,182,218,0.7)",
                background: nightMode
                  ? "linear-gradient(135deg, #1a0a38, #2d1060)"
                  : "linear-gradient(135deg, #ffe0f4, #ffd4ec)",
                cursor: "pointer",
                padding: 0,
                boxShadow: nightMode
                  ? "0 2px 12px rgba(127,83,255,0.4)"
                  : "0 2px 12px rgba(255,182,218,0.5)",
                transition: "all 0.3s ease",
                flexShrink: 0,
              }}
            >
              {/* Stars or Clouds in background */}
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: nightMode ? 6 : "auto",
                  right: nightMode ? "auto" : 5,
                  fontSize: "0.6rem",
                  opacity: 0.55,
                }}
              >
                {nightMode ? "⭐" : "☁️"}
              </span>

              {/* Thumb */}
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: nightMode ? 24 : 2,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: nightMode
                    ? "linear-gradient(135deg, #9f53f9, #7f3fff)"
                    : "linear-gradient(135deg, #fff0fa, #ffb6d5)",
                  boxShadow: nightMode
                    ? "0 2px 10px rgba(159,83,249,0.8)"
                    : "0 2px 10px rgba(255,182,218,0.8)",
                  transition: "left 0.27s cubic-bezier(.48,1.32,.33,.99)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.78rem",
                }}
              >
                {nightMode ? "🌙" : "☀️"}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: HEADER_HEIGHT }} />

      {/* Keyframes */}
      <style>{`
        @keyframes headerHeartPulse {
          0%, 100% { transform: scale(1); box-shadow: ${nightMode ? "0 4px 16px rgba(127,83,255,0.55)" : "0 4px 16px rgba(255,105,180,0.5)"}; }
          40% { transform: scale(1.12); box-shadow: ${nightMode ? "0 6px 24px rgba(127,83,255,0.8)" : "0 6px 24px rgba(255,105,180,0.75)"}; }
          70% { transform: scale(0.96); }
        }
        @keyframes eqBounce {
          from { height: 3px; }
          to { height: 12px; }
        }
      `}</style>
    </>
  );
};

export default Header;

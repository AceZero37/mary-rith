import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import AOS from "aos";

// ---- DATA ----
const videos = [
  {
    id: 1,
    title: "Sweet Moments",
    subtitle: "Every smile with you is priceless 💕",
    emoji: "🌸",
    src: "../assets/video/1.mp4",
    tag: "Romantic",
    tagColor: "#ff69b4",
  },
  {
    id: 2,
    title: "Together Forever",
    subtitle: "Side by side, always and always ✨",
    emoji: "💑",
    src: "../assets/video/2.mp4",
    tag: "Memories",
    tagColor: "#a77dfd",
  },
  {
    id: 3,
    title: "Our Adventure",
    subtitle: "The road is better with you 🚗",
    emoji: "🌍",
    src: "../assets/video/3.mp4",
    tag: "Adventures",
    tagColor: "#ffd700",
  },
  {
    id: 4,
    title: "Love Story",
    subtitle: "Our chapter is my favorite story 📖",
    emoji: "❤️",
    src: "../assets/video/4.mp4",
    tag: "Romantic",
    tagColor: "#ff4b72",
  },
  {
    id: 5,
    title: "Precious Time",
    subtitle: "Time flies when I'm holding your hand ⏰",
    emoji: "💖",
    src: "../assets/video/5.mp4",
    tag: "Cozy",
    tagColor: "#00b894",
  },
  {
    id: 6,
    title: "Dancing Time",
    subtitle: "Dancing like nobody's watching, just us 🎶",
    emoji: "💃",
    src: "../assets/video/6.mp4",
    tag: "Fun",
    tagColor: "#74b9ff",
  },
  {
    id: 7,
    title: "Sleeping Time",
    subtitle: "Sleeping Together 😴",
    emoji: "😴",
    src: "../assets/video/7.mp4",
    tag: "Fun",
    tagColor: "#00ff55ff",
  },
];

// ---- MAIN COMPONENT ----
const Video = ({ nightMode }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [viewerIdx, setViewerIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const hoverVideoRefs = useRef({});

  // Lock body scroll when modal open
  useEffect(() => {
    if (viewerIdx !== null) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [viewerIdx]);

  // Keyboard navigation
  useEffect(() => {
    if (viewerIdx === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight" && viewerIdx < videos.length - 1)
        setViewerIdx((idx) => idx + 1);
      if (e.key === "ArrowLeft" && viewerIdx > 0)
        setViewerIdx((idx) => idx - 1);
      if (e.key === "Escape") setViewerIdx(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewerIdx]);

  // Auto-play when opening or switching videos
  useEffect(() => {
    if (viewerIdx !== null && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  }, [viewerIdx]);

  // Auto-preview on card hover
  const handleCardMouseEnter = (idx) => {
    setHoveredIdx(idx);
    const vRef = hoverVideoRefs.current[idx];
    if (vRef) {
      vRef.currentTime = 0;
      vRef.play().catch(() => { });
    }
  };

  const handleCardMouseLeave = (idx) => {
    setHoveredIdx(null);
    const vRef = hoverVideoRefs.current[idx];
    if (vRef) {
      vRef.pause();
      vRef.currentTime = 0;
    }
  };

  // Theme
  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const sectionBg = nightMode
    ? "linear-gradient(180deg, rgba(20,12,45,0) 0%, rgba(40,25,80,0.15) 100%)"
    : "linear-gradient(180deg, rgba(255,230,245,0) 0%, rgba(255,210,235,0.12) 100%)";
  const cardBg = nightMode
    ? "rgba(32, 18, 60, 0.82)"
    : "rgba(255,255,255,0.88)";
  const cardBorder = nightMode
    ? "1.5px solid rgba(167,125,253,0.25)"
    : "1.5px solid rgba(255,182,218,0.45)";
  const textColor = nightMode ? "#e8deff" : "#332233";
  const subText = nightMode ? "#bca6e8" : "#9b6882";
  const overlayBg = "rgba(0,0,0,0.93)";

  return (
    <div
      className="pb-4"
      style={{ background: sectionBg }}
      data-aos="fade-up"
    >
      <div className="container px-2">
        {/* ---- Section Header ---- */}
        <div className="text-center mb-4" style={{ marginTop: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Poppins', 'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
              letterSpacing: "1px",
              color: accent,
              textShadow: nightMode
                ? "0 2px 14px rgba(127,83,255,0.45)"
                : "0 2px 10px rgba(255,105,180,0.3)",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>🎬</span>
            Our Video Memories
            <span style={{ fontSize: "1.4rem" }}>🎬</span>
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
            ✨ Hover to preview • Tap to play full screen 💕
          </div>
        </div>

        {/* ---- Glassmorphism Video Grid ---- */}
        <div className="row g-3 justify-content-center">
          {videos.map((video, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={video.id}
                className="col-6 col-md-4 col-lg-4"
                data-aos="fade-up"
                data-aos-delay={idx * 70}
              >
                <div
                  className="video-reel-card position-relative overflow-hidden"
                  style={{
                    borderRadius: 22,
                    background: cardBg,
                    border: isHovered
                      ? nightMode
                        ? "1.5px solid rgba(167,125,253,0.65)"
                        : "1.5px solid rgba(255,105,180,0.65)"
                      : cardBorder,
                    boxShadow: isHovered
                      ? nightMode
                        ? "0 16px 44px rgba(127,83,255,0.4), 0 4px 14px rgba(0,0,0,0.3)"
                        : "0 16px 44px rgba(255,105,180,0.35), 0 4px 14px rgba(0,0,0,0.1)"
                      : nightMode
                        ? "0 6px 24px rgba(127,83,255,0.18)"
                        : "0 6px 24px rgba(255,105,180,0.14)",
                    cursor: "pointer",
                    transition: "transform 0.28s ease, box-shadow 0.28s ease, border 0.2s ease",
                    transform: isHovered ? "translateY(-7px) scale(1.025)" : "none",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={() => handleCardMouseEnter(idx)}
                  onMouseLeave={() => handleCardMouseLeave(idx)}
                  onClick={() => setViewerIdx(idx)}
                >
                  {/* Video Thumbnail / Preview */}
                  <div
                    className="position-relative overflow-hidden"
                    style={{
                      height: "clamp(130px, 30vw, 200px)",
                      background: "#111",
                    }}
                  >
                    <video
                      ref={(el) => (hoverVideoRefs.current[idx] = el)}
                      src={video.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.35s ease",
                        transform: isHovered ? "scale(1.06)" : "scale(1)",
                      }}
                      onLoadedData={(e) => {
                        e.target.currentTime = 0.5;
                      }}
                    />

                    {/* Dark overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: isHovered
                          ? "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)"
                          : "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.6) 100%)",
                        transition: "background 0.3s ease",
                      }}
                    />

                    {/* Tag Pill (top-left) */}
                    <div
                      className="position-absolute top-0 start-0 m-2 px-2 py-0.5 rounded-pill"
                      style={{
                        background: video.tagColor + "dd",
                        color: "#fff",
                        fontSize: "clamp(0.5rem, 1.3vw, 0.65rem)",
                        fontWeight: 700,
                        fontFamily: "'Poppins', sans-serif",
                        backdropFilter: "blur(4px)",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {video.tag}
                    </div>

                    {/* Duration / Reel indicator (top-right) */}
                    <div
                      className="position-absolute top-0 end-0 m-2 d-flex align-items-center gap-1"
                      style={{
                        background: "rgba(0,0,0,0.55)",
                        borderRadius: 20,
                        padding: "2px 8px",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <span style={{ fontSize: "0.7rem" }}>▶</span>
                      <span
                        style={{
                          color: "#fff",
                          fontSize: "clamp(0.5rem, 1.3vw, 0.6rem)",
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        Reel
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div
                      className="position-absolute top-50 start-50 translate-middle"
                      style={{
                        width: "clamp(42px, 10vw, 54px)",
                        height: "clamp(42px, 10vw, 54px)",
                        borderRadius: "50%",
                        background: isHovered
                          ? video.tagColor + "ee"
                          : "rgba(255,255,255,0.88)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isHovered
                          ? `0 4px 20px ${video.tagColor}88`
                          : "0 4px 18px rgba(0,0,0,0.35)",
                        transition: "all 0.25s ease",
                        transform: isHovered ? "scale(1.12)" : "scale(1)",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={isHovered ? "#fff" : video.tagColor}
                        style={{ marginLeft: 2 }}
                      >
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>

                    {/* Emoji Stamp bottom-right */}
                    <div
                      className="position-absolute"
                      style={{
                        bottom: 8,
                        right: 10,
                        fontSize: "clamp(1rem, 3vw, 1.4rem)",
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                        transition: "transform 0.25s ease",
                        transform: isHovered ? "scale(1.3) rotate(8deg)" : "scale(1)",
                      }}
                    >
                      {video.emoji}
                    </div>
                  </div>

                  {/* Card Footer Info */}
                  <div className="p-2 px-2.5">
                    <div
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(0.74rem, 2vw, 0.88rem)",
                        color: textColor,
                        lineHeight: 1.15,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {video.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "clamp(0.8rem, 2.1vw, 0.95rem)",
                        color: subText,
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginTop: 1,
                      }}
                    >
                      {video.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Fullscreen Video Player Modal (Portal to body) ---- */}
      {viewerIdx !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100dvh",
              zIndex: 999999,
              background: overlayBg,
              backdropFilter: "blur(18px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "videoFadeIn 0.25s ease",
              overflow: "hidden",
            }}
            onClick={() => setViewerIdx(null)}
          >
            {/* Player Container */}
            <div
              style={{
                width: "100%",
                maxWidth: 500,
                padding: "12px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setViewerIdx(null)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 16,
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(6px)",
                  zIndex: 10,
                }}
              >
                ✕
              </button>

              {/* Video Header */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                  paddingTop: 8,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      background: videos[viewerIdx].tagColor + "cc",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: 20,
                      padding: "2px 10px",
                    }}
                  >
                    {videos[viewerIdx].tag}
                  </span>
                  <span style={{ fontSize: "1.3rem" }}>
                    {videos[viewerIdx].emoji}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1rem, 3.5vw, 1.3rem)",
                    color: "#fff",
                    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                    textAlign: "center",
                  }}
                >
                  {videos[viewerIdx].title}
                </div>
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "clamp(0.95rem, 2.5vw, 1.12rem)",
                    color: "rgba(255,220,240,0.9)",
                    textAlign: "center",
                  }}
                >
                  {videos[viewerIdx].subtitle}
                </div>
              </div>

              {/* Video Player with Gradient Border */}
              <div
                style={{
                  width: "100%",
                  borderRadius: 20,
                  padding: 2,
                  background: `linear-gradient(135deg, ${videos[viewerIdx].tagColor}, #fff4, ${videos[viewerIdx].tagColor}88)`,
                  boxShadow: `0 8px 40px ${videos[viewerIdx].tagColor}55`,
                }}
              >
                <div
                  style={{
                    borderRadius: 19,
                    overflow: "hidden",
                    background: "#000",
                  }}
                >
                  <video
                    ref={videoRef}
                    key={viewerIdx}
                    src={videos[viewerIdx].src}
                    controls
                    autoPlay
                    playsInline
                    style={{
                      width: "100%",
                      maxHeight: "58vh",
                      objectFit: "contain",
                      display: "block",
                      background: "#000",
                    }}
                  />
                </div>
              </div>

              {/* Navigation Bar */}
              <div
                className="d-flex align-items-center justify-content-between w-100"
                style={{ gap: 12, padding: "0 4px" }}
              >
                {/* Prev */}
                <button
                  onClick={() => setViewerIdx((i) => i - 1)}
                  disabled={viewerIdx === 0}
                  style={{
                    borderRadius: 14,
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    padding: "8px 18px",
                    cursor: viewerIdx === 0 ? "not-allowed" : "pointer",
                    opacity: viewerIdx === 0 ? 0.3 : 1,
                    backdropFilter: "blur(6px)",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  ← Prev
                </button>

                {/* Dots */}
                <div className="d-flex gap-2 align-items-center flex-wrap justify-content-center">
                  {videos.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setViewerIdx(i)}
                      style={{
                        width: i === viewerIdx ? 22 : 10,
                        height: 10,
                        borderRadius: 999,
                        border: "none",
                        background:
                          i === viewerIdx
                            ? videos[viewerIdx].tagColor
                            : "rgba(255,255,255,0.35)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        padding: 0,
                        boxShadow:
                          i === viewerIdx
                            ? `0 2px 10px ${videos[viewerIdx].tagColor}88`
                            : "none",
                      }}
                    />
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={() => setViewerIdx((i) => i + 1)}
                  disabled={viewerIdx === videos.length - 1}
                  style={{
                    borderRadius: 14,
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    padding: "8px 18px",
                    cursor:
                      viewerIdx === videos.length - 1 ? "not-allowed" : "pointer",
                    opacity: viewerIdx === videos.length - 1 ? 0.3 : 1,
                    backdropFilter: "blur(6px)",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Fade-In Keyframe */}
            <style>{`
              @keyframes videoFadeIn {
                from { opacity: 0; transform: scale(0.97); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Video;

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import AOS from "aos";

// ---- ALL 15 VIDEOS DATA ----
const allVideos = [
  {
    id: 1,
    title: "Sweet Moments",
    subtitle: "Every smile with you is priceless 💕",
    emoji: "🌸",
    src: "./assets/video/1.mp4",
    tag: "Romantic",
    tagColor: "#ff69b4",
  },
  {
    id: 2,
    title: "Together Forever",
    subtitle: "Side by side, always and always ✨",
    emoji: "💑",
    src: "./assets/video/2.mp4",
    tag: "Memories",
    tagColor: "#a77dfd",
  },
  {
    id: 3,
    title: "Our Adventure",
    subtitle: "The road is better with you 🚗",
    emoji: "🌍",
    src: "./assets/video/3.mp4",
    tag: "Adventure",
    tagColor: "#ffd700",
  },
  {
    id: 4,
    title: "Love Story",
    subtitle: "Our chapter is my favorite story 📖",
    emoji: "❤️",
    src: "./assets/video/4.mp4",
    tag: "Romantic",
    tagColor: "#ff4b72",
  },
  {
    id: 5,
    title: "Precious Time",
    subtitle: "Time flies when I'm holding your hand ⏰",
    emoji: "💖",
    src: "./assets/video/5.mp4",
    tag: "Cozy",
    tagColor: "#00b894",
  },
  {
    id: 6,
    title: "Dancing Time",
    subtitle: "Dancing like nobody's watching, just us 🎶",
    emoji: "💃",
    src: "./assets/video/6.mp4",
    tag: "Dancing",
    tagColor: "#74b9ff",
  },
  {
    id: 7,
    title: "Sleeping Together",
    subtitle: "Peaceful dreams in your warm embrace 😴",
    emoji: "😴",
    src: "./assets/video/7.mp4",
    tag: "Cozy",
    tagColor: "#10ac84",
  },
  {
    id: 8,
    title: "Sweet Laughter",
    subtitle: "You make my whole world laugh out loud 😂",
    emoji: "🥰",
    src: "./assets/video/8.mp4",
    tag: "Fun",
    tagColor: "#fd79a8",
  },
  {
    id: 9,
    title: "Magical Night",
    subtitle: "Under the city lights, holding you close 🌃",
    emoji: "✨",
    src: "./assets/video/9.mp4",
    tag: "Memories",
    tagColor: "#6c5ce7",
  },
  {
    id: 10,
    title: "Romantic Drive",
    subtitle: "Golden hour breeze and you by my side 🌅",
    emoji: "🚗",
    src: "./assets/video/10.mp4",
    tag: "Adventure",
    tagColor: "#e17055",
  },
  {
    id: 11,
    title: "Cute Moments",
    subtitle: "Every little silly thing you do melts my heart 🍬",
    emoji: "🎀",
    src: "./assets/video/11.mp4",
    tag: "Fun",
    tagColor: "#00cec9",
  },
  {
    id: 12,
    title: "Late Night Talks",
    subtitle: "Whispering our dreams until the stars fade 🌙",
    emoji: "🌌",
    src: "./assets/video/12.mp4",
    tag: "Romantic",
    tagColor: "#9b59b6",
  },
  {
    id: 13,
    title: "Happy Vibes",
    subtitle: "Pure joy and sunshine whenever we are together ☀️",
    emoji: "🌻",
    src: "./assets/video/13.mp4",
    tag: "Fun",
    tagColor: "#f39c12",
  },
  {
    id: 14,
    title: "Special Journey",
    subtitle: "Every milestone with you is a treasure 🏆",
    emoji: "💍",
    src: "./assets/video/14.mp4",
    tag: "Milestones",
    tagColor: "#e84393",
  },
  {
    id: 15,
    title: "Forever & Always",
    subtitle: "My heart belongs to you for all eternity 🔐",
    emoji: "💫",
    src: "./assets/video/15.mp4",
    tag: "Romantic",
    tagColor: "#ff7675",
  },
  {
    id: 16,
    title: "Our Sweet Heaven",
    subtitle: "With you, every day feels like heaven on earth ☁️💖",
    emoji: "🕊️",
    src: "./assets/video/16.mp4",
    tag: "Romantic",
    tagColor: "#ff70a6",
  },
];

const categories = [
  { id: "all", label: "🎬 All Reels (16)" },
  { id: "Romantic", label: "💖 Romantic" },
  { id: "Memories", label: "✨ Memories" },
  { id: "Adventure", label: "🚗 Adventure" },
  { id: "Cozy", label: "☕ Cozy" },
  { id: "Fun", label: "🎉 Fun" },
  { id: "Dancing", label: "💃 Dancing" },
  { id: "Milestones", label: "💍 Milestones" },
];

const Video = ({ nightMode }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [activeCategory, setActiveCategory] = useState("all");
  const [viewerIdx, setViewerIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const hoverVideoRefs = useRef({});

  // Filtered video list
  const filteredVideos =
    activeCategory === "all"
      ? allVideos
      : allVideos.filter((v) => v.tag.toLowerCase() === activeCategory.toLowerCase());

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
      if (e.key === "ArrowRight" && viewerIdx < filteredVideos.length - 1)
        setViewerIdx((idx) => idx + 1);
      if (e.key === "ArrowLeft" && viewerIdx > 0)
        setViewerIdx((idx) => idx - 1);
      if (e.key === "Escape") setViewerIdx(null);
      if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewerIdx, filteredVideos.length]);

  // Auto-play when opening or switching videos
  useEffect(() => {
    if (viewerIdx !== null && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [viewerIdx]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Auto-preview on card hover
  const handleCardMouseEnter = (idx) => {
    setHoveredIdx(idx);
    const vRef = hoverVideoRefs.current[idx];
    if (vRef) {
      vRef.currentTime = 0;
      vRef.play().catch(() => {});
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

  // Theme styling
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
        <div className="text-center mb-3" style={{ marginTop: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Poppins', 'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.15rem, 3.8vw, 1.4rem)",
              letterSpacing: "1px",
              color: accent,
              textShadow: nightMode
                ? "0 2px 14px rgba(127,83,255,0.45)"
                : "0 2px 10px rgba(255,105,180,0.3)",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>🎬</span>
            Our Video Memories (16 Reels)
            <span style={{ fontSize: "1.4rem" }}>🎬</span>
          </div>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1rem, 2.8vw, 1.22rem)",
              color: nightMode ? "#d6ccff" : "#b0406a",
              marginTop: 4,
              opacity: 0.9,
            }}
          >
            ✨ Hover over any reel to preview • Tap to play with sound in theater mode 💕
          </div>
        </div>

        {/* ---- Category Filter Pills ---- */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setViewerIdx(null);
                }}
                className="btn btn-sm rounded-pill px-3 py-1 shadow-sm"
                style={{
                  background: isActive
                    ? nightMode
                      ? "linear-gradient(135deg, #7f53ff 0%, #a77dfd 100%)"
                      : "linear-gradient(135deg, #ff69b4 0%, #ff8cb3 100%)"
                    : nightMode
                    ? "rgba(127, 83, 255, 0.12)"
                    : "rgba(255, 255, 255, 0.75)",
                  color: isActive ? "#fff" : textColor,
                  border: isActive
                    ? "none"
                    : nightMode
                    ? "1px solid rgba(167, 125, 253, 0.3)"
                    : "1px solid #ffd6e6",
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(0.72rem, 2vw, 0.82rem)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ---- Glassmorphism Video Grid (All 15 Videos) ---- */}
        <div className="row g-3 justify-content-center mx-auto" style={{ maxWidth: 1100 }}>
          {filteredVideos.map((video, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={video.id}
                className="col-6 col-md-4 col-lg-3"
                data-aos="fade-up"
                data-aos-delay={(idx % 4) * 60}
              >
                <div
                  className="video-reel-card position-relative overflow-hidden h-100 d-flex flex-column justify-content-between"
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
                      height: "clamp(140px, 32vw, 210px)",
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
                        background: video.tagColor + "ee",
                        color: "#fff",
                        fontSize: "clamp(0.52rem, 1.3vw, 0.65rem)",
                        fontWeight: 700,
                        fontFamily: "'Poppins', sans-serif",
                        backdropFilter: "blur(4px)",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {video.tag}
                    </div>

                    {/* Reel indicator (top-right) */}
                    <div
                      className="position-absolute top-0 end-0 m-2 d-flex align-items-center gap-1"
                      style={{
                        background: "rgba(0,0,0,0.6)",
                        borderRadius: 20,
                        padding: "2px 8px",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <span style={{ fontSize: "0.65rem", color: "#ff69b4" }}>▶</span>
                      <span
                        style={{
                          color: "#fff",
                          fontSize: "clamp(0.5rem, 1.3vw, 0.6rem)",
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        #{video.id}
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div
                      className="position-absolute top-50 start-50 translate-middle"
                      style={{
                        width: "clamp(38px, 9vw, 50px)",
                        height: "clamp(38px, 9vw, 50px)",
                        borderRadius: "50%",
                        background: isHovered
                          ? video.tagColor + "ee"
                          : "rgba(255,255,255,0.9)",
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
                        width="16"
                        height="16"
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
                        fontSize: "clamp(1rem, 2.8vw, 1.35rem)",
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
                        fontSize: "clamp(0.76rem, 2vw, 0.88rem)",
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
                        fontSize: "clamp(0.82rem, 2.1vw, 0.96rem)",
                        color: subText,
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginTop: 2,
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
        viewerIdx >= 0 &&
        viewerIdx < filteredVideos.length &&
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
                maxWidth: 520,
                padding: "12px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
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
                  gap: 3,
                  width: "100%",
                  paddingTop: 6,
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
                      background: filteredVideos[viewerIdx].tagColor + "cc",
                      color: "#fff",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: 20,
                      padding: "2px 12px",
                    }}
                  >
                    {filteredVideos[viewerIdx].tag}
                  </span>
                  <span style={{ fontSize: "1.3rem" }}>
                    {filteredVideos[viewerIdx].emoji}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontFamily: "'Poppins', sans-serif" }}>
                    {viewerIdx + 1} / {filteredVideos.length}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.05rem, 3.5vw, 1.35rem)",
                    color: "#fff",
                    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                    textAlign: "center",
                  }}
                >
                  {filteredVideos[viewerIdx].title}
                </div>
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
                    color: "rgba(255,220,240,0.92)",
                    textAlign: "center",
                  }}
                >
                  {filteredVideos[viewerIdx].subtitle}
                </div>
              </div>

              {/* Video Player with Gradient Ambient Border */}
              <div
                style={{
                  width: "100%",
                  borderRadius: 20,
                  padding: 2.5,
                  background: `linear-gradient(135deg, ${filteredVideos[viewerIdx].tagColor}, #fff6, ${filteredVideos[viewerIdx].tagColor}88)`,
                  boxShadow: `0 8px 45px ${filteredVideos[viewerIdx].tagColor}66`,
                }}
              >
                <div
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#000",
                    position: "relative",
                  }}
                >
                  <video
                    ref={videoRef}
                    key={viewerIdx}
                    src={filteredVideos[viewerIdx].src}
                    controls
                    autoPlay
                    playsInline
                    muted={isMuted}
                    style={{
                      width: "100%",
                      maxHeight: "56vh",
                      objectFit: "contain",
                      display: "block",
                      background: "#000",
                    }}
                    onEnded={() => {
                      if (viewerIdx < filteredVideos.length - 1) {
                        setViewerIdx((i) => i + 1);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Navigation Bar */}
              <div
                className="d-flex align-items-center justify-content-between w-100"
                style={{ gap: 10, padding: "0 4px" }}
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
                    fontSize: "0.9rem",
                    padding: "8px 16px",
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

                {/* Dots / Thumbnails */}
                <div className="d-flex gap-1.5 align-items-center flex-wrap justify-content-center" style={{ maxWidth: 280 }}>
                  {filteredVideos.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setViewerIdx(i)}
                      title={v.title}
                      style={{
                        width: i === viewerIdx ? 20 : 8,
                        height: 8,
                        borderRadius: 999,
                        border: "none",
                        background:
                          i === viewerIdx
                            ? filteredVideos[viewerIdx].tagColor
                            : "rgba(255,255,255,0.35)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        padding: 0,
                        boxShadow:
                          i === viewerIdx
                            ? `0 2px 10px ${filteredVideos[viewerIdx].tagColor}88`
                            : "none",
                      }}
                    />
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={() => setViewerIdx((i) => i + 1)}
                  disabled={viewerIdx === filteredVideos.length - 1}
                  style={{
                    borderRadius: 14,
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    padding: "8px 16px",
                    cursor:
                      viewerIdx === filteredVideos.length - 1 ? "not-allowed" : "pointer",
                    opacity: viewerIdx === filteredVideos.length - 1 ? 0.3 : 1,
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

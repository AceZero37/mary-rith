import React, { useState, useRef, useEffect } from "react";
import AOS from "aos";

const cinemaVideos = [
  { id: 1, title: "Sweet Moments 💕", subtitle: "Every smile with you is priceless", emoji: "🌸", src: "./assets/video/1.mp4", tag: "Romantic", color: "#ff69b4", duration: "0:45" },
  { id: 2, title: "Together Forever ✨", subtitle: "Side by side, always and always", emoji: "💑", src: "./assets/video/2.mp4", tag: "Memories", color: "#a77dfd", duration: "1:12" },
  { id: 3, title: "Our Adventure 🚗", subtitle: "The road is better with you", emoji: "🌍", src: "./assets/video/3.mp4", tag: "Adventure", color: "#ffd700", duration: "0:50" },
  { id: 4, title: "Love Story 📖", subtitle: "Our chapter is my favorite story", emoji: "❤️", src: "./assets/video/4.mp4", tag: "Romantic", color: "#ff4b72", duration: "1:05" },
  { id: 5, title: "Precious Time ⏰", subtitle: "Time flies when I'm holding your hand", emoji: "💖", src: "./assets/video/5.mp4", tag: "Cozy", color: "#00b894", duration: "0:38" },
  { id: 6, title: "Dancing Time 🎶", subtitle: "Dancing like nobody's watching, just us", emoji: "💃", src: "./assets/video/6.mp4", tag: "Dancing", color: "#74b9ff", duration: "0:48" },
  { id: 7, title: "Sleeping Together 😴", subtitle: "Peaceful dreams in your warm embrace", emoji: "😴", src: "./assets/video/7.mp4", tag: "Cozy", color: "#10ac84", duration: "0:32" },
  { id: 8, title: "Sweet Laughter 😂", subtitle: "You make my whole world laugh out loud", emoji: "🥰", src: "./assets/video/8.mp4", tag: "Fun", color: "#fd79a8", duration: "0:42" },
  { id: 9, title: "Magical Night 🌃", subtitle: "Under the city lights, holding you close", emoji: "✨", src: "./assets/video/9.mp4", tag: "Memories", color: "#6c5ce7", duration: "0:55" },
  { id: 10, title: "Romantic Drive 🌅", subtitle: "Golden hour breeze and you by my side", emoji: "🚗", src: "./assets/video/10.mp4", tag: "Adventure", color: "#e17055", duration: "1:20" },
  { id: 11, title: "Cute Moments 🍬", subtitle: "Every little silly thing melts my heart", emoji: "🎀", src: "./assets/video/11.mp4", tag: "Fun", color: "#00cec9", duration: "0:35" },
  { id: 12, title: "Late Night Talks 🌙", subtitle: "Whispering our dreams until the stars fade", emoji: "🌌", src: "./assets/video/12.mp4", tag: "Romantic", color: "#9b59b6", duration: "1:15" },
  { id: 13, title: "Happy Vibes ☀️", subtitle: "Pure joy and sunshine whenever we are together", emoji: "🌻", src: "./assets/video/13.mp4", tag: "Fun", color: "#f39c12", duration: "0:40" },
  { id: 14, title: "Special Journey 🏆", subtitle: "Every milestone with you is a treasure", emoji: "💍", src: "./assets/video/14.mp4", tag: "Milestones", color: "#e84393", duration: "0:52" },
  { id: 15, title: "Forever & Always 🔐", subtitle: "My heart belongs to you for all eternity", emoji: "💫", src: "./assets/video/15.mp4", tag: "Romantic", color: "#ff7675", duration: "1:30" },
  { id: 16, title: "Our Sweet Heaven 🕊️", subtitle: "With you, every day feels like heaven on earth", emoji: "💖", src: "./assets/video/16.mp4", tag: "Romantic", color: "#ff70a6", duration: "0:58" },
];

const CinemaReels = ({ nightMode }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reactions, setReactions] = useState(142);
  const [theaterMode, setTheaterMode] = useState(true);
  const [hearts, setHearts] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const activeVideo = cinemaVideos[currentIdx];

  const handleSelectVideo = (index) => {
    setCurrentIdx(index);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleHeartReaction = (e) => {
    setReactions((r) => r + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2 + (Math.random() * 30 - 15),
      y: rect.top,
      emoji: ["💖", "💕", "✨", "❤️", "🥰", "🌸"][Math.floor(Math.random() * 6)],
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const textColor = nightMode ? "#e8deff" : "#332233";

  return (
    <div
      className="cinema-reels-template pb-5"
      style={{
        background: nightMode
          ? "radial-gradient(ellipse at 50% 20%, rgba(127,83,255,0.22) 0%, transparent 70%), #0d0620"
          : "radial-gradient(ellipse at 50% 20%, rgba(255,105,180,0.18) 0%, transparent 70%), #fff5fa",
        minHeight: "85vh",
        paddingTop: 24,
      }}
      data-aos="fade-up"
    >
      <div className="container px-2 px-md-3">
        {/* Header Badge */}
        <div className="text-center mb-3">
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2"
            style={{
              background: nightMode ? "rgba(127,83,255,0.25)" : "rgba(255,105,180,0.15)",
              border: `1.5px solid ${accent}55`,
              color: accent,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "0.82rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            <span>🎬</span> Template 3 · Cinema Video &amp; Reel Theater
          </div>

          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.5rem, 4.5vw, 2.4rem)",
              fontWeight: 800,
              color: nightMode ? "#fff" : "#d72660",
              textShadow: `0 2px 20px ${activeVideo.color}66`,
              margin: 0,
            }}
          >
            Mary &amp; Rith Cinema Lounge 🍿
          </h2>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
              color: nightMode ? "#d6ccff" : "#8d3968",
              marginTop: 4,
            }}
          >
            ✨ Immersive high-definition video player with ambient theater glow 💕
          </div>
        </div>

        {/* Main Cinema Screen & Playlist Layout */}
        <div className="row g-4 justify-content-center mx-auto" style={{ maxWidth: 1160 }}>
          {/* LEFT: Main Big Screen Player */}
          <div className="col-12 col-lg-8">
            <div
              className="position-relative overflow-hidden"
              style={{
                borderRadius: 24,
                background: "#000",
                padding: 3,
                boxShadow: `0 20px 70px ${activeVideo.color}55, 0 0 40px ${activeVideo.color}33`,
                transition: "box-shadow 0.5s ease",
              }}
            >
              {/* Dynamic Backlight Glow */}
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  background: `radial-gradient(circle at center, ${activeVideo.color}44 0%, transparent 70%)`,
                  filter: "blur(30px)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />

              <div
                className="position-relative rounded-4 overflow-hidden"
                style={{ background: "#000", zIndex: 1 }}
              >
                {/* Video Player */}
                <video
                  ref={videoRef}
                  key={activeVideo.id}
                  src={activeVideo.src}
                  controls
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    maxHeight: "62vh",
                    minHeight: 280,
                    objectFit: "contain",
                    display: "block",
                    background: "#000",
                  }}
                  onEnded={() => {
                    if (currentIdx < cinemaVideos.length - 1) {
                      handleSelectVideo(currentIdx + 1);
                    }
                  }}
                />

                {/* Theater Overlay Badge */}
                <div
                  className="position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill"
                  style={{
                    background: activeVideo.color + "dd",
                    color: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  {activeVideo.tag} • Reel #{activeVideo.id}
                </div>
              </div>
            </div>

            {/* Video Info Bar & Reactions */}
            <div
              className="mt-3 p-3 rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-2"
              style={{
                background: nightMode ? "rgba(35, 22, 65, 0.75)" : "rgba(255, 255, 255, 0.85)",
                border: nightMode ? "1.5px solid rgba(167,125,253,0.35)" : "1.5px solid rgba(255,182,218,0.55)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
                    color: textColor,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>{activeVideo.emoji}</span>
                  {activeVideo.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
                    color: activeVideo.color,
                    margin: "2px 0 0 0",
                  }}
                >
                  "{activeVideo.subtitle}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="d-flex align-items-center gap-2">
                <button
                  onClick={handleHeartReaction}
                  className="btn rounded-pill px-3 py-1.5 d-flex align-items-center gap-2 shadow-sm text-white"
                  style={{
                    background: `linear-gradient(135deg, ${activeVideo.color}, #ff69b4)`,
                    border: "none",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    boxShadow: `0 4px 14px ${activeVideo.color}55`,
                  }}
                >
                  <span>💖</span>
                  <span>{reactions}</span>
                </button>

                <button
                  onClick={() => {
                    if (currentIdx > 0) handleSelectVideo(currentIdx - 1);
                  }}
                  disabled={currentIdx === 0}
                  className="btn btn-outline-light rounded-circle"
                  style={{
                    width: 38,
                    height: 38,
                    padding: 0,
                    color: textColor,
                    borderColor: accent,
                    opacity: currentIdx === 0 ? 0.3 : 1,
                  }}
                  title="Previous Reel"
                >
                  ◀
                </button>

                <button
                  onClick={() => {
                    if (currentIdx < cinemaVideos.length - 1) handleSelectVideo(currentIdx + 1);
                  }}
                  disabled={currentIdx === cinemaVideos.length - 1}
                  className="btn btn-outline-light rounded-circle"
                  style={{
                    width: 38,
                    height: 38,
                    padding: 0,
                    color: textColor,
                    borderColor: accent,
                    opacity: currentIdx === cinemaVideos.length - 1 ? 0.3 : 1,
                  }}
                  title="Next Reel"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Video Playlist Drawer (All 15 Videos) */}
          <div className="col-12 col-lg-4">
            <div
              className="p-3 rounded-4 h-100 d-flex flex-column"
              style={{
                background: nightMode ? "rgba(28, 16, 52, 0.85)" : "rgba(255, 255, 255, 0.9)",
                border: nightMode ? "1.5px solid rgba(167,125,253,0.3)" : "1.5px solid rgba(255,182,218,0.5)",
                boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
                backdropFilter: "blur(16px)",
                maxHeight: "75vh",
              }}
            >
              <div className="d-flex align-items-center justify-content-between pb-2 border-bottom mb-2">
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: textColor,
                  }}
                >
                  📼 Video Playlist (16 Reels)
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    background: accent + "22",
                    color: accent,
                    padding: "2px 8px",
                    borderRadius: 12,
                    fontWeight: 700,
                  }}
                >
                  {currentIdx + 1} of 16
                </span>
              </div>

              {/* Scrollable List */}
              <div
                className="overflow-auto pe-1 flex-grow-1"
                style={{ scrollbarWidth: "thin" }}
              >
                {cinemaVideos.map((video, idx) => {
                  const isActive = idx === currentIdx;
                  return (
                    <div
                      key={video.id}
                      onClick={() => handleSelectVideo(idx)}
                      className="d-flex align-items-center gap-2 p-2 rounded-3 mb-2 cursor-pointer"
                      style={{
                        background: isActive
                          ? nightMode
                            ? "rgba(127,83,255,0.3)"
                            : "rgba(255,105,180,0.18)"
                          : "transparent",
                        border: isActive
                          ? `1.5px solid ${video.color}`
                          : "1px solid transparent",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {/* Video Thumbnail */}
                      <div
                        className="rounded-3 overflow-hidden position-relative flex-shrink-0"
                        style={{ width: 60, height: 45, background: "#111" }}
                      >
                        <video
                          src={video.src}
                          muted
                          playsInline
                          preload="metadata"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onLoadedData={(e) => (e.target.currentTime = 0.5)}
                        />
                        {isActive && (
                          <div
                            className="position-absolute inset-0 d-flex align-items-center justify-content-center"
                            style={{ background: "rgba(0,0,0,0.45)" }}
                          >
                            <span style={{ fontSize: "0.8rem", color: "#fff" }}>▶</span>
                          </div>
                        )}
                      </div>

                      {/* Text details */}
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            color: isActive ? video.color : textColor,
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
                            fontSize: "0.82rem",
                            color: nightMode ? "#bca6e8" : "#888",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {video.subtitle}
                        </div>
                      </div>

                      {/* Tag pill */}
                      <span
                        style={{
                          fontSize: "0.6rem",
                          padding: "2px 6px",
                          borderRadius: 8,
                          background: video.color + "22",
                          color: video.color,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {video.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTINUOUS FILMSTRIP PHOTO TICKER (ALL 34 PHOTOS) ================= */}
        <div className="mt-5">
          <div className="text-center mb-2">
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: accent,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              🎞️ Continuous Filmstrip Memory Stream (36 Photos)
            </span>
          </div>

          <div
            className="filmstrip-ticker-wrapper position-relative overflow-hidden py-2"
            style={{
              background: nightMode ? "rgba(20,10,40,0.6)" : "rgba(255,255,255,0.7)",
              borderRadius: 18,
              border: nightMode ? "1.5px solid rgba(167,125,253,0.3)" : "1.5px solid rgba(255,182,218,0.5)",
            }}
          >
            <div
              className="d-flex gap-3 align-items-center filmstrip-marquee"
              style={{
                width: "max-content",
                animation: "marqueeScroll 45s linear infinite",
              }}
            >
              {/* Loop 36 photos twice for seamless infinite marquee */}
              {[...Array(36), ...Array(36)].map((_, i) => {
                const photoNum = (i % 36) + 1;
                return (
                  <div
                    key={i}
                    className="filmstrip-frame p-1 rounded-2 shadow-sm flex-shrink-0"
                    style={{
                      background: "#111",
                      border: "2px dashed #444",
                    }}
                  >
                    <img
                      src={`./assets/images/${photoNum}.jpg`}
                      alt=""
                      loading="lazy"
                      style={{
                        width: 90,
                        height: 65,
                        objectFit: "cover",
                        borderRadius: 4,
                        display: "block",
                      }}
                    />
                    <div
                      className="text-center mt-1"
                      style={{
                        fontSize: "0.55rem",
                        color: "#bbb",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      FRAME #{photoNum}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Reaction Hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: "fixed",
            left: h.x,
            top: h.y,
            fontSize: "1.8rem",
            pointerEvents: "none",
            zIndex: 999999,
            animation: "heartFloatUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        >
          {h.emoji}
        </div>
      ))}

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes heartFloatUp {
          0% { opacity: 1; transform: translate(0, 0) scale(0.6); }
          50% { opacity: 0.9; transform: translate(0, -60px) scale(1.3); }
          100% { opacity: 0; transform: translate(0, -120px) scale(0.8); }
        }
      `}</style>
    </div>
  );
};

export default CinemaReels;

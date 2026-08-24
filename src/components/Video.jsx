import { useEffect, useState, useRef } from "react";
import AOS from "aos";

// ---- DATA ----
const videos = [
  { id: 1, title: "Sweet Moments", src: "../assets/video/1.mp4" },
  { id: 2, title: "Together Forever", src: "../assets/video/2.mp4" },
  { id: 3, title: "Our Adventure", src: "../assets/video/3.mp4" },
  { id: 4, title: "Love Story", src: "../assets/video/4.mp4" },
  { id: 5, title: "Precious Time", src: "../assets/video/5.mp4" },
  { id: 6, title: "Dancing Time", src: "../assets/video/6.mp4" },
];

// ---- MAIN COMPONENT ----
const Video = ({ nightMode }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [viewerIdx, setViewerIdx] = useState(null);
  const videoRef = useRef(null);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (viewerIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
    }
  }, [viewerIdx]);

  const accentColor = nightMode ? "#b993ff" : "#ff69b4";
  const cardBg = nightMode
    ? "rgba(40, 30, 70, 0.7)"
    : "rgba(255,255,255,0.69)";
  const cardBorder = nightMode ? "1.5px solid #7f53ff44" : "1.5px solid #ffe1ef";
  const cardShadow = nightMode
    ? "0 8px 30px #7f53ff25, 0 1.5px 10px #0002"
    : "0 8px 30px #ffb3d625, 0 1.5px 10px #fff2";
  const cardHoverShadow = nightMode
    ? "0 16px 42px #7f53ff40, 0 3px 16px #0004"
    : "0 16px 42px #ffd6e480, 0 3px 16px #fff4";
  const overlayBg = nightMode
    ? "rgba(20, 15, 40, 0.96)"
    : "rgba(255, 234, 246, 0.96)";
  const dotActive = nightMode ? "#b993ff" : "#ff69b4";
  const dotInactive = nightMode ? "#2d1f4e" : "#fff6fa";
  const dotBorder = nightMode ? "#7f53ff" : "#ffb3d6";
  const dotShadow = nightMode ? "0 2px 10px #7f53ff80" : "0 2px 10px #ffb3d680";
  const navBtnBg = nightMode
    ? "rgba(40,30,70,0.85)"
    : "rgba(255,255,255,0.85)";
  const navBtnBorder = nightMode ? "1.5px solid #7f53ff44" : "1.5px solid #ffe6ef";
  const navBtnShadow = nightMode
    ? "0 2px 10px #7f53ff88"
    : "0 2px 10px #ffb3d688";

  return (
    <div className="container pb-3">
      {/* Centered Title */}
      <div className="text-center mb-3" style={{ marginTop: 26 }}>
        <span
          style={{
            fontFamily: "'Poppins', 'Montserrat', cursive, sans-serif",
            fontWeight: 800,
            fontSize: "1.18rem",
            letterSpacing: "1.1px",
            color: accentColor,
            textShadow: nightMode
              ? "0 2px 10px #7f53ff33"
              : "0 2px 10px #ff69b420",
            filter: nightMode
              ? "drop-shadow(0 2px 10px #b993ff22)"
              : "drop-shadow(0 2px 10px #fff3)",
            opacity: 0.95,
          }}
        >
          <span
            role="img"
            aria-label="video"
            style={{ fontSize: 19, marginRight: 6 }}
          >
            🎬
          </span>
          Our Videos
          <span
            role="img"
            aria-label="video"
            style={{ fontSize: 19, marginLeft: 6 }}
          >
            🎬
          </span>
        </span>
      </div>

      {/* ---- Grid ---- */}
      <div className="container pb-5">
        <div className="row g-4">
          {videos.map((video, idx) => (
            <div
              key={video.id}
              className="col-6 col-md-4 col-lg-4"
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              style={{ cursor: "pointer" }}
              onClick={() => setViewerIdx(idx)}
            >
              <div
                className="video-card-polaroid"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: cardBg,
                  boxShadow: cardShadow,
                  border: cardBorder,
                  transition: "transform 0.16s, box-shadow 0.22s",
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px) scale(1.038)";
                  e.currentTarget.style.boxShadow = cardHoverShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = cardShadow;
                }}
              >
                {/* Video thumbnail (first frame) */}
                <video
                  src={video.src}
                  muted
                  preload="metadata"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                    transition: "filter 0.14s",
                  }}
                  onLoadedData={(e) => {
                    // Seek to 0.5s for a better thumbnail
                    e.target.currentTime = 0.5;
                  }}
                />

                {/* Play button overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.18)",
                    borderRadius: "16px",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: nightMode
                        ? "rgba(127, 83, 255, 0.85)"
                        : "rgba(255, 105, 180, 0.85)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: nightMode
                        ? "0 4px 20px #7f53ff66"
                        : "0 4px 20px #ff69b466",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="white"
                      style={{ marginLeft: 2 }}
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>

                {/* Video title label */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "8px 12px",
                    background: nightMode
                      ? "linear-gradient(0deg, rgba(20,15,40,0.85) 60%, transparent 100%)"
                      : "linear-gradient(0deg, rgba(255,255,255,0.85) 60%, transparent 100%)",
                    borderRadius: "0 0 16px 16px",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily:
                        "'Poppins', 'Montserrat', sans-serif",
                      color: nightMode ? "#d6ccff" : "#a8235d",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {video.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Modal/Viewer ---- */}
      {viewerIdx !== null && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: overlayBg,
            backdropFilter: "blur(5px) saturate(1.2)",
            zIndex: 2000,
          }}
          onClick={() => setViewerIdx(null)}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center w-100 position-relative"
            style={{ maxWidth: 500, margin: "0 auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="btn-close position-absolute top-0 end-0 m-4"
              style={{
                filter: nightMode ? "invert(0.7)" : "invert(1)",
                zIndex: 2,
                fontSize: "2rem",
              }}
              aria-label="Close"
              onClick={() => setViewerIdx(null)}
            />
            {/* Prev Button */}
            <button
              className="btn position-absolute start-0 top-50 translate-middle-y"
              style={{
                left: 8,
                zIndex: 3,
                opacity: viewerIdx > 0 ? 1 : 0.4,
                pointerEvents: viewerIdx > 0 ? "auto" : "none",
                borderRadius: 20,
                fontWeight: 700,
                fontSize: 20,
                boxShadow: navBtnShadow,
                border: navBtnBorder,
                background: navBtnBg,
                color: nightMode ? "#d6ccff" : "#333",
                transition: "background 0.15s, box-shadow 0.15s",
              }}
              disabled={viewerIdx === 0}
              onClick={() => setViewerIdx((idx) => idx - 1)}
            >
              &#8592;
            </button>
            {/* Next Button */}
            <button
              className="btn position-absolute end-0 top-50 translate-middle-y"
              style={{
                right: 8,
                zIndex: 3,
                opacity: viewerIdx < videos.length - 1 ? 1 : 0.4,
                pointerEvents:
                  viewerIdx < videos.length - 1 ? "auto" : "none",
                borderRadius: 20,
                fontWeight: 700,
                fontSize: 20,
                boxShadow: navBtnShadow,
                border: navBtnBorder,
                background: navBtnBg,
                color: nightMode ? "#d6ccff" : "#333",
                transition: "background 0.15s, box-shadow 0.15s",
              }}
              disabled={viewerIdx === videos.length - 1}
              onClick={() => setViewerIdx((idx) => idx + 1)}
            >
              &#8594;
            </button>
            {/* Video Player */}
            <div
              className="position-relative w-100 d-flex flex-column align-items-center"
              style={{ maxWidth: 480 }}
            >
              <video
                ref={videoRef}
                key={viewerIdx}
                src={videos[viewerIdx].src}
                controls
                autoPlay
                playsInline
                className="rounded-4 shadow"
                style={{
                  width: "100%",
                  maxWidth: 480,
                  height: "60vh",
                  objectFit: "contain",
                  background: nightMode ? "#1a1030" : "#fff8",
                  borderRadius: "22px",
                  boxShadow: nightMode
                    ? "0 8px 40px #7f53ff50"
                    : "0 8px 40px #ffb3d650",
                  transition: "box-shadow 0.2s",
                }}
              />
              {/* Video Title */}
              <div
                style={{
                  marginTop: 12,
                  fontFamily: "'Poppins', 'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: accentColor,
                  letterSpacing: "0.5px",
                  textAlign: "center",
                }}
              >
                {videos[viewerIdx].title}
              </div>
              {/* Bouncy Dots */}
              <div
                className="position-absolute start-50 translate-middle-x"
                style={{
                  bottom: -30,
                  zIndex: 2,
                  width: "92%",
                  maxWidth: 340,
                  left: "50%",
                  pointerEvents: "none",
                }}
              >
                <div className="mt-2 d-flex gap-2 justify-content-center">
                  {videos.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-circle"
                      style={{
                        width: 13,
                        height: 13,
                        background: i === viewerIdx ? dotActive : dotInactive,
                        border: `2px solid ${dotBorder}`,
                        display: "inline-block",
                        animation:
                          i === viewerIdx
                            ? "videoDotBounce 0.4s"
                            : undefined,
                        boxShadow:
                          i === viewerIdx
                            ? dotShadow
                            : "0 1.5px 4px #fff8",
                        transition: "background 0.17s, box-shadow 0.15s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Dot Bounce Animation */}
          <style>{`
            @keyframes videoDotBounce {
              0% { transform: scale(1); }
              50% { transform: scale(1.35); }
              100% { transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Video;

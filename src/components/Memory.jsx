import { useEffect, useState } from "react";
import AOS from "aos";

// ---- DATA ----
const memories = [
  { id: 1, title: "Beach Day", image: "../assets/images/1.jpg" },
  { id: 2, title: "Mountain Hike", image: "../assets/images/2.jpg" },
  { id: 3, title: "City Nightlife", image: "../assets/images/3.jpg" },
  { id: 4, title: "Picnic", image: "../assets/images/4.jpg" },
  { id: 5, title: "Concert", image: "../assets/images/5.jpg" },
  { id: 6, title: "Road Trip", image: "../assets/images/6.jpg" },
  { id: 7, title: "Concert", image: "../assets/images/7.jpg" },
  { id: 8, title: "Road Trip", image: "../assets/images/8.jpg" },
  { id: 9, title: "Concert", image: "../assets/images/9.jpg" },
  { id: 10, title: "Concert", image: "../assets/images/10.jpg" },
  { id: 11, title: "Concert", image: "../assets/images/11.jpg" },
];

// ---- MAIN COMPONENT ----
const Memory = ({ nightMode }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [viewerIdx, setViewerIdx] = useState(null);

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

  // Swipe/scroll/modal navigation logic...
  useEffect(() => {
    if (viewerIdx === null) return;
    const handleWheel = (e) => {
      if (e.deltaY > 0 && viewerIdx < memories.length - 1)
        setViewerIdx((idx) => idx + 1);
      else if (e.deltaY < 0 && viewerIdx > 0) setViewerIdx((idx) => idx - 1);
    };
    let startY = null;
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (startY === null) return;
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 50 && viewerIdx > 0) setViewerIdx((idx) => idx - 1);
      if (startY - endY > 50 && viewerIdx < memories.length - 1)
        setViewerIdx((idx) => idx + 1);
      startY = null;
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [viewerIdx]);

  useEffect(() => {
    if (viewerIdx === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowDown" && viewerIdx < memories.length - 1)
        setViewerIdx((idx) => idx + 1);
      if (e.key === "ArrowUp" && viewerIdx > 0) setViewerIdx((idx) => idx - 1);
      if (e.key === "Escape") setViewerIdx(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewerIdx]);

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
            color: nightMode ? "#b993ff" : "#ff69b4",
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
            aria-label="star"
            style={{ fontSize: 19, marginRight: 6 }}
          >
            🌸
          </span>
          Top Memory Album
          <span
            role="img"
            aria-label="star"
            style={{ fontSize: 19, marginLeft: 6 }}
          >
            🌸
          </span>
        </span>
      </div>

      {/* ---- Grid ---- */}
      <div className="container pb-5">
        <div className="row g-4">
          {memories.map((memory, idx) => (
            <div
              key={memory.id}
              className="col-6 col-md-3 col-lg-2"
              data-aos="fade-up"
              style={{ cursor: "pointer" }}
              onClick={() => setViewerIdx(idx)}
            >
              <div
                className="memory-polaroid"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.69)",
                  boxShadow: "0 8px 30px #ffb3d625, 0 1.5px 10px #fff2",
                  border: "1.5px solid #ffe1ef",
                  transition: "transform 0.16s, box-shadow 0.22s",
                  height: 186,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px) scale(1.038)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 42px #ffd6e480, 0 3px 16px #fff4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px #ffb3d625, 0 1.5px 10px #fff2";
                }}
              >
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                    boxShadow: "0 2px 10px #fff2",
                    transition: "filter 0.14s",
                  }}
                />
                {/* Optional: small shadow at bottom */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 14,
                    background: "linear-gradient(0deg, #fff6 60%, #fff0 100%)",
                    zIndex: 2,
                  }}
                />
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
            background: "rgba(255, 234, 246, 0.96)",
            backdropFilter: "blur(5px) saturate(1.2)",
            zIndex: 2000,
          }}
          onClick={() => setViewerIdx(null)}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center w-100 position-relative"
            style={{ maxWidth: 430, margin: "0 auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="btn-close position-absolute top-0 end-0 m-4"
              style={{ filter: "invert(1)", zIndex: 2, fontSize: "2rem" }}
              aria-label="Close"
              onClick={() => setViewerIdx(null)}
            />
            {/* Prev Button */}
            <button
              className="btn btn-light position-absolute start-0 top-50 translate-middle-y"
              style={{
                left: 8,
                zIndex: 3,
                opacity: viewerIdx > 0 ? 1 : 0.4,
                pointerEvents: viewerIdx > 0 ? "auto" : "none",
                borderRadius: 20,
                fontWeight: 700,
                fontSize: 20,
                boxShadow: "0 2px 10px #ffb3d688",
                border: "1.5px solid #ffe6ef",
                background: "rgba(255,255,255,0.85)",
                transition: "background 0.15s, box-shadow 0.15s",
              }}
              disabled={viewerIdx === 0}
              onClick={() => setViewerIdx((idx) => idx - 1)}
            >
              &#8592;
            </button>
            {/* Next Button */}
            <button
              className="btn btn-light position-absolute end-0 top-50 translate-middle-y"
              style={{
                right: 8,
                zIndex: 3,
                opacity: viewerIdx < memories.length - 1 ? 1 : 0.4,
                pointerEvents:
                  viewerIdx < memories.length - 1 ? "auto" : "none",
                borderRadius: 20,
                fontWeight: 700,
                fontSize: 20,
                boxShadow: "0 2px 10px #ffb3d688",
                border: "1.5px solid #ffe6ef",
                background: "rgba(255,255,255,0.85)",
                transition: "background 0.15s, box-shadow 0.15s",
              }}
              disabled={viewerIdx === memories.length - 1}
              onClick={() => setViewerIdx((idx) => idx + 1)}
            >
              &#8594;
            </button>
            {/* Image Viewer */}
            <div
              className="position-relative w-100 d-flex flex-column align-items-center"
              style={{ maxWidth: 400 }}
            >
              <img
                src={memories[viewerIdx].image}
                alt=""
                className="rounded-4 shadow"
                style={{
                  width: "100%",
                  maxWidth: 400,
                  height: "60vh",
                  objectFit: "cover",
                  background: "#fff8",
                  borderRadius: "22px",
                  boxShadow: "0 8px 40px #ffb3d650",
                  transition: "box-shadow 0.2s",
                }}
              />
              {/* Bouncy Dots */}
              <div
                className="position-absolute start-50 translate-middle-x"
                style={{
                  bottom: 16,
                  zIndex: 2,
                  width: "92%",
                  maxWidth: 340,
                  left: "50%",
                  pointerEvents: "none",
                }}
              >
                <div className="mt-2 d-flex gap-2 justify-content-center">
                  {memories.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-circle"
                      style={{
                        width: 13,
                        height: 13,
                        background: i === viewerIdx ? "#ff69b4" : "#fff6fa",
                        border: "2px solid #ffb3d6",
                        display: "inline-block",
                        animation:
                          i === viewerIdx ? "dotBounce 0.4s" : undefined,
                        boxShadow:
                          i === viewerIdx
                            ? "0 2px 10px #ffb3d680"
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
            @keyframes dotBounce {
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

export default Memory;

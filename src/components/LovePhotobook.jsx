import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AOS from "aos";

// 5 Magazine Spreads
const photobookSpreads = [
  {
    id: 1,
    chapter: "Chapter I",
    title: "The First Spark & Sweet Beginnings 🌸",
    subtitle: "Where our fairytale quietly began",
    quote: "Meeting you was not just chance — it was destiny writing our sweetest song.",
    photos: [1, 2, 3, 4],
    date: "August 20, 2026",
    theme: "#ff69b4",
  },
  {
    id: 2,
    chapter: "Chapter II",
    title: "Concerts, Highways & Road Trips 🚗",
    subtitle: "Every mile is better when I'm beside you",
    quote: "With you as my co-pilot, even the longest road feels like an adventure in paradise.",
    photos: [5, 6, 7, 8, 9, 10],
    date: "August 25 – September 10, 2026",
    theme: "#ffd700",
  },
  {
    id: 3,
    chapter: "Chapter III",
    title: "Coffee Dates & Stargazing Nights ☕",
    subtitle: "Simple moments turned into pure gold",
    quote: "I found a thousand reasons to love you, and every cup of coffee shared with you is one of them.",
    photos: [11, 12, 13, 14, 15, 16],
    date: "September 15 – October 05, 2026",
    theme: "#00b894",
  },
  {
    id: 4,
    chapter: "Chapter IV",
    title: "Secret Hideouts & Giggles 🏰",
    subtitle: "Lover, best friend, soulmate in one",
    quote: "Never a dull second with my favorite human. You make my entire life 1000x brighter.",
    photos: [17, 18, 19, 20, 21, 22, 23, 24],
    date: "October 10 – October 25, 2026",
    theme: "#74b9ff",
  },
  {
    id: 5,
    chapter: "Chapter V",
    title: "Sacred Promises & Forever Love 💍",
    subtitle: "To infinity and beyond, without end",
    quote: "A promise of eternal loyalty, warmth, laughter, and holding your hand forever.",
    photos: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    date: "October 30, 2026 & Beyond",
    theme: "#a77dfd",
  },
];

// Romantic Roadmap Milestones
const milestonesTimeline = [
  { step: 1, title: "First Met 🌸", date: "August 20, 2026", desc: "The day our eyes first met and our story started.", icon: "✨" },
  { step: 2, title: "First Movie Date 🍿", date: "August 21, 2026", desc: "Shared sweet popcorn and fell deeper in love.", icon: "🎬" },
  { step: 3, title: "First Road Trip 🚗", date: "August 25, 2026", desc: "Wind in our hair, singing songs on the highway.", icon: "🛣️" },
  { step: 4, title: "First Stargazing 🌌", date: "August 30, 2026", desc: "Pisces ♓ & Sagittarius ♐ written in the cosmos.", icon: "⭐" },
  { step: 5, title: "Anniversary Celebration 💍", date: "October 20, 2026", desc: "Two months of pure love, devotion and joy.", icon: "👑" },
  { step: 6, title: "Our Forever Future 💫", date: "Forever", desc: "Holding hands through every adventure ahead.", icon: "♾️" },
];

const LovePhotobook = ({ nightMode }) => {
  const [activeSpread, setActiveSpread] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [activeGalleryTab, setActiveGalleryTab] = useState("all");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const spread = photobookSpreads[activeSpread];
  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const textColor = nightMode ? "#e8deff" : "#332233";

  return (
    <div
      className="love-photobook-template pb-5"
      style={{
        background: nightMode
          ? "radial-gradient(ellipse at 50% 15%, rgba(127,83,255,0.2) 0%, transparent 65%), #110826"
          : "radial-gradient(ellipse at 50% 15%, rgba(255,182,218,0.3) 0%, transparent 65%), #fff8fc",
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
            <span>📖</span> Template 4 · Love Photobook &amp; Milestone Magazine
          </div>

          <h2
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(2rem, 5.5vw, 3.2rem)",
              fontWeight: 700,
              color: nightMode ? "#fff" : "#d72660",
              textShadow: `0 2px 20px ${spread.theme}66`,
              margin: 0,
            }}
          >
            Mary &amp; Rith Editorial Photobook 📚
          </h2>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
              color: nightMode ? "#d6ccff" : "#8d3968",
              marginTop: 4,
            }}
          >
            ✨ Flip through our romantic magazine chapters &amp; explore all 34 photos 💕
          </div>
        </div>

        {/* ================= EDITORIAL MAGAZINE BOOK SPREAD ================= */}
        <div
          className="photobook-magazine-spread position-relative mx-auto rounded-4 overflow-hidden shadow-lg p-3 p-md-4 mb-5"
          style={{
            maxWidth: 1040,
            background: nightMode
              ? "linear-gradient(135deg, rgba(30,16,60,0.92) 0%, rgba(20,10,42,0.96) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(255,248,252,0.96) 100%)",
            border: `2px solid ${spread.theme}55`,
            boxShadow: `0 20px 60px ${spread.theme}33`,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Chapter Top Bar */}
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pb-3 border-bottom border-opacity-25">
            <div className="d-flex align-items-center gap-2">
              <span
                style={{
                  background: spread.theme,
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  borderRadius: 20,
                  padding: "3px 12px",
                }}
              >
                {spread.chapter}
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.85rem, 2.2vw, 1.05rem)",
                  color: textColor,
                }}
              >
                {spread.title}
              </span>
            </div>

            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "1rem", color: spread.theme }}>
              📅 {spread.date}
            </span>
          </div>

          {/* Magazine Quote & Description */}
          <div className="py-3 text-center">
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(1.25rem, 3.8vw, 1.6rem)",
                color: spread.theme,
                fontWeight: 700,
                maxWidth: 720,
                margin: "0 auto",
                lineHeight: 1.45,
              }}
            >
              "{spread.quote}"
            </p>
          </div>

          {/* Photo Collage Grid for this spread */}
          <div className="row g-2 g-md-3 justify-content-center">
            {spread.photos.map((photoNum) => (
              <div
                key={photoNum}
                className="col-6 col-md-4 col-lg-3"
                onClick={() => setLightboxPhoto(photoNum)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="photobook-thumb-card position-relative rounded-3 overflow-hidden shadow-sm"
                  style={{
                    height: 190,
                    border: `1.5px solid ${spread.theme}44`,
                    transition: "transform 0.28s ease, box-shadow 0.28s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={`./assets/images/${photoNum}.jpg`}
                    alt=""
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-1 px-2 d-flex justify-content-between align-items-center"
                    style={{
                      background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <span>Photo #{photoNum}</span>
                    <span>🔍 Zoom</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Spread Page Turn Controls */}
          <div className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top border-opacity-25">
            <button
              onClick={() => setActiveSpread((s) => s - 1)}
              disabled={activeSpread === 0}
              className="btn btn-outline-light rounded-pill px-4"
              style={{
                borderColor: spread.theme,
                color: textColor,
                opacity: activeSpread === 0 ? 0.3 : 1,
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              ← Previous Chapter
            </button>

            {/* Chapter Dots */}
            <div className="d-flex gap-2">
              {photobookSpreads.map((sp, i) => (
                <button
                  key={sp.id}
                  onClick={() => setActiveSpread(i)}
                  style={{
                    width: i === activeSpread ? 24 : 10,
                    height: 10,
                    borderRadius: 999,
                    border: "none",
                    background: i === activeSpread ? spread.theme : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  title={sp.chapter}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveSpread((s) => s + 1)}
              disabled={activeSpread === photobookSpreads.length - 1}
              className="btn btn-outline-light rounded-pill px-4"
              style={{
                borderColor: spread.theme,
                color: textColor,
                opacity: activeSpread === photobookSpreads.length - 1 ? 0.3 : 1,
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              Next Chapter →
            </button>
          </div>
        </div>

        {/* ================= ROMANTIC MILESTONE TIMELINE ROADMAP ================= */}
        <div className="my-5 mx-auto" style={{ maxWidth: 940 }}>
          <div className="text-center mb-4">
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: accent,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              🗺️ Our Love Story Milestones Roadmap
            </span>
          </div>

          <div className="row g-3 justify-content-center">
            {milestonesTimeline.map((item) => (
              <div key={item.step} className="col-12 col-md-6 col-lg-4">
                <div
                  className="p-3 rounded-4 h-100 shadow-sm"
                  style={{
                    background: nightMode ? "rgba(35, 20, 68, 0.7)" : "rgba(255, 255, 255, 0.85)",
                    border: nightMode ? "1.5px solid rgba(167,125,253,0.3)" : "1.5px solid rgba(255,182,218,0.5)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: textColor,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Caveat', cursive",
                          fontSize: "0.85rem",
                          color: accent,
                        }}
                      >
                        {item.date}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "1.05rem",
                      color: nightMode ? "#d6ccff" : "#5a3a4a",
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ALL 36 PHOTOS FULL MASONRY GALLERY ================= */}
        <div className="mt-5 mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-3">
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: accent,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              🖼️ Complete Photo Archive (All 36 Photos)
            </span>
          </div>

          <div className="row g-2 g-md-3 justify-content-center">
            {Array.from({ length: 36 }).map((_, idx) => {
              const photoId = idx + 1;
              return (
                <div
                  key={photoId}
                  className="col-4 col-md-3 col-lg-2"
                  onClick={() => setLightboxPhoto(photoId)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="rounded-3 overflow-hidden position-relative shadow-sm"
                    style={{
                      height: 120,
                      background: "#111",
                      border: "1px solid rgba(255,255,255,0.15)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <img
                      src={`./assets/images/${photoId}.jpg`}
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span
                      className="position-absolute bottom-0 end-0 m-1 px-1.5 py-0.5 rounded-pill"
                      style={{
                        background: "rgba(0,0,0,0.65)",
                        color: "#fff",
                        fontSize: "0.58rem",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      #{photoId}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= FULLSCREEN LIGHTBOX (PORTAL) ================= */}
      {lightboxPhoto !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="d-flex align-items-center justify-content-center p-3"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(18px)",
              animation: "fadeIn 0.25s ease",
            }}
            onClick={() => setLightboxPhoto(null)}
          >
            <div
              style={{ width: "100%", maxWidth: 480, position: "relative" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setLightboxPhoto(null)}
                style={{
                  position: "absolute",
                  top: -42,
                  right: 0,
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  color: "#fff",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                <img
                  src={`./assets/images/${lightboxPhoto}.jpg`}
                  alt=""
                  style={{ width: "100%", maxHeight: "68vh", objectFit: "contain", background: "#000" }}
                />
              </div>

              <div className="text-center mt-3 text-white">
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
                  Photo Memory #{lightboxPhoto}
                </div>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem", color: "#ffd700", marginTop: 2 }}>
                  Sovan Narith &amp; Mary Forever 💕
                </div>
              </div>

              {/* Navigation */}
              <div className="d-flex justify-content-between mt-3">
                <button
                  disabled={lightboxPhoto === 1}
                  onClick={() => setLightboxPhoto((p) => p - 1)}
                  className="btn btn-outline-light rounded-pill px-4"
                  style={{ opacity: lightboxPhoto === 1 ? 0.3 : 1 }}
                >
                  ← Prev
                </button>
                <button
                  disabled={lightboxPhoto === 36}
                  onClick={() => setLightboxPhoto((p) => p + 1)}
                  className="btn btn-outline-light rounded-pill px-4"
                  style={{ opacity: lightboxPhoto === 36 ? 0.3 : 1 }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default LovePhotobook;

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AOS from "aos";

// ---- 36 POLAROID MEMORIES DATA ----
const polaroidData = Array.from({ length: 36 }).map((_, i) => {
  const id = i + 1;
  const quotes = [
    "The way you smile at me makes the whole world fade away. 💕",
    "Popcorn, movie, and your warm hand in mine. ✨",
    "Skyline lights are beautiful, but your eyes shine brighter. 🌃",
    "Picnic blankets, fresh berries, and sweet laughter. 🍓",
    "Singing our favorite songs until our voices were gone! 🎤",
    "Wind in our hair, endless road ahead, perfect companion. 🚗",
    "Warm coffee and sweeter conversations with you. ☕",
    "A forever promise to hold your hand through everything. 💍",
    "Sunset paints the sky, but you paint my whole life with color. 🌅",
    "Making goofy faces and winning plushies together! 📸",
    "Under the cosmic sky, our stars aligned forever. 🌌",
    "Your morning smile is my favorite sunshine. ☀️",
    "Strolling through gardens, admiring the prettiest flower. 🌺",
    "Ice cream dates and sweet sugar rush moments. 🍦",
    "Candlelight flickering, gazing into your eyes. 🕯️",
    "Rainy afternoons wrapped in your warm hug. 🌧️",
    "Our secret hideout where dreams come true. 🏰",
    "Stolen kisses that make my heart skip a beat. 💋",
    "Standing at the mountain peak, holding hands. 🌄",
    "Bookstore adventures and poetry dedicated to you. 📚",
    "Baking cupcakes and spreading frosting everywhere. 🧁",
    "Late night drives with our song playing softly. 🎵",
    "Footprints in the sand, ocean breeze in our hair. 🌊",
    "Golden hour sunlight shining like pure magic. 🌇",
    "Contagious laughs that heal my entire soul. 😂",
    "Stargazing on the grass, finding your constellation. ⭐",
    "The sweet surprise that brought tears of joy. 🎁",
    "Dancing barefoot on the living room floor. 💃",
    "Matching hoodies and proud couple vibes. 👫",
    "Whispered secrets in the dark of night. 💬",
    "Top of the Ferris wheel with the girl of my dreams. 🎡",
    "The ring that bound two loving hearts into one. 💍",
    "A treasure trove of snapshots we will cherish forever. 🌟",
    "To infinity and beyond, forever your boy. 💫",
    "Endless smiles and laughter with my favorite human. 🌈",
    "Two souls locked in eternal harmony, forever and always. 💍",
  ];

  const categories = ["dates", "trips", "cozy", "fun", "milestones", "sweet"];
  const titles = [
    "First Spark 🌸", "Movie Date 🍿", "City Lights 🌃", "Picnic Dream 🧺",
    "Concert Vibe 🎶", "Road Trip 🚗", "Cafe Moments ☕", "Hand in Hand 🤝",
    "Golden Shore 🌅", "Arcade Fun 🕹️", "Cosmic Sky 🌌", "Morning Glow ☀️",
    "Garden Walk 🌿", "Ice Cream 🍦", "Candlelight 🕯️", "Rainy Day 🌧️",
    "Secret Spot 🏰", "Sweet Kiss 💋", "Mountain View 🌄", "Book Lovers 📚",
    "Cupcake Bake 🧁", "Night Drive 🎵", "Beach Waves 🌊", "Golden Hour 🌇",
    "Silly Faces 🤪", "Star Counting ⭐", "First Gift 🎁", "Slow Dance 💃",
    "Matching Duo 👕", "Late Whispers 💬", "Ferris Wheel 🎡", "Promise Ring 💍",
    "Photo Album 🌟", "Infinite Love 💫", "Endless Smiles 🌈", "Forever Bound 💍"
  ];

  const dates = [
    "Aug 20, 2026", "Aug 21, 2026", "Aug 22, 2026", "Aug 23, 2026",
    "Aug 24, 2026", "Aug 25, 2026", "Aug 26, 2026", "Aug 27, 2026",
    "Aug 28, 2026", "Aug 29, 2026", "Aug 30, 2026", "Sep 01, 2026",
    "Sep 03, 2026", "Sep 05, 2026", "Sep 08, 2026", "Sep 10, 2026",
    "Sep 12, 2026", "Sep 15, 2026", "Sep 18, 2026", "Sep 20, 2026",
    "Sep 22, 2026", "Sep 25, 2026", "Sep 28, 2026", "Oct 01, 2026",
    "Oct 04, 2026", "Oct 07, 2026", "Oct 10, 2026", "Oct 14, 2026",
    "Oct 18, 2026", "Oct 22, 2026", "Oct 26, 2026", "Oct 30, 2026",
    "Nov 05, 2026", "Nov 10, 2026", "Nov 15, 2026", "Nov 20, 2026"
  ];

  const washiColors = ["#ff69b4", "#ffd700", "#00cec9", "#a29bfe", "#ff7675", "#fd79a8", "#74b9ff"];
  const pinRotations = [-4, 3, -2, 5, -3, 2, -5, 4, -1, 3];

  return {
    id,
    image: `./assets/images/${id}.jpg`,
    title: titles[i] || `Memory #${id}`,
    note: quotes[i] || "Every moment with you is a gift from above 💕",
    category: categories[i % categories.length],
    date: dates[i] || "2026",
    author: i % 2 === 0 ? "Rith" : "Mary",
    washi: washiColors[i % washiColors.length],
    tilt: pinRotations[i % pinRotations.length],
    likes: 120 + id * 15,
  };
});

const PolaroidScrapbook = ({ nightMode }) => {
  const [flippedCards, setFlippedCards] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [layoutMode, setLayoutMode] = useState("pinboard"); // 'pinboard' | 'grid'

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleFlip = (id, e) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredPolaroids =
    activeCategory === "all"
      ? polaroidData
      : polaroidData.filter((p) => p.category === activeCategory);

  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const textColor = nightMode ? "#e8deff" : "#332233";

  return (
    <div
      className="polaroid-scrapbook-template pb-5"
      style={{
        background: nightMode
          ? "radial-gradient(ellipse at 50% 10%, rgba(127,83,255,0.18) 0%, transparent 60%), rgba(18, 10, 42, 0.95)"
          : "radial-gradient(ellipse at 50% 10%, rgba(255,182,218,0.25) 0%, transparent 60%), #fdf8f5",
        minHeight: "80vh",
        paddingTop: 24,
      }}
      data-aos="fade-up"
    >
      <div className="container px-2 px-md-3">
        {/* Template Header Badge */}
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
            <span>🎞️</span> Template 2 · Vintage Scrapbook &amp; Pinboard
          </div>

          <h2
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(2rem, 5.5vw, 3.2rem)",
              fontWeight: 700,
              color: nightMode ? "#f3edff" : "#d72660",
              textShadow: nightMode
                ? "0 2px 18px rgba(167,125,253,0.5)"
                : "0 2px 14px rgba(255,105,180,0.3)",
              margin: 0,
            }}
          >
            Mary &amp; Rith’s Polaroid Wall 📌
          </h2>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
              color: nightMode ? "#d6ccff" : "#8d3968",
              marginTop: 4,
            }}
          >
            ✨ Tap any polaroid to flip and read the secret handwritten note on the back! 💕
          </div>
        </div>

        {/* Controls Bar: Category Pills + Layout Switcher */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 mx-auto" style={{ maxWidth: 1060 }}>
          {/* Category Filter Pills */}
          <div className="d-flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "🌟 All (36)" },
              { id: "dates", label: "🍿 Dates" },
              { id: "trips", label: "🚗 Trips" },
              { id: "cozy", label: "💖 Cozy" },
              { id: "fun", label: "🎉 Fun" },
              { id: "milestones", label: "✨ Special" },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="btn btn-sm rounded-pill px-3 py-1 shadow-sm"
                  style={{
                    background: isActive
                      ? nightMode
                        ? "linear-gradient(135deg, #7f53ff 0%, #a77dfd 100%)"
                        : "linear-gradient(135deg, #ff69b4 0%, #ff8cb3 100%)"
                      : nightMode
                      ? "rgba(127, 83, 255, 0.12)"
                      : "rgba(255, 255, 255, 0.85)",
                    color: isActive ? "#fff" : textColor,
                    border: isActive
                      ? "none"
                      : nightMode
                      ? "1px solid rgba(167, 125, 253, 0.3)"
                      : "1px solid #ffd6e6",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(0.7rem, 1.8vw, 0.78rem)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Layout Toggle */}
          <div className="d-flex gap-1 bg-white bg-opacity-10 p-1 rounded-pill border border-white border-opacity-20">
            <button
              onClick={() => setLayoutMode("pinboard")}
              className="btn btn-sm rounded-pill px-3 py-0.5"
              style={{
                background: layoutMode === "pinboard" ? "#ff69b4" : "transparent",
                color: layoutMode === "pinboard" ? "#fff" : textColor,
                fontSize: "0.76rem",
                fontWeight: 700,
                border: "none",
              }}
            >
              📌 Pinboard
            </button>
            <button
              onClick={() => setLayoutMode("grid")}
              className="btn btn-sm rounded-pill px-3 py-0.5"
              style={{
                background: layoutMode === "grid" ? "#ff69b4" : "transparent",
                color: layoutMode === "grid" ? "#fff" : textColor,
                fontSize: "0.76rem",
                fontWeight: 700,
                border: "none",
              }}
            >
              ▦ Neat Grid
            </button>
          </div>
        </div>

        {/* ================= POLAROID PINBOARD WALL (34 PHOTOS) ================= */}
        <div
          className="row g-3 g-md-4 justify-content-center mx-auto"
          style={{ maxWidth: 1120 }}
        >
          {filteredPolaroids.map((item, idx) => {
            const isFlipped = !!flippedCards[item.id];
            const tiltAngle = layoutMode === "pinboard" ? item.tilt : 0;

            return (
              <div
                key={item.id}
                className="col-6 col-md-4 col-lg-3 d-flex justify-content-center p-2"
                data-aos="fade-up"
                data-aos-delay={(idx % 4) * 50}
              >
                {/* Polaroid 3D Perspective Container */}
                <div
                  className="polaroid-3d-scene position-relative"
                  style={{
                    perspective: 1000,
                    width: "100%",
                    maxWidth: 240,
                    height: "clamp(275px, 62vw, 315px)",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleFlip(item.id)}
                >
                  {/* Push Pin / Washi Tape (Visual top decor) */}
                  <div
                    className="washi-tape position-absolute top-0 start-50 translate-middle-x"
                    style={{
                      width: 65,
                      height: 18,
                      background: item.washi + "dd",
                      zIndex: 20,
                      transform: `translateY(-6px) rotate(${item.tilt * 1.5}deg)`,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      borderRadius: 2,
                    }}
                  />

                  {/* 3D Flippable Card */}
                  <div
                    className="polaroid-flipper position-relative w-100 h-100"
                    style={{
                      transformStyle: "preserve-3d",
                      transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      transform: `rotate(${tiltAngle}deg) ${isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}`,
                    }}
                  >
                    {/* ==== FRONT: Classic Polaroid ==== */}
                    <div
                      className="polaroid-front position-absolute inset-0 w-100 h-100 d-flex flex-column justify-content-between p-2 p-sm-2.5 shadow"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        background: "#fff",
                        borderRadius: 8,
                        border: "1px solid rgba(0,0,0,0.08)",
                        boxShadow: nightMode
                          ? "0 10px 30px rgba(0,0,0,0.6), 0 2px 8px rgba(127,83,255,0.2)"
                          : "0 10px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(255,105,180,0.15)",
                      }}
                    >
                      {/* Photo Area */}
                      <div
                        className="position-relative overflow-hidden rounded-1"
                        style={{
                          width: "100%",
                          height: "clamp(170px, 42vw, 205px)",
                          background: "#222",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />

                        {/* Top corner badge */}
                        <div
                          className="position-absolute top-0 start-0 m-1.5 px-2 py-0.5 rounded-pill"
                          style={{
                            background: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            fontSize: "0.6rem",
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 600,
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          #{item.id}
                        </div>

                        {/* Zoom Button Icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIdx(idx);
                          }}
                          className="position-absolute bottom-0 end-0 m-1.5 btn btn-sm rounded-circle p-1"
                          style={{
                            width: 26,
                            height: 26,
                            background: "rgba(255,255,255,0.85)",
                            border: "none",
                            fontSize: "0.75rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          title="View High-Res Photo"
                        >
                          🔍
                        </button>
                      </div>

                      {/* Handwritten Bottom Area */}
                      <div className="text-center pt-2 pb-1">
                        <div
                          style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
                            fontWeight: 700,
                            color: "#2c3e50",
                            lineHeight: 1.15,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          className="d-flex justify-content-between align-items-center mt-1 px-1"
                          style={{
                            fontSize: "0.65rem",
                            fontFamily: "'Poppins', sans-serif",
                            color: "#888",
                          }}
                        >
                          <span>📍 {item.date}</span>
                          <span style={{ color: "#ff69b4", fontWeight: 700 }}>
                            ↻ Tap note
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ==== BACK: Handwritten Love Letter Note ==== */}
                    <div
                      className="polaroid-back position-absolute inset-0 w-100 h-100 d-flex flex-column justify-content-between p-3 shadow"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: nightMode ? "#2a1b4e" : "#fffbf0",
                        borderRadius: 8,
                        border: `1.5px dashed ${item.washi}`,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                      }}
                    >
                      {/* Note Header */}
                      <div className="d-flex align-items-center justify-content-between border-bottom pb-1.5">
                        <div
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: item.washi,
                          }}
                        >
                          💌 From {item.author}
                        </div>
                        <span style={{ fontSize: "0.85rem" }}>🌸</span>
                      </div>

                      {/* Handwritten Note Body */}
                      <div
                        className="py-2 my-auto"
                        style={{
                          background: nightMode
                            ? "repeating-linear-gradient(transparent, transparent 23px, rgba(255,255,255,0.08) 24px)"
                            : "repeating-linear-gradient(transparent, transparent 23px, rgba(0,0,0,0.06) 24px)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: "clamp(1.15rem, 2.8vw, 1.35rem)",
                            color: nightMode ? "#f0e8ff" : "#4a2a3e",
                            lineHeight: 1.5,
                            margin: 0,
                            textAlign: "center",
                          }}
                        >
                          "{item.note}"
                        </p>
                      </div>

                      {/* Note Footer */}
                      <div className="d-flex align-items-center justify-content-between pt-1 border-top border-opacity-25">
                        <span
                          style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: "0.95rem",
                            color: nightMode ? "#cfaeff" : "#888",
                          }}
                        >
                          Date: {item.date}
                        </span>
                        <button
                          onClick={(e) => toggleFlip(item.id, e)}
                          className="btn btn-sm p-0 text-decoration-none"
                          style={{
                            color: item.washi,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                          }}
                        >
                          ↺ Flip back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= LIGHTBOX PREVIEW MODAL (PORTAL) ================= */}
      {lightboxIdx !== null &&
        lightboxIdx >= 0 &&
        lightboxIdx < filteredPolaroids.length &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="d-flex align-items-center justify-content-center p-3"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(16px)",
              animation: "fadeIn 0.25s ease",
            }}
            onClick={() => setLightboxIdx(null)}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 480,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setLightboxIdx(null)}
                style={{
                  position: "absolute",
                  top: -45,
                  right: 0,
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: 38,
                  height: 38,
                  color: "#fff",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

              {/* Big Photo */}
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  width: "100%",
                }}
              >
                <img
                  src={filteredPolaroids[lightboxIdx].image}
                  alt=""
                  style={{
                    width: "100%",
                    maxHeight: "65vh",
                    objectFit: "contain",
                    display: "block",
                    background: "#000",
                  }}
                />
              </div>

              {/* Photo Caption */}
              <div className="text-center mt-3 text-white">
                <h4 style={{ fontFamily: "'Caveat', cursive", fontSize: "1.6rem", margin: 0, color: "#ffd700" }}>
                  {filteredPolaroids[lightboxIdx].title}
                </h4>
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem", color: "rgba(255,255,255,0.9)", marginTop: 4 }}>
                  "{filteredPolaroids[lightboxIdx].note}"
                </p>
                <div style={{ fontSize: "0.8rem", color: "#cfaeff" }}>
                  📍 {filteredPolaroids[lightboxIdx].date} · Photo #{filteredPolaroids[lightboxIdx].id}
                </div>
              </div>

              {/* Next/Prev Navigation */}
              <div className="d-flex justify-content-between w-100 mt-3">
                <button
                  disabled={lightboxIdx === 0}
                  onClick={() => setLightboxIdx((i) => i - 1)}
                  className="btn btn-outline-light rounded-pill px-4"
                  style={{ opacity: lightboxIdx === 0 ? 0.3 : 1 }}
                >
                  ← Prev
                </button>
                <button
                  disabled={lightboxIdx === filteredPolaroids.length - 1}
                  onClick={() => setLightboxIdx((i) => i + 1)}
                  className="btn btn-outline-light rounded-pill px-4"
                  style={{ opacity: lightboxIdx === filteredPolaroids.length - 1 ? 0.3 : 1 }}
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

export default PolaroidScrapbook;

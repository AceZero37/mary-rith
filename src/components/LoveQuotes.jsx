import React, { useState, useEffect, useCallback, useRef } from "react";
import AOS from "aos";

// ---- QUOTES DATA WITH AVATARS & CATEGORIES ----
const quotes = [
  {
    id: 1,
    text: "I promise to love you more every single day, even when the world feels heavy.",
    by: "Rith",
    avatar: "./assets/images/35.jpg",
    tag: "Eternal Promise 💍",
    tagColor: "#7f53ff",
    emoji: "💖",
  },
  {
    id: 2,
    text: "You are my today, my tomorrow, and every beautiful dream of my forever.",
    by: "Mary",
    avatar: "./assets/images/2.jpg",
    tag: "Sweet Confession 🌸",
    tagColor: "#ff69b4",
    emoji: "🌸",
  },
  {
    id: 3,
    text: "I promise to always hold your hand tightly through sunshine, storms, and every journey.",
    by: "Rith",
    avatar: "./assets/images/35.jpg",
    tag: "Hand in Hand 🤝",
    tagColor: "#00b894",
    emoji: "🤝",
  },
  {
    id: 4,
    text: "With you beside me, the simplest ordinary moment turns into magic.",
    by: "Mary",
    avatar: "./assets/images/2.jpg",
    tag: "Pure Magic ✨",
    tagColor: "#ffd700",
    emoji: "✨",
  },
  {
    id: 5,
    text: "I choose you. And I will choose you over and over, without pause, without doubt.",
    by: "Rith",
    avatar: "./assets/images/35.jpg",
    tag: "Forever Choice 💎",
    tagColor: "#74b9ff",
    emoji: "💍",
  },
  {
    id: 6,
    text: "You make my heart smile in sweet ways that nobody else ever could.",
    by: "Mary",
    avatar: "./assets/images/2.jpg",
    tag: "Warmth & Love 🥰",
    tagColor: "#ff7675",
    emoji: "😊",
  },
  {
    id: 7,
    text: "I promise to be your safest shelter, your soft comfort, and your forever home.",
    by: "Rith",
    avatar: "./assets/images/35.jpg",
    tag: "Safe Haven 🏡",
    tagColor: "#a29bfe",
    emoji: "🏡",
  },
  {
    id: 8,
    text: "Loving you is genuinely the happiest and best decision my heart has ever made.",
    by: "Mary",
    avatar: "./assets/images/2.jpg",
    tag: "True Love 💕",
    tagColor: "#fd79a8",
    emoji: "💕",
  },
];

const AUTOPLAY_MS = 6000;

const LoveQuotes = ({ nightMode }) => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const goTo = useCallback((idx) => {
    setFade(false);
    setTimeout(() => {
      setCurrent((idx + quotes.length) % quotes.length);
      setFade(true);
    }, 280);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Touch Swipe for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) next();
    else if (diff < -45) prev();
    touchStartX.current = null;
  };

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      goTo(current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [current, paused, goTo]);

  const q = quotes[current];
  const isRith = q.by === "Rith";

  // Dynamic theme colors
  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const cardBg = nightMode
    ? "radial-gradient(ellipse at 50% 0%, rgba(127,83,255,0.22) 0%, transparent 70%), rgba(26, 14, 52, 0.82)"
    : "radial-gradient(ellipse at 50% 0%, rgba(255,182,218,0.35) 0%, transparent 70%), rgba(255, 255, 255, 0.88)";
  const cardBorder = nightMode
    ? "1.5px solid rgba(167, 125, 253, 0.35)"
    : "1.5px solid rgba(255, 182, 218, 0.55)";
  const cardShadow = nightMode
    ? "0 20px 50px rgba(127, 83, 255, 0.25), 0 4px 18px rgba(0,0,0,0.4)"
    : "0 20px 50px rgba(255, 105, 180, 0.18), 0 4px 18px rgba(255,182,218,0.25)";

  const quoteColor = nightMode ? "#f3edff" : "#4a1c38";
  const byColor = nightMode ? "#d6ccff" : "#8d3968";
  const dotActive = nightMode ? "#cfaeff" : "#ff69b4";
  const dotInactive = nightMode ? "rgba(167,125,253,0.25)" : "rgba(255,105,180,0.22)";

  return (
    <div className="container pb-4" data-aos="fade-up" style={{ maxWidth: 840 }}>
      {/* Title */}
      <div className="text-center mb-3" style={{ marginTop: 24 }}>
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
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
          <span>💞</span>
          Love Quotes & Promises
          <span>💞</span>
        </div>
        <div
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
            color: nightMode ? "#d6ccff" : "#b0406a",
            marginTop: 2,
            opacity: 0.85,
          }}
        >
          ✨ Whispers of our hearts • Swipe or click to read 💕
        </div>
      </div>

      {/* Quote Card Container */}
      <div
        className="mx-auto position-relative"
        style={{
          maxWidth: 620,
          borderRadius: 28,
          background: cardBg,
          border: cardBorder,
          boxShadow: cardShadow,
          backdropFilter: "blur(20px)",
          padding: "clamp(24px, 5vw, 36px) clamp(18px, 4vw, 34px) 26px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          transition: "all 0.35s ease",
          cursor: "grab",
          userSelect: "none",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating background quotation marks */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 20,
            fontSize: "clamp(4.5rem, 10vw, 6.5rem)",
            fontFamily: "Georgia, serif",
            color: nightMode ? "rgba(167,125,253,0.12)" : "rgba(255,105,180,0.12)",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          “
        </div>

        {/* Tag pill at top */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: q.tagColor + (nightMode ? "28" : "18"),
            border: `1px solid ${q.tagColor}55`,
            color: q.tagColor,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(0.68rem, 1.8vw, 0.78rem)",
            borderRadius: 20,
            padding: "4px 14px",
            marginBottom: 16,
            transition: "all 0.3s ease",
            transform: fade ? "scale(1)" : "scale(0.9)",
            opacity: fade ? 1 : 0,
          }}
        >
          <span>{q.emoji}</span>
          <span>{q.tag}</span>
        </div>

        {/* Quote text */}
        <div
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1.3rem, 4.2vw, 1.7rem)",
            fontWeight: 700,
            color: quoteColor,
            textAlign: "center",
            lineHeight: 1.55,
            maxWidth: 500,
            minHeight: 76,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(12px)",
          }}
        >
          "{q.text}"
        </div>

        {/* Author info with avatar */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            transition: "all 0.3s ease",
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {/* Avatar with gradient ring */}
          <div
            style={{
              padding: 2.5,
              borderRadius: "50%",
              background: isRith
                ? "linear-gradient(135deg, #7f53ff, #00d2d3)"
                : "linear-gradient(135deg, #ff69b4, #ffd700)",
              boxShadow: `0 2px 10px ${isRith ? "rgba(127,83,255,0.4)" : "rgba(255,105,180,0.4)"}`,
            }}
          >
            <img
              src={q.avatar}
              alt={q.by}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.85rem, 2.2vw, 0.95rem)",
                color: byColor,
                lineHeight: 1.2,
              }}
            >
              {isRith ? "From Rith 💙" : "From Mary 💗"}
            </div>
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "0.88rem",
                color: nightMode ? "#bca6e8" : "#a2557e",
                opacity: 0.85,
              }}
            >
              {isRith ? "Forever your protector & best friend" : "Forever holding your heart"}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {!paused && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3.5,
              background: nightMode ? "rgba(167,125,253,0.18)" : "rgba(255,182,218,0.25)",
              overflow: "hidden",
            }}
          >
            <div
              key={current}
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${accent}, ${q.tagColor})`,
                animation: `quoteFill ${AUTOPLAY_MS}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous quote"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: nightMode ? "1.5px solid rgba(167,125,253,0.3)" : "1.5px solid rgba(255,182,218,0.6)",
            background: nightMode ? "rgba(127,83,255,0.15)" : "rgba(255,182,218,0.25)",
            color: accent,
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.25s ease",
            backdropFilter: "blur(6px)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        >
          ‹
        </button>

        {/* Pagination Dots */}
        <div className="d-flex gap-2 align-items-center">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to quote ${i + 1}`}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background: i === current ? dotActive : dotInactive,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                padding: 0,
                boxShadow: i === current ? `0 2px 8px ${accent}66` : "none",
              }}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next quote"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: nightMode ? "1.5px solid rgba(167,125,253,0.3)" : "1.5px solid rgba(255,182,218,0.6)",
            background: nightMode ? "rgba(127,83,255,0.15)" : "rgba(255,182,218,0.25)",
            color: accent,
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.25s ease",
            backdropFilter: "blur(6px)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        >
          ›
        </button>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes quoteFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoveQuotes;

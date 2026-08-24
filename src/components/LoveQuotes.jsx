import { useState, useEffect, useCallback } from "react";
import AOS from "aos";

// ---- QUOTES DATA ----
const quotes = [
  {
    text: "I promise to love you more every day, even when the world feels heavy.",
    by: "Rith",
    emoji: "💖",
  },
  {
    text: "You are my today, my tomorrow, and my forever.",
    by: "Mary",
    emoji: "🌸",
  },
  {
    text: "I promise to always hold your hand, through sunshine and storms.",
    by: "Rith",
    emoji: "🤝",
  },
  {
    text: "With you, every moment becomes a beautiful memory.",
    by: "Mary",
    emoji: "✨",
  },
  {
    text: "I choose you, today and every day after that.",
    by: "Rith",
    emoji: "💍",
  },
  {
    text: "You make my heart smile in ways nobody else can.",
    by: "Mary",
    emoji: "😊",
  },
  {
    text: "I promise to be your safe place, your comfort, and your home.",
    by: "Rith",
    emoji: "🏡",
  },
  {
    text: "Loving you is the best decision I've ever made.",
    by: "Mary",
    emoji: "💕",
  },
];

const AUTOPLAY_MS = 5000;

// ---- MAIN COMPONENT ----
const LoveQuotes = ({ nightMode }) => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const goTo = useCallback(
    (idx) => {
      setFade(false);
      setTimeout(() => {
        setCurrent(idx);
        setFade(true);
      }, 350);
    },
    []
  );

  const next = useCallback(() => {
    goTo((current + 1) % quotes.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + quotes.length) % quotes.length);
  }, [current, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      goTo((current + 1) % quotes.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [current, paused, goTo]);

  const q = quotes[current];
  const isRith = q.by === "Rith";

  // Colors
  const accent = nightMode ? "#b993ff" : "#ff69b4";
  const cardBg = nightMode
    ? "rgba(40, 30, 70, 0.45)"
    : "rgba(255, 255, 255, 0.5)";
  const cardBorder = nightMode
    ? "1.5px solid #7f53ff33"
    : "1.5px solid #ffe1ef";
  const cardShadow = nightMode
    ? "0 8px 40px #7f53ff20"
    : "0 8px 40px #ffb3d620";
  const quoteColor = nightMode ? "#e8deff" : "#5a2d4a";
  const byColor = nightMode ? "#d6ccff" : "#ba7bc9";
  const dotActive = nightMode ? "#b993ff" : "#ff69b4";
  const dotInactive = nightMode
    ? "rgba(127,83,255,0.25)"
    : "rgba(255,105,180,0.2)";
  const quoteMark = nightMode ? "#7f53ff44" : "#ff69b422";
  const progressBg = nightMode ? "#7f53ff33" : "#ffb3d633";
  const progressFill = nightMode ? "#b993ff" : "#ff69b4";

  return (
    <div className="container pb-4" data-aos="fade-up">
      {/* Title */}
      <div className="text-center mb-3" style={{ marginTop: 26 }}>
        <span
          style={{
            fontFamily: "'Poppins', 'Montserrat', cursive, sans-serif",
            fontWeight: 800,
            fontSize: "1.18rem",
            letterSpacing: "1.1px",
            color: accent,
            textShadow: nightMode
              ? "0 2px 10px #7f53ff33"
              : "0 2px 10px #ff69b420",
            filter: nightMode
              ? "drop-shadow(0 2px 10px #b993ff22)"
              : "drop-shadow(0 2px 10px #fff3)",
            opacity: 0.95,
          }}
        >
          <span role="img" aria-label="heart" style={{ fontSize: 19, marginRight: 6 }}>
            💞
          </span>
          Love Quotes & Promises
          <span role="img" aria-label="heart" style={{ fontSize: 19, marginLeft: 6 }}>
            💞
          </span>
        </span>
      </div>

      {/* Quote Card */}
      <div
        className="mx-auto position-relative"
        style={{
          maxWidth: 520,
          minHeight: 240,
          borderRadius: 24,
          background: cardBg,
          border: cardBorder,
          boxShadow: cardShadow,
          backdropFilter: "blur(12px)",
          padding: "clamp(22px, 5vw, 36px) clamp(16px, 4vw, 32px) 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transition: "box-shadow 0.3s, background 0.3s",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Large decorative quote mark */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 20,
            fontSize: "5rem",
            fontFamily: "Georgia, serif",
            color: quoteMark,
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          "
        </div>

        {/* Emoji */}
        <div
          style={{
            fontSize: 36,
            marginBottom: 10,
            transition: "opacity 0.35s, transform 0.35s",
            opacity: fade ? 1 : 0,
            transform: fade ? "scale(1)" : "scale(0.7)",
          }}
        >
          {q.emoji}
        </div>

        {/* Quote text */}
        <div
          style={{
            fontFamily: "'Caveat', 'Pacifico', cursive",
            fontSize: "1.45rem",
            fontWeight: 600,
            color: quoteColor,
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 420,
            transition: "opacity 0.35s, transform 0.35s",
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(12px)",
            minHeight: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {q.text}
        </div>

        {/* By line */}
        <div
          style={{
            marginTop: 16,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: byColor,
            letterSpacing: "0.5px",
            transition: "opacity 0.35s",
            opacity: fade ? 1 : 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 24,
              height: 2,
              background: accent,
              borderRadius: 2,
              display: "inline-block",
              opacity: 0.5,
            }}
          />
          {isRith ? "From Rith 💙" : "From Mary 💗"}
          <span
            style={{
              width: 24,
              height: 2,
              background: accent,
              borderRadius: 2,
              display: "inline-block",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Progress bar */}
        {!paused && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: progressBg,
              borderRadius: "0 0 24px 24px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: progressFill,
                borderRadius: "0 0 24px 24px",
                animation: `quoteProgress ${AUTOPLAY_MS}ms linear`,
              }}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div
        className="d-flex align-items-center justify-content-center gap-3 mt-3"
      >
        {/* Prev */}
        <button
          onClick={prev}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            color: accent,
            cursor: "pointer",
            opacity: 0.7,
            transition: "opacity 0.2s, transform 0.2s",
            padding: "4px 10px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateX(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.7";
            e.currentTarget.style.transform = "none";
          }}
          aria-label="Previous quote"
        >
          ‹
        </button>

        {/* Dots */}
        <div className="d-flex gap-2 align-items-center">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 22 : 10,
                height: 10,
                borderRadius: 10,
                background: i === current ? dotActive : dotInactive,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                padding: 0,
                boxShadow:
                  i === current
                    ? `0 2px 8px ${nightMode ? "#7f53ff66" : "#ff69b466"}`
                    : "none",
              }}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            color: accent,
            cursor: "pointer",
            opacity: 0.7,
            transition: "opacity 0.2s, transform 0.2s",
            padding: "4px 10px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateX(2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.7";
            e.currentTarget.style.transform = "none";
          }}
          aria-label="Next quote"
        >
          ›
        </button>
      </div>

      {/* Pause hint */}
      <div
        className="text-center mt-2"
        style={{
          fontSize: "0.72rem",
          color: byColor,
          opacity: 0.5,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {paused ? "⏸ Paused — hover off to resume" : "Hover to pause"}
      </div>

      {/* Animations */}
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Pacifico&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes quoteProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoveQuotes;

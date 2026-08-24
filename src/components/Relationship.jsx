import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Relationship({ nightMode }) {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 60,
    });
  }, []);

  const since = "2026-08-20";

  // Live counter state
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = Date.now() - new Date(since).getTime();
      if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60,
      };
    };
    setElapsed(calc());
    const interval = setInterval(() => setElapsed(calc()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Birth dates
  const rithBirth = new Date("2005-03-02");
  const maryBirth = new Date("2007-12-03");

  // Dynamic age calculation
  const getAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  // Auto-detect zodiac sign from birth date
  const getZodiac = (birthDate) => {
    const month = birthDate.getMonth() + 1; // 1-12
    const day = birthDate.getDate();
    const signs = [
      { name: "Capricorn", symbol: "♑", start: [1, 1], end: [1, 19] },
      { name: "Aquarius", symbol: "♒", start: [1, 20], end: [2, 18] },
      { name: "Pisces", symbol: "♓", start: [2, 19], end: [3, 20] },
      { name: "Aries", symbol: "♈", start: [3, 21], end: [4, 19] },
      { name: "Taurus", symbol: "♉", start: [4, 20], end: [5, 20] },
      { name: "Gemini", symbol: "♊", start: [5, 21], end: [6, 20] },
      { name: "Cancer", symbol: "♋", start: [6, 21], end: [7, 22] },
      { name: "Leo", symbol: "♌", start: [7, 23], end: [8, 22] },
      { name: "Virgo", symbol: "♍", start: [8, 23], end: [9, 22] },
      { name: "Libra", symbol: "♎", start: [9, 23], end: [10, 22] },
      { name: "Scorpio", symbol: "♏", start: [10, 23], end: [11, 21] },
      { name: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21] },
      { name: "Capricorn", symbol: "♑", start: [12, 22], end: [12, 31] },
    ];
    for (const sign of signs) {
      const [sm, sd] = sign.start;
      const [em, ed] = sign.end;
      if (
        (month === sm && day >= sd) ||
        (month === em && day <= ed) ||
        (month > sm && month < em)
      ) {
        return sign;
      }
    }
    return signs[0];
  };

  const rithAge = getAge(rithBirth);
  const maryAge = getAge(maryBirth);
  const rithZodiac = getZodiac(rithBirth);
  const maryZodiac = getZodiac(maryBirth);

  // Colors based on night mode
  const heartColor = nightMode ? "#b993ff" : "#ff69b4";
  const headingColor = nightMode ? "#cfaeff" : "#ff69b4";
  const bubbleColor = nightMode ? "#d3c6fc" : "#ea4c89";
  const badgeBgRith = nightMode ? "#443264" : "#ffb3c6";
  const badgeBgMary = nightMode ? "#6958b9" : "#FFD6E0";
  const zodiacBg = nightMode ? "#7f53ff" : "#A0C4FF";
  const badgeColor = "#fff";
  const nameColor = bubbleColor;

  return (
    <div
      className="relationship-main-card mx-auto px-2"
      style={{
        borderRadius: 24,
        marginBottom: 28,
        maxWidth: 1080,
      }}
    >
      {/* Relationship Heading */}
      <h2
        className="fw-bold mb-3 text-center"
        style={{
          fontFamily: "'Quicksand', cursive, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
          letterSpacing: "1px",
          color: headingColor,
          textShadow: nightMode
            ? "0 2px 22px #7f53ff77"
            : "0 2px 16px rgba(255, 105, 180, 0.3)",
        }}
        data-aos="fade-down"
      >
        <span>✨</span> Relationship <span>✨</span>
      </h2>

      {/* Main Relationship Card Container */}
      <div
        className="p-3 p-md-4 rounded-4 shadow-sm mx-auto"
        style={{
          maxWidth: 900,
          width: "100%",
          background: nightMode
            ? "rgba(35, 22, 65, 0.55)"
            : "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(12px)",
          border: nightMode
            ? "1.5px solid rgba(167, 125, 253, 0.3)"
            : "1.5px solid #ffe1ef",
          boxShadow: nightMode
            ? "0 8px 32px rgba(127, 83, 255, 0.2)"
            : "0 8px 30px rgba(255, 105, 180, 0.15)",
        }}
      >
        <div className="row align-items-center justify-content-center g-3">
          {/* Rith Profile */}
          <div
            className="col-6 col-md-4 d-flex flex-column align-items-center text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="position-relative">
              <img
                src="./assets/images/1.jpg"
                alt="Rith"
                className="rounded-circle shadow"
                style={{
                  width: "clamp(84px, 18vw, 120px)",
                  height: "clamp(84px, 18vw, 120px)",
                  objectFit: "cover",
                  border: "4px solid #fff",
                  boxShadow: nightMode
                    ? "0 4px 20px rgba(127, 83, 255, 0.4)"
                    : "0 4px 20px rgba(255, 105, 180, 0.3)",
                }}
              />
              <span
                className="position-absolute bottom-0 end-0 badge rounded-circle p-1"
                style={{
                  background: badgeBgRith,
                  fontSize: "0.85rem",
                  border: "2px solid #fff",
                }}
              >
                ♂
              </span>
            </div>

            <div
              style={{
                color: nameColor,
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                marginTop: 6,
                lineHeight: 1.1,
              }}
            >
              Rith
            </div>

            {/* Badges */}
            <div className="d-flex flex-wrap gap-1 justify-content-center my-1">
              <span
                className="badge rounded-pill px-2 py-1"
                style={{
                  background: badgeBgRith,
                  color: badgeColor,
                  fontSize: "clamp(0.72rem, 2vw, 0.85rem)",
                  fontWeight: 600,
                }}
              >
                {rithAge} yrs
              </span>
              <span
                className="badge rounded-pill px-2 py-1"
                style={{
                  background: zodiacBg,
                  color: badgeColor,
                  fontSize: "clamp(0.72rem, 2vw, 0.85rem)",
                  fontWeight: 600,
                }}
              >
                {rithZodiac.symbol} {rithZodiac.name}
              </span>
            </div>

            <div
              style={{
                color: bubbleColor,
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
                fontWeight: 600,
                opacity: 0.9,
              }}
            >
              Rith Ft Ry 💙
            </div>
          </div>

          {/* Center Counter (Desktop Middle / Mobile Order 3 or center) */}
          <div
            className="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center py-2 order-3 order-md-2"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            {/* Beating Heart between lovers */}
            <div
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                animation: "beat 1.3s infinite",
                marginBottom: 4,
              }}
            >
              💖
            </div>

            {/* Live Counter Unit Boxes */}
            <div className="d-flex gap-1 align-items-center justify-content-center flex-wrap mb-2">
              {[
                { label: "Days", value: elapsed.days, pad: false },
                { label: "Hrs", value: elapsed.hours, pad: true },
                { label: "Min", value: elapsed.minutes, pad: true },
                { label: "Sec", value: elapsed.seconds, pad: true },
              ].map((unit, idx) => (
                <div key={unit.label} className="d-flex align-items-center">
                  <div
                    className="text-center"
                    style={{
                      minWidth: "clamp(42px, 10vw, 54px)",
                      padding: "6px 4px",
                      borderRadius: 10,
                      background: nightMode
                        ? "rgba(127, 83, 255, 0.22)"
                        : "rgba(255, 105, 180, 0.12)",
                      border: nightMode
                        ? "1px solid rgba(127, 83, 255, 0.4)"
                        : "1px solid rgba(255, 105, 180, 0.25)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "clamp(1rem, 3vw, 1.25rem)",
                        fontWeight: 800,
                        color: nightMode ? "#e8deff" : "#5a2d4a",
                        lineHeight: 1.1,
                      }}
                    >
                      {unit.pad ? String(unit.value).padStart(2, "0") : unit.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        color: heartColor,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        marginTop: 2,
                      }}
                    >
                      {unit.label}
                    </div>
                  </div>
                  {idx < 3 && (
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 800,
                        color: nightMode ? "#7f53ff88" : "#ff69b488",
                        margin: "0 2px",
                        animation: "colonBlink 1s ease-in-out infinite",
                      }}
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Since Date */}
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: nightMode ? "#d6ccff" : "#8a508f",
              }}
            >
              Together since {since} 💕
            </div>
          </div>

          {/* Mary Profile */}
          <div
            className="col-6 col-md-4 d-flex flex-column align-items-center text-center order-2 order-md-3"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="position-relative">
              <img
                src="./assets/images/2.jpg"
                alt="Mary"
                className="rounded-circle shadow"
                style={{
                  width: "clamp(84px, 18vw, 120px)",
                  height: "clamp(84px, 18vw, 120px)",
                  objectFit: "cover",
                  border: "4px solid #fff",
                  boxShadow: nightMode
                    ? "0 4px 20px rgba(127, 83, 255, 0.4)"
                    : "0 4px 20px rgba(255, 105, 180, 0.3)",
                }}
              />
              <span
                className="position-absolute bottom-0 end-0 badge rounded-circle p-1"
                style={{
                  background: badgeBgMary,
                  fontSize: "0.85rem",
                  border: "2px solid #fff",
                }}
              >
                ♀
              </span>
            </div>

            <div
              style={{
                color: nameColor,
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                marginTop: 6,
                lineHeight: 1.1,
              }}
            >
              Mary
            </div>

            {/* Badges */}
            <div className="d-flex flex-wrap gap-1 justify-content-center my-1">
              <span
                className="badge rounded-pill px-2 py-1"
                style={{
                  background: badgeBgMary,
                  color: badgeColor,
                  fontSize: "clamp(0.72rem, 2vw, 0.85rem)",
                  fontWeight: 600,
                }}
              >
                {maryAge} yrs
              </span>
              <span
                className="badge rounded-pill px-2 py-1"
                style={{
                  background: zodiacBg,
                  color: badgeColor,
                  fontSize: "clamp(0.72rem, 2vw, 0.85rem)",
                  fontWeight: 600,
                }}
              >
                {maryZodiac.symbol} {maryZodiac.name}
              </span>
            </div>

            <div
              style={{
                color: bubbleColor,
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
                fontWeight: 600,
                opacity: 0.9,
              }}
            >
              Ry Ft Rith 💗
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
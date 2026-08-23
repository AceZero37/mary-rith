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
      { name: "Capricorn",   symbol: "♑", start: [1, 1],   end: [1, 19] },
      { name: "Aquarius",    symbol: "♒", start: [1, 20],  end: [2, 18] },
      { name: "Pisces",      symbol: "♓", start: [2, 19],  end: [3, 20] },
      { name: "Aries",       symbol: "♈", start: [3, 21],  end: [4, 19] },
      { name: "Taurus",      symbol: "♉", start: [4, 20],  end: [5, 20] },
      { name: "Gemini",      symbol: "♊", start: [5, 21],  end: [6, 20] },
      { name: "Cancer",      symbol: "♋", start: [6, 21],  end: [7, 22] },
      { name: "Leo",         symbol: "♌", start: [7, 23],  end: [8, 22] },
      { name: "Virgo",       symbol: "♍", start: [8, 23],  end: [9, 22] },
      { name: "Libra",       symbol: "♎", start: [9, 23],  end: [10, 22] },
      { name: "Scorpio",     symbol: "♏", start: [10, 23], end: [11, 21] },
      { name: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21] },
      { name: "Capricorn",   symbol: "♑", start: [12, 22], end: [12, 31] },
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
    return signs[0]; // fallback Capricorn
  };

  const rithAge = getAge(rithBirth);
  const maryAge = getAge(maryBirth);
  const rithZodiac = getZodiac(rithBirth);
  const maryZodiac = getZodiac(maryBirth);

  // Colors based on night mode
  const heartColor = nightMode ? "#b993ff" : "#ff69b4";
  const headingColor = nightMode ? "#b993ff" : "#ff69b4";
  const shadow = nightMode ? "0 2px 32px #8f6dfb26" : "0 2px 24px #ffb3c65c";
  const bubbleColor = nightMode ? "#d3c6fc" : "#ea4c89";
  const badgeBgRith = nightMode ? "#443264" : "#ffb3c6";
  const badgeBgMary = nightMode ? "#6958b9" : "#FFD6E0";
  const zodiacBg = nightMode ? "#7f53ff" : "#A0C4FF";
  const badgeColor = "#fff";
  const nameColor = bubbleColor;

  // Text style for single line text below images
  const singleLineTextStyle = {
    color: bubbleColor,
    fontFamily: "'Caveat', cursive",
    fontSize: "1.1rem",
    whiteSpace: "nowrap",
    marginTop: "8px",
    fontWeight: 600,
    textAlign: "center",
  };

  return (
    <div
      className="relationship-main-card mx-auto"
      style={{
        borderRadius: 22,
        boxShadow: "none",
        padding: "0 0 10px 0",
        marginBottom: 28,
        maxWidth: 1200,
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Relationship Heading */}
      <h2
        className="fw-bold mb-4 text-center"
        style={{
          fontFamily: "'Quicksand', cursive, sans-serif",
          fontWeight: 700,
          fontSize: "2.5rem",
          letterSpacing: "1px",
          color: headingColor,
          textShadow: nightMode
            ? "0 2px 22px #7f53ff77, 0 1px 0 #fff"
            : "0 2px 16px #fff4, 0 1px 0 #fff",
        }}
        data-aos="fade-down"
      >
        <span role="img" aria-label="sparkle">
          ✨
        </span>{" "}
        Relationship{" "}
        <span role="img" aria-label="sparkle">
          ✨
        </span>
      </h2>
      <div className="container-fluid py-4">
        <div className="row flex-nowrap justify-content-center align-items-end relationship-row-scroll">
          {/* Rith */}
          <div
            className="col-12 col-md-4 d-flex flex-column align-items-center px-3 py-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src="./assets/images/1.jpg"
              alt="Rith"
              className="rounded-circle shadow"
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                border: "6px solid #fff",
                background: "#fff",
                boxShadow: shadow,
              }}
            />
            <div
              style={{
                color: nameColor,
                fontFamily: "'Caveat', cursive",
                fontSize: "2rem",
                textShadow: "0 2px 8px #fff8",
                margin: "16px 0 8px 0",
                fontWeight: 700,
              }}
            >
              Rith
            </div>
            <div className="d-flex gap-2 mb-3">
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: badgeBgRith,
                  color: badgeColor,
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                ♂ {rithAge}
              </span>
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: zodiacBg,
                  color: badgeColor,
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                {rithZodiac.symbol} {rithZodiac.name}
              </span>
            </div>
            {/* Single line text below image */}
            <div
              style={singleLineTextStyle}
              data-aos="fade-right"
              data-aos-delay="300"
            >
              Rith Ft Ry
            </div>
          </div>
          {/* Center Live Counter */}
          <div
            className="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center py-4"
            data-aos="zoom-in"
            data-aos-delay="250"
          >
            {/* Live Counter */}
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
                      minWidth: 48,
                      padding: "6px 4px",
                      borderRadius: 12,
                      background: nightMode
                        ? "rgba(127, 83, 255, 0.15)"
                        : "rgba(255, 105, 180, 0.1)",
                      border: nightMode
                        ? "1px solid #7f53ff22"
                        : "1px solid #ff69b418",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Poppins', 'Montserrat', sans-serif",
                        fontSize: "1.3rem",
                        fontWeight: 800,
                        color: nightMode ? "#e8deff" : "#5a2d4a",
                        lineHeight: 1.1,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {unit.pad ? String(unit.value).padStart(2, "0") : unit.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.55rem",
                        fontWeight: 600,
                        color: heartColor,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginTop: 1,
                      }}
                    >
                      {unit.label}
                    </div>
                  </div>
                  {idx < 3 && (
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: nightMode ? "#7f53ff55" : "#ffb3d655",
                        margin: "0 1px",
                        animation: "colonBlink 1s ease-in-out infinite",
                      }}
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="since-cute" style={{ textAlign: "center" }}>
              <span className="since-date" style={{ fontWeight: 700 }}>
                {since}
              </span>
            </div>
            <div style={{ fontSize: "1.8rem", marginTop: 4 }}>🧑‍🤝‍🧑</div>
          </div>
          {/* Mary */}
          <div
            className="col-12 col-md-4 d-flex flex-column align-items-center px-3 py-3"
            data-aos="fade-up"
            data-aos-delay="170"
          >
            <img
              src="./assets/images/2.jpg"
              alt="Mary"
              className="rounded-circle shadow"
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                border: "6px solid #fff",
                background: "#fff",
                boxShadow: shadow,
              }}
            />
            <div
              style={{
                color: nameColor,
                fontFamily: "'Caveat', cursive",
                fontSize: "2rem",
                textShadow: "0 2px 8px #fff8",
                margin: "16px 0 8px 0",
                fontWeight: 700,
              }}
            >
              Mary
            </div>
            <div className="d-flex gap-2 mb-3">
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: badgeBgMary,
                  color: badgeColor,
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                ♀ {maryAge}
              </span>
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: zodiacBg,
                  color: badgeColor,
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                {maryZodiac.symbol} {maryZodiac.name}
              </span>
            </div>
            {/* Single line text below image */}
            <div
              style={singleLineTextStyle}
              data-aos="fade-left"
              data-aos-delay="350"
            >
              Ry Ft Rith
            </div>
          </div>
        </div>
      </div>
      {/* Google Fonts link (optional if not in index.html) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&family=Caveat:wght@700&display=swap"
        rel="stylesheet"
      />
      {/* Heart Beat Animation */}
      <style>{`
        @keyframes beat {
          0%, 100% { transform: scale(1);}
          20% { transform: scale(1.12);}
          40% { transform: scale(0.96);}
          60% { transform: scale(1.10);}
          80% { transform: scale(0.97);}
        }
        @keyframes colonBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

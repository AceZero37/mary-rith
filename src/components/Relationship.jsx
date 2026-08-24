import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Relationship({ nightMode }) {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 60 });
  }, []);

  const since = "2026-08-20";

  // Live counter
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

  // Ages & Zodiac
  const rithBirth = new Date("2005-03-02");
  const maryBirth = new Date("2007-12-03");

  const getAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const getZodiac = (birthDate) => {
    const month = birthDate.getMonth() + 1;
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
      if ((month === sm && day >= sd) || (month === em && day <= ed) || (month > sm && month < em))
        return sign;
    }
    return signs[0];
  };

  const rithAge = getAge(rithBirth);
  const maryAge = getAge(maryBirth);
  const rithZodiac = getZodiac(rithBirth);
  const maryZodiac = getZodiac(maryBirth);

  const heroBg = nightMode
    ? `radial-gradient(ellipse at 50% 0%, rgba(127,83,255,0.45) 0%, transparent 60%),
       radial-gradient(ellipse at 85% 85%, rgba(255,105,180,0.2) 0%, transparent 50%),
       rgba(18, 10, 44, 0.94)`
    : `radial-gradient(ellipse at 50% 0%, rgba(255,182,218,0.55) 0%, transparent 60%),
       radial-gradient(ellipse at 85% 90%, rgba(255,220,240,0.4) 0%, transparent 55%),
       rgba(255, 245, 252, 0.94)`;

  const subColor  = nightMode ? "#d6aaff" : "#d72660";
  const badgeBg   = nightMode ? "rgba(127,83,255,0.32)" : "rgba(255,105,180,0.18)";
  const badgeClr  = nightMode ? "#cfaeff" : "#d72660";
  const zodiacBg  = nightMode ? "rgba(127,83,255,0.42)" : "rgba(100,160,255,0.28)";
  const zodiacClr = nightMode ? "#e0d0ff" : "#3a4a70";
  const timerCardBg = nightMode ? "rgba(127,83,255,0.16)" : "rgba(255,105,180,0.1)";
  const timerBorder = nightMode ? "1.5px solid rgba(167,125,253,0.38)" : "1.5px solid rgba(255,105,180,0.28)";
  const timerNum  = nightMode ? "#f0e8ff" : "#5a1a4a";
  const timerLbl  = nightMode ? "#cfaeff" : "#d72660";

  return (
    <div style={{ width: "100%", padding: "0 0 28px 0" }}>
      {/* ── Outer Wrapper with Animated Rainbow Border around Box ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
          padding: "clamp(12px, 3vw, 20px)",
        }}
        data-aos="fade-up"
      >
        {/* Animated Rainbow Border Wrapper */}
        <div
          className="rainbow-box-container"
          style={{
            position: "relative",
            borderRadius: "clamp(22px, 4.2vw, 34px)",
            padding: "2.5px", // Thickness of Rainbow Border
            overflow: "hidden",
            boxShadow: nightMode
              ? "0 24px 70px rgba(127,83,255,0.45), 0 0 30px rgba(255,105,180,0.35)"
              : "0 24px 70px rgba(255,105,180,0.35), 0 0 30px rgba(255,182,218,0.45)",
          }}
        >
          {/* 360° Rotating Rainbow Conic Gradient for the entire Box */}
          <div
            className="rainbow-spin-box"
            style={{
              position: "absolute",
              top: "-100%",
              left: "-100%",
              width: "300%",
              height: "300%",
              background: "conic-gradient(from 0deg, #ff007f, #ff7f00, #ffd700, #00ff88, #00d2ff, #7f53ff, #ff007f)",
              animation: "rainbowSpin 6s linear infinite",
              pointerEvents: "none",
            }}
          />

          {/* ── Inner Card ── */}
          <div
            style={{
              position: "relative",
              borderRadius: "clamp(20px, 4vw, 32px)",
              overflow: "hidden",
              background: heroBg,
              backdropFilter: "blur(24px)",
              padding: "clamp(28px, 5vw, 48px) clamp(14px, 4vw, 44px)",
              zIndex: 2,
            }}
          >
            {/* Bokeh blobs */}
            <div style={{ position: "absolute", top: -80, left: "20%", width: 280, height: 280, borderRadius: "50%", background: nightMode ? "rgba(127,83,255,0.16)" : "rgba(255,182,218,0.25)", filter: "blur(65px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: -50, right: "15%", width: 200, height: 200, borderRadius: "50%", background: nightMode ? "rgba(255,105,180,0.12)" : "rgba(255,210,235,0.32)", filter: "blur(50px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -60, left: "40%", width: 240, height: 240, borderRadius: "50%", background: nightMode ? "rgba(127,83,255,0.1)" : "rgba(255,230,245,0.3)", filter: "blur(60px)", pointerEvents: "none" }} />

            {/* ── TITLE ── */}
            <div className="text-center mb-4 position-relative" data-aos="fade-down">
              <div style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(2rem, 6.5vw, 3.2rem)",
                fontWeight: 700,
                color: nightMode ? "#fff" : "#d72660",
                textShadow: nightMode
                  ? "0 2px 28px rgba(207,174,255,0.75)"
                  : "0 2px 20px rgba(255,105,180,0.45)",
                letterSpacing: "0.5px",
                lineHeight: 1.1,
              }}>
                Our Love Story ✨
              </div>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)",
                color: nightMode ? "rgba(207,174,255,0.7)" : "rgba(215,38,96,0.58)",
                letterSpacing: "clamp(1px, 0.5vw, 2.5px)",
                textTransform: "uppercase",
                marginTop: 6,
              }}>
                Sovan Narith &amp; Mary · Since Aug 20, 2026
              </div>
            </div>

            {/* ── AVATARS + CENTER HEART ROW (Centered with no overlap) ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(10px, 2.5vw, 24px)",
                position: "relative",
                marginBottom: 16,
              }}
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              {/* RITH AVATAR */}
              <div
                className="rainbow-avatar-wrapper"
                style={{
                  position: "relative",
                  width: "clamp(90px, 18vw, 138px)",
                  height: "clamp(90px, 18vw, 138px)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: nightMode
                    ? "0 0 30px rgba(127,83,255,0.8), 0 0 60px rgba(255,105,180,0.4)"
                    : "0 0 30px rgba(255,105,180,0.7), 0 0 60px rgba(255,182,218,0.5)",
                }}
              >
                {/* 360° Spinning Rainbow Gradient */}
                <div
                  className="rainbow-spin-layer"
                  style={{
                    position: "absolute",
                    inset: "-60%",
                    background: "conic-gradient(from 0deg, #ff007f, #ff7f00, #ffd700, #00ff88, #00d2ff, #7f53ff, #ff007f)",
                    borderRadius: "50%",
                    animation: "rainbowSpin 3.5s linear infinite",
                  }}
                />
                {/* Inner Mask with Photo */}
                <div
                  style={{
                    position: "relative",
                    width: "calc(100% - 8px)",
                    height: "calc(100% - 8px)",
                    borderRadius: "50%",
                    background: nightMode ? "#0d0622" : "#fff0fa",
                    padding: 3,
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="./assets/images/1.jpg"
                    alt="Rith"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              {/* CENTER HEART WITH SPINNING RAINBOW HALO */}
              <div
                style={{
                  position: "relative",
                  width: "clamp(46px, 10vw, 64px)",
                  height: "clamp(46px, 10vw, 64px)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: nightMode
                    ? "0 0 28px rgba(255,105,180,0.85), 0 0 14px rgba(127,83,255,0.6)"
                    : "0 0 28px rgba(255,105,180,0.8), 0 0 14px rgba(255,215,0,0.4)",
                  animation: "beat 1.4s ease-in-out infinite",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "-60%",
                    background: "conic-gradient(from 180deg, #ff007f, #ffd700, #00ff88, #00d2ff, #7f53ff, #ff7f00, #ff007f)",
                    borderRadius: "50%",
                    animation: "rainbowSpin 3s linear infinite reverse",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "calc(100% - 6px)",
                    height: "calc(100% - 6px)",
                    borderRadius: "50%",
                    background: nightMode
                      ? "linear-gradient(135deg, rgba(255,105,180,0.9), rgba(127,83,255,0.9))"
                      : "linear-gradient(135deg, #ff69b4, #ff8cb3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(1.2rem, 3vw, 1.7rem)",
                    zIndex: 2,
                    border: nightMode ? "2px solid rgba(255,255,255,0.4)" : "2px solid #fff",
                  }}
                >
                  ❤️
                </div>
              </div>

              {/* MARY AVATAR */}
              <div
                className="rainbow-avatar-wrapper"
                style={{
                  position: "relative",
                  width: "clamp(90px, 18vw, 138px)",
                  height: "clamp(90px, 18vw, 138px)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: nightMode
                    ? "0 0 30px rgba(255,105,180,0.8), 0 0 60px rgba(255,215,0,0.4)"
                    : "0 0 30px rgba(255,215,0,0.7), 0 0 60px rgba(255,105,180,0.5)",
                }}
              >
                <div
                  className="rainbow-spin-layer"
                  style={{
                    position: "absolute",
                    inset: "-60%",
                    background: "conic-gradient(from 120deg, #ffd700, #ff7f00, #ff007f, #7f53ff, #00d2ff, #00ff88, #ffd700)",
                    borderRadius: "50%",
                    animation: "rainbowSpin 3.5s linear infinite",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "calc(100% - 8px)",
                    height: "calc(100% - 8px)",
                    borderRadius: "50%",
                    background: nightMode ? "#0d0622" : "#fff0fa",
                    padding: 3,
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="./assets/images/2.jpg"
                    alt="Mary"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── PROFILE INFO ROW (2 Balanced Columns, No Overlap) ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(12px, 3vw, 24px)",
                maxWidth: 640,
                margin: "0 auto 28px auto",
              }}
              data-aos="fade-up"
            >
              {/* Rith Info */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.4rem, 4vw, 1.85rem)", fontWeight: 700, color: subColor, lineHeight: 1.1 }}>
                  Rith
                </div>
                <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap", marginTop: 4 }}>
                  <span style={{ background: badgeBg, color: badgeClr, borderRadius: 20, padding: "2px 10px", fontSize: "clamp(0.65rem, 1.6vw, 0.76rem)", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                    {rithAge} yrs
                  </span>
                  <span style={{ background: zodiacBg, color: zodiacClr, borderRadius: 20, padding: "2px 10px", fontSize: "clamp(0.65rem, 1.6vw, 0.76rem)", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                    {rithZodiac.symbol} {rithZodiac.name}
                  </span>
                </div>
                <a
                  href="https://maps.app.goo.gl/xEurTTC7545mDJov6?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 6,
                    background: nightMode ? "rgba(127,83,255,0.22)" : "rgba(255,105,180,0.15)",
                    border: nightMode ? "1px solid rgba(167,125,253,0.45)" : "1px solid rgba(255,105,180,0.38)",
                    color: nightMode ? "#d6ccff" : "#d72660",
                    borderRadius: 20,
                    padding: "3px 12px",
                    fontSize: "clamp(0.68rem, 1.6vw, 0.78rem)",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                >
                  📍 <span>Rith's Location</span> ↗
                </a>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(0.88rem, 2vw, 1.05rem)", color: nightMode ? "#bca6e8" : "#9b6882", marginTop: 3 }}>
                  Rith Ft Ry 💙
                </div>
              </div>

              {/* Mary Info */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.4rem, 4vw, 1.85rem)", fontWeight: 700, color: subColor, lineHeight: 1.1 }}>
                  Mary
                </div>
                <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap", marginTop: 4 }}>
                  <span style={{ background: badgeBg, color: badgeClr, borderRadius: 20, padding: "2px 10px", fontSize: "clamp(0.65rem, 1.6vw, 0.76rem)", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                    {maryAge} yrs
                  </span>
                  <span style={{ background: zodiacBg, color: zodiacClr, borderRadius: 20, padding: "2px 10px", fontSize: "clamp(0.65rem, 1.6vw, 0.76rem)", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                    {maryZodiac.symbol} {maryZodiac.name}
                  </span>
                </div>
                <a
                  href="https://maps.app.goo.gl/gB3zJS4REho6FgWh6?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 6,
                    background: nightMode ? "rgba(255,105,180,0.22)" : "rgba(255,105,180,0.15)",
                    border: nightMode ? "1px solid rgba(255,105,180,0.45)" : "1px solid rgba(255,105,180,0.38)",
                    color: nightMode ? "#ff9ec6" : "#d72660",
                    borderRadius: 20,
                    padding: "3px 12px",
                    fontSize: "clamp(0.68rem, 1.6vw, 0.78rem)",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                >
                  📍 <span>Mary's Location</span> ↗
                </a>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(0.88rem, 2vw, 1.05rem)", color: nightMode ? "#bca6e8" : "#9b6882", marginTop: 3 }}>
                  Ry Ft Rith 💗
                </div>
              </div>
            </div>

            {/* ── COUNTDOWN ── */}
            <div
              style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(6px, 2vw, 14px)", flexWrap: "wrap" }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              {[
                { label: "DAYS",  value: elapsed.days,    pad: false },
                { label: "HRS",   value: elapsed.hours,   pad: true  },
                { label: "MIN",   value: elapsed.minutes, pad: true  },
                { label: "SEC",   value: elapsed.seconds, pad: true  },
              ].map((unit, idx) => (
                <div key={unit.label} style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1.5vw, 12px)" }}>
                  <div style={{
                    minWidth: "clamp(64px, 16vw, 96px)",
                    padding: "clamp(10px, 2.5vw, 16px) clamp(8px, 2vw, 12px)",
                    borderRadius: "clamp(14px, 3vw, 20px)",
                    background: timerCardBg,
                    border: timerBorder,
                    backdropFilter: "blur(12px)",
                    textAlign: "center",
                    boxShadow: nightMode
                      ? "0 6px 24px rgba(127,83,255,0.28), inset 0 1px 0 rgba(255,255,255,0.07)"
                      : "0 6px 24px rgba(255,105,180,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(1.4rem, 5vw, 2.1rem)",
                      color: timerNum,
                      lineHeight: 1.1,
                      letterSpacing: "1px",
                    }}>
                      {unit.pad ? String(unit.value).padStart(2, "0") : unit.value}
                    </div>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(0.52rem, 1.4vw, 0.65rem)",
                      color: timerLbl,
                      letterSpacing: "1.8px",
                      marginTop: 4,
                    }}>
                      {unit.label}
                    </div>
                  </div>
                  {idx < 3 && (
                    <span style={{
                      fontWeight: 900,
                      fontSize: "clamp(1rem, 3vw, 1.5rem)",
                      color: nightMode ? "rgba(207,174,255,0.45)" : "rgba(255,105,180,0.4)",
                      animation: "colonBlink 1s ease-in-out infinite",
                      lineHeight: 1,
                    }}>:</span>
                  )}
                </div>
              ))}
            </div>

            {/* Together since */}
            <div className="text-center mt-3" data-aos="fade-up" data-aos-delay="200">
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)",
                fontWeight: 700,
                color: nightMode ? "rgba(207,174,255,0.8)" : "rgba(215,38,96,0.72)",
              }}>
                Together since {since} 💕
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes rainbowSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.2); }
          40% { transform: scale(0.94); }
          60% { transform: scale(1.14); }
          80% { transform: scale(0.97); }
        }
        @keyframes colonBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.22; }
        }
      `}</style>
    </div>
  );
}
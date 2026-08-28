import React from "react";
import Relationship from "@/components/Relationship";
import CosmicConstellation from "@/components/CosmicConstellation";
import Memory from "@/components/Memory";
import Video from "@/components/Video";
import PolaroidScrapbook from "@/components/PolaroidScrapbook";
import CinemaReels from "@/components/CinemaReels";
import LovePhotobook from "@/components/LovePhotobook";
import LoveQuotes from "@/components/LoveQuotes";
import LoveMap from "@/components/LoveMap";
import LoveJar from "@/components/LoveJar";
import Mail from "@/components/Mail";

const templatePills = [
  { id: "all", label: "🌟 Full Story", sub: "All Combined" },
  { id: "feed", label: "🌸 Moments Feed", sub: "36 Photos & Stories" },
  { id: "scrapbook", label: "🎞️ Polaroid Scrapbook", sub: "3D Notes & Wall" },
  { id: "cinema", label: "🎬 Cinema & Reels", sub: "16 Video Lounge" },
  { id: "photobook", label: "📖 Photobook Magazine", sub: "Editorial Spreads" },
];

const Content = ({ nightMode, currentTemplate, setCurrentTemplate }) => {
  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const textColor = nightMode ? "#e8deff" : "#332233";
  const subText = nightMode ? "#bca6e8" : "#888";

  return (
    <div>
      {/* 1. Main Relationship & Live Anniversary Countdown */}
      <Relationship nightMode={nightMode} />

      {/* 2. Quick Interactive Template Switcher Bar (Fully Responsive Grid) */}
      <div
        className="container px-2 px-md-3 mb-4"
        style={{ maxWidth: 960 }}
        data-aos="fade-up"
      >
        <div
          className="p-3 rounded-4 mx-auto"
          style={{
            background: nightMode
              ? "rgba(35, 20, 68, 0.75)"
              : "rgba(255, 255, 255, 0.85)",
            border: nightMode
              ? "1.5px solid rgba(167,125,253,0.35)"
              : "1.5px solid rgba(255,182,218,0.55)",
            boxShadow: nightMode
              ? "0 8px 30px rgba(127,83,255,0.25)"
              : "0 8px 30px rgba(255,105,180,0.18)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mb-2.5 px-1">
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(0.82rem, 2.2vw, 0.95rem)",
                color: accent,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>✨</span> Choose Your Viewing Template:
            </span>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(0.88rem, 2vw, 0.98rem)",
                color: subText,
              }}
            >
              Click any template to switch layout 💌
            </span>
          </div>

          {/* Symmetrical & Balanced Responsive Template Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "8px",
            }}
          >
            {templatePills.map((tpl) => {
              const isActive = (currentTemplate || "all") === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setCurrentTemplate(tpl.id)}
                  style={{
                    background: isActive
                      ? nightMode
                        ? "linear-gradient(135deg, #7f53ff 0%, #a77dfd 100%)"
                        : "linear-gradient(135deg, #ff69b4 0%, #ff8cb3 100%)"
                      : nightMode
                      ? "rgba(127, 83, 255, 0.12)"
                      : "rgba(255, 255, 255, 0.75)",
                    color: isActive ? "#fff" : textColor,
                    border: isActive
                      ? "none"
                      : nightMode
                      ? "1px solid rgba(167, 125, 253, 0.3)"
                      : "1px solid #ffd6e6",
                    borderRadius: 16,
                    padding: "8px 10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                    boxShadow: isActive
                      ? `0 4px 18px ${nightMode ? "rgba(127,83,255,0.45)" : "rgba(255,105,180,0.4)"}`
                      : "0 2px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(0.74rem, 1.8vw, 0.82rem)",
                      lineHeight: 1.2,
                    }}
                  >
                    {tpl.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "clamp(0.72rem, 1.6vw, 0.8rem)",
                      color: isActive ? "rgba(255,255,255,0.9)" : subText,
                      lineHeight: 1.1,
                      marginTop: 2,
                    }}
                  >
                    {tpl.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Dynamic Template Content Rendering */}
      {currentTemplate === "feed" && (
        <>
          <CosmicConstellation nightMode={nightMode} />
          <Memory nightMode={nightMode} />
          <LoveQuotes nightMode={nightMode} />
          <LoveJar nightMode={nightMode} />
        </>
      )}

      {currentTemplate === "scrapbook" && (
        <>
          <PolaroidScrapbook nightMode={nightMode} />
          <LoveQuotes nightMode={nightMode} />
          <LoveJar nightMode={nightMode} />
          <Mail nightMode={nightMode} />
        </>
      )}

      {currentTemplate === "cinema" && (
        <>
          <CinemaReels nightMode={nightMode} />
          <Video nightMode={nightMode} />
          <LoveQuotes nightMode={nightMode} />
          <Mail nightMode={nightMode} />
        </>
      )}

      {currentTemplate === "photobook" && (
        <>
          <LovePhotobook nightMode={nightMode} />
          <LoveMap nightMode={nightMode} />
          <LoveJar nightMode={nightMode} />
          <Mail nightMode={nightMode} />
        </>
      )}

      {(currentTemplate === "all" || !currentTemplate) && (
        <>
          <CosmicConstellation nightMode={nightMode} />
          <Memory nightMode={nightMode} />
          <Video nightMode={nightMode} />
          <PolaroidScrapbook nightMode={nightMode} />
          <CinemaReels nightMode={nightMode} />
          <LovePhotobook nightMode={nightMode} />
          <LoveQuotes nightMode={nightMode} />
          <LoveMap nightMode={nightMode} />
          <LoveJar nightMode={nightMode} />
          <Mail nightMode={nightMode} />
        </>
      )}
    </div>
  );
};

export default Content;

import { useState, useRef, useEffect } from "react";

// ---- Letters Data ----
const letters = [
  {
    id: "love",
    label: "💌 Love Letter",
    icon: "💌",
    sealEmoji: "✉️",
    openEmoji: "💌",
    tagColor: "#ff69b4",
    tagLabel: "From Rith",
    gradient: "linear-gradient(135deg, #ff69b4 0%, #ff8cb3 100%)",
    waxColor: "#ff4b72",
    to: "Mary",
    from: "Rith",
    title: "My Sweetie 💖",
    subtitle: "A letter just for you",
    body: [
      "My sweetie, every single day I wake up grateful that you walked into my life.",
      "You light up my world with your smile, your laughter, and the warmth of your heart. I love the way you scrunch your nose when you laugh, the way you hold my hand like you never want to let go.",
      "No matter how hard any day gets, just thinking of you makes everything feel okay again.",
      "Thank you for being my safe place, my adventure partner, and my favorite person in the whole universe.",
    ],
    signature: "Forever yours, Rith 💖",
    songTitle: null,
  },
  {
    id: "anniversary",
    label: "💍 Anniversary",
    icon: "💍",
    sealEmoji: "💍",
    openEmoji: "💝",
    tagColor: "#ffd700",
    tagLabel: "Special ✨",
    gradient: "linear-gradient(135deg, #ffd700 0%, #ffba00 100%)",
    waxColor: "#ff8c00",
    to: "Mary",
    from: "Rith",
    title: "Our Anniversary 💍",
    subtitle: "Another beautiful chapter together",
    body: [
      "Happy Anniversary, my love! Today marks another beautiful month of our journey together.",
      "From our very first date to this very moment, every day with you has felt like a dream I never want to wake up from.",
      "Here's to two months of love, laughter, late-night talks, stolen glances, and adventures that I will remember forever.",
      "I love you more than words can ever capture — but I'll keep trying every day for the rest of my life.",
    ],
    signature: "With all my love, Rith 💕",
    songTitle: "Perfect — Ed Sheeran 🎵",
    songSrc: "./assets/music/anniversary-song.mp3",
  },
  {
    id: "goodnight",
    label: "🌙 Good Night",
    icon: "🌙",
    sealEmoji: "🌙",
    openEmoji: "🌛",
    tagColor: "#7f53ff",
    tagLabel: "Nightly ✨",
    gradient: "linear-gradient(135deg, #7f53ff 0%, #a77dfd 100%)",
    waxColor: "#5b2eff",
    to: "Mary",
    from: "Rith",
    title: "Good Night 🌙",
    subtitle: "Sweet dreams, my love",
    body: [
      "As the stars begin to fill the sky tonight, I just want you to know that you are the last thought on my mind before I close my eyes.",
      "I hope your dreams are as beautiful and magical as the way you make me feel every single day.",
      "Sleep well, my love. Tomorrow I get to see your smile again — and that is the best reason to wake up.",
      "The night sky has a million stars, but none shine as brightly as you do to me.",
    ],
    signature: "Sweet dreams always, Rith 🌠",
    songTitle: null,
  },
];

// ---- Floating Hearts Background ----
function FloatingHearts({ color }) {
  const hearts = ["💕", "✨", "💖", "🌸", "💫", "❤️"];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${0.7 + Math.random() * 1}rem`,
            opacity: 0.08 + Math.random() * 0.12,
            animation: `floatUp ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        >
          {hearts[i % hearts.length]}
        </div>
      ))}
    </div>
  );
}

function Mail({ nightMode }) {
  const [selectedLetterId, setSelectedLetterId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sealBroken, setSealBroken] = useState({});
  const audioRef = useRef(null);

  const selectedLetter = letters.find((l) => l.id === selectedLetterId);

  // Reset letter state on close
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedLetterId(null), 300);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleOpenLetter = (letter) => {
    setSelectedLetterId(letter.id);
    setSealBroken((prev) => ({ ...prev, [letter.id]: true }));
    setTimeout(() => setIsOpen(true), 80);
  };

  const handleSongPlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  // Colors
  const textColor = nightMode ? "#e8deff" : "#332233";
  const subText = nightMode ? "#bca6e8" : "#9b6882";
  const sectionBg = nightMode
    ? "linear-gradient(180deg, rgba(20,12,45,0.0) 0%, rgba(40,25,80,0.12) 100%)"
    : "linear-gradient(180deg, rgba(255,230,245,0.0) 0%, rgba(255,210,235,0.1) 100%)";

  return (
    <div
      className="position-relative pb-5"
      style={{ background: sectionBg, overflow: "hidden" }}
    >
      <FloatingHearts color={nightMode ? "#cfaeff" : "#ff69b4"} />

      <div className="container px-3 position-relative" style={{ zIndex: 1 }}>
        {/* ---- Section Header ---- */}
        <div className="text-center mb-4" style={{ paddingTop: 32 }}>
          <div
            style={{
              fontFamily: "'Poppins', 'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
              color: nightMode ? "#cfaeff" : "#ff69b4",
              textShadow: nightMode
                ? "0 2px 14px rgba(127,83,255,0.45)"
                : "0 2px 10px rgba(255,105,180,0.3)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>💌</span>
            Letters from Rith
            <span>💌</span>
          </div>
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1rem, 2.8vw, 1.18rem)",
              color: nightMode ? "#d6ccff" : "#b0406a",
              marginTop: 4,
              opacity: 0.85,
            }}
          >
            ✨ Choose a letter to open and read 💕
          </div>
        </div>

        {/* ---- Letter Envelope Cards Grid ---- */}
        <div className="row g-3 justify-content-center mb-2" style={{ maxWidth: 780, margin: "0 auto" }}>
          {letters.map((letter, idx) => {
            const isBroken = sealBroken[letter.id];
            return (
              <div
                key={letter.id}
                className="col-12 col-md-4"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                {/* Envelope Card */}
                <div
                  onClick={() => handleOpenLetter(letter)}
                  style={{
                    borderRadius: 24,
                    overflow: "hidden",
                    background: nightMode
                      ? "rgba(32,18,60,0.82)"
                      : "rgba(255,255,255,0.9)",
                    border: nightMode
                      ? `1.5px solid ${letter.tagColor}44`
                      : `1.5px solid ${letter.tagColor}55`,
                    boxShadow: nightMode
                      ? `0 8px 32px ${letter.tagColor}25`
                      : `0 8px 32px ${letter.tagColor}20`,
                    cursor: "pointer",
                    transition: "transform 0.28s ease, box-shadow 0.28s ease",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-7px) scale(1.025)";
                    e.currentTarget.style.boxShadow = `0 18px 44px ${letter.tagColor}45`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = nightMode
                      ? `0 8px 32px ${letter.tagColor}25`
                      : `0 8px 32px ${letter.tagColor}20`;
                  }}
                >
                  {/* Gradient Top Bar */}
                  <div
                    style={{
                      height: 6,
                      background: letter.gradient,
                      borderRadius: "24px 24px 0 0",
                    }}
                  />

                  {/* Envelope Visual */}
                  <div
                    className="d-flex flex-column align-items-center justify-content-center py-4 position-relative"
                    style={{ minHeight: 150 }}
                  >
                    {/* Animated Envelope */}
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 20,
                        background: nightMode
                          ? `rgba(255,255,255,0.06)`
                          : `${letter.tagColor}14`,
                        border: `2px solid ${letter.tagColor}55`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.4rem",
                        boxShadow: `0 6px 24px ${letter.tagColor}30`,
                        animation: "mailBounce 2.2s ease-in-out infinite",
                        position: "relative",
                      }}
                    >
                      {isBroken ? letter.openEmoji : letter.sealEmoji}

                      {/* Wax Seal Badge */}
                      {!isBroken && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: -10,
                            right: -10,
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: letter.waxColor,
                            border: "2px solid rgba(255,255,255,0.6)",
                            boxShadow: `0 2px 10px ${letter.waxColor}88`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.7rem",
                          }}
                        >
                          🔒
                        </div>
                      )}
                    </div>

                    {/* Tag */}
                    <div
                      className="mt-3 px-3 py-1 rounded-pill"
                      style={{
                        background: letter.tagColor + "22",
                        border: `1px solid ${letter.tagColor}55`,
                        color: letter.tagColor,
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.4px",
                      }}
                    >
                      {letter.tagLabel}
                    </div>

                    {/* Title & Subtitle */}
                    <div
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
                        color: textColor,
                        textAlign: "center",
                        marginTop: 8,
                        lineHeight: 1.2,
                      }}
                    >
                      {letter.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "clamp(0.88rem, 2.2vw, 1rem)",
                        color: subText,
                        textAlign: "center",
                        marginTop: 2,
                      }}
                    >
                      {letter.subtitle}
                    </div>

                    {/* Open Button */}
                    <div
                      className="mt-3 px-4 py-1.5 rounded-pill"
                      style={{
                        background: letter.gradient,
                        color: "#fff",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        boxShadow: `0 4px 14px ${letter.tagColor}55`,
                        transition: "transform 0.2s ease",
                      }}
                    >
                      {isBroken ? "💌 Read again" : "💌 Open Letter"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FULL-SCREEN LETTER READER MODAL ================= */}
      {selectedLetter && isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(20px)",
            zIndex: 99999,
            animation: "letterReveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            overflow: "auto",
          }}
          onClick={handleClose}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 28,
              overflow: "hidden",
              background: nightMode
                ? "rgba(25, 14, 52, 0.97)"
                : "rgba(255, 252, 255, 0.98)",
              border: `2px solid ${selectedLetter.tagColor}55`,
              boxShadow: `0 24px 80px ${selectedLetter.tagColor}55, 0 4px 20px rgba(0,0,0,0.4)`,
              animation: "letterReveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Header */}
            <div
              className="position-relative p-4 pb-5 text-center"
              style={{
                background: selectedLetter.gradient,
                borderRadius: "26px 26px 0 0",
              }}
            >
              <button
                onClick={handleClose}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                }}
              >
                ✕
              </button>

              <div style={{ fontSize: "2.8rem", marginBottom: 6 }}>
                {selectedLetter.openEmoji}
              </div>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "#fff",
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                {selectedLetter.title}
              </div>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.88)",
                  marginTop: 2,
                }}
              >
                {selectedLetter.subtitle}
              </div>
            </div>

            {/* Paper Tear Divider */}
            <div
              style={{
                height: 28,
                background: nightMode ? "rgba(25, 14, 52, 0.97)" : "rgba(255, 252, 255, 0.98)",
                marginTop: -20,
                borderRadius: "50% 50% 0 0 / 20px 20px 0 0",
                position: "relative",
                zIndex: 2,
              }}
            />

            {/* Letter Body */}
            <div className="px-4 pb-4 pt-0" style={{ marginTop: -8 }}>
              {/* To: Header */}
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.1rem",
                  color: selectedLetter.tagColor,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                ✨ To: {selectedLetter.to}
              </div>

              {/* Lined Paper Effect */}
              <div
                style={{
                  background: nightMode
                    ? `repeating-linear-gradient(transparent, transparent 27px, ${selectedLetter.tagColor}18 28px)`
                    : `repeating-linear-gradient(transparent, transparent 27px, ${selectedLetter.tagColor}20 28px)`,
                  borderRadius: 12,
                  padding: "12px 14px",
                  border: `1.5px dashed ${selectedLetter.tagColor}44`,
                  marginBottom: 16,
                }}
              >
                {selectedLetter.body.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "clamp(1.05rem, 2.8vw, 1.2rem)",
                      color: textColor,
                      lineHeight: 1.8,
                      marginBottom: i < selectedLetter.body.length - 1 ? 10 : 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Signature */}
              <div
                style={{
                  fontFamily: "'Pacifico', 'Caveat', cursive",
                  fontSize: "clamp(1rem, 2.8vw, 1.15rem)",
                  color: selectedLetter.tagColor,
                  textAlign: "right",
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                {selectedLetter.signature}
              </div>

              {/* Anniversary Song Player */}
              {selectedLetter.songTitle && (
                <>
                  <audio
                    ref={audioRef}
                    onEnded={() => setIsPlaying(false)}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                  >
                    <source src={selectedLetter.songSrc} type="audio/mpeg" />
                  </audio>

                  <div
                    className="d-flex align-items-center gap-3 p-3 rounded-3"
                    style={{
                      background: nightMode
                        ? "rgba(255,215,0,0.08)"
                        : "rgba(255,215,0,0.12)",
                      border: "1.5px solid rgba(255,215,0,0.35)",
                      marginBottom: 16,
                    }}
                  >
                    <button
                      onClick={handleSongPlay}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: isPlaying
                          ? "linear-gradient(135deg, #ffd700, #ff8c00)"
                          : "rgba(255,215,0,0.25)",
                        border: "2px solid rgba(255,215,0,0.7)",
                        color: isPlaying ? "#fff" : "#ffd700",
                        fontSize: "1.1rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.2s ease",
                        boxShadow: isPlaying ? "0 4px 16px rgba(255,215,0,0.5)" : "none",
                      }}
                    >
                      {isPlaying ? "⏸" : "▶"}
                    </button>

                    <div>
                      <div
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          color: "#ffd700",
                        }}
                      >
                        🎵 Our Special Song
                      </div>
                      <div
                        style={{
                          fontFamily: "'Caveat', cursive",
                          fontSize: "0.95rem",
                          color: textColor,
                          opacity: 0.8,
                        }}
                      >
                        {selectedLetter.songTitle}
                      </div>

                      {/* Animated Equalizer */}
                      {isPlaying && (
                        <div className="d-flex gap-1 align-items-end mt-1" style={{ height: 14 }}>
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              style={{
                                width: 4,
                                borderRadius: 2,
                                background: "#ffd700",
                                animation: `equalizer 0.${6 + i}s ease-in-out infinite alternate`,
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-100 rounded-pill py-2 border-0"
                style={{
                  background: selectedLetter.gradient,
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  boxShadow: `0 6px 20px ${selectedLetter.tagColor}55`,
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                💌 Close Letter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes mailBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-10px) rotate(-3deg); }
          60% { transform: translateY(-4px) rotate(2deg); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.08); }
        }
        @keyframes letterReveal {
          0% { opacity: 0; transform: scale(0.85) translateY(30px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes equalizer {
          0% { height: 4px; }
          100% { height: 14px; }
        }
      `}</style>
    </div>
  );
}

export default Mail;
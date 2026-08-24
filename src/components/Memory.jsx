import { useEffect, useState } from "react";
import AOS from "aos";

// ---- RICH MEMORIES DATA ----
const memories = [
  {
    id: 1,
    title: "Our First Romantic Walk 🌸",
    image: "./assets/images/1.jpg",
    date: "August 20, 2026",
    category: "dates",
    location: "Riverside Park 🌿",
    note: "Walking beside you made my heart race so fast. Every step with you felt like stepping into a fairytale. I knew from this moment I wanted to walk beside you forever.",
    author: "Rith",
    tapeColor: "rgba(255, 182, 193, 0.75)",
    tapeRotation: -3,
    sticker: "🌸",
    mood: "Butterflies in my stomach 🥰",
  },
  {
    id: 2,
    title: "Sweet Movie Date 🍿",
    image: "./assets/images/2.jpg",
    date: "August 21, 2026",
    category: "dates",
    location: "Chip Mong Cinema 🎬",
    note: "Sharing popcorn with you and holding your hand during the movie was the sweetest thing ever. I barely watched the screen because you looked so adorable.",
    author: "Mary",
    tapeColor: "rgba(200, 182, 255, 0.75)",
    tapeRotation: 4,
    sticker: "💖",
    mood: "Warm & Cozy 🎬",
  },
  {
    id: 3,
    title: "Late Night City Glow ✨",
    image: "./assets/images/3.jpg",
    date: "August 22, 2026",
    category: "trips",
    location: "Skyline View 🌃",
    note: "Looking at the glowing city lights together, but nothing in this entire skyline was brighter or more mesmerizing than your smile.",
    author: "Rith",
    tapeColor: "rgba(255, 214, 165, 0.75)",
    tapeRotation: -2,
    sticker: "✨",
    mood: "Speechless with love 🌙",
  },
  {
    id: 4,
    title: "Peaceful Picnic Day 🧺",
    image: "./assets/images/4.jpg",
    date: "August 23, 2026",
    category: "sweet",
    location: "Green Gardens 🍃",
    note: "Just you, me, sweet snacks, and endless conversations about our future dreams. Time stops whenever I am in your arms.",
    author: "Mary",
    tapeColor: "rgba(187, 242, 246, 0.75)",
    tapeRotation: 3,
    sticker: "🍓",
    mood: "Pure Happiness ☀️",
  },
  {
    id: 5,
    title: "Concert Night Energy 🎶",
    image: "./assets/images/5.jpg",
    date: "August 24, 2026",
    category: "milestones",
    location: "Hall Gaint 🎤",
    note: "Singing our favorite love songs at the top of our lungs while holding hands tightly. The beat of the music matched my heartbeat for you.",
    author: "Rith",
    tapeColor: "rgba(255, 198, 255, 0.75)",
    tapeRotation: -4,
    sticker: "🎵",
    mood: "Unstoppable Joy 🎸",
  },
  {
    id: 6,
    title: "Spontaneous Road Trip 🚗",
    image: "./assets/images/6.jpg",
    date: "August 25, 2026",
    category: "trips",
    location: "Country Road 🛣️",
    note: "Wind blowing through our hair, golden sunlight on the road, and you laughing in the passenger seat. Any journey with you is paradise.",
    author: "Mary",
    tapeColor: "rgba(202, 255, 191, 0.75)",
    tapeRotation: 2,
    sticker: "🚗",
    mood: "Adventurous 🌻",
  },
  {
    id: 7,
    title: "Coffee & Cozy Talks ☕",
    image: "./assets/images/7.jpg",
    date: "August 26, 2026",
    category: "sweet",
    location: "Little Cafe Corner 🥐",
    note: "You smiled with a little foam on your lips and I thought you were the cutest human alive. I could listen to you talk all day long.",
    author: "Rith",
    tapeColor: "rgba(253, 255, 182, 0.75)",
    tapeRotation: -3,
    sticker: "☕",
    mood: "Heart Melting 🤎",
  },
  {
    id: 8,
    title: "Holding Hands Forever 🤝",
    image: "./assets/images/8.jpg",
    date: "August 27, 2026",
    category: "sweet",
    location: "Everywhere With You 💕",
    note: "A solemn promise: no matter how stormy the weather gets or where life takes us, I will never let go of your hand.",
    author: "Mary",
    tapeColor: "rgba(255, 214, 224, 0.75)",
    tapeRotation: 3,
    sticker: "🤝",
    mood: "Infinite Trust 💍",
  },
  {
    id: 9,
    title: "Sunset by the Shore 🌅",
    image: "./assets/images/9.jpg",
    date: "August 28, 2026",
    category: "trips",
    location: "Golden Coast 🌊",
    note: "Watching the sun dip below the horizon with your head resting gently on my shoulder. I whispered a quiet thank you to the stars for giving me you.",
    author: "Rith",
    tapeColor: "rgba(255, 179, 138, 0.75)",
    tapeRotation: -2,
    sticker: "🌅",
    mood: "Eternal Peace 🧡",
  },
  {
    id: 10,
    title: "Silly Photo Booth Fun 📸",
    image: "./assets/images/10.jpg",
    date: "August 29, 2026",
    category: "dates",
    location: "Arcade Zone 🕹️",
    note: "Making goofy faces and laughing until our stomachs hurt. You are not only my lover but my best friend in the whole universe.",
    author: "Mary",
    tapeColor: "rgba(160, 196, 255, 0.75)",
    tapeRotation: 4,
    sticker: "🧸",
    mood: "Giggles & Love 🍭",
  },
  {
    id: 11,
    title: "Under the Midnight Sky 🌌",
    image: "./assets/images/11.jpg",
    date: "August 30, 2026",
    category: "milestones",
    location: "Stargazing Hill 🔭",
    note: "Looking up at the cosmos and knowing that meeting you was the greatest blessing of my entire life. Forever written in our stars.",
    author: "Rith",
    tapeColor: "rgba(189, 178, 255, 0.75)",
    tapeRotation: -3,
    sticker: "🌙",
    mood: "Cosmic Connection 🌠",
  },
];

const stickyNotes = [
  {
    id: "note-1",
    color: "#fffaaa",
    rotation: -2,
    text: "Mary's smile is the reason Rith is always happy 🌸",
    author: "Rith 🤫",
  },
  {
    id: "note-2",
    color: "#ffd6e8",
    rotation: 2,
    text: "Rule #1: Always hold hands & never go to sleep without a hug! 💖",
    author: "Mary 🎀",
  },
  {
    id: "note-3",
    color: "#cbf3f0",
    rotation: -1,
    text: "Future Bucket List: Stargazing & Japan Trip together! ✈️🌸",
    author: "Our Dream 💫",
  },
];

const Memory = ({ nightMode }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [flippedCards, setFlippedCards] = useState({});
  const [viewerIdx, setViewerIdx] = useState(null);
  const [modalFlipped, setModalFlipped] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredMemories =
    activeCategory === "all"
      ? memories
      : memories.filter((m) => m.category === activeCategory);

  const toggleFlip = (id, e) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (viewerIdx !== null) {
      document.body.style.overflow = "hidden";
      setModalFlipped(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [viewerIdx]);

  useEffect(() => {
    if (viewerIdx === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight" && viewerIdx < memories.length - 1) {
        setViewerIdx((idx) => idx + 1);
        setModalFlipped(false);
      }
      if (e.key === "ArrowLeft" && viewerIdx > 0) {
        setViewerIdx((idx) => idx - 1);
        setModalFlipped(false);
      }
      if (e.key === "Escape") setViewerIdx(null);
      if (e.key === " " || e.key === "f") {
        setModalFlipped((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewerIdx]);

  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const boardBg = nightMode
    ? "rgba(35, 22, 65, 0.45)"
    : "rgba(255, 255, 255, 0.55)";
  const boardBorder = nightMode
    ? "1.5px solid rgba(167, 125, 253, 0.3)"
    : "1.5px solid #ffe1ef";
  const boardShadow = nightMode
    ? "0 12px 48px rgba(127, 83, 255, 0.2)"
    : "0 12px 40px rgba(255, 105, 180, 0.15)";
  const activeTabBg = nightMode
    ? "linear-gradient(135deg, #7f53ff 0%, #a77dfd 100%)"
    : "linear-gradient(135deg, #ff69b4 0%, #ff8cb3 100%)";
  const inactiveTabBg = nightMode
    ? "rgba(127, 83, 255, 0.12)"
    : "rgba(255, 255, 255, 0.7)";
  const tabColor = nightMode ? "#e8deff" : "#5a2d4a";

  const categories = [
    { id: "all", label: "🌟 All Moments" },
    { id: "dates", label: "🍿 Dates" },
    { id: "trips", label: "🚗 Trips" },
    { id: "sweet", label: "💖 Cozy" },
    { id: "milestones", label: "✨ Special" },
  ];

  return (
    <div className="container px-2 pb-5 position-relative" data-aos="fade-up">
      {/* Title */}
      <div className="text-center mb-3" style={{ marginTop: 24 }}>
        <span
          style={{
            fontFamily: "'Poppins', 'Montserrat', cursive, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.1rem, 3.8vw, 1.3rem)",
            letterSpacing: "1px",
            color: accent,
            textShadow: nightMode
              ? "0 2px 14px rgba(127, 83, 255, 0.5)"
              : "0 2px 10px rgba(255, 105, 180, 0.3)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>📸</span>
          Polaroid Wall & Secret Notes
          <span>📸</span>
        </span>
        <div
          className="text-center mt-1"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            color: nightMode ? "#d6ccff" : "#a8235d",
            opacity: 0.88,
          }}
        >
          ✨ Tap any photo for full size • Tap <b>"Flip Note"</b> to read secret messages 💌
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="btn btn-sm rounded-pill px-3 py-1 shadow-sm"
              style={{
                background: isActive ? activeTabBg : inactiveTabBg,
                color: isActive ? "#fff" : tabColor,
                border: isActive
                  ? "none"
                  : nightMode
                  ? "1px solid rgba(167, 125, 253, 0.3)"
                  : "1px solid #ffd6e6",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.74rem, 2.2vw, 0.82rem)",
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sticky Notes Banner */}
      <div className="row g-2 mb-3 justify-content-center">
        {stickyNotes.map((note) => (
          <div key={note.id} className="col-12 col-md-4">
            <div
              className="sticky-note-card shadow-sm p-2 p-md-3 position-relative"
              style={{
                background: note.color,
                borderRadius: "4px 16px 16px 16px",
                transform: `rotate(${note.rotation}deg)`,
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                cursor: "default",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  left: 12,
                  fontSize: 16,
                }}
              >
                📌
              </div>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "clamp(1.05rem, 3.2vw, 1.22rem)",
                  fontWeight: 600,
                  color: "#3d2b1f",
                  lineHeight: 1.25,
                  marginTop: 4,
                }}
              >
                "{note.text}"
              </div>
              <div
                className="text-end mt-1"
                style={{
                  fontFamily: "'Pacifico', cursive",
                  fontSize: "0.8rem",
                  color: "#8a508f",
                }}
              >
                — {note.author}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Polaroid Wall Container */}
      <div
        className="polaroid-wall-board p-2 p-md-4 mx-auto position-relative"
        style={{
          background: boardBg,
          border: boardBorder,
          borderRadius: 24,
          boxShadow: boardShadow,
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="row g-2 g-md-3 justify-content-center">
          {filteredMemories.map((memory, idx) => {
            const isFlipped = !!flippedCards[memory.id];
            const realIdx = memories.findIndex((m) => m.id === memory.id);

            return (
              <div
                key={memory.id}
                className="col-6 col-md-4 col-lg-3 d-flex justify-content-center p-1 p-md-2"
                data-aos="fade-up"
                data-aos-delay={(idx % 4) * 50}
              >
                {/* 3D Flip Card Container (2 per row on mobile) */}
                <div
                  className="polaroid-card-wrapper position-relative my-1 my-md-2 w-100"
                  style={{
                    perspective: "1200px",
                    maxWidth: 260,
                    height: "clamp(245px, 58vw, 330px)",
                  }}
                >
                  {/* Washi Tape Accent */}
                  <div
                    className="washi-tape position-absolute"
                    style={{
                      top: -8,
                      left: "50%",
                      transform: `translateX(-50%) rotate(${memory.tapeRotation}deg)`,
                      width: "clamp(46px, 13vw, 80px)",
                      height: "clamp(14px, 3.5vw, 22px)",
                      background: memory.tapeColor,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                      zIndex: 10,
                      pointerEvents: "none",
                      borderLeft: "2px dashed rgba(255,255,255,0.6)",
                      borderRight: "2px dashed rgba(255,255,255,0.6)",
                    }}
                  />

                  {/* Inner 3D Flippable Box */}
                  <div
                    className="polaroid-inner w-100 h-100"
                    style={{
                      transformStyle: "preserve-3d",
                      transition: "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      position: "relative",
                      borderRadius: 16,
                    }}
                  >
                    {/* FRONT SIDE (PHOTO) */}
                    <div
                      className="polaroid-front position-absolute w-100 h-100 d-flex flex-column justify-content-between"
                      style={{
                        backfaceVisibility: "hidden",
                        background: "#fffafb",
                        borderRadius: 16,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(255, 182, 193, 0.35)",
                        padding: "clamp(6px, 2vw, 12px)",
                        cursor: "pointer",
                      }}
                      onClick={() => setViewerIdx(realIdx)}
                    >
                      <div
                        className="photo-frame position-relative overflow-hidden"
                        style={{
                          borderRadius: 10,
                          height: "clamp(115px, 28vw, 190px)",
                          background: "#f0edf5",
                        }}
                      >
                        <img
                          src={memory.image}
                          alt={memory.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 4,
                            right: 6,
                            fontSize: "clamp(14px, 3.5vw, 20px)",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                          }}
                        >
                          {memory.sticker}
                        </div>
                      </div>

                      <div className="text-center pt-1">
                        <div
                          style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: "clamp(0.95rem, 2.7vw, 1.25rem)",
                            fontWeight: 700,
                            color: "#5a2d4a",
                            lineHeight: 1.1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {memory.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "clamp(0.6rem, 1.6vw, 0.72rem)",
                            color: "#b5838d",
                            fontWeight: 500,
                          }}
                        >
                          {memory.date}
                        </div>
                      </div>

                      <div className="d-flex justify-content-center pt-1">
                        <button
                          className="btn btn-sm rounded-pill"
                          style={{
                            background: "rgba(255, 105, 180, 0.12)",
                            color: "#ea4c89",
                            border: "1px solid rgba(255, 105, 180, 0.3)",
                            fontSize: "clamp(0.64rem, 1.8vw, 0.74rem)",
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 600,
                            padding: "1px clamp(6px, 1.8vw, 10px)",
                          }}
                          onClick={(e) => toggleFlip(memory.id, e)}
                        >
                          💌 Flip Note ➔
                        </button>
                      </div>
                    </div>

                    {/* BACK SIDE (SECRET NOTE) */}
                    <div
                      className="polaroid-back position-absolute w-100 h-100 d-flex flex-column justify-content-between"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "linear-gradient(135deg, #fff9f0 0%, #fff1f5 100%)",
                        borderRadius: 16,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                        border: "1.5px dashed rgba(255, 105, 180, 0.4)",
                        padding: "clamp(6px, 2vw, 12px)",
                      }}
                    >
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span
                            style={{
                              fontSize: "clamp(0.62rem, 1.7vw, 0.74rem)",
                              fontWeight: 700,
                              color: "#ea4c89",
                              fontFamily: "'Poppins', sans-serif",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "80%",
                            }}
                          >
                            📍 {memory.location}
                          </span>
                          <span style={{ fontSize: "clamp(0.85rem, 2.2vw, 1rem)" }}>{memory.sticker}</span>
                        </div>
                        <div
                          style={{
                            fontSize: "clamp(0.58rem, 1.5vw, 0.68rem)",
                            color: "#8a508f",
                            fontFamily: "'Poppins', sans-serif",
                            fontStyle: "italic",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Mood: {memory.mood}
                        </div>
                      </div>

                      <div
                        className="my-auto py-1 px-1"
                        style={{
                          fontFamily: "'Caveat', cursive",
                          fontSize: "clamp(0.92rem, 2.6vw, 1.18rem)",
                          lineHeight: 1.25,
                          color: "#3a2233",
                          overflowY: "auto",
                          maxHeight: "clamp(90px, 26vw, 160px)",
                          textAlign: "left",
                        }}
                      >
                        "{memory.note}"
                      </div>

                      <div className="d-flex justify-content-between align-items-center pt-1 border-top border-pink-subtle">
                        <span
                          style={{
                            fontFamily: "'Pacifico', cursive",
                            fontSize: "clamp(0.68rem, 1.9vw, 0.85rem)",
                            color: "#d72660",
                          }}
                        >
                          — {memory.author} 💕
                        </span>
                        <button
                          className="btn btn-sm rounded-pill"
                          style={{
                            background: "rgba(127, 83, 255, 0.12)",
                            color: "#7f53ff",
                            border: "1px solid rgba(127, 83, 255, 0.3)",
                            fontSize: "clamp(0.62rem, 1.7vw, 0.72rem)",
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 600,
                            padding: "1px clamp(4px, 1.5vw, 8px)",
                          }}
                          onClick={(e) => toggleFlip(memory.id, e)}
                        >
                          📸 Photo ➔
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

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {viewerIdx !== null && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-2"
          style={{
            background: "rgba(15, 10, 30, 0.9)",
            backdropFilter: "blur(10px)",
            zIndex: 3000,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => setViewerIdx(null)}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center position-relative w-100"
            style={{ maxWidth: 440, margin: "0 auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="btn-close btn-close-white position-absolute top-0 end-0 m-2"
              style={{ zIndex: 20, fontSize: "1.3rem" }}
              aria-label="Close"
              onClick={() => setViewerIdx(null)}
            />

            {/* Prev Button */}
            <button
              className="btn btn-light position-absolute start-0 top-50 translate-middle-y shadow"
              style={{
                left: -8,
                zIndex: 20,
                opacity: viewerIdx > 0 ? 1 : 0.4,
                pointerEvents: viewerIdx > 0 ? "auto" : "none",
                borderRadius: "50%",
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 18,
              }}
              disabled={viewerIdx === 0}
              onClick={() => {
                setViewerIdx((idx) => idx - 1);
                setModalFlipped(false);
              }}
            >
              &#8592;
            </button>

            {/* Next Button */}
            <button
              className="btn btn-light position-absolute end-0 top-50 translate-middle-y shadow"
              style={{
                right: -8,
                zIndex: 20,
                opacity: viewerIdx < memories.length - 1 ? 1 : 0.4,
                pointerEvents: viewerIdx < memories.length - 1 ? "auto" : "none",
                borderRadius: "50%",
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 18,
              }}
              disabled={viewerIdx === memories.length - 1}
              onClick={() => {
                setViewerIdx((idx) => idx + 1);
                setModalFlipped(false);
              }}
            >
              &#8594;
            </button>

            {/* Modal Card */}
            <div
              className="w-100 position-relative"
              style={{
                perspective: "1200px",
                maxWidth: 390,
                minHeight: 460,
                maxHeight: "82vh",
              }}
            >
              <div
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: modalFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  position: "relative",
                  width: "100%",
                  minHeight: 460,
                }}
              >
                {/* Modal Front */}
                <div
                  className="p-3 p-md-4 rounded-4 text-center d-flex flex-column justify-content-between position-absolute w-100 h-100"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                    border: "2px solid #ffb3d6",
                    overflowY: "auto",
                  }}
                >
                  <div>
                    <img
                      src={memories[viewerIdx].image}
                      alt={memories[viewerIdx].title}
                      className="rounded-3 shadow-sm w-100"
                      style={{
                        maxHeight: "42vh",
                        objectFit: "cover",
                        background: "#fff",
                      }}
                    />
                    <div
                      className="mt-2"
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                        fontWeight: 700,
                        color: "#d72660",
                        lineHeight: 1.15,
                      }}
                    >
                      {memories[viewerIdx].title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.78rem",
                        color: "#888",
                      }}
                    >
                      📍 {memories[viewerIdx].location} • {memories[viewerIdx].date}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      className="btn rounded-pill px-3 py-2 w-100"
                      style={{
                        background: "linear-gradient(135deg, #ff69b4, #7f53ff)",
                        color: "#fff",
                        fontWeight: 700,
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.85rem",
                        border: "none",
                      }}
                      onClick={() => setModalFlipped(true)}
                    >
                      💌 Read Secret Note On Back ➔
                    </button>
                  </div>
                </div>

                {/* Modal Back */}
                <div
                  className="p-3 p-md-4 rounded-4 text-center d-flex flex-column justify-content-between position-absolute w-100 h-100"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "linear-gradient(145deg, #fff9f2, #fff0f6)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                    border: "2px dashed #7f53ff",
                    overflowY: "auto",
                  }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: "#7f53ff",
                        }}
                      >
                        📍 {memories[viewerIdx].location}
                      </span>
                      <span style={{ fontSize: "1.3rem" }}>
                        {memories[viewerIdx].sticker}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.75rem",
                        color: "#a8235d",
                        fontStyle: "italic",
                        marginBottom: 10,
                      }}
                    >
                      Mood: {memories[viewerIdx].mood}
                    </div>
                    <div
                      className="p-3 rounded-3"
                      style={{
                        background: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid rgba(255, 182, 193, 0.4)",
                        fontFamily: "'Caveat', cursive",
                        fontSize: "clamp(1.2rem, 3.8vw, 1.45rem)",
                        lineHeight: 1.4,
                        color: "#3a2233",
                        textAlign: "left",
                        maxHeight: "35vh",
                        overflowY: "auto",
                      }}
                    >
                      "{memories[viewerIdx].note}"
                    </div>
                  </div>

                  <div className="pt-2 d-flex justify-content-between align-items-center">
                    <span
                      style={{
                        fontFamily: "'Pacifico', cursive",
                        fontSize: "0.95rem",
                        color: "#d72660",
                      }}
                    >
                      — {memories[viewerIdx].author} 💕
                    </span>
                    <button
                      className="btn btn-outline-secondary rounded-pill px-3 py-1"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                      }}
                      onClick={() => setModalFlipped(false)}
                    >
                      📸 View Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dot Navigator */}
            <div className="mt-2 d-flex gap-1 justify-content-center flex-wrap">
              {memories.map((_, i) => (
                <button
                  key={i}
                  className="rounded-circle border-0 p-0"
                  style={{
                    width: 9,
                    height: 9,
                    background: i === viewerIdx ? "#ff69b4" : "rgba(255,255,255,0.4)",
                    boxShadow: i === viewerIdx ? "0 0 6px #ff69b4" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setViewerIdx(i);
                    setModalFlipped(false);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memory;

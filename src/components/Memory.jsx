import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AOS from "aos";

// ---- DATA: STORIES & POSTS ----
const storyHighlights = [
  { id: 1, title: "Our Start", icon: "🌸", image: "./assets/images/1.jpg", color: "#ff69b4" },
  { id: 2, title: "Movie Time", icon: "🍿", image: "./assets/images/2.jpg", color: "#a77dfd" },
  { id: 3, title: "City Nights", icon: "🌃", image: "./assets/images/3.jpg", color: "#ffd700" },
  { id: 4, title: "Picnic Day", icon: "🧺", image: "./assets/images/4.jpg", color: "#00b894" },
  { id: 5, title: "Concerts", icon: "🎶", image: "./assets/images/5.jpg", color: "#ff7675" },
  { id: 6, title: "Road Trips", icon: "🚗", image: "./assets/images/6.jpg", color: "#74b9ff" },
];

const feedPosts = [
  {
    id: 1,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/1.jpg",
    location: "Riverside Promenade 🌿",
    likes: 128,
    title: "Our First Romantic Walk 🌸",
    caption: "Every step with you felt like stepping into a fairytale. I knew from this moment I wanted to walk beside you forever. 💕",
    comments: [
      { user: "mary.cutie", text: "Best walk ever with my favorite person 🥰💖" },
      { user: "rith.dev", text: "@mary.cutie Forever holding your hand! 🤝" }
    ],
    timeAgo: "August 20, 2026",
    category: "dates",
  },
  {
    id: 2,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/2.jpg",
    location: "Chip Mong Cinema 🎬",
    likes: 245,
    title: "Movie & Popcorn Date 🍿",
    caption: "Sharing popcorn with you was the sweetest thing ever. I barely watched the screen because you looked so handsome! ✨",
    comments: [
      { user: "rith.dev", text: "You ate 90% of the popcorn though 😂🍿❤️" },
      { user: "mary.cutie", text: "@rith.dev Because you fed me! 😋" }
    ],
    timeAgo: "August 21, 2026",
    category: "dates",
  },
  {
    id: 3,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/3.jpg",
    location: "Skyline Rooftop 🌃",
    likes: 189,
    title: "Late Night City Glow ✨",
    caption: "Looking at the glowing city lights together, but nothing in this entire skyline was brighter or more mesmerizing than your smile. 🌙",
    comments: [
      { user: "mary.cutie", text: "The city lights were so magical with you 💫" }
    ],
    timeAgo: "August 22, 2026",
    category: "trips",
  },
  {
    id: 4,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/4.jpg",
    location: "Green Gardens 🍃",
    likes: 312,
    title: "Peaceful Picnic Day 🧺",
    caption: "Just you, me, sweet snacks, and endless conversations about our future dreams. Time stops whenever I am in your arms. 🍓",
    comments: [
      { user: "rith.dev", text: "Let's do this every weekend my love 🥪💕" }
    ],
    timeAgo: "August 23, 2026",
    category: "sweet",
  },
  {
    id: 5,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/5.jpg",
    location: "Hall Gaint 🎤",
    likes: 278,
    title: "Concert Night Energy 🎶",
    caption: "Singing our favorite songs at the top of our lungs while holding hands tightly. The beat of the music matched my heartbeat for you. 🎸",
    comments: [
      { user: "mary.cutie", text: "Our voices were gone the next day haha 🎤💖" }
    ],
    timeAgo: "August 24, 2026",
    category: "milestones",
  },
  {
    id: 6,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/6.jpg",
    location: "Country Road 🛣️",
    likes: 195,
    title: "Spontaneous Road Trip 🚗",
    caption: "Wind in our hair, golden sunlight on the road, and laughing together all the way. Any journey with you is paradise. 🌻",
    comments: [
      { user: "rith.dev", text: "Best co-pilot in the world 🚗💨" }
    ],
    timeAgo: "August 25, 2026",
    category: "trips",
  },
  {
    id: 7,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/7.jpg",
    location: "Little Cozy Cafe 🥐",
    likes: 210,
    title: "Coffee & Cozy Talks ☕",
    caption: "You smiled with a little foam on your lips and I thought you were the cutest human alive. I could listen to you all day long. 🤎",
    comments: [
      { user: "mary.cutie", text: "You should have wiped it off for me instead of staring! 🙈" }
    ],
    timeAgo: "August 26, 2026",
    category: "sweet",
  },
  {
    id: 8,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/8.jpg",
    location: "Everywhere With You 💕",
    likes: 388,
    title: "Holding Hands Forever 🤝",
    caption: "A solemn promise: no matter how stormy the weather gets or where life takes us, I will never let go of your hand. 💍",
    comments: [
      { user: "rith.dev", text: "Forever and always my queen 👑💖" }
    ],
    timeAgo: "August 27, 2026",
    category: "sweet",
  },
  {
    id: 9,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/9.jpg",
    location: "Golden Coast 🌊",
    likes: 260,
    title: "Sunset by the Shore 🌅",
    caption: "Watching the sun dip below the horizon with your head resting gently on my shoulder. Forever grateful for you. 🧡",
    comments: [
      { user: "mary.cutie", text: "The prettiest sunset with my favorite boy 🌅✨" }
    ],
    timeAgo: "August 28, 2026",
    category: "trips",
  },
  {
    id: 10,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/10.jpg",
    location: "Arcade Zone 🕹️",
    likes: 340,
    title: "Silly Photo Booth Fun 📸",
    caption: "Making goofy faces and laughing until our stomachs hurt. You are my lover and my best friend in the universe! 🍭",
    comments: [
      { user: "rith.dev", text: "We won so many plushies that day 🧸❤️" }
    ],
    timeAgo: "August 29, 2026",
    category: "dates",
  },
  {
    id: 11,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/11.jpg",
    location: "Stargazing Hill 🔭",
    likes: 420,
    title: "Under the Midnight Sky 🌌",
    caption: "Looking up at the cosmos and knowing that meeting you was the greatest blessing of my entire life. 🌠",
    comments: [
      { user: "mary.cutie", text: "Written in the stars forever ♓💖♐" }
    ],
    timeAgo: "August 30, 2026",
    category: "milestones",
  },
];

const Memory = ({ nightMode }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [likesState, setLikesState] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [doubleTapHeart, setDoubleTapHeart] = useState(null);
  const [openComments, setOpenComments] = useState({});
  const [storyModalIdx, setStoryModalIdx] = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Lock body scroll when story is open
  useEffect(() => {
    if (storyModalIdx !== null) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [storyModalIdx]);

  // Filter feed
  const filteredPosts =
    activeFilter === "all"
      ? feedPosts
      : feedPosts.filter((p) => p.category === activeFilter);

  // Handle Like Toggle
  const handleLike = (id, e) => {
    if (e) e.stopPropagation();
    setLikesState((prev) => ({
      ...prev,
      [id]: {
        liked: !prev[id]?.liked,
        count: (prev[id]?.count ?? feedPosts.find((p) => p.id === id).likes) + (prev[id]?.liked ? -1 : 1),
      },
    }));
  };

  // Double tap photo to like
  const handleDoubleTap = (id, e) => {
    if (e) e.stopPropagation();
    setDoubleTapHeart(id);
    if (!likesState[id]?.liked) {
      handleLike(id);
    }
    setTimeout(() => setDoubleTapHeart(null), 900);
  };

  // Toggle Save
  const handleSave = (id, e) => {
    if (e) e.stopPropagation();
    setSavedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle Comments
  const toggleComments = (id, e) => {
    if (e) e.stopPropagation();
    setOpenComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Story Auto-Advance Timer
  useEffect(() => {
    if (storyModalIdx === null || isPaused) return;
    setStoryProgress(0);
    const interval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          if (storyModalIdx < feedPosts.length - 1) {
            setStoryModalIdx((curr) => curr + 1);
            return 0;
          } else {
            setStoryModalIdx(null);
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [storyModalIdx, isPaused]);

  // Keyboard navigation for stories
  useEffect(() => {
    if (storyModalIdx === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight" && storyModalIdx < feedPosts.length - 1) {
        setStoryModalIdx((curr) => curr + 1);
      }
      if (e.key === "ArrowLeft" && storyModalIdx > 0) {
        setStoryModalIdx((curr) => curr - 1);
      }
      if (e.key === "Escape") setStoryModalIdx(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [storyModalIdx]);

  // Theme styling
  const accent = nightMode ? "#cfaeff" : "#ff69b4";
  const cardBg = nightMode
    ? "rgba(35, 22, 65, 0.75)"
    : "rgba(255, 255, 255, 0.85)";
  const cardBorder = nightMode
    ? "1.5px solid rgba(167, 125, 253, 0.35)"
    : "1.5px solid rgba(255, 182, 218, 0.45)";
  const cardShadow = nightMode
    ? "0 8px 30px rgba(127, 83, 255, 0.2)"
    : "0 8px 26px rgba(255, 105, 180, 0.15)";
  const textColor = nightMode ? "#e8deff" : "#332233";
  const subTextColor = nightMode ? "#bca6e8" : "#8a6b82";

  return (
    <div className="container px-2 pb-5 position-relative" data-aos="fade-up">
      {/* Title */}
      <div className="text-center mb-3" style={{ marginTop: 20 }}>
        <span
          style={{
            fontFamily: "'Poppins', 'Montserrat', cursive, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.15rem, 3.8vw, 1.35rem)",
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
          Mary & Rith’s Moments Feed
          <span>📸</span>
        </span>
        <div
          className="text-center mt-1"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1rem, 2.8vw, 1.2rem)",
            color: nightMode ? "#d6ccff" : "#a8235d",
            opacity: 0.88,
          }}
        >
          ✨ Tap stories to view full-screen • Double tap photos to send love ❤️
        </div>
      </div>

      {/* ================= STORY HIGHLIGHTS TRAY ================= */}
      <div
        className="story-highlights-container mx-auto mb-3 py-2 px-3 d-flex align-items-center gap-3"
        style={{
          maxWidth: 960,
          overflowX: "auto",
          scrollbarWidth: "none",
          background: nightMode
            ? "rgba(35, 22, 65, 0.45)"
            : "rgba(255, 255, 255, 0.55)",
          borderRadius: 20,
          border: cardBorder,
          backdropFilter: "blur(12px)",
        }}
      >
        {storyHighlights.map((story, idx) => (
          <div
            key={story.id}
            className="d-flex flex-column align-items-center text-center flex-shrink-0"
            style={{ cursor: "pointer" }}
            onClick={() => setStoryModalIdx(idx)}
          >
            {/* Gradient Ring */}
            <div
              className="story-ring-wrapper p-0.5 rounded-circle mb-1"
              style={{
                background: `linear-gradient(135deg, ${story.color}, #ff69b4, #ffd700)`,
                boxShadow: `0 3px 12px ${story.color}40`,
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div
                className="rounded-circle overflow-hidden bg-white p-0.5"
                style={{ width: "clamp(52px, 11vw, 64px)", height: "clamp(52px, 11vw, 64px)" }}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.66rem, 1.8vw, 0.76rem)",
                fontWeight: 600,
                color: textColor,
                maxWidth: 64,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {story.title}
            </span>
          </div>
        ))}
      </div>

      {/* ================= CATEGORY FILTER PILLS ================= */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
        {[
          { id: "all", label: "🌟 All Posts" },
          { id: "dates", label: "🍿 Dates" },
          { id: "trips", label: "🚗 Trips" },
          { id: "sweet", label: "💖 Cozy" },
          { id: "milestones", label: "✨ Special" },
        ].map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className="btn btn-sm rounded-pill px-3 py-1 shadow-sm"
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
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.72rem, 2vw, 0.82rem)",
                transition: "all 0.2s ease",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ================= MOMENTS FEED GRID ================= */}
      <div className="row g-2 g-md-3 justify-content-center mx-auto" style={{ maxWidth: 1040 }}>
        {filteredPosts.map((post, idx) => {
          const isLiked = likesState[post.id]?.liked;
          const currentLikes = likesState[post.id]?.count ?? post.likes;
          const isSaved = savedPosts[post.id];
          const showComments = openComments[post.id];

          return (
            <div
              key={post.id}
              className="col-6 col-md-4 col-lg-4 d-flex justify-content-center p-1 p-md-2"
              data-aos="fade-up"
              data-aos-delay={(idx % 3) * 50}
            >
              {/* Glassmorphism Feed Card */}
              <div
                className="insta-glass-card w-100 position-relative d-flex flex-column justify-content-between"
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: 18,
                  boxShadow: cardShadow,
                  backdropFilter: "blur(14px)",
                  overflow: "hidden",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  cursor: "pointer",
                }}
                onClick={() => setStoryModalIdx(idx)}
              >
                {/* 1. Header: Avatar & Username */}
                <div className="d-flex align-items-center justify-content-between p-1.5 p-md-2 px-2">
                  <div className="d-flex align-items-center gap-1.5">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="rounded-circle shadow-sm"
                      style={{
                        width: "clamp(26px, 5vw, 34px)",
                        height: "clamp(26px, 5vw, 34px)",
                        objectFit: "cover",
                        border: "2px solid #ff69b4",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 700,
                          fontSize: "clamp(0.68rem, 1.8vw, 0.8rem)",
                          color: textColor,
                          lineHeight: 1.1,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "clamp(65px, 16vw, 110px)",
                        }}
                      >
                        {post.handle}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "clamp(0.55rem, 1.3vw, 0.65rem)",
                      color: accent,
                      fontWeight: 600,
                    }}
                  >
                    ✨ Story
                  </span>
                </div>

                {/* 2. Main Photo with Double-Tap Heart Animation */}
                <div
                  className="position-relative overflow-hidden"
                  style={{
                    height: "clamp(130px, 32vw, 210px)",
                    background: "#111",
                  }}
                  onDoubleClick={(e) => handleDoubleTap(post.id, e)}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                  />

                  {/* Pop Heart on Double Tap */}
                  {doubleTapHeart === post.id && (
                    <div
                      className="position-absolute top-50 start-50 translate-middle"
                      style={{
                        fontSize: "3.5rem",
                        animation: "popHeart 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                        filter: "drop-shadow(0 4px 16px rgba(255,0,100,0.6))",
                        zIndex: 10,
                      }}
                    >
                      💖
                    </div>
                  )}

                  {/* Location Badge on Photo Bottom */}
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-1 px-2"
                    style={{
                      background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
                      color: "#fff",
                      fontSize: "clamp(0.55rem, 1.3vw, 0.65rem)",
                      fontFamily: "'Poppins', sans-serif",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    📍 {post.location}
                  </div>
                </div>

                {/* 3. Action Bar & Info */}
                <div className="p-1.5 p-md-2 px-2">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="d-flex align-items-center gap-2">
                      {/* Heart Button */}
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        className="btn p-0 border-0"
                        style={{
                          fontSize: "clamp(0.95rem, 2.6vw, 1.2rem)",
                          color: isLiked ? "#ff385c" : textColor,
                          transform: isLiked ? "scale(1.15)" : "scale(1)",
                        }}
                        aria-label="Like"
                      >
                        {isLiked ? "❤️" : "🤍"}
                      </button>

                      <span
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 700,
                          fontSize: "clamp(0.62rem, 1.6vw, 0.74rem)",
                          color: textColor,
                        }}
                      >
                        {currentLikes}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleSave(post.id, e)}
                      className="btn p-0 border-0"
                      style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.05rem)" }}
                      aria-label="Save"
                    >
                      {isSaved ? "🔖" : "📑"}
                    </button>
                  </div>

                  {/* Title & Caption snippet */}
                  <div
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "clamp(0.88rem, 2.3vw, 1.05rem)",
                      fontWeight: 700,
                      color: textColor,
                      lineHeight: 1.15,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {post.title}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= FULLSCREEN INSTAGRAM STORY MODAL (PORTAL TO BODY) ================= */}
      {storyModalIdx !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100dvh",
              zIndex: 999999,
              background: "rgba(0, 0, 0, 0.96)",
              backdropFilter: "blur(14px)",
              animation: "fadeIn 0.25s ease",
              overflow: "hidden",
              touchAction: "none",
            }}
            onClick={() => setStoryModalIdx(null)}
          >
            {/* Main Story Container */}
            <div
              className="position-relative d-flex flex-column justify-content-between overflow-hidden"
              style={{
                width: "100vw",
                maxWidth: 440,
                height: "100dvh",
                maxHeight: "100dvh",
                background: "#000",
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Story Background Photo */}
              <img
                src={feedPosts[storyModalIdx].image}
                alt="Story"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 1,
                }}
              />

              {/* Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.9) 100%)",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              {/* Top Bar: Progress Segments & User Info */}
              <div
                className="position-relative w-100 p-3"
                style={{
                  zIndex: 10,
                  pointerEvents: "auto",
                  paddingTop: "max(16px, env(safe-area-inset-top, 16px))",
                }}
              >
                {/* Progress Segments */}
                <div className="d-flex gap-1 mb-2.5">
                  {feedPosts.map((_, i) => (
                    <div
                      key={i}
                      className="flex-grow-1 rounded-pill overflow-hidden"
                      style={{ height: 3, background: "rgba(255,255,255,0.35)" }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background: "#fff",
                          width:
                            i < storyModalIdx
                              ? "100%"
                              : i === storyModalIdx
                              ? `${storyProgress}%`
                              : "0%",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* User Header */}
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={feedPosts[storyModalIdx].avatar}
                      alt=""
                      className="rounded-circle shadow"
                      style={{
                        width: 38,
                        height: 38,
                        objectFit: "cover",
                        border: "2px solid #fff",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          fontFamily: "'Poppins', sans-serif",
                          lineHeight: 1.1,
                        }}
                      >
                        {feedPosts[storyModalIdx].handle}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.85)",
                          fontSize: "0.7rem",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        📍 {feedPosts[storyModalIdx].location} • {feedPosts[storyModalIdx].timeAgo}
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-close btn-close-white p-2"
                    style={{ fontSize: "1.2rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
                    aria-label="Close story"
                    onClick={() => setStoryModalIdx(null)}
                  />
                </div>
              </div>

              {/* Touch Tap Navigation Zones (Left 40% / Right 60%) */}
              <div
                className="position-absolute top-0 start-0 h-100"
                style={{ width: "40%", zIndex: 5, cursor: "pointer" }}
                onClick={() => {
                  if (storyModalIdx > 0) setStoryModalIdx((curr) => curr - 1);
                }}
              />
              <div
                className="position-absolute top-0 end-0 h-100"
                style={{ width: "60%", zIndex: 5, cursor: "pointer" }}
                onClick={() => {
                  if (storyModalIdx < feedPosts.length - 1) setStoryModalIdx((curr) => curr + 1);
                  else setStoryModalIdx(null);
                }}
              />

              {/* Bottom Section: Caption, Comments & Like Reaction */}
              <div
                className="position-relative w-100 p-3 text-white"
                style={{
                  zIndex: 10,
                  pointerEvents: "auto",
                  paddingBottom: "max(18px, env(safe-area-inset-bottom, 18px))",
                }}
              >
                {/* Story Title & Handwritten Caption */}
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "clamp(1.2rem, 4vw, 1.45rem)",
                    fontWeight: 700,
                    color: "#ffd6e9",
                    lineHeight: 1.3,
                    textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    marginBottom: 8,
                  }}
                >
                  "{feedPosts[storyModalIdx].caption}"
                </div>

                {/* Sweet Comments Snippet */}
                {feedPosts[storyModalIdx].comments?.length > 0 && (
                  <div
                    className="p-2 rounded-3 mb-2"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontSize: "0.75rem",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <b>{feedPosts[storyModalIdx].comments[0].user}</b>:{" "}
                    {feedPosts[storyModalIdx].comments[0].text}
                  </div>
                )}

                {/* Interactive Reply / Send Love Input Bar */}
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    placeholder="Send a sweet message..."
                    className="form-control rounded-pill border-0 px-3"
                    style={{
                      background: "rgba(255,255,255,0.22)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontFamily: "'Poppins', sans-serif",
                      height: 42,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    className="btn btn-danger rounded-circle p-0 d-flex align-items-center justify-content-center shadow flex-shrink-0"
                    style={{
                      width: 42,
                      height: 42,
                      fontSize: "1.3rem",
                      background: "linear-gradient(135deg, #ff4b72, #ff758c)",
                      border: "none",
                    }}
                    onClick={(e) => handleLike(feedPosts[storyModalIdx].id, e)}
                    aria-label="Send Heart"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Pop Heart Keyframes */}
      <style>{`
        @keyframes popHeart {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Memory;

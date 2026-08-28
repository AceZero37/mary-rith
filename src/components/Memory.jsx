import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AOS from "aos";

// ---- ALL 34 FEED POSTS DATA ----
const initialFeedPosts = [
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
    category: "cozy",
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
    category: "cozy",
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
    category: "milestones",
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
    category: "fun",
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
  {
    id: 12,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/12.jpg",
    location: "Morning Sunlight ☀️",
    likes: 310,
    title: "Morning Smiles & Sunshine ☀️",
    caption: "Waking up knowing that I get to talk to you and see your smile makes every single morning pure happiness. 💛",
    comments: [
      { user: "rith.dev", text: "Your smile is my daily dose of sunshine ☀️💕" }
    ],
    timeAgo: "September 01, 2026",
    category: "cozy",
  },
  {
    id: 13,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/13.jpg",
    location: "Botanical Garden 🌿",
    likes: 295,
    title: "Strolling in the Garden 🌿",
    caption: "Surrounded by hundreds of blooming flowers, but none of them could ever match your natural grace and charm. 🌺",
    comments: [
      { user: "mary.cutie", text: "Aww you always know how to make me blush 🙈💖" }
    ],
    timeAgo: "September 03, 2026",
    category: "dates",
  },
  {
    id: 14,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/14.jpg",
    location: "Sweet Treats Corner 🍦",
    likes: 360,
    title: "Evening Ice Cream Treat 🍦",
    caption: "Sweet strawberry ice cream and an even sweeter boy treating me. Life with you is simply delicious! 🍓",
    comments: [
      { user: "rith.dev", text: "Next time I get the double scoop chocolate 🍫🍨" }
    ],
    timeAgo: "September 05, 2026",
    category: "fun",
  },
  {
    id: 15,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/15.jpg",
    location: "Rooftop Bistro 🕯️",
    likes: 415,
    title: "Rooftop Candlelight Dinner 🕯️",
    caption: "A magical evening under the twinkling candlelight and your sparkling eyes. Every dinner with you feels royal. 🍷",
    comments: [
      { user: "mary.cutie", text: "The most romantic dinner ever with my prince 👑💕" }
    ],
    timeAgo: "September 08, 2026",
    category: "dates",
  },
  {
    id: 16,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/16.jpg",
    location: "Our Cozy Living Room 🌧️",
    likes: 380,
    title: "Rainy Day Snuggles 🌧️",
    caption: "Listening to raindrops tap on the window while wrapped up warm together in our softest blanket. ☕",
    comments: [
      { user: "rith.dev", text: "Rainy days are the best excuse for extra hugs 🤗❤️" }
    ],
    timeAgo: "September 10, 2026",
    category: "cozy",
  },
  {
    id: 17,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/17.jpg",
    location: "Secret Sanctuary 🏰",
    likes: 345,
    title: "Our Little Secret Hideout 🏰",
    caption: "A quiet corner in the world that belongs just to us, filled with whispered dreams and forever promises. 🗝️",
    comments: [
      { user: "mary.cutie", text: "Our sacred happy place forever and ever 💖" }
    ],
    timeAgo: "September 12, 2026",
    category: "trips",
  },
  {
    id: 18,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/18.jpg",
    location: "Sweet Corner 💋",
    likes: 490,
    title: "Stolen Kisses & Giggles 💋",
    caption: "Sneaking a sweet kiss and seeing your cute smile. You make my heart flutter like the first day we met! 💓",
    comments: [
      { user: "rith.dev", text: "I will steal kisses from you every single day 😘💕" }
    ],
    timeAgo: "September 15, 2026",
    category: "cozy",
  },
  {
    id: 19,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/19.jpg",
    location: "Hilltop Horizon 🌄",
    likes: 360,
    title: "Sunset Hilltop View 🌄",
    caption: "Standing at the top of the hill, gazing at the horizon hand in hand. The world is vast, but you are my whole world. 🌍",
    comments: [
      { user: "mary.cutie", text: "Together we can climb any mountain my love 🏔️✨" }
    ],
    timeAgo: "September 18, 2026",
    category: "trips",
  },
  {
    id: 20,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/20.jpg",
    location: "Vintage Bookstore 📚",
    likes: 330,
    title: "Cozy Bookstore Date 📚",
    caption: "Browsing old novels and poetry books together, but our love story is genuinely my favorite masterpiece. 📖",
    comments: [
      { user: "rith.dev", text: "Chapter 1 was amazing, and forever is next ✍️💖" }
    ],
    timeAgo: "September 20, 2026",
    category: "dates",
  },
  {
    id: 21,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/21.jpg",
    location: "Sweet Bakery 🧁",
    likes: 375,
    title: "Baking Sweet Cupcakes 🧁",
    caption: "A little flour on your nose and frosting everywhere — you are the cutest little chef in the world! 🎂",
    comments: [
      { user: "mary.cutie", text: "Hey! You put the flour on my cheek on purpose 😂🧁" }
    ],
    timeAgo: "September 22, 2026",
    category: "fun",
  },
  {
    id: 22,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/22.jpg",
    location: "Midnight Highway 🎵",
    likes: 410,
    title: "Late Night Drive & Music 🎵",
    caption: "Cruising empty city streets with our favorite romantic playlist on repeat. Perfect tranquility with you. 🚗💨",
    comments: [
      { user: "rith.dev", text: "Every song reminded me of you 🎶💙" }
    ],
    timeAgo: "September 25, 2026",
    category: "trips",
  },
  {
    id: 23,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/23.jpg",
    location: "Sandy Shore 🌊",
    likes: 450,
    title: "Beach Walk in the Breeze 🌊",
    caption: "Feeling the gentle ocean breeze and leaving footprints side by side in the soft warm sand. 🏖️",
    comments: [
      { user: "mary.cutie", text: "Let's build a sandcastle next time 🏰🐚" }
    ],
    timeAgo: "September 28, 2026",
    category: "trips",
  },
  {
    id: 24,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/24.jpg",
    location: "Golden Meadow 🌇",
    likes: 520,
    title: "Golden Hour Glow 🌇",
    caption: "The golden sun wrapped around us like liquid amber. Moments like this remind me how blessed we are. ✨",
    comments: [
      { user: "rith.dev", text: "You outshine the golden hour every single time 🌟💖" }
    ],
    timeAgo: "October 01, 2026",
    category: "milestones",
  },
  {
    id: 25,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/25.jpg",
    location: "Goofy Zone 🤪",
    likes: 385,
    title: "Silly Face Challenge 🤪",
    caption: "Never a dull second with my favorite clown! Life is 1000x funnier and brighter whenever we're together. 🤡",
    comments: [
      { user: "mary.cutie", text: "I definitely won this round haha 😂🏆" }
    ],
    timeAgo: "October 04, 2026",
    category: "fun",
  },
  {
    id: 26,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/26.jpg",
    location: "Night Park ⭐",
    likes: 460,
    title: "Stargazing on the Grass ⭐",
    caption: "Lying on the cool grass, pointing at stars, and talking about how our souls were destined to meet. 🌠",
    comments: [
      { user: "rith.dev", text: "Pisces ♓ & Sagittarius ♐ united forever 💙" }
    ],
    timeAgo: "October 07, 2026",
    category: "cozy",
  },
  {
    id: 27,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/27.jpg",
    location: "Special Surprise 🎁",
    likes: 495,
    title: "Our First Gift Exchange 🎁",
    caption: "The pure genuine sparkle in your eyes when unwrapping that little gift. Seeing your joy is my biggest treasure. 🎀",
    comments: [
      { user: "mary.cutie", text: "I still keep it right next to my pillow! 🧸💕" }
    ],
    timeAgo: "October 10, 2026",
    category: "milestones",
  },
  {
    id: 28,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/28.jpg",
    location: "Living Room Floor 💃",
    likes: 540,
    title: "Dancing in the Living Room 💃",
    caption: "Spinning around barefoot, holding on tight, and letting the slow melody carry us away. Pure bliss. 🎶",
    comments: [
      { user: "rith.dev", text: "My favorite dance partner for the rest of my life 🕺💖" }
    ],
    timeAgo: "October 14, 2026",
    category: "dates",
  },
  {
    id: 29,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/29.jpg",
    location: "City Center 👕",
    likes: 430,
    title: "Matching Couple Outfits 👕",
    caption: "Wearing matching hoodies and proud of how cute we look together. Everywhere we go, love is in the air. 👫",
    comments: [
      { user: "mary.cutie", text: "Everyone was turning heads at us! 🥰👗" }
    ],
    timeAgo: "October 18, 2026",
    category: "fun",
  },
  {
    id: 30,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/30.jpg",
    location: "Heart-to-Heart Corner 💬",
    likes: 470,
    title: "Whispering Sweet Nothings 💬",
    caption: "Late night heartfelt talks where we share all our thoughts and remind each other why we love so deeply. 💭",
    comments: [
      { user: "rith.dev", text: "I could listen to your heartbeat forever 💓" }
    ],
    timeAgo: "October 22, 2026",
    category: "cozy",
  },
  {
    id: 31,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/31.jpg",
    location: "Theme Park 🎡",
    likes: 510,
    title: "Amusement Park Adventures 🎡",
    caption: "At the top of the Ferris wheel, looking at the panoramic carnival lights with my forever girl. 🎠",
    comments: [
      { user: "mary.cutie", text: "You held my hand when I got scared on the roller coaster! 🎢🙈" }
    ],
    timeAgo: "October 26, 2026",
    category: "fun",
  },
  {
    id: 32,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/32.jpg",
    location: "Eternal Promise 💍",
    likes: 680,
    title: "Forever Promise Ring 💍",
    caption: "A sacred promise of loyalty, endless laughter, support, and infinite devotion. I choose you every single day. 👑",
    comments: [
      { user: "rith.dev", text: "My heart is sealed with you forever and ever 💍❤️" }
    ],
    timeAgo: "October 30, 2026",
    category: "milestones",
  },
  {
    id: 33,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/33.jpg",
    location: "Memory Lane 🌟",
    likes: 560,
    title: "Golden Memories Collage 🌟",
    caption: "Every single photograph holds a priceless memory of our journey. Looking back makes me fall in love all over again. 🎞️",
    comments: [
      { user: "mary.cutie", text: "So many more beautiful chapters to write together! ✍️💕" }
    ],
    timeAgo: "November 05, 2026",
    category: "dates",
  },
  {
    id: 34,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/34.jpg",
    location: "Our Infinite Universe 💫",
    likes: 750,
    title: "To Infinity & Beyond 💫",
    caption: "Our love story has no final chapter, only endless sweet tomorrows waiting for us. I love you to the moon and back! 🌙✨",
    comments: [
      { user: "rith.dev", text: "To infinity and beyond, my sweet Mary 🚀💖" }
    ],
    timeAgo: "November 10, 2026",
    category: "milestones",
  },
  {
    id: 35,
    author: "Rith",
    handle: "rith.dev",
    avatar: "./assets/images/1.jpg",
    image: "./assets/images/35.jpg",
    location: "Our Happy World 🌈",
    likes: 620,
    title: "Endless Smiles with You 🌈",
    caption: "Every heartbeat beats your name. Thank you for bringing endless color into my world. 🎨",
    comments: [
      { user: "mary.cutie", text: "You are my whole colorful world my love! 🌈💖" }
    ],
    timeAgo: "November 15, 2026",
    category: "cozy",
  },
  {
    id: 36,
    author: "Mary",
    handle: "mary.cutie",
    avatar: "./assets/images/2.jpg",
    image: "./assets/images/36.jpg",
    location: "Forever in Your Arms 💍",
    likes: 880,
    title: "Forever Bound, Never Apart 💍",
    caption: "Two souls locked in eternal harmony. No matter where we go, my heart will always beat right next to yours. 👑✨",
    comments: [
      { user: "rith.dev", text: "Forever and always my queen 👑❤️" }
    ],
    timeAgo: "November 20, 2026",
    category: "milestones",
  },
];

// ---- 12 STORY HIGHLIGHTS ----
const storyHighlights = [
  { id: 1, title: "Our Start", icon: "🌸", image: "./assets/images/1.jpg", color: "#ff69b4" },
  { id: 2, title: "Movie Time", icon: "🍿", image: "./assets/images/2.jpg", color: "#a77dfd" },
  { id: 3, title: "City Glow", icon: "🌃", image: "./assets/images/3.jpg", color: "#ffd700" },
  { id: 4, title: "Picnic Day", icon: "🧺", image: "./assets/images/4.jpg", color: "#00b894" },
  { id: 5, title: "Concerts", icon: "🎶", image: "./assets/images/5.jpg", color: "#ff7675" },
  { id: 6, title: "Road Trips", icon: "🚗", image: "./assets/images/6.jpg", color: "#74b9ff" },
  { id: 7, title: "Cozy Cafe", icon: "☕", image: "./assets/images/7.jpg", color: "#fd79a8" },
  { id: 8, title: "Promises", icon: "💍", image: "./assets/images/8.jpg", color: "#6c5ce7" },
  { id: 9, title: "Beach Sun", icon: "🌅", image: "./assets/images/9.jpg", color: "#e17055" },
  { id: 10, title: "Silly Fun", icon: "📸", image: "./assets/images/10.jpg", color: "#00cec9" },
  { id: 11, title: "Stargazing", icon: "🌌", image: "./assets/images/11.jpg", color: "#9b59b6" },
  { id: 12, title: "Infinity", icon: "💫", image: "./assets/images/36.jpg", color: "#e84393" },
];

const Memory = ({ nightMode }) => {
  const [feedPosts, setFeedPosts] = useState(() => {
    const saved = localStorage.getItem("mary_rith_custom_posts");
    return saved ? JSON.parse(saved) : initialFeedPosts;
  });

  const [activeFilter, setActiveFilter] = useState("all");
  const [likesState, setLikesState] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [doubleTapHeart, setDoubleTapHeart] = useState(null);
  const [storyModalIdx, setStoryModalIdx] = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Add memory modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCategory, setNewCategory] = useState("dates");
  const [newAuthor, setNewAuthor] = useState("Rith");
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(1);

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
  }, [storyModalIdx, isPaused, feedPosts.length]);

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
  }, [storyModalIdx, feedPosts.length]);

  // Handle Add New Custom Memory
  const handleAddNewMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPost = {
      id: Date.now(),
      author: newAuthor,
      handle: newAuthor === "Rith" ? "rith.dev" : "mary.cutie",
      avatar: newAuthor === "Rith" ? "./assets/images/1.jpg" : "./assets/images/2.jpg",
      image: `./assets/images/${selectedPhotoIdx}.jpg`,
      location: newLocation.trim() || "Everywhere Together 💕",
      likes: 99,
      title: newTitle.trim(),
      caption: newCaption.trim() || "Another sweet memory added to our journey of love! ✨",
      comments: [
        {
          user: newAuthor === "Rith" ? "mary.cutie" : "rith.dev",
          text: "I love this memory so much! 🥰💖",
        },
      ],
      timeAgo: "Just now",
      category: newCategory,
    };

    const updated = [newPost, ...feedPosts];
    setFeedPosts(updated);
    localStorage.setItem("mary_rith_custom_posts", JSON.stringify(updated));

    // Reset form
    setNewTitle("");
    setNewCaption("");
    setNewLocation("");
    setShowAddModal(false);
  };

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

  return (
    <div className="container px-2 pb-5 position-relative" data-aos="fade-up">
      {/* Title */}
      <div className="text-center mb-3" style={{ marginTop: 20 }}>
        <span
          style={{
            fontFamily: "'Poppins', 'Montserrat', cursive, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.15rem, 3.8vw, 1.4rem)",
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
          Mary & Rith’s Moments Feed (36 Photos)
          <span>📸</span>
        </span>
        <div
          className="text-center mt-1"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1rem, 2.8vw, 1.22rem)",
            color: nightMode ? "#d6ccff" : "#a8235d",
            opacity: 0.9,
          }}
        >
          ✨ Tap stories to view full-screen • Double tap photos to send love ❤️ • Add custom memories
        </div>
      </div>

      {/* ================= STORY HIGHLIGHTS TRAY ================= */}
      <div
        className="story-highlights-container mx-auto mb-3 py-2 px-3 d-flex align-items-center gap-3"
        style={{
          maxWidth: 980,
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
                maxWidth: 68,
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

      {/* ================= CATEGORY FILTER PILLS & ADD MEMORY BUTTON ================= */}
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 mb-3">
        {[
          { id: "all", label: "🌟 All (36+)" },
          { id: "dates", label: "🍿 Dates" },
          { id: "trips", label: "🚗 Trips" },
          { id: "cozy", label: "💖 Cozy" },
          { id: "fun", label: "🎉 Silly & Fun" },
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

        {/* Add Memory Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-sm rounded-pill px-3 py-1 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #00b894, #00cec9)",
            color: "#fff",
            border: "none",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.72rem, 2vw, 0.82rem)",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span>➕</span> Add Memory
        </button>
      </div>

      {/* ================= MOMENTS FEED GRID (ALL 34 PHOTOS) ================= */}
      <div className="row g-2 g-md-3 justify-content-center mx-auto" style={{ maxWidth: 1080 }}>
        {filteredPosts.map((post, idx) => {
          const isLiked = likesState[post.id]?.liked;
          const currentLikes = likesState[post.id]?.count ?? post.likes;
          const isSaved = savedPosts[post.id];

          return (
            <div
              key={post.id}
              className="col-6 col-md-4 col-lg-4 d-flex justify-content-center p-1 p-md-2"
              data-aos="fade-up"
              data-aos-delay={(idx % 3) * 40}
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
                    #{post.id} ✨
                  </span>
                </div>

                {/* 2. Main Photo with Double-Tap Heart Animation */}
                <div
                  className="position-relative overflow-hidden"
                  style={{
                    height: "clamp(140px, 32vw, 220px)",
                    background: "#111",
                  }}
                  onDoubleClick={(e) => handleDoubleTap(post.id, e)}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
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

      {/* ================= ADD NEW MEMORY MODAL (PORTAL) ================= */}
      {showAddModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="d-flex align-items-center justify-content-center p-3"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(14px)",
              animation: "fadeIn 0.25s ease",
            }}
            onClick={() => setShowAddModal(false)}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 480,
                borderRadius: 24,
                background: nightMode ? "rgba(30, 18, 55, 0.98)" : "rgba(255, 252, 255, 0.98)",
                border: "2px solid #ff69b4",
                boxShadow: "0 20px 60px rgba(255,105,180,0.35)",
                padding: "24px 20px",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  color: "#fff",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

              <h4
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  color: accent,
                  fontSize: "1.2rem",
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                ✨ Add New Memory ✨
              </h4>

              <form onSubmit={handleAddNewMemory}>
                {/* Author Select */}
                <div className="mb-3">
                  <label style={{ fontSize: "0.8rem", color: textColor, fontWeight: 600 }}>
                    Posted By:
                  </label>
                  <div className="d-flex gap-2 mt-1">
                    {["Rith", "Mary"].map((author) => (
                      <button
                        key={author}
                        type="button"
                        onClick={() => setNewAuthor(author)}
                        style={{
                          flex: 1,
                          padding: "6px 12px",
                          borderRadius: 20,
                          border: newAuthor === author ? "2px solid #ff69b4" : "1px solid rgba(255,255,255,0.2)",
                          background: newAuthor === author ? "#ff69b422" : "transparent",
                          color: textColor,
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                        }}
                      >
                        {author === "Rith" ? "💙 Rith" : "💗 Mary"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Selector (1-36) */}
                <div className="mb-3">
                  <label style={{ fontSize: "0.8rem", color: textColor, fontWeight: 600 }}>
                    Choose Photo (1 to 36):
                  </label>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <input
                      type="range"
                      min="1"
                      max="36"
                      value={selectedPhotoIdx}
                      onChange={(e) => setSelectedPhotoIdx(parseInt(e.target.value))}
                      className="form-range flex-grow-1"
                    />
                    <span style={{ fontWeight: 800, color: accent, minWidth: 40 }}>
                      #{selectedPhotoIdx}
                    </span>
                  </div>
                  <div className="text-center mt-2">
                    <img
                      src={`./assets/images/${selectedPhotoIdx}.jpg`}
                      alt="Preview"
                      style={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 14,
                        border: "2px solid #ff69b4",
                      }}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label style={{ fontSize: "0.8rem", color: textColor, fontWeight: 600 }}>
                    Memory Title:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Starry Night Walk ✨"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="form-control mt-1"
                    style={{
                      borderRadius: 14,
                      background: nightMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
                      border: cardBorder,
                      color: textColor,
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                {/* Caption */}
                <div className="mb-3">
                  <label style={{ fontSize: "0.8rem", color: textColor, fontWeight: 600 }}>
                    Romantic Caption:
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Write a sweet quote or memory description..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="form-control mt-1"
                    style={{
                      borderRadius: 14,
                      background: nightMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
                      border: cardBorder,
                      color: textColor,
                      fontSize: "0.88rem",
                    }}
                  />
                </div>

                {/* Location */}
                <div className="mb-3">
                  <label style={{ fontSize: "0.8rem", color: textColor, fontWeight: 600 }}>
                    Location:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Riverside Cafe 🌿"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="form-control mt-1"
                    style={{
                      borderRadius: 14,
                      background: nightMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
                      border: cardBorder,
                      color: textColor,
                      fontSize: "0.88rem",
                    }}
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label style={{ fontSize: "0.8rem", color: textColor, fontWeight: 600 }}>
                    Category:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="form-select mt-1"
                    style={{
                      borderRadius: 14,
                      background: nightMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
                      border: cardBorder,
                      color: textColor,
                      fontSize: "0.88rem",
                    }}
                  >
                    <option value="dates">🍿 Dates</option>
                    <option value="trips">🚗 Trips</option>
                    <option value="cozy">💖 Cozy</option>
                    <option value="fun">🎉 Silly & Fun</option>
                    <option value="milestones">✨ Milestones</option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn w-100 rounded-pill py-2 text-white"
                  style={{
                    background: "linear-gradient(135deg, #ff69b4 0%, #a77dfd 100%)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    border: "none",
                    boxShadow: "0 6px 20px rgba(255,105,180,0.4)",
                  }}
                >
                  💖 Save New Memory
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* ================= FULLSCREEN INSTAGRAM STORY MODAL (PORTAL) ================= */}
      {storyModalIdx !== null &&
        storyModalIdx >= 0 &&
        storyModalIdx < feedPosts.length &&
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
                  {feedPosts.slice(0, 15).map((_, i) => (
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
                style={{
                  position: "absolute",
                  inset: "80px 0 120px 0",
                  zIndex: 8,
                  display: "flex",
                }}
              >
                <div
                  style={{ width: "40%", height: "100%", cursor: "pointer" }}
                  onClick={() => {
                    if (storyModalIdx > 0) setStoryModalIdx((i) => i - 1);
                  }}
                />
                <div
                  style={{ width: "60%", height: "100%", cursor: "pointer" }}
                  onClick={() => {
                    if (storyModalIdx < feedPosts.length - 1) setStoryModalIdx((i) => i + 1);
                    else setStoryModalIdx(null);
                  }}
                />
              </div>

              {/* Story Bottom Caption & Comment Preview */}
              <div
                className="position-relative p-3"
                style={{
                  zIndex: 10,
                  paddingBottom: "max(24px, env(safe-area-inset-bottom, 24px))",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "clamp(1.2rem, 3.5vw, 1.45rem)",
                    color: "#fff",
                    fontWeight: 700,
                    textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                    marginBottom: 6,
                  }}
                >
                  {feedPosts[storyModalIdx].title}
                </div>
                <div
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(0.78rem, 2.2vw, 0.88rem)",
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.4,
                    textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                  }}
                >
                  {feedPosts[storyModalIdx].caption}
                </div>

                {/* Send Heart Reaction in Story */}
                <div className="d-flex align-items-center justify-content-between mt-3 pt-2 border-top border-white border-opacity-25">
                  <div
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.8rem",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    💖 {likesState[feedPosts[storyModalIdx].id]?.count ?? feedPosts[storyModalIdx].likes} loves
                  </div>
                  <button
                    onClick={(e) => handleLike(feedPosts[storyModalIdx].id, e)}
                    className="btn btn-sm rounded-pill px-3 py-1"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.4)",
                      backdropFilter: "blur(6px)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    ❤️ Send Love
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Memory;

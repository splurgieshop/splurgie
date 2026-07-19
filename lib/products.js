// The app uses Supabase as the primary product data source.
// sampleProducts is kept as a fallback reference only.

export const sampleProducts = [
  {
    id: "1",
    name: "CloudStep Air Sneakers",
    price: 129,
    description:
      "Futuristic sneakers that adjust to your mood. Embedded micro-sensors read your emotional state and dynamically reshape the sole for maximum comfort — bouncy when you're happy, cushioned when you're stressed. Walk on clouds, literally.",
    category: "Footwear",
    seller: "cloudwalker",
    badge: "trending",
    gradient:
      "linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #ec4899 100%)",
    reviews: [
      {
        author: "dreamy_dana",
        rating: 5,
        text: "These literally changed my mood when I walk. 10/10 would splurge again.",
      },
      {
        author: "sneakerhead_99",
        rating: 4,
        text: "The mood-adjusting sole is wild. Felt like walking on marshmallows all day.",
      },
      {
        author: "vibes_only",
        rating: 5,
        text: "Got compliments from three strangers. Best fake purchase ever.",
      },
    ],
  },
  {
    id: "2",
    name: "Lunar Brew Pod Machine",
    price: 249,
    description:
      "Brews coffee from moon-harvested beans. Each pod contains beans grown in simulated lunar gravity for a smoother, otherworldly flavor profile. One-touch brewing with holographic cup-size preview.",
    category: "Home & Kitchen",
    seller: "moonbarista",
    badge: "new",
    gradient:
      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
    reviews: [
      {
        author: "caffeine_queen",
        rating: 5,
        text: "Tastes like drinking stardust. My mornings will never be the same.",
      },
      {
        author: "latte_life",
        rating: 4,
        text: "The holographic preview is a nice touch. Coffee hits different.",
      },
      {
        author: "early_bird",
        rating: 5,
        text: "Worth every fake dollar. Moon beans are the future.",
      },
    ],
  },
  {
    id: "3",
    name: "NeuroGlow Face Serum",
    price: 89,
    description:
      "Serum that reads your skin's energy field and adapts its formula in real time. Infused with bio-luminescent peptides that give you a subtle, healthy glow — no filter needed.",
    category: "Beauty",
    seller: "glowgetter",
    badge: "new",
    gradient:
      "linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)",
    reviews: [
      {
        author: "skincare_junkie",
        rating: 5,
        text: "My skin literally glows. People ask what filter I use — it's this serum.",
      },
      {
        author: "beauty_bae",
        rating: 4,
        text: "The energy field reading is so futuristic. Skin feels amazing.",
      },
      {
        author: "glow_up_girl",
        rating: 5,
        text: "Splurgie find of the year. Already added to my wishlist twice.",
      },
    ],
  },
  {
    id: "4",
    name: "HoloDesk Pro",
    price: 1299,
    description:
      "Holographic standing desk for the future office. Projects your workspace into 3D space — organize files, apps, and sticky notes floating around you. Ergonomic, cable-free, and absolutely mesmerizing.",
    category: "Tech",
    seller: "futureoffice",
    badge: "trending",
    gradient:
      "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #7c3aed 100%)",
    reviews: [
      {
        author: "wfh_warrior",
        rating: 5,
        text: "My home office looks like a sci-fi movie now. Productivity through the roof.",
      },
      {
        author: "tech_ceo",
        rating: 4,
        text: "Expensive but worth it for the holographic experience alone.",
      },
      {
        author: "desk_setup",
        rating: 5,
        text: "Everyone on my Zoom calls asks about it. Flex achieved.",
      },
    ],
  },
  {
    id: "5",
    name: "PetaSnack Gourmet Box",
    price: 45,
    description:
      "Monthly snack subscription for interdimensional pets. Curated treats from parallel universes — crunchy nebula bites, quantum kibble, and dimension-hopping jerky. Your pet will thank you (probably).",
    category: "Pets",
    seller: "petdimension",
    badge: "new",
    gradient:
      "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)",
    reviews: [
      {
        author: "cat_mom_3000",
        rating: 5,
        text: "My cat acts like she's from another dimension now. She loves these snacks.",
      },
      {
        author: "dog_dad",
        rating: 4,
        text: "The nebula bites are a hit. Subscription is totally worth it.",
      },
      {
        author: "pet_lover_x",
        rating: 5,
        text: "Best gift for my interdimensional hamster. 5 stars.",
      },
    ],
  },
  {
    id: "6",
    name: "ZenPillow Ultra",
    price: 199,
    description:
      "Pillow that plays ambient soundscapes from inside your dreams. Advanced dream-capture technology records your subconscious soundscapes and replays them for the deepest sleep of your life.",
    category: "Home",
    seller: "dreamweaver",
    badge: "trending",
    gradient:
      "linear-gradient(135deg, #2dd4bf 0%, #14b8a6 50%, #0891b2 100%)",
    reviews: [
      {
        author: "sleepy_head",
        rating: 5,
        text: "I've never slept better. Woke up feeling like I took a vacation.",
      },
      {
        author: "insomnia_no_more",
        rating: 5,
        text: "The dream soundscapes are magical. Life-changing fake purchase.",
      },
      {
        author: "cozy_corner",
        rating: 4,
        text: "Soft, smart, and slightly mystical. Love it.",
      },
    ],
  },
];

export const CATEGORY_GRADIENTS = {
  Fashion: "from-purple-400 to-pink-400",
  "Tech Gadgets": "from-blue-400 to-purple-500",
  Home: "from-green-400 to-teal-500",
  "Food & Drink": "from-orange-400 to-yellow-400",
  Beauty: "from-pink-400 to-rose-500",
  "Weird & Wonderful": "from-indigo-400 to-purple-600",
  "Toys & Games": "from-yellow-400 to-orange-400",
  Pets: "from-amber-400 to-orange-500",
  "Art & Creativity": "from-rose-400 to-violet-500",
  Magical: "from-violet-500 to-cyan-400",
};

export const DEFAULT_REVIEWS = [
  {
    author: "splurgie_fan",
    rating: 5,
    text: "Absolutely love this find. Already telling all my friends about it.",
  },
  {
    author: "happy_shopper",
    rating: 4,
    text: "Great quality for a totally fictional product. Would splurge again.",
  },
  {
    author: "vibes_only",
    rating: 5,
    text: "The dopamine hit was real. 10/10 recommend.",
  },
];

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export function getSellerName(product) {
  return product?.seller_username || product?.seller || "seller";
}

export function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export function productUrl(product) {
  return `/products/${product.slug || product.id}`;
}

export function formatSoldCount(count) {
  if (!count || count < 1) return null;
  if (count >= 10000) return "10,000+ sold";
  if (count >= 5000) return "5,000+ sold";
  if (count >= 1000) return "1,000+ sold";
  if (count >= 500) return "500+ sold";
  if (count >= 100) return "100+ sold";
  if (count >= 50) return "50+ sold";
  if (count >= 5) return "5+ sold";
  return `${count} sold`;
}

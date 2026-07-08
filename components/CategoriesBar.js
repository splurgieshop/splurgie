import Link from "next/link";

const CATEGORIES = [
  { label: "Fashion", emoji: "👗" },
  { label: "Tech Gadgets", emoji: "🔮" },
  { label: "Home", emoji: "🏠" },
  { label: "Food & Drink", emoji: "🍜" },
  { label: "Beauty", emoji: "✨" },
  { label: "Weird & Wonderful", emoji: "🌀" },
  { label: "Toys & Games", emoji: "🎮" },
  { label: "Pets", emoji: "🐾" },
  { label: "Art & Creativity", emoji: "🎨" },
  { label: "Magical", emoji: "🔮" },
];

export default function CategoriesBar() {
  return (
    <div className="border-b border-purple-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={`/products?category=${encodeURIComponent(cat.label)}#products`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-purple-100 bg-purple-50/50 px-4 py-2 text-sm font-semibold text-navy transition hover:border-purple-300 hover:bg-purple-100 hover:text-primary"
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

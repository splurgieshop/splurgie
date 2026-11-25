import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "About Splurgie — The Fake Store With a Real Checkout",
  description:
    "Splurgie is a free fake store where you browse, 'buy' and sell entirely fictional products. All the shopping thrills, zero dollars spent. No credit card needed.",
};

const FAQ_ITEMS = [
  {
    question: "What is Splurgie?",
    answer:
      "Splurgie is a free fake store where users browse, 'buy', and sell entirely fictional products. Every item is invented by the community: no real brands, no real prices, no real deliveries. It recreates the full feeling of online shopping (browsing, carting, checking out, tracking) purely for fun and creativity.",
  },
  {
    question: "Is Splurgie free? Do I need a credit card?",
    answer:
      "Splurgie is completely free. You never need a real credit card or any payment details. At checkout you can type any card number and it all goes through, because no real transaction ever happens. Splurgie is a simulated shopping experience, for entertainment only.",
  },
  {
    question: "What can you do on Splurgie?",
    answer: [
      "Browse 100+ fictional products across 10 categories: Fashion, Tech Gadgets, Home, Food & Drink, Beauty, Weird & Wonderful, Toys & Games, Pets, Art & Creativity, and Magical.",
      "Add items to a cart and go through a full, realistic checkout. No real payment needed.",
      "Track your fictional order as it moves from Processing to Shipped to Out for Delivery to Delivered. It never actually arrives.",
      "Heart products to save them to your wishlist.",
      "Leave star ratings and reviews on anything.",
      "Share products with friends on WhatsApp, Telegram, X, Facebook, or by link.",
      "Create your own listings. Every account is a seller account. Upload an image, write a description, set a price, and publish your product idea.",
      "Check your seller dashboard for revenue, top products, and sales over time.",
    ],
  },
  {
    question: "Can anyone sell on Splurgie?",
    answer:
      "Yes. Every Splurgie account is both a buyer and a seller. Sign up, then create a listing with a name, description, price, category, and an optional image. It goes live instantly. You can see how many 'sales' it gets in your Seller Dashboard.",
  },
  {
    question: "Is my personal information safe on Splurgie?",
    answer:
      "Yes. Splurgie uses secure, industry-standard encryption for account sign-in. We do not collect or store any real payment information — checkout is entirely simulated. We do not share your personal data with third parties. Your account information (username, bio, and location) is used solely to personalise your Splurgie experience.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#7C3AED] to-[#EC4899] px-4 py-20 text-center text-white sm:px-6 lg:px-8">
          <p className="text-5xl">✨</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Welcome to Splurgie. Nothing here is real.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-purple-100">
            The joy of shopping, reimagined. Browse, buy, and sell products
            that don&apos;t exist. No credit card. Ever.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#7C3AED] transition hover:bg-purple-50"
            >
              Start splurging
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full border-2 border-white px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Make an account
            </Link>
          </div>
        </section>

        {/* What is Splurgie */}
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-[#7C3AED]">
            What is Splurgie?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Splurgie is built on one idea: the best part of online shopping
            is the click, not the bill. We rebuilt every dopamine hit (the
            hunt, the cart, the checkout, the tracking) and left out the
            price tag.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Every product is 100% fictional and made up by our community. No
            real brands. Just weird, wonderful, wildly creative stuff dreamed
            up by people like you.
          </p>
        </section>

        {/* How it works */}
        <section className="bg-purple-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-extrabold text-[#7C3AED]">
              How it works
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "🔍",
                  step: "1. Browse",
                  desc: "Scroll 100+ products that shouldn't exist. Fashion, tech, food, beauty, and weirder.",
                },
                {
                  icon: "🛒",
                  step: "2. Add to cart",
                  desc: "Add it to your cart like it's a real shopping app. The app is real. The product isn't.",
                },
                {
                  icon: "💳",
                  step: "3. Fake checkout",
                  desc: "Fill in your details and type any card number. It all goes through. Zero money moves.",
                },
                {
                  icon: "📦",
                  step: "4. Track your nothing",
                  desc: "Watch your package go from Processing to Shipped to Delivered. It never arrives. Pure satisfaction.",
                },
              ].map(({ icon, step, desc }) => (
                <div key={step} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm shadow-purple-100">
                    {icon}
                  </div>
                  <p className="mt-4 font-bold text-navy">{step}</p>
                  <p className="mt-2 text-sm text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sell too */}
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#7C3AED]">
            Everyone sells here, too
          </h2>
          <p className="mt-4 text-slate-600">
            Every account is a buyer and a seller. Make up a product, write a
            description, upload an image, list it. Takes minutes. Then watch
            strangers &ldquo;buy&rdquo; your creation. Best creative outlet you
            didn&apos;t know you needed.
          </p>
          <Link
            href="/create-product"
            className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-8 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            List your first product →
          </Link>
        </section>

        {/* Community rules */}
        <section className="bg-amber-50 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-2xl font-extrabold text-amber-800">
              ⚠️ Community Guidelines
            </h2>
            <p className="mt-3 text-center text-sm text-amber-700">
              Splurgie is a fun, safe space for everyone. To keep it that way,
              all listings must follow these rules:
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "No real-world products or existing brands — everything must be fictional and original.",
                "No offensive, adult, violent, or hateful images or descriptions.",
                "No religion, politics, pornography, or hate speech of any kind.",
                "Listings that violate these rules will be removed without notice.",
              ].map((rule) => (
                <li key={rule} className="flex items-start gap-3 text-sm text-amber-800">
                  <span className="mt-0.5 shrink-0 font-bold">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-[#7C3AED]">
            Questions people ask
          </h2>
          <p className="mt-3 text-center text-slate-500">
            Yes, it&apos;s really fake.
          </p>
          <div className="mt-10 space-y-4">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <details
                key={question}
                className="group rounded-2xl border border-purple-100 bg-white shadow-sm shadow-purple-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-navy marker:hidden">
                  {question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-50 text-primary transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                {Array.isArray(answer) ? (
                  <ul className="space-y-2 px-6 pb-6">
                    {answer.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600">
                    {answer}
                  </p>
                )}
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* JSON-LD FAQ schema for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: {
                "@type": "Answer",
                text: Array.isArray(answer) ? answer.join(" ") : answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}

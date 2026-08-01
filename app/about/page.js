import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "About Splurgie — The Fictional Shopping Platform",
  description:
    "Splurgie is a free social commerce platform where you browse, buy, and sell entirely fictional products. The joy of shopping — with zero dollars spent. No credit card needed.",
};

const FAQ_ITEMS = [
  {
    question: "What is Splurgie?",
    answer:
      "Splurgie is a free social commerce platform where users browse, 'buy', and sell entirely fictional products. Every item on Splurgie is invented by its community — there are no real brands, no real prices, and no real deliveries. It recreates the full emotional experience of online shopping (browsing, carting, checking out, tracking) purely for fun and creativity.",
  },
  {
    question: "Is Splurgie free? Do I need a credit card?",
    answer:
      "Splurgie is completely free. You never need to enter a real credit card or any payment details. When you check out, you can enter any card number — it all goes through because no real transaction ever occurs. Splurgie is a simulated shopping experience for entertainment purposes only.",
  },
  {
    question: "What can you do on Splurgie?",
    answer: [
      "Browse thousands of fictional products across 10 categories: Fashion, Tech Gadgets, Home, Food & Drink, Beauty, Weird & Wonderful, Toys & Games, Pets, Art & Creativity, and Magical.",
      "Add items to a cart and go through a full, realistic checkout flow — no real payment needed.",
      "Track your fictional order in real time as it moves from Processing → Shipped → Out for Delivery → Delivered.",
      "Save products to a personal wishlist and come back to them anytime.",
      "Leave star ratings and written reviews on any product.",
      "Share products with friends via WhatsApp, Telegram, X, Facebook, or a direct link.",
      "Create your own listings — every account is a seller account. Upload an image, write a description, set a price, and publish your fictional product idea for the community to discover.",
      "Track your seller performance in a personal dashboard showing revenue, top products, and sales over time.",
    ],
  },
  {
    question: "Can anyone sell on Splurgie?",
    answer:
      "Yes — every Splurgie account is both a buyer and a seller. Once you sign up, you can immediately create a product listing by giving it a name, description, price, category, and an optional image. Your listing appears on the platform instantly. You can track how many 'sales' your product has received and monitor performance in your personal Seller Dashboard.",
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
            Welcome to Splurgie
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-purple-100">
            The joy of shopping — reimagined. Browse, buy, and sell products
            that don&apos;t exist in the real world. No credit card needed.
            Ever.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#7C3AED] transition hover:bg-purple-50"
            >
              Start Shopping
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full border-2 border-white px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Create an Account
            </Link>
          </div>
        </section>

        {/* What is Splurgie */}
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-[#7C3AED]">
            What is Splurgie?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Splurgie is a social commerce platform built around one simple
            idea: the thrill of online shopping is about the experience, not
            the spending. We&apos;ve recreated every dopamine hit — the hunt,
            the cart, the checkout, the tracking — without the real-world
            price tag.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Every product on Splurgie is 100% fictional and invented by our
            community. You&apos;ll never find a real brand here. Instead,
            you&apos;ll discover weird, wonderful, and wildly creative products
            dreamed up by people just like you.
          </p>
        </section>

        {/* How it works */}
        <section className="bg-purple-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-extrabold text-[#7C3AED]">
              How It Works
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "🔍",
                  step: "1. Browse",
                  desc: "Explore thousands of fictional products across Fashion, Tech, Home, Food, Beauty, and more.",
                },
                {
                  icon: "🛒",
                  step: "2. Add to Cart",
                  desc: "Found something you love? Add it to your cart just like any real shopping app.",
                },
                {
                  icon: "💳",
                  step: "3. Fake Checkout",
                  desc: "Fill in your details, enter any card number — it all goes through. Zero real money changes hands.",
                },
                {
                  icon: "📦",
                  step: "4. Track Your Order",
                  desc: "Watch your fictional package move through Processing → Shipped → Delivered. Pure satisfaction.",
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
            Everyone&apos;s a Seller Too
          </h2>
          <p className="mt-4 text-slate-600">
            Every Splurgie account is both buyer and seller. Dream up a product,
            write a description, upload an image, and list it — in minutes.
            Watch the community discover and &ldquo;buy&rdquo; your creation.
            It&apos;s the creative outlet you never knew you needed.
          </p>
          <Link
            href="/create-product"
            className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-8 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            List Your First Product →
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
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-center text-slate-500">
            Everything you need to know about Splurgie.
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

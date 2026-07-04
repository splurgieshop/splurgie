import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Splurgie",
  description:
    "Splurgie is a social commerce platform where you browse, buy, and sell entirely fictional products. The joy of shopping — with zero dollars spent.",
};

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

        {/* Disclaimer */}
        <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400">
            🛍️ Splurgie is a simulated shopping platform. No real transactions
            occur. No real products are sold or delivered. All purchases are
            fictional and for entertainment purposes only.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

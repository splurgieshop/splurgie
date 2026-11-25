import Link from "next/link";
import Header from "@/components/Header";
import HeroCheckout from "@/components/home/HeroCheckout";
import Marquee from "@/components/home/Marquee";
import TrendingNonsense from "@/components/home/TrendingNonsense";
import TopCreators from "@/components/home/TopCreators";

export default function Home() {
  return (
    <>
      <Header variant="dark" />

      <main className="hm">
        {/* ── HERO ── */}
        <div className="hm-wrap hm-hero">
          <div>
            <h1>
              Retail therapy. <em>Zero</em> <i>regrets.</i>
            </h1>
            <p className="hm-sub">
              Splurgie is a fake store with a checkout that hits for real. Buy
              ridiculous things for $0 and get a tracking number for a package
              that will never arrive.
            </p>
            <div className="hm-cta">
              <Link href="/products" className="hm-btn hm-b1">
                Start splurging
              </Link>
              <Link href="/create-product" className="hm-btn hm-b2">
                Sell your nonsense
              </Link>
            </div>
            <p className="hm-note">
              No card. No account to browse. Nothing ships. Ever.
            </p>
          </div>

          <HeroCheckout />
        </div>

        <Marquee />

        {/* ── TRENDING ── */}
        <TrendingNonsense />

        {/* ── SELL + CREATORS ── */}
        <section className="hm-sec" style={{ paddingTop: 0 }}>
          <div className="hm-wrap">
            <div className="hm-sell">
              <div>
                <h2>Got a dumb idea? Perfect.</h2>
                <p>
                  List it in 60 seconds. Strangers will &ldquo;buy&rdquo; it and
                  you&apos;ll get a ping every time.
                </p>
                <Link href="/create-product" className="hm-btn">
                  Start selling
                </Link>
              </div>
              <div className="hm-stk" aria-hidden="true">
                <span>Sock Locator</span>
                <span>CEO Cardigan</span>
                <span>Crashout Journal</span>
                <span>Delulu Glasses</span>
                <span>yours?</span>
              </div>
            </div>

            <TopCreators />
          </div>
        </section>
      </main>
    </>
  );
}

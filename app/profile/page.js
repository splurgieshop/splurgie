"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { fetchProductsByIds } from "@/lib/fetchProducts";
import { formatPrice } from "@/lib/products";
import { primaryButtonClass } from "@/lib/ui";

const TABS = ["My Orders", "My Listings", "Wishlist"];

const fakeOrders = [
  {
    orderNumber: "48291037",
    dateLabel: "2 weeks ago",
    name: "CloudStep Air Sneakers",
    price: 129,
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #ec4899 100%)",
  },
  {
    orderNumber: "71938462",
    dateLabel: "1 month ago",
    name: "NeuroGlow Face Serum",
    price: 89,
    gradient: "linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)",
  },
  {
    orderNumber: "30581749",
    dateLabel: "2 months ago",
    name: "ZenPillow Ultra",
    price: 199,
    gradient: "linear-gradient(135deg, #2dd4bf 0%, #14b8a6 50%, #0891b2 100%)",
  },
];

const fakeListings = [
  {
    id: "listing-1",
    name: "GlowPod Mini Speaker",
    price: 75,
    sales: 12,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  },
  {
    id: "listing-2",
    name: "DreamWeave Blanket",
    price: 149,
    sales: 5,
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
  },
];

function getInitials(user) {
  const name =
    user?.user_metadata?.username || user?.email?.split("@")[0] || "U";
  return name.slice(0, 2).toUpperCase();
}

function getUsername(user) {
  return user?.user_metadata?.username || user?.email || "User";
}

function getMemberSince(user) {
  if (!user?.created_at) return "Recently";
  return new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { wishlist, removeFromWishlist } = useCart();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("My Orders");

  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadWishlist() {
      if (wishlist.length === 0) {
        setWishlistProducts([]);
        return;
      }
      try {
        const products = await fetchProductsByIds(wishlist);
        setWishlistProducts(products);
      } catch {
        setWishlistProducts([]);
      }
    }

    loadWishlist();
  }, [wishlist]);

  if (loading || !user) {
    return (
      <>
        <Header />
        <main className="mx-auto flex max-w-7xl flex-1 items-center justify-center px-4 py-20">
          <p className="text-slate-500">Loading profile...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <section className="rounded-2xl bg-white p-8 shadow-md shadow-purple-100/50">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-2xl font-bold text-white shadow-lg">
              {getInitials(user)}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="page-heading text-3xl">@{getUsername(user)}</h1>
              <p className="mt-1 text-slate-500">
                Splurgie member since {getMemberSince(user)}
              </p>
              <div className="mt-6 flex justify-center gap-8 sm:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-primary">12</p>
                  <p className="text-sm text-slate-500">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-primary">3</p>
                  <p className="text-sm text-slate-500">Listings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-primary">8</p>
                  <p className="text-sm text-slate-500">Wishlisted</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="rounded-xl border-2 border-purple-200 px-6 py-2.5 text-sm font-bold text-primary transition hover:border-purple-400 hover:bg-purple-50"
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* Tabs */}
        <div className="mt-10 border-b border-gray-200">
          <nav className="flex gap-8">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition ${
                  activeTab === tab
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "My Orders" && (
            <div className="space-y-4">
              {fakeOrders.map((order) => (
                  <article
                    key={order.orderNumber}
                    className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-md shadow-purple-100/50 sm:flex-row sm:items-center"
                  >
                    <ProductImage
                      product={order}
                      className="h-24 w-24 shrink-0 rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-navy">{order.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Order #{order.orderNumber} · {order.dateLabel}
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-primary">
                        {formatPrice(order.price)}
                      </p>
                    </div>
                    <Link
                      href="/tracking"
                      className={`${primaryButtonClass} shrink-0 rounded-xl px-6 py-2.5 text-sm`}
                    >
                      View Tracking
                    </Link>
                  </article>
                ))}
            </div>
          )}

          {activeTab === "My Listings" && (
            <div>
              <Link
                href="/create-product"
                className={`${primaryButtonClass} mb-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm`}
              >
                Create New Listing +
              </Link>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {fakeListings.map((listing) => (
                  <article
                    key={listing.id}
                    className="overflow-hidden rounded-2xl bg-white shadow-md shadow-purple-100/50"
                  >
                    <ProductImage
                      product={listing}
                      className="aspect-video"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-navy">{listing.name}</h3>
                      <p className="mt-1 text-xl font-extrabold text-primary">
                        {formatPrice(listing.price)}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {listing.sales} sales
                      </p>
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          className="flex-1 rounded-xl border-2 border-purple-200 py-2 text-sm font-bold text-primary transition hover:bg-purple-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="flex-1 rounded-xl border-2 border-red-200 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Wishlist" && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 py-16 text-center">
                  <span className="text-5xl">💜</span>
                  <p className="mt-4 font-bold text-navy">
                    Your wishlist is empty
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Heart some products to save them here
                  </p>
                  <Link
                    href="/products"
                    className={`${primaryButtonClass} mt-6 inline-block rounded-xl px-8 py-3 text-sm`}
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {wishlistProducts.map((product) => (
                    <div key={product.id} className="relative">
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-lg font-bold text-slate-500 shadow-md transition hover:bg-red-50 hover:text-red-500"
                        aria-label="Remove from wishlist"
                      >
                        ×
                      </button>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

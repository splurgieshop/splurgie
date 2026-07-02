"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { CATEGORY_GRADIENTS } from "@/lib/products";
import { inputClass, primaryButtonClass } from "@/lib/ui";

const CATEGORIES = [
  "Fashion",
  "Tech Gadgets",
  "Home",
  "Food & Drink",
  "Beauty",
  "Weird & Wonderful",
];

export default function CreateProductPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: CATEGORIES[0],
  });

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const sellerUsername =
      user.user_metadata?.username || user.email?.split("@")[0] || user.email;

    const { error: insertError } = await supabase.from("products").insert({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      seller_id: user.id,
      seller_username: sellerUsername,
      gradient: CATEGORY_GRADIENTS[form.category] || CATEGORY_GRADIENTS.Fashion,
    });

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    router.push("/products");
  }

  if (loading || !user) {
    return (
      <>
        <Header />
        <main className="mx-auto flex max-w-7xl flex-1 items-center justify-center px-4 py-20">
          <p className="text-slate-500">Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/profile"
          className="mb-6 inline-block text-sm font-bold text-primary hover:text-accent"
        >
          ← Back to profile
        </Link>
        <h1 className="page-heading text-3xl sm:text-4xl">
          Create New Listing
        </h1>
        <p className="mt-2 text-slate-500">
          List a fictional product for the Splurgie community
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50 sm:p-8"
        >
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-bold text-navy"
            >
              Product Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="CloudStep Air Sneakers"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-bold text-navy"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Describe your imaginary product..."
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-1 block text-sm font-bold text-navy"
            >
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="1"
              className={inputClass}
              placeholder="99"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-bold text-navy"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-navy">
              Product Image
            </label>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/50 px-6 py-12 text-center transition hover:border-purple-400">
              <span className="text-3xl">📷</span>
              <p className="mt-2 text-sm font-semibold text-primary">
                Click to upload
              </p>
              <p className="mt-1 text-xs text-slate-400">
                PNG, JPG up to 5MB (coming soon)
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`${primaryButtonClass} w-full rounded-xl py-3.5 text-sm disabled:opacity-60`}
          >
            {submitting ? "Listing..." : "List My Product"}
          </button>
        </form>
      </main>
    </>
  );
}

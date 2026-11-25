"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { fetchReviewsByProduct } from "@/lib/fetchProducts";
import StarRating from "@/components/StarRating";
import { inputClass, primaryButtonClass } from "@/lib/ui";

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition hover:scale-110"
          aria-label={`${star} star`}
        >
          <svg
            className={`h-7 w-7 ${star <= (hovered || value) ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const hasReviewed = user && reviews.some((r) => r.user_id === user.id);

  useEffect(() => {
    fetchReviewsByProduct(productId)
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [productId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!rating) { setError("Pick a star rating first."); return; }
    if (!text.trim()) { setError("Write something first."); return; }
    setError("");
    setSubmitting(true);

    const username =
      user.user_metadata?.username || user.email?.split("@")[0] || "user";

    const { data, error: insertError } = await supabase
      .from("reviews")
      .insert({
        product_id: productId,
        user_id: user.id,
        username,
        rating,
        text: text.trim(),
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    setReviews((prev) => [data, ...prev]);
    setRating(0);
    setText("");
    setSubmitting(false);
  }

  return (
    <section className="mt-16">
      <h2 className="page-heading text-2xl">
        What people are saying
        {reviews.length > 0 && (
          <span className="ml-2 text-lg font-medium text-slate-400">
            ({reviews.length})
          </span>
        )}
      </h2>

      {/* Review form */}
      {user && !hasReviewed && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-purple-100 bg-purple-50/40 p-5"
        >
          <p className="mb-3 text-sm font-bold text-navy">Leave a review</p>
          <StarPicker value={rating} onChange={setRating} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Say something about this thing that doesn't exist…"
            className={`${inputClass} mt-3 resize-none text-sm`}
          />
          {error && (
            <p className="mt-2 text-xs font-medium text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className={`${primaryButtonClass} mt-3 rounded-xl px-6 py-2.5 text-sm disabled:opacity-60`}
          >
            {submitting ? "Posting…" : "Post review"}
          </button>
        </form>
      )}

      {!user && (
        <p className="mt-4 text-sm text-slate-500">
          <a href="/auth/login" className="font-bold text-primary hover:underline">Sign in</a> to leave a review.
        </p>
      )}

      {hasReviewed && (
        <p className="mt-4 text-sm font-medium text-green-600">✓ You&apos;ve reviewed this product.</p>
      )}

      {/* Reviews list */}
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl bg-white py-12 text-center shadow-md shadow-purple-100/50">
            <span className="text-4xl">💬</span>
            <p className="mt-3 font-bold text-navy">No reviews yet</p>
            <p className="mt-1 text-sm text-slate-500">Be the first to review something that doesn&apos;t exist.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl bg-white p-5 shadow-md shadow-purple-100/50"
              >
                <StarRating rating={review.rating} />
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-3 text-sm font-bold text-accent">
                  @{review.username}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

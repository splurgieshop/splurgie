"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const REASONS = [
  "Inappropriate content",
  "Spam or misleading",
  "Hateful or offensive",
  "Intellectual property violation",
  "Other",
];

export default function ReportButton({ product }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function handleOpen() {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setDone(false);
    setError("");
    setNote("");
    setReason(REASONS[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: dbError } = await supabase.from("reports").insert({
      product_id: product.id,
      reporter_id: user.id,
      reason,
      note: note.trim() || null,
    });

    if (dbError) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    // Notify the seller if they have an account (seller_id set)
    if (product.seller_id) {
      await supabase.from("notifications").insert({
        user_id: product.seller_id,
        message: `⚠️ Your listing "${product.name}" has been reported. Please review it — listings that violate our community guidelines may be removed.`,
      });
    }

    setDone(true);
    setSubmitting(false);
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={handleOpen}
        className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-red-500"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
        Report this listing
      </button>

      {/* Modal backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {done ? (
              <div className="py-4 text-center">
                <span className="text-4xl">✅</span>
                <h2 className="mt-3 text-lg font-extrabold text-navy">Report received</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Thanks for flagging this. We'll review it shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-5 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-purple-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-navy">Report listing</h2>
                  <button onClick={handleClose} className="text-slate-400 hover:text-slate-600" aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Help us keep Splurgie safe by reporting listings that violate our guidelines.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {error && (
                    <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{error}</p>
                  )}

                  <div>
                    <label className="mb-1 block text-sm font-bold text-navy">Reason</label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-navy focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      {REASONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold text-navy">
                      Additional details <span className="font-normal text-slate-400">(optional)</span>
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      placeholder="Anything else we should know…"
                      className="w-full resize-none rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 rounded-xl border border-purple-200 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-purple-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-60"
                    >
                      {submitting ? "Submitting…" : "Submit Report"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

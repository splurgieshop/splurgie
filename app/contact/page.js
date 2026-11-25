"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { inputClass, primaryButtonClass } from "@/lib/ui";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.message.trim()) {
      setError("Write a message first.");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("feedback").insert({
      name: form.name.trim() || null,
      email: form.email.trim() || null,
      message: form.message.trim(),
    });
    if (dbError) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-bold text-primary hover:text-accent"
        >
          ← Back to Splurgie
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-md shadow-purple-100/50 sm:p-10">
          {submitted ? (
            <div className="py-8 text-center">
              <span className="text-5xl">💌</span>
              <h1 className="page-heading mt-4 text-2xl">Message received. Thanks!</h1>
              <p className="mt-3 text-slate-500">
                We've received your message and will get back to you soon.
              </p>
              <Link
                href="/products"
                className={`${primaryButtonClass} mt-8 inline-block rounded-xl px-8 py-3 text-sm`}
              >
                Back to the nonsense
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <span className="text-4xl">✉️</span>
                <h1 className="page-heading mt-3 text-2xl">Talk to us</h1>
                <p className="mt-2 text-slate-500">
                  Got an idea, found a bug, or just want to say hi? We read
                  every message.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-bold text-navy">
                    Name <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-bold text-navy">
                    Email <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-bold text-navy">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Feedback, ideas, bug reports, or just a hello…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`${primaryButtonClass} w-full rounded-xl py-3 text-sm disabled:opacity-60`}
                >
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>

              {/* Also find us */}
              <div className="mt-8 border-t border-purple-50 pt-6 text-center">
                <p className="text-sm text-slate-400">
                  You can also find us on Instagram{" "}
                  <a
                    href="https://instagram.com/splurgie.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    @splurgie.shop
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

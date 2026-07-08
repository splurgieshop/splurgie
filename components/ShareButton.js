"use client";

import { useState, useEffect, useRef } from "react";

const SHARE_OPTIONS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    emoji: "💬",
    getUrl: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  },
  {
    key: "telegram",
    label: "Telegram",
    emoji: "✈️",
    getUrl: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    key: "twitter",
    label: "X / Twitter",
    emoji: "🐦",
    getUrl: (url, text) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    key: "facebook",
    label: "Facebook",
    emoji: "👤",
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
];

export default function ShareButton({ product }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function getShareUrl() {
    return typeof window !== "undefined" ? window.location.href : "";
  }

  async function handleNativeShare() {
    const url = getShareUrl();
    const text = `Check out ${product.name} on Splurgie ✨`;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url });
        return;
      } catch {
        // user cancelled or unsupported — fall through to dropdown
      }
    }
    setOpen((v) => !v);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  function openShareWindow(url) {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
    setOpen(false);
  }

  const shareUrl = getShareUrl();
  const shareText = `Check out ${product.name} on Splurgie ✨`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={handleNativeShare}
        className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-purple-100 bg-white shadow-sm transition hover:border-primary hover:bg-purple-50"
        aria-label="Share product"
        title="Share"
      >
        <svg
          className="h-5 w-5 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-xl shadow-purple-200/40">
          {/* Copy link */}
          <button
            type="button"
            onClick={copyLink}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-navy transition hover:bg-purple-50"
          >
            <span className="text-base">{copied ? "✅" : "🔗"}</span>
            {copied ? "Copied!" : "Copy link"}
          </button>

          <div className="mx-4 border-t border-purple-50" />

          {SHARE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => openShareWindow(opt.getUrl(shareUrl, shareText))}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-navy transition hover:bg-purple-50"
            >
              <span className="text-base">{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

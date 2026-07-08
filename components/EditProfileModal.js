"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { inputClass, primaryButtonClass } from "@/lib/ui";

export default function EditProfileModal({ user, onClose, onSaved }) {
  const [form, setForm] = useState({
    username: user?.user_metadata?.username || user?.email?.split("@")[0] || "",
    bio: user?.user_metadata?.bio || "",
    location: user?.user_metadata?.location || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Close on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.username.trim()) {
      setError("Username cannot be empty.");
      return;
    }
    if (form.username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      setError("Username can only contain letters, numbers, and underscores.");
      return;
    }

    setSaving(true);

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        username: form.username.trim(),
        bio: form.bio.trim(),
        location: form.location.trim(),
      },
    });

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    onSaved({
      username: form.username.trim(),
      bio: form.bio.trim(),
      location: form.location.trim(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl shadow-purple-200/40 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="page-heading text-xl">Edit Profile</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-bold text-navy">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">@</span>
              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                maxLength={30}
                className={`${inputClass} pl-7`}
                placeholder="yourname"
              />
            </div>
            <p className="mt-1 text-xs text-slate-400">Letters, numbers, underscores only. Min 3 characters.</p>
          </div>

          <div>
            <label htmlFor="bio" className="mb-1 block text-sm font-bold text-navy">
              Bio <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              maxLength={160}
              className={`${inputClass} resize-none`}
              placeholder="Tell the Splurgie community a little about yourself..."
            />
            <p className="mt-1 text-right text-xs text-slate-400">{form.bio.length}/160</p>
          </div>

          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-bold text-navy">
              Location <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              maxLength={60}
              className={inputClass}
              placeholder="e.g. London, Tokyo, The Moon"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border-2 border-purple-200 py-3 text-sm font-bold text-primary transition hover:bg-purple-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`${primaryButtonClass} flex-1 rounded-xl py-3 text-sm disabled:opacity-60`}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

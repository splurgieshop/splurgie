"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!userId) return;
    fetchNotifications();
  }, [userId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function fetchNotifications() {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);
    setNotifications(data || []);
  }

  async function handleOpen() {
    setOpen((prev) => !prev);
    if (!open && unread > 0) {
      // Mark all as read
      await supabase
        .from("notifications")
        .update({ read: true })
        .eq("user_id", userId)
        .eq("read", false);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  }

  function timeAgo(dateStr) {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleOpen}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50"
        aria-label="Notifications"
      >
        <svg className="h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EC4899] text-xs font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-xl shadow-purple-100/50">
          <div className="border-b border-purple-100 px-4 py-3">
            <p className="text-sm font-extrabold text-navy">Notifications</p>
          </div>
          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <span className="text-3xl">🔔</span>
              <p className="mt-2 text-sm text-slate-500">No notifications yet</p>
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-purple-50">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`px-4 py-3 ${!n.read ? "bg-purple-50/60" : ""}`}
                >
                  <p className="text-sm text-navy">{n.message}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{timeAgo(n.created_at)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

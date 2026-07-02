"use client";

import Link from "next/link";
import { useMemo } from "react";
import { primaryButtonClass } from "@/lib/ui";

function randomDigits(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

function getDeliveryDate() {
  const days = 5 + Math.floor(Math.random() * 3);
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ConfirmationContent() {
  const orderNumber = useMemo(() => randomDigits(8), []);
  const trackingNumber = useMemo(
    () => `SPG${randomDigits(10).toUpperCase()}`,
    []
  );
  const deliveryDate = useMemo(() => getDeliveryDate(), []);

  return (
    <div className="mx-auto max-w-lg py-12 text-center">
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg shadow-purple-200/50">
        <span className="text-6xl">🎉</span>
      </div>

      <h1 className="page-heading mt-6 text-3xl sm:text-5xl">
        Your order is on its way!
      </h1>
      <p className="mt-3 font-medium text-slate-500">
        Congratulations on the most satisfying fake purchase of your life.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 text-left shadow-md shadow-purple-100/50">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Order Number</span>
          <span className="font-mono font-extrabold text-navy">
            #{orderNumber}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Tracking Number</span>
          <span className="font-mono font-extrabold text-primary">
            {trackingNumber}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Estimated Delivery</span>
          <span className="font-bold text-navy">{deliveryDate}</span>
        </div>
      </div>

      <p className="mt-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-lg font-extrabold text-transparent">
        Splurge freely. Spend nothing. Feel everything. ✨
      </p>

      <Link
        href="/tracking"
        className={`${primaryButtonClass} mt-8 inline-block rounded-xl px-8 py-3.5 text-sm`}
      >
        Track My Order
      </Link>

      <Link
        href="/products"
        className="mt-4 block text-sm font-bold text-primary hover:text-accent"
      >
        Keep shopping →
      </Link>
    </div>
  );
}

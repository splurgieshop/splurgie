"use client";

import Link from "next/link";
import { useMemo } from "react";

const stages = [
  { key: "placed", label: "Order Placed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

const CURRENT_STAGE = 2;

function getDeliveryDate() {
  const days = 6;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function TrackingContent() {
  const trackingNumber = useMemo(
    () => `SPG${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
    []
  );
  const deliveryDate = useMemo(() => getDeliveryDate(), []);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Carrier</p>
            <p className="font-extrabold text-navy">Splurgie Express ✈️</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-500">Tracking #</p>
            <p className="font-mono text-sm font-extrabold text-primary">
              {trackingNumber}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="relative flex justify-between">
            <div className="absolute left-0 right-0 top-4 h-1.5 rounded-full bg-purple-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{
                  width: `${(CURRENT_STAGE / (stages.length - 1)) * 100}%`,
                }}
              />
            </div>
            {stages.map((stage, index) => (
              <div
                key={stage.key}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    index <= CURRENT_STAGE
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
                      : "border-2 border-purple-100 bg-white text-slate-400"
                  }`}
                >
                  {index <= CURRENT_STAGE ? "✓" : index + 1}
                </div>
                <span
                  className={`mt-2 hidden text-center text-xs sm:block ${
                    index === CURRENT_STAGE
                      ? "font-extrabold text-primary"
                      : index < CURRENT_STAGE
                        ? "font-medium text-navy"
                        : "text-slate-400"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-extrabold text-primary sm:hidden">
            Current status: {stages[CURRENT_STAGE].label}
          </p>
        </div>

        <div className="mt-8 space-y-3 border-t border-purple-100 pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <span className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-extrabold text-primary">
              {stages[CURRENT_STAGE].label}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Estimated Delivery</span>
            <span className="font-bold text-navy">{deliveryDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Last Update</span>
            <span className="max-w-[60%] text-right text-navy">
              Package departed Splurgie Fulfillment Center, Dreamville
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Origin</span>
            <span className="text-navy">
              Splurgie HQ, Imagination District
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">
        Remember: this shipment is 100% fictional. But the dopamine is very real.
      </p>

      <div className="mt-6 text-center">
        <Link
          href="/products"
          className="text-sm font-bold text-primary hover:text-accent"
        >
          ← Back to shopping
        </Link>
      </div>
    </div>
  );
}

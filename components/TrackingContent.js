"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ORDER_STAGES, getOrderStageIndex } from "@/lib/orderStatus";

export default function TrackingContent() {
  const params = useSearchParams();

  const trackingNumber = useMemo(
    () => params.get("tracking") || `SPG${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const createdAt = params.get("created") || null;
  const origin = params.get("origin") || null;

  const currentStage = getOrderStageIndex(createdAt);

  const deliveryDate = useMemo(() => {
    const base = createdAt ? new Date(createdAt) : new Date();
    base.setDate(base.getDate() + 6);
    return base.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [createdAt]);

  const lastUpdate = useMemo(() => {
    if (currentStage === 1) return "Order received and being prepared for shipment";
    if (currentStage === 2) return "Package departed Splurgie Fulfillment Center";
    if (currentStage === 3) return "Package out for delivery in your area";
    if (currentStage >= 4) return "Package delivered to your address";
    return "Order placed successfully";
  }, [currentStage]);

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
                  width: `${(currentStage / (ORDER_STAGES.length - 1)) * 100}%`,
                }}
              />
            </div>
            {ORDER_STAGES.map((stage, index) => (
              <div
                key={stage.key}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    index <= currentStage
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
                      : "border-2 border-purple-100 bg-white text-slate-400"
                  }`}
                >
                  {index <= currentStage ? "✓" : index + 1}
                </div>
                <span
                  className={`mt-2 hidden text-center text-xs sm:block ${
                    index === currentStage
                      ? "font-extrabold text-primary"
                      : index < currentStage
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
            Current status: {ORDER_STAGES[currentStage].label}
          </p>
        </div>

        <div className="mt-8 space-y-3 border-t border-purple-100 pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <span className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-extrabold text-primary">
              {ORDER_STAGES[currentStage].label}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Estimated Delivery</span>
            <span className="font-bold text-navy">{deliveryDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Last Update</span>
            <span className="max-w-[60%] text-right text-navy">{lastUpdate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Ships From</span>
            <span className="text-navy">
              {origin || "Splurgie HQ, Imagination District"}
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

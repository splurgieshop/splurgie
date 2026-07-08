"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { fetchProductsByIds } from "@/lib/fetchProducts";
import { supabase } from "@/lib/supabase";
import OrderSummary from "@/components/OrderSummary";
import { inputClass } from "@/lib/ui";

function randomDigits(length) {
  let result = "";
  for (let i = 0; i < length; i++) result += Math.floor(Math.random() * 10);
  return result;
}

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const orderNumber = randomDigits(8);
      const trackingNumber = `SPG${randomDigits(10)}`;

      // Fetch product details for cart items
      const ids = [...new Set(cart.map((item) => item.productId))];
      const products = await fetchProductsByIds(ids);
      const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

      const items = cart
        .map((item) => {
          const p = productMap[item.productId];
          if (!p) return null;
          return { id: p.id, name: p.name, price: p.price, image_url: p.image_url, gradient: p.gradient, quantity: item.quantity, location: p.location || null };
        })
        .filter(Boolean);

      const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const total = subtotal + (subtotal > 0 ? 9.99 : 0);

      if (user) {
        await supabase.from("orders").insert({
          user_id: user.id,
          order_number: orderNumber,
          tracking_number: trackingNumber,
          items,
          total,
          status: "Processing",
        });
      }

      // Increment sold counts atomically
      await Promise.all(
        items.map((item) =>
          supabase.rpc("increment_sold_count", { p_id: item.id, amount: item.quantity })
        )
      );

      // Notify sellers
      const sellerNotifications = items
        .map((item) => {
          const p = productMap[item.id];
          if (!p?.seller_id) return null;
          const qty = item.quantity > 1 ? `${item.quantity}x ` : "";
          return {
            user_id: p.seller_id,
            message: `🛍️ Someone bought ${qty}your "${item.name}"!`,
            product_name: item.name,
          };
        })
        .filter(Boolean);

      if (sellerNotifications.length > 0) {
        await supabase.from("notifications").insert(sellerNotifications);
      }

      const origin = items[0]?.location || "";
      const created = new Date().toISOString();
      clearCart();
      router.push(`/confirmation?order=${orderNumber}&tracking=${trackingNumber}&total=${total.toFixed(2)}&created=${encodeURIComponent(created)}&origin=${encodeURIComponent(origin)}`);
    } catch {
      // Still complete the checkout even if save fails
      clearCart();
      router.push("/confirmation");
    }
  }

  return (
    <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-3" aria-busy={submitting}>
      <div className="space-y-8 lg:col-span-2">
        <section className="rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50">
          <h2 className="page-heading text-lg">Shipping Details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="mb-1 block text-sm font-bold text-navy"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="mb-1 block text-sm font-bold text-navy"
                >
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50">
          <h2 className="page-heading text-lg">Payment Details</h2>
          <p className="mt-1 text-xs font-medium text-slate-400">
            Any input works — this is all pretend 💜
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="cardNumber"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                className={inputClass}
                placeholder="4242 4242 4242 4242"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="expiry"
                  className="mb-1 block text-sm font-bold text-navy"
                >
                  Expiry
                </label>
                <input
                  id="expiry"
                  type="text"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="mb-1 block text-sm font-bold text-navy"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-slate-400">
          This is a simulated purchase — no real transaction occurs. Welcome to
          Splurgie.
        </p>
      </div>

      <div>
        <div className="sticky top-24">
          <OrderSummary showPlaceOrderButton />
        </div>
      </div>
    </form>
  );
}

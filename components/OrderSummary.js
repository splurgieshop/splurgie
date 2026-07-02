"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { fetchProductsByIds } from "@/lib/fetchProducts";
import { formatPrice } from "@/lib/products";
import { primaryButtonClass } from "@/lib/ui";

export default function OrderSummary({
  showCheckoutButton = false,
  showPlaceOrderButton = false,
}) {
  const { cart } = useCart();
  const [productMap, setProductMap] = useState({});

  useEffect(() => {
    async function loadProducts() {
      if (cart.length === 0) {
        setProductMap({});
        return;
      }

      try {
        const ids = [...new Set(cart.map((item) => item.productId))];
        const products = await fetchProductsByIds(ids);
        setProductMap(
          Object.fromEntries(products.map((product) => [product.id, product]))
        );
      } catch {
        setProductMap({});
      }
    }

    loadProducts();
  }, [cart]);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = productMap[item.productId];
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    [cart, productMap]
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50">
      <h2 className="page-heading text-lg">Order Summary</h2>

      {cartItems.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mt-4 space-y-3 border-b border-purple-100 pb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-600">
                  {item.name}{" "}
                  <span className="text-slate-400">× {item.quantity}</span>
                </span>
                <span className="font-bold text-navy">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Subtotal</dt>
              <dd className="font-bold text-navy">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Shipping</dt>
              <dd className="font-bold text-navy">{formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-purple-100 pt-2 text-base">
              <dt className="font-extrabold text-navy">Total</dt>
              <dd className="font-extrabold text-primary">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>

          {showCheckoutButton && cartItems.length > 0 && (
            <Link
              href="/checkout"
              className={`${primaryButtonClass} mt-6 block w-full rounded-xl py-3 text-center text-sm`}
            >
              Proceed to Checkout
            </Link>
          )}

          {showPlaceOrderButton && cartItems.length > 0 && (
            <button
              type="submit"
              className={`${primaryButtonClass} mt-6 w-full rounded-xl py-3 text-sm`}
            >
              Place Order →
            </button>
          )}
        </>
      )}
    </div>
  );
}

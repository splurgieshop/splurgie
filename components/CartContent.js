"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import ProductImage from "@/components/ProductImage";
import { fetchProductsByIds } from "@/lib/fetchProducts";
import { formatPrice, getSellerName } from "@/lib/products";
import { primaryButtonClass } from "@/lib/ui";

export default function CartContent() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [productMap, setProductMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      if (cart.length === 0) {
        setProductMap({});
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const ids = [...new Set(cart.map((item) => item.productId))];
        const products = await fetchProductsByIds(ids);
        setProductMap(
          Object.fromEntries(products.map((product) => [product.id, product]))
        );
      } catch {
        setProductMap({});
      } finally {
        setLoading(false);
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

  if (cart.length === 0) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 py-20 text-center">
        <span className="text-6xl">🛒</span>
        <h2 className="page-heading mt-4 text-2xl">Your cart is empty. Fix that.</h2>
        <p className="mt-2 text-slate-500">
          Go find something that doesn&apos;t exist.
        </p>
        <Link
          href="/products"
          className={`${primaryButtonClass} mt-6 inline-block rounded-xl px-8 py-3 text-sm`}
        >
          Start splurging
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-md shadow-purple-100/50"
            >
              <ProductImage
                product={item}
                className="h-24 w-24 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${item.id}`}
                    className="font-bold text-navy hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm font-semibold text-accent">
                    @{getSellerName(item)}
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-primary">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-purple-100 font-bold text-primary transition hover:bg-purple-50"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-purple-100 font-bold text-primary transition hover:bg-purple-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm font-semibold text-red-500 transition hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50">
          <h2 className="page-heading text-lg">Order Summary</h2>
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
          <button
            onClick={() => router.push("/checkout")}
            className={`${primaryButtonClass} mt-6 w-full rounded-xl py-3 text-sm`}
          >
            Check out (for free)
          </button>
        </div>
      </div>
    </div>
  );
}

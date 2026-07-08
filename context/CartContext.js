"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("splurgie-cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("splurgie-cart", JSON.stringify(cart));
  }, [cart, loaded]);

  // Listen to auth state — load likes from DB on login, clear on logout
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        loadLikesFromDB(session.user.id);
      } else {
        loadWishlistFromLocalStorage();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        loadLikesFromDB(session.user.id);
      } else {
        setUserId(null);
        loadWishlistFromLocalStorage();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadLikesFromDB(uid) {
    try {
      const { data } = await supabase
        .from("likes")
        .select("product_id")
        .eq("user_id", uid);
      if (data) {
        const ids = data.map((r) => r.product_id);
        setWishlist(ids);
        localStorage.setItem("splurgie-wishlist", JSON.stringify(ids));
      }
    } catch {
      loadWishlistFromLocalStorage();
    }
  }

  function loadWishlistFromLocalStorage() {
    try {
      const saved = localStorage.getItem("splurgie-wishlist");
      if (saved) setWishlist(JSON.parse(saved));
    } catch {
      // ignore
    }
  }

  function addToCart(productId) {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }

  async function toggleWishlist(productId) {
    const isLiked = wishlist.includes(productId);
    const next = isLiked
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    // Optimistic update
    setWishlist(next);
    localStorage.setItem("splurgie-wishlist", JSON.stringify(next));

    // Persist to DB if logged in
    if (userId) {
      if (isLiked) {
        await supabase
          .from("likes")
          .delete()
          .eq("user_id", userId)
          .eq("product_id", productId);
      } else {
        await supabase
          .from("likes")
          .insert({ user_id: userId, product_id: productId });
      }
    }
  }

  function removeFromWishlist(productId) {
    toggleWishlist(productId);
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        removeFromWishlist,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

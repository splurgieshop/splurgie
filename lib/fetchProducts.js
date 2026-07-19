import { supabase } from "@/lib/supabase";

export function normalizeProduct(row) {
  if (!row) return null;
  return {
    ...row,
    seller: row.seller_username || row.seller,
    price: Number(row.price),
  };
}

export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(normalizeProduct);
}

export async function fetchRecentProducts(limit = 6) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []).map(normalizeProduct);
}

export async function fetchTrendingProducts(limit = 6) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sold_count", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []).map(normalizeProduct);
}

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return normalizeProduct(data);
}

export async function fetchProductBySlug(slug) {
  // Try slug first
  const { data: bySlug } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (bySlug) return normalizeProduct(bySlug);

  // Fallback: treat as UUID (handles any old links)
  const { data: byId } = await supabase
    .from("products")
    .select("*")
    .eq("id", slug)
    .maybeSingle();

  if (byId) return normalizeProduct(byId);
  return null;
}

export async function fetchProductsBySeller(sellerId) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(normalizeProduct);
}

export async function fetchProductsByUsername(username) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("seller_username", username)
    .order("sold_count", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(normalizeProduct);
}

export async function fetchReviewsByProduct(productId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchProductsByIds(ids) {
  if (!ids.length) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", ids);

  if (error) throw error;
  return (data || []).map(normalizeProduct);
}

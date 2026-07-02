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

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return normalizeProduct(data);
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

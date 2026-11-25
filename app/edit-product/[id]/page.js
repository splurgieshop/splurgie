"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { CATEGORY_GRADIENTS } from "@/lib/products";
import { fetchProductById } from "@/lib/fetchProducts";
import { inputClass, primaryButtonClass } from "@/lib/ui";

const CATEGORIES = [
  "Fashion",
  "Tech Gadgets",
  "Home",
  "Food & Drink",
  "Beauty",
  "Weird & Wonderful",
  "Toys & Games",
  "Pets",
  "Art & Creativity",
  "Magical",
];

export default function EditProductPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: CATEGORIES[0],
    location: "",
  });

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!id || !user) return;
    fetchProductById(id).then((product) => {
      if (!product || product.seller_id !== user.id) {
        router.replace("/profile");
        return;
      }
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || CATEGORIES[0],
        location: product.location || "",
      });
      setExistingImageUrl(product.image_url || null);
      setPageLoading(false);
    });
  }, [id, user, router]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  }

  function handleRemoveImage() {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    let imageUrl = existingImageUrl;

    try {
      if (imageFile) {
        setUploading(true);
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile, { cacheControl: "3600", upsert: false });

        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

        const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
        setUploading(false);
      }

      const { error: updateError } = await supabase
        .from("products")
        .update({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          gradient: CATEGORY_GRADIENTS[form.category] || CATEGORY_GRADIENTS.Fashion,
          image_url: imageUrl,
          location: form.location || null,
        })
        .eq("id", id)
        .eq("seller_id", user.id);

      if (updateError) throw new Error(updateError.message);

      router.push("/profile");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
      setUploading(false);
    }
  }

  function getSubmitLabel() {
    if (uploading) return "Uploading...";
    if (submitting) return "Saving...";
    return "Save Changes";
  }

  const previewSrc = imagePreview || existingImageUrl;

  if (loading || pageLoading) {
    return (
      <>
        <Header />
        <main className="mx-auto flex max-w-7xl flex-1 items-center justify-center px-4 py-20">
          <p className="text-slate-500">Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/profile"
          className="mb-6 inline-block text-sm font-bold text-primary hover:text-accent"
        >
          ← Back to profile
        </Link>
        <h1 className="page-heading text-3xl sm:text-4xl">Edit Listing</h1>
        <p className="mt-2 text-slate-500">Tweak your nonsense</p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50 sm:p-8"
        >
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-bold text-navy">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-bold text-navy">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label htmlFor="price" className="mb-1 block text-sm font-bold text-navy">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="1"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-bold text-navy">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-bold text-navy">
              Your Location <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. New York, London, Tokyo"
            />
            <p className="mt-1 text-xs text-slate-400">Shown as shipping origin on product page</p>
          </div>

          <div>
            <label htmlFor="product-image" className="mb-1 block text-sm font-bold text-navy">
              Product Image
            </label>
            <input
              ref={fileInputRef}
              id="product-image"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
              onChange={handleImageChange}
              className="sr-only"
            />

            {previewSrc ? (
              <div className="relative overflow-hidden rounded-xl border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewSrc}
                  alt="Product preview"
                  className="aspect-video w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-navy transition hover:bg-white"
                  >
                    Change image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-red-500 transition hover:bg-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="product-image"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/50 px-6 py-12 text-center transition hover:border-purple-400 hover:bg-purple-50"
              >
                <span className="text-3xl">📷</span>
                <p className="mt-2 text-sm font-semibold text-primary">Click to upload</p>
                <p className="mt-1 text-xs text-slate-400">JPEG, PNG, GIF or WEBP · Max 5MB</p>
              </label>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`${primaryButtonClass} w-full rounded-xl py-3.5 text-sm disabled:opacity-60`}
          >
            {getSubmitLabel()}
          </button>
        </form>
      </main>
    </>
  );
}

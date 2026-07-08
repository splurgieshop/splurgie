# Splurgie Project Memory
> This file is the single source of truth for all project context. Update it whenever a new feature, design change, or capability is added. It is referenced by CLAUDE.md so every new chat session loads it automatically.

---

## What is Splurgie?
A social commerce platform at **splurgie.com** where users browse, "buy", and "sell" entirely **fictional products**. No real money changes hands. The dopamine hit of online shopping, zero cost. Think TikTok Shop meets Depop, but 100% imaginary.

---

## Deployment & Accounts

| Item | Value |
|------|-------|
| **Live URL** | https://splurgie.com |
| **GitHub repo** | github.com/splurgieshop/splurgie (PUBLIC) |
| **GitHub username** | splurgieshop |
| **GitHub email** | splurgie.shop@gmail.com |
| **Vercel project** | splurgie (linked to splurgieshop/splurgie) |
| **Supabase project ID** | vqyznfanhvvuaijcnlte |
| **Owner email** | melvinandnatalie@gmail.com |

### Git config (set permanently on the iMac)
```bash
git config --global user.email "splurgie.shop@gmail.com"
git config --global user.name "splurgieshop"
```

### Deployment workflow
**NEVER use `git push` to deploy** (Vercel Hobby plan blocks auto-deploy from public repos unless using CLI).  
Always deploy with:
```bash
cd /Users/melvinandnatalie/splurgie && vercel --prod
```
Vercel CLI is installed globally (`sudo npm install -g vercel`). Already linked and authenticated.

### Local dev
```bash
cd /Users/melvinandnatalie/splurgie && npm run dev
```
Runs on http://localhost:3000 with Turbopack.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router, Turbopack) — version in package.json |
| Styling | Tailwind CSS |
| Auth | Supabase Auth (email/password) |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage (bucket: `product-images`) |
| Hosting | Vercel |
| Language | JavaScript (no TypeScript) |

### Key rules
- `useSearchParams()` always needs a `<Suspense>` wrapper in Next.js App Router
- Never run `git commit` or `git push` from the bash sandbox — it creates `.git/HEAD.lock` files that block the user's local git
- All new pages that use `useSearchParams()` need Suspense in their parent page.js

---

## Credentials & Secrets
> Actual secrets live in `/Users/melvinandnatalie/splurgie/.env.local` (gitignored — never committed).  
> The file contains: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Database Schema (Supabase)

### `products`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | auto-generated |
| name | text | |
| description | text | |
| price | numeric | |
| category | text | Fashion / Tech Gadgets / Home / Food & Drink / Beauty / Weird & Wonderful |
| seller_id | uuid → auth.users | |
| seller_username | text | display name |
| gradient | text | Tailwind class string e.g. `from-purple-400 to-pink-400` |
| image_url | text | nullable — from Supabase Storage |
| badge | text | nullable — `"trending"` or `"new"` |
| sold_count | integer | DEFAULT 0, incremented on purchase via RPC |
| location | text | nullable — seller's city/country |
| created_at | timestamptz | |

RPC function: `increment_sold_count(p_id uuid, amount integer)` — atomically increments sold_count.

### `orders`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid → auth.users | RLS: own rows only |
| order_number | text | 8 random digits |
| tracking_number | text | `SPG` + 10 digits |
| items | jsonb | snapshot: `[{id, name, price, image_url, gradient, quantity, location}]` |
| total | numeric | subtotal + $9.99 shipping |
| status | text | DEFAULT `'Processing'` (static — display status computed from created_at) |
| created_at | timestamptz | |

RLS: users can INSERT and SELECT their own orders only.

### `likes`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid → auth.users | |
| product_id | text | product UUID as text |
| created_at | timestamptz | |
| UNIQUE | (user_id, product_id) | |

RLS: full CRUD for own rows only.

### `reviews`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| product_id | uuid → products | CASCADE delete |
| user_id | uuid → auth.users | CASCADE delete |
| username | text | snapshot of username at review time |
| rating | integer | 1–5, CHECK constraint |
| text | text | |
| created_at | timestamptz | |
| UNIQUE | (product_id, user_id) | one review per user per product |

RLS: anyone can SELECT; authenticated users can INSERT/DELETE own reviews.

### `notifications`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid → auth.users | CASCADE delete |
| message | text | e.g. `"🛍️ Someone bought your "Product Name"!"` |
| product_name | text | nullable |
| read | boolean | DEFAULT false |
| created_at | timestamptz | |

RLS: users SELECT/UPDATE own rows; INSERT open (so checkout can notify sellers).

---

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.js` | Homepage: hero with HeroSearch, CategoriesBar, 3 feature cards, Trending Now section |
| `/products` | `app/products/page.js` | All products with filter/sort sidebar, search |
| `/products/[id]` | `app/products/[id]/page.js` | Product detail page |
| `/seller/[username]` | `app/seller/[username]/page.js` | Public seller profile — all listings + stats |
| `/about` | `app/about/page.js` | About Splurgie page |
| `/create-product` | `app/create-product/page.js` | Create new listing (auth required) |
| `/edit-product/[id]` | `app/edit-product/[id]/page.js` | Edit own listing (auth required) |
| `/cart` | `app/cart/page.js` | Shopping cart |
| `/checkout` | `app/checkout/page.js` | Checkout form |
| `/confirmation` | `app/confirmation/page.js` | Order confirmation (reads URL params) |
| `/tracking` | `app/tracking/page.js` | Order tracking (reads URL params) |
| `/profile` | `app/profile/page.js` | User profile: My Orders / My Listings / Wishlist tabs |
| `/auth/login` | `app/auth/login/page.js` | Login |
| `/auth/signup` | `app/auth/signup/page.js` | Sign up |

---

## Components

| Component | Purpose |
|-----------|---------|
| `Header.js` | Sticky nav: logo, search bar (desktop), Shop/About links, @username (desktop) or initials avatar (mobile), NotificationBell, Cart. Sign Out removed (now only in /profile). |
| `CategoriesBar.js` | Horizontal scrollable row of 10 category pills below hero — each links to `/products?category=X` |
| `HeroSearch.js` | Large search bar in homepage hero — redirects to `/products?q=...` |
| `FeaturedProducts.js` | Homepage trending section — fetches by `sold_count DESC` |
| `ProductCard.js` | Product grid card: image, name, price, @seller (link to `/seller/[username]`), sold count, wishlist heart, Add to Cart |
| `ProductDetail.js` | Full product page content: image, details, Ships from, sold count badge, Add to Cart, wishlist, ProductReviews |
| `ProductImage.js` | Renders product image (uploaded) or gradient fallback |
| `ProductsGrid.js` | Products grid with filter sidebar and search — reads `?q=` from URL |
| `ProductsPageContent.js` | Wrapper for ProductsGrid (needed for Suspense) |
| `ProductReviews.js` | Real reviews section + write-a-review form (star picker, text, submit) |
| `CheckoutForm.js` | Full checkout: shipping details, fake payment, saves order, increments sold_count, notifies sellers, redirects to confirmation |
| `OrderSummary.js` | Cart summary sidebar shown during checkout |
| `CartContent.js` | Full cart page contents |
| `ConfirmationContent.js` | Order confirmed page — reads `order`, `tracking`, `total`, `created`, `origin` from URL |
| `TrackingContent.js` | Live tracking — reads URL params, computes stage from elapsed time, shows seller origin |
| `NotificationBell.js` | Bell icon in header with unread badge — dropdown of notifications, marks read on open |
| `StarRating.js` | Display-only star rating (filled/empty stars) |
| `Footer.js` | Site footer |

---

## Context / State

| File | Purpose |
|------|---------|
| `context/AuthContext.js` | Supabase auth state: `user`, `loading`, `signOut` |
| `context/CartContext.js` | Cart + wishlist state. Cart: localStorage. Wishlist: Supabase `likes` table when logged in, localStorage fallback for guests. Syncs on auth state change. |

---

## Lib / Utilities

| File | Purpose |
|------|---------|
| `lib/supabase.js` | Supabase client singleton |
| `lib/fetchProducts.js` | `fetchAllProducts`, `fetchRecentProducts`, `fetchTrendingProducts`, `fetchProductById`, `fetchProductsBySeller`, `fetchProductsByUsername`, `fetchProductsByIds`, `fetchReviewsByProduct` |
| `lib/products.js` | `sampleProducts` (fallback), `CATEGORY_GRADIENTS`, `DEFAULT_REVIEWS`, `formatPrice`, `getSellerName`, `formatSoldCount` |
| `lib/orderStatus.js` | `ORDER_STAGES`, `getOrderStageIndex(createdAt)`, `getOrderStatus(createdAt)` — computes live delivery stage from time elapsed |
| `lib/ui.js` | Shared Tailwind class strings: `inputClass`, `primaryButtonClass` |

---

## Features — Full List

### Shopping
- Browse all products (`/products`) with filter by category, sort by price/newest/trending, search by name/description/category
- Product detail page with image, price, seller, Ships from location, sold count badge, Add to Cart, wishlist heart
- Cart (add, remove, change quantity, clear)
- Checkout (fake shipping + payment form, saves real order to Supabase)
- Order confirmation page with real order number, tracking number, total, estimated delivery
- Order tracking with live auto-progressing status (Processing → Shipped → Out for Delivery → Delivered based on hours elapsed since purchase)

### Selling
- Create product listing (name, description, price, category, location, image upload to Supabase Storage)
- Edit own listing
- Delete own listing
- JPEG, PNG, GIF, WEBP images supported (max 5MB)
- Community Standards warning shown on upload page
- Sold count tracked per product, displayed as "X sold" / "5+ sold" / "50+ sold" etc. on cards and detail page

### Profiles
- User profile page (`/profile`) with 3 tabs: My Orders (real from DB), My Listings (real from DB), Wishlist
- Public seller profile page (`/seller/[username]`) showing all their listings + total listings + total sold count
- @username links on product cards and detail pages go to seller profile

### Wishlist / Likes
- Heart button on every product card and detail page
- Persists to Supabase `likes` table when logged in
- Syncs across devices/browsers on login
- localStorage fallback for guests
- Wishlist count on profile is real (from context)

### Reviews
- Real user reviews on every product page
- Star picker (1–5) + text input
- One review per user per product (DB-enforced)
- Reviews load from Supabase, post instantly (optimistic)
- "Sign in to leave a review" prompt for guests

### Notifications
- Bell icon in header with pink unread badge
- Sellers receive "🛍️ Someone bought your X!" notification on every purchase
- Dropdown shows last 20 notifications with time-ago labels
- Opens → marks all as read automatically

### Auth
- Email/password signup and login via Supabase Auth
- Email confirmation (check spam — Supabase free tier limits 4 emails/hour)
- Protected routes redirect to `/auth/login`

### Search
- Header search bar (desktop) — Enter key redirects to `/products?q=...`
- Hero search bar on homepage (visible on all screen sizes) — same behaviour
- Products page reads `?q=` param via `useSearchParams()`, filters client-side

### Navigation
- Header: Logo, search, Shop, About, @username (→ profile), Sign Out, notification bell, Cart with count badge
- About page at `/about`

### Homepage
- Gradient hero with tagline + HeroSearch bar + "or browse all products →" link
- CategoriesBar: 10 category pills below hero (Fashion, Tech Gadgets, Home, Food & Drink, Beauty, Weird & Wonderful, Toys & Games, Pets, Art & Creativity, Magical)
- 3 feature cards ("Discover fictional products", "Shop without spending", "Create & sell your ideas") — "Why Splurgie?" heading removed
- Trending Now section (6 products sorted by `sold_count DESC`)

---

## Order Status Logic (`lib/orderStatus.js`)
Computed purely client-side from `created_at` timestamp — no DB updates needed:

| Time elapsed | Status |
|-------------|--------|
| 0 – 30 min | Processing |
| 30 min – 24h | Shipped |
| 24h – 48h | Out for Delivery |
| 48h+ | Delivered |

Tracking link carries `?tracking=XXX&created=ISO&origin=LOCATION` so the tracking page always has the right info.

---

## Sold Count Tiers (`lib/products.js` → `formatSoldCount`)
| Count | Display |
|-------|---------|
| 1–4 | "X sold" |
| 5–49 | "5+ sold" |
| 50–99 | "50+ sold" |
| 100–499 | "100+ sold" |
| 500–999 | "500+ sold" |
| 1,000–4,999 | "1,000+ sold" |
| 5,000–9,999 | "5,000+ sold" |
| 10,000+ | "10,000+ sold" |

---

## Product Categories & Gradients
| Category | Tailwind Gradient |
|----------|------------------|
| Fashion | `from-purple-400 to-pink-400` |
| Tech Gadgets | `from-blue-400 to-purple-500` |
| Home | `from-green-400 to-teal-500` |
| Food & Drink | `from-orange-400 to-yellow-400` |
| Beauty | `from-pink-400 to-rose-500` |
| Weird & Wonderful | `from-indigo-400 to-purple-600` |
| Toys & Games | `from-yellow-400 to-orange-400` |
| Pets | `from-amber-400 to-orange-500` |
| Art & Creativity | `from-rose-400 to-violet-500` |
| Magical | `from-violet-500 to-cyan-400` |

---

## Seed Data
77 fictional products ready to insert — file at `/Users/melvinandnatalie/splurgie/seed-products.sql`.  
To run: paste into Supabase SQL Editor → Run.  
Uses first registered user's ID as `seller_id`, but displays varied `seller_username` values.

---

## Still To Build (Pre-Launch)
1. **Run seed SQL** — 77 products via Supabase SQL Editor (file: `seed-products.sql`)
2. **SEO-friendly product URL slugs** — deferred; requires `slug` column, migration, route change from `[id]` to `[slug]`
3. **Seller dashboard** — sales volume chart, total revenue, best-selling products
4. **Phase 4** — marketing / launch page
5. **Endless scroll** — deferred to a later session

---

## Design Language
- **Primary colour**: `#7C3AED` (purple-600)
- **Accent**: `#EC4899` (pink-500)
- **Navy text**: custom `text-navy` class
- **Rounded cards**: `rounded-2xl` throughout
- **Shadows**: `shadow-md shadow-purple-100/50`
- **Hero gradient**: `linear-gradient(to right, #7C3AED, #EC4899)`
- **Buttons**: gradient purple-to-pink, `rounded-xl`, `font-bold`
- **Font**: system default via Tailwind

---

## Important Known Issues / Rules
- **Never commit from Claude's bash sandbox** — creates `HEAD.lock` files. If this happens: `rm /Users/melvinandnatalie/splurgie/.git/HEAD.lock`
- **Vercel auto-deploy is disabled** — always use `vercel --prod` from the user's Cursor terminal
- **useSearchParams() requires Suspense** — any page using it needs `<Suspense>` in the parent `page.js`
- **Supabase free tier**: 4 confirmation emails/hour — check spam for verification emails
- **Switching computers**: clone repo, run `npm install`, copy `.env.local`, set git config, run `vercel link`

---

*Last updated: 2026-07-08*  
*Update this file whenever a new feature, design change, DB table, or capability is added.*

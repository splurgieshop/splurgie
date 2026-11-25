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
cd /Users/melvinheng/splurgie && vercel --prod
```
Vercel CLI is installed globally (`sudo npm install -g vercel`). Already linked and authenticated.

### Local dev
```bash
cd /Users/melvinheng/splurgie && npm run dev
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
> Actual secrets live in `/Users/melvinheng/splurgie/.env.local` (gitignored — never committed).  
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

### `products` — additional column
| Column | Type | Notes |
|--------|------|-------|
| slug | text | UNIQUE, nullable (populated for all products via migration: `UPDATE products SET slug = ... WHERE slug IS NULL`) |

Slug generated from name via `generateSlug(name)` in `lib/products.js`. On create-product, uniqueness is checked and a 5-char random suffix is appended if collision.

### `reports`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | auto-generated |
| product_id | uuid → products | CASCADE delete |
| reporter_id | uuid → auth.users | SET NULL on delete |
| reason | text | required |
| note | text | nullable |
| created_at | timestamptz | |

RLS: authenticated users can INSERT own reports only.
When a report is submitted, a notification is sent to the seller via the `notifications` table.

### `feedback`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| name | text | nullable |
| email | text | nullable |
| message | text | required |
| created_at | timestamptz | |

RLS: INSERT open (no auth required); SELECT restricted.

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
| `/` | `app/page.js` | Homepage (dark "Receipt" theme, redesigned 2026-08): hero with live fake-checkout demo on a random real product, product-name marquee, "Trending nonsense" grid + "See all nonsense" button, "Got a dumb idea?" sell banner, Top creators strip |
| `/products` | `app/products/page.js` | All products with compact dropdown filter bar (category, price, sort, search) |
| `/products/[slug]` | `app/products/[slug]/page.js` | Product detail page — fetches by slug with UUID fallback; redirects old UUID URLs to slug URL |
| `/seller/[username]` | `app/seller/[username]/page.js` | Public seller profile — all listings + stats |
| `/about` | `app/about/page.js` | About page with FAQ accordion + JSON-LD FAQ schema for SEO/GEO |
| `/contact` | `app/contact/page.js` | Contact & Feedback form — saves to `feedback` table |
| `/dashboard` | `app/dashboard/page.js` | Seller Dashboard (separate page — not squeezed into profile) |
| `/create-product` | `app/create-product/page.js` | Create new listing (auth required) — generates slug on save |
| `/edit-product/[id]` | `app/edit-product/[id]/page.js` | Edit own listing (auth required) |
| `/cart` | `app/cart/page.js` | Shopping cart |
| `/checkout` | `app/checkout/page.js` | Checkout form |
| `/confirmation` | `app/confirmation/page.js` | Order confirmation (reads URL params) |
| `/tracking` | `app/tracking/page.js` | Order tracking (reads URL params) |
| `/profile` | `app/profile/page.js` | User profile: My Orders / My Listings / Wishlist tabs |
| `/auth/login` | `app/auth/login/page.js` | Login |
| `/auth/signup` | `app/auth/signup/page.js` | Sign up |

### Page metadata layouts
Each client-component page has a companion `layout.js` in its directory exporting `metadata` (Next.js App Router pattern — client pages can't export metadata directly):
- `app/auth/login/layout.js` → "Sign In — Splurgie"
- `app/auth/signup/layout.js` → "Create Account — Splurgie"
- `app/contact/layout.js` → "Contact & Feedback — Splurgie"
- `app/profile/layout.js` → "My Profile — Splurgie"
- `app/create-product/layout.js` → "Create a Listing — Splurgie"

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
| `ProductsGrid.js` | Products grid with compact horizontal filter bar (search input, category dropdown, price dropdown, sort dropdown) — initialises from `?category=` and `?q=` URL params |
| `ProductsPageContent.js` | Wrapper for ProductsGrid (needed for Suspense) |
| `ProductReviews.js` | Real reviews section + write-a-review form (star picker, text, submit) |
| `CheckoutForm.js` | Full checkout: shipping details, fake payment, saves order, increments sold_count, notifies sellers, redirects to confirmation |
| `OrderSummary.js` | Cart summary sidebar shown during checkout |
| `CartContent.js` | Full cart page contents |
| `ConfirmationContent.js` | Order confirmed page — reads `order`, `tracking`, `total`, `created`, `origin` from URL |
| `TrackingContent.js` | Live tracking — reads URL params, computes stage from elapsed time, shows seller origin |
| `NotificationBell.js` | Bell icon in header with unread badge — dropdown of notifications, marks read on open |
| `StarRating.js` | Display-only star rating (filled/empty stars) |
| `Footer.js` | Site footer: Instagram link (@splurgie.shop), About, Contact & Feedback links, disclaimer, copyright year |
| `ShareButton.js` | Share button on product pages — mobile: native OS sheet; desktop: dropdown with Copy Link, WhatsApp, Telegram, X, Facebook |
| `DashboardContent.js` | Seller dashboard: Revenue, Sales, Listings, Avg Rating stats; Sales Over Time chart (7d/30d/90d); Top Products by revenue; Category breakdown |
| `ReportButton.js` | "Report Listing" button on product detail pages. Opens modal with reason dropdown + optional note. Requires login. Inserts into `reports` table AND sends seller a notification via `notifications` table. |
| `home/HeroCheckout.js` | Homepage hero card: fetches up to 60 products from Supabase, shows a random one, "Buy it (for free)" runs a 3-step fake checkout and shows a random order # and `SPG`+10-digit tracking #. Demo only — does NOT write an order or change sold_count. "Show me something else" re-rolls. |
| `home/Marquee.js` | Scrolling strip of the top 10 products by sold_count (hidden if fewer than 3 products). |
| `home/TrendingNonsense.js` | "Trending nonsense" dark product grid (top 6 by sold_count) + "See all nonsense →" button to `/products`. |
| `home/TopCreators.js` | Top 3 sellers ranked by total sold_count across their listings (all-time, not weekly). Links to `/seller/[username]`. Hidden if no data. |
| `Header.js` | Takes `variant="light"` (default) or `variant="dark"` (used only on the homepage). |
| *Unused since homepage redesign* | `HeroMosaic.js`, `HeroSearch.js`, `CategoriesBar.js`, `FeaturedProducts.js` — kept in repo, no longer imported by the homepage. |
| `HeroMosaic.js` (legacy) | Client component formerly used in homepage hero. Fetches top 30 products by sold_count, renders their real images (or gradient fallbacks) as a tiled mosaic grid at 22% opacity behind the hero text. |

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
| `lib/fetchProducts.js` | `fetchAllProducts`, `fetchRecentProducts`, `fetchTrendingProducts`, `fetchProductById`, `fetchProductBySlug` (tries slug first, then UUID fallback), `fetchProductsBySeller`, `fetchProductsByUsername`, `fetchProductsByIds`, `fetchReviewsByProduct` |
| `lib/products.js` | `sampleProducts` (fallback), `CATEGORY_GRADIENTS`, `DEFAULT_REVIEWS`, `formatPrice`, `getSellerName`, `formatSoldCount`, `generateSlug(name)`, `productUrl(product)` |
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

### Homepage (redesigned — dark "Receipt" theme)
Why: Vercel analytics (30 days) showed 25 visitors, 156 page views, 68% bounce. Old homepage was a gradient hero + category row + 6 products, with no demo of the core mechanic.
- Hero: "Retail therapy. Zero regrets." + "Start splurging" / "Sell your nonsense" CTAs + live fake-checkout card (`HeroCheckout.js`) on a random real product
- Marquee strip of top product names
- "Trending nonsense" (6 products by `sold_count DESC`) + "See all nonsense →" → `/products`
- "Got a dumb idea? Perfect." lime sell banner → `/create-product`
- "Top creators" (top 3 sellers by total sold) under the sell banner
- Removed from homepage: "how it works" steps, categories bar, hero search bar (header search still exists on desktop), FAQ (About page still has FAQ)
- **Dark theme on inner pages**: `components/ThemeShell.js` (in `app/layout.js`) adds class `dk` on every route except those listed in `LIGHT_ROUTE_PREFIXES` in `lib/theme.js` (currently empty, so the whole site is dark). The `.dk` block at the bottom of `globals.css` remaps existing Tailwind utilities (bg-white, text-navy, text-primary → lime, purple borders, primary gradient buttons → lime) so components don't need rewriting. `Header.js` picks dark/light from the route. Footer is dark everywhere. To theme a remaining page, remove it from `LIGHT_ROUTE_PREFIXES`.
- Styles live in `app/globals.css` under the `.hm-*` prefix (scoped to `<main className="hm">`). Colors: bg `#0d0817`, lime `#c6ff4a`, pink `#ff5fb0`, violet `#a78bfa`. Footer is still the global purple one.

### Infinite Scroll
- `ProductsGrid.js` loads 20 products at a time (`PAGE_SIZE = 20`)
- `IntersectionObserver` with `rootMargin: "200px"` auto-loads next 20 when sentinel div enters viewport
- Spinner shown at bottom when more products remain
- `visibleCount` resets to 20 whenever filters/sort change

### Report Listing
- "Report Listing" button on every product detail page (`ReportButton.js`)
- Requires login — redirects to `/auth/login` if not authenticated
- Reasons: Inappropriate content, Spam or misleading, Hateful or offensive, IP violation, Other
- On submit: inserts row into `reports` table + sends seller notification: `"⚠️ Your listing "[name]" has been reported. Please review it — listings that violate our community guidelines may be removed."`

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
100+ fictional products across all categories inserted via SQL batches.

**Hardcoded seller UUID for all seed SQL**: `37f827a5-4ba7-44e6-b51c-c88801ba1f3b` (email: splurgie.shop@gmail.com)

**Always use this pattern for seed SQL** to avoid RLS linter warnings and seller_id NULL errors:
```sql
DO $$
DECLARE seller uuid := '37f827a5-4ba7-44e6-b51c-c88801ba1f3b';
BEGIN
INSERT INTO products (name, description, price, category, seller_id, seller_username, gradient, image_url, location, slug, badge, sold_count, created_at) VALUES
(...);
END $$;
```

Seed files in repo:
- `seed_products_batch2.sql` — 10 internet meme products (Rizz Cologne, Delulu Glasses, Crashout Journal etc.)
- `seed_products_day3.sql` — 5 products (CEO Cardigan, Quantum Sock Locator, Emotional Support Stapler etc.)
- Additional batches created in-session: Beauty/Food/Pets meme products, Toys & Games / Home, World Cup / Weather / GPT / News themed, oxymoronic useless-product comedy items

---

## Analytics
Vercel Analytics integrated: `@vercel/analytics/next` installed, `<Analytics />` added to `app/layout.js`. Dashboard: https://vercel.com/splurgie/splurgie/analytics

---

## Still To Build / Nice To Have
1. **Profile photo upload** — users currently show initials avatar only
2. **Custom 404 page** — currently shows Next.js default
3. **Leaderboard** — full ranking page (homepage has an all-time Top 3 creators strip; "this week" ranking needs per-order timestamps per seller)
4. **Homepage social proof** — real live stats (product count, total sold) and a recent-purchases ticker from Supabase, only once numbers are meaningful
5. **Homepage FAQ / GEO content** — compact FAQ was dropped in the redesign; consider re-adding
6. **Product page "Buy" copy** — homepage says "Buy it free" and links to the product page
7. **Product description quality** — fix any descriptions with no space after periods: `UPDATE products SET description = regexp_replace(description, '\.([A-Z])', '. \1', 'g') WHERE description ~ '\.([A-Z])'`

---

## Voice & Tone (set 2026-08)
Cheeky Gen Z: short, deadpan, a bit unhinged, never confusing. Examples live in the UI now: "Your cart is empty. Fix that.", "Check out (for free)", "Track your nothing", "Buy more nonsense", "Search the nonsense…".
- Product vocabulary: "nonsense" (products), "pretend/fake" (checkout), "nothing"/"package of nothing" (orders), "creators" (sellers), "splurging" (shopping).
- Sentence case for buttons and headings. No exclamation marks on system copy.
- Errors and legal/safety copy (community guidelines, report flow, simulated-purchase disclaimer) stay plain and clear — jokes go on empty states, confirmations and the checkout.
- Stay accurate: say "100+ products" (not "thousands"), and keep it clear that checkout/tracking are real features while products, payments and deliveries are fictional.
- Rewritten in one pass via a script; Notification text ("Someone bought your…") and Report flow strings were left as they were.

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
- **Never commit from Claude's bash sandbox** — creates `HEAD.lock` files. If this happens: `rm /Users/melvinheng/splurgie/.git/HEAD.lock`
- **Vercel auto-deploy is disabled** — always use `vercel --prod` from the user's Cursor terminal
- **useSearchParams() requires Suspense** — any page using it needs `<Suspense>` in the parent `page.js`
- **Supabase free tier**: 4 confirmation emails/hour — check spam for verification emails
- **Switching computers**: clone repo, run `npm install`, copy `.env.local` (AirDrop or `cat ~/.env.local`), set git config below, run `vercel link`
- **Working computer as of 2026-08-01: MacBook Air (`melvinheng@Melvins-MacBook-Air`), project at `/Users/melvinheng/splurgie`.** Previously the iMac at `/Users/melvinandnatalie/splurgie`.
- **MacBook setup**: `git config --global user.email "splurgie.shop@gmail.com" && git config --global user.name "splurgieshop"` — then `vercel link` in the splurgie folder to reconnect Vercel CLI
- **Note**: the first commit on this MacBook (2026-08-01) used the auto-detected identity `melvinheng@Melvins-MacBook-Air.local` instead of `splurgie.shop@gmail.com` — run the git config command above so future commits use the correct identity, or amend with `git commit --amend --reset-author` if it matters.

---

*Last updated: 2026-08-01 (working computer switched to MacBook Air; homepage redesigned to dark "Receipt" theme)*  
*Update this file whenever a new feature, design change, DB table, or capability is added.*

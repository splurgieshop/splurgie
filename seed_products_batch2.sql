DO $$
DECLARE seller uuid := '37f827a5-4ba7-44e6-b51c-c88801ba1f3b';
BEGIN

INSERT INTO products (name, description, price, category, seller_id, seller_username, gradient, image_url, location, slug, badge, sold_count, created_at) VALUES

(
  'Unspoken Rizz Cologne',
  'It has no scent. That''s the point. Unspoken Rizz Cologne is an empty bottle — because true rizz cannot be bottled, sprayed, or explained. You simply open the cap in a crowded room, do nothing, and let your energy speak for itself. Clinical trials conducted on gym changing rooms and coffee queues confirm that 9 out of 10 bystanders sensed something without being able to identify it. Comes in a matte black vial with no label. Wearing it is a personality. Not wearing it and telling people you wear it is also a personality. Both are valid. Zero ml. Unlimited drip.',
  89, 'Beauty', seller, 'rizzchemist', 'from-pink-400 to-rose-500', NULL, 'Your Imagination, Mostly', 'unspoken-rizz-cologne', 'trending', 8841, NOW()
),
(
  'NPC Reset Button',
  'For when someone in your life is clearly running on a loop. The NPC Reset Button is a handheld device that, when pressed near a person exhibiting NPC behaviour — repeating the same three opinions, responding to everything with "that''s crazy," walking directly into your path without looking up — emits a 40Hz frequency pulse designed to interrupt their scripted dialogue and force a content reload. Results vary. Some NPCs reboot with new material. Others just say "that''s crazy" again. Device comes with a 12-page pamphlet titled "Signs You Might Also Be An NPC" which most users do not finish.',
  49, 'Tech Gadgets', seller, 'patch_the_simulation', 'from-blue-400 to-purple-500', NULL, 'The Open World', 'npc-reset-button', 'trending', 14203, NOW()
),
(
  'Aura Points Loyalty Card',
  'Finally, a rewards program for people who are simply built different. The Aura Points Loyalty Card tracks every W you accumulate in daily life — walking into a room with the right energy, saying the correct thing without thinking, choosing the fit that just works. Points are earned automatically via our proprietary Vibe Detection System, which runs entirely on vibes. Rewards are non-redeemable. The aura is the reward. Points cannot be transferred, spent, or explained to anyone who does not already understand. Card material: matte obsidian. Expiry: never, unless you fumble.',
  24, 'Weird & Wonderful', seller, 'aura_auditor', 'from-indigo-400 to-purple-600', NULL, 'The High Vibration District', 'aura-points-loyalty-card', 'trending', 22917, NOW()
),
(
  'Delulu Vision Glasses',
  'See the world as it could be, not as it is. Delulu Vision Glasses use a proprietary tint technology to reinterpret reality in your favour at all times. Job rejection emails appear as "application under extended review." Texts left on read display as "composing a very thoughtful reply." Your ex posting a story the night after you posted yours registers as coincidence, definitely. Frame includes an engraved reminder on the inside arm: "Delulu is the solulu." Prescription lenses not available because honestly if you need these glasses you already have perfect vision — of a future that might not exist but feels incredibly real.',
  129, 'Fashion', seller, 'delusionally_dressed', 'from-purple-400 to-pink-400', NULL, 'A Better Timeline', 'delulu-vision-glasses', 'new', 5562, NOW()
),
(
  'Sigma Alarm Clock',
  'It does not beg you to wake up. Betas get begged. The Sigma Alarm Clock plays a single lone wolf howl at your chosen time, followed by 8 seconds of silence where you are expected to reflect on your purpose. No snooze button — snoozing is a social construct built by people who need validation from their own schedule. Display shows only the current time and a rotating motivational phrase: "You are the main character of your own sleep cycle." Battery life is irrelevant — a true sigma charges it when he feels like it. Comes with a journal for morning manifestations. Journal is blank. Fill it yourself.',
  79, 'Tech Gadgets', seller, 'lone_wolf_logistics', 'from-blue-400 to-purple-500', NULL, 'The Grindset', 'sigma-alarm-clock', 'trending', 7334, NOW()
),
(
  'Brain Rot 3-Day Detox Kit',
  'You''ve been chronically online for two years and you can feel it. The Brain Rot 3-Day Detox Kit is a medically unqualified but emotionally sincere intervention for people whose inner monologue now sounds like a TikTok comment section. Day 1 contents: one (1) Nokia 3310, a paperback novel with a slow beginning, and a handwritten note that says "go outside." Day 2: a puzzle with 500 pieces and no satisfying ending. Day 3: a list of things to look at that are not a screen, including "a tree" and "a cloud" and "another person''s face in real time." Kit includes a completion certificate you can post online — because some habits die hard.',
  67, 'Weird & Wonderful', seller, 'detox_or_die_trying', 'from-indigo-400 to-purple-600', NULL, 'Somewhere Without WiFi', 'brain-rot-3-day-detox-kit', 'trending', 31485, NOW()
),
(
  'Mewing Mouth Tape (30-Strip Pack)',
  'Committed to the jawline grind but tired of explaining your silence? Each strip of Mewing Mouth Tape is printed with "I''m just mewing" in discreet 8pt font so bystanders understand your closed mouth is intentional, strategic, and part of a long-term facial restructuring plan — not awkwardness, hostility, or a lack of opinions. Strips are dermatologist-not-tested but spiritually endorsed. 30 strips per pack, one per day, enough for a full month of silent self-improvement. Works best when paired with a meaningful stare and the quiet confidence of someone who has watched more than 400 hours of jawline content.',
  18, 'Beauty', seller, 'the_mewing_merchant', 'from-pink-400 to-rose-500', NULL, 'The Jaw-Line District', 'mewing-mouth-tape-30-strip-pack', 'trending', 44200, NOW()
),
(
  'Crashout Journal',
  'Document your meltdowns with the gravitas they deserve. The Crashout Journal is a 365-page hardcover notebook pre-formatted for recording public emotional meltdowns in full cinematic detail. Each entry includes four sections: Context (what was happening before), Trigger (what set you off — be specific), What I Said Or Did (no edits, no revisionism), and Would I Do It Again (circle one: Yes / No / Circumstances Dependent). Front cover reads: "My Unfiltered Arc." Back cover: "Growth Is Not Linear." Comes with a gold ribbon bookmark for your most formative entry. Therapy not included. Clarity is free. Accountability is optional but the journal judges either way.',
  39, 'Art & Creativity', seller, 'publicly_processing', 'from-rose-400 to-violet-500', NULL, 'The Rock Bottom Floor, Suite 1', 'crashout-journal', 'new', 9871, NOW()
),
(
  'Cooked Badge (3-Pack)',
  'For when you have fully accepted your situation. The Cooked Badge is a wearable enamel pin that communicates your current status to everyone around you without requiring a single conversation about it. Available in three tiers: Slightly Cooked (warm yellow — things are bad but there is still technically a path forward), Fully Cooked (deep orange — no path visible, proceeding anyway), and Well Done (matte black — no comment). Wear on lapel, bag strap, or directly over your heart. Colleagues will understand. People who ask "are you okay?" when you are wearing a black enamel badge that says COOKED are the real problem.',
  22, 'Fashion', seller, 'cooked_couture', 'from-purple-400 to-pink-400', NULL, 'The Acceptance Phase', 'cooked-badge-3-pack', 'trending', 18654, NOW()
),
(
  'Main Character Subscription Box',
  'Monthly delivery of everything you need to remain the protagonist of your own life. Each box contains: a cinematic playlist curated for walking through crowds with intention, a slow-motion wind machine attachment that clips to your phone for self-filming, one (1) pre-written dramatic monologue for a situation you will probably encounter this month, a stranger''s note that reads "I noticed something different about you today" (unsigned, undated, unexplained), and a Main Character Affirmation Card for the bathroom mirror. Box two and beyond may include: narrative tension, a subplot involving someone from your past, and a cliffhanger ending that resolves in the following month''s box. Cancel anytime. The story, however, continues.',
  55, 'Magical', seller, 'protagonist_supply_co', 'from-violet-500 to-cyan-400', NULL, 'The Centre Of The Universe', 'main-character-subscription-box', 'trending', 27103, NOW()
);

END $$;

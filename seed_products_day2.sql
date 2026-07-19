-- ============================================================
-- SPLURGIE SEED PRODUCTS — DAY 2 (run on 2026-07-18)
-- 5 funny fictional products across mixed categories
-- ============================================================

INSERT INTO products (name, description, price, category, seller_id, seller_username, gradient, slug, badge, sold_count, location, created_at)
VALUES
(
  'Eyebrow GPS Navigator',
  'Never let your brows go off-trend again. The Eyebrow GPS Navigator is a precision gel infused with micro-satellites that continuously triangulate your eyebrow position relative to current global beauty standards. If your arch drifts more than 2mm from peak trendiness, a gentle vibration warns you. Severe deviation triggers an audible alert: "Recalculating brow route." Includes turn-by-turn instructions for transitioning from the 2018 Instagram arch to the 2026 feathered underbrow. Not compatible with Apple Maps. Definitely not compatible with your mother-in-law''s opinions.',
  79, 'Beauty',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'arch_nemesis_annika', 'from-pink-400 to-rose-500', 'eyebrow-gps-navigator', 'new', 539, 'Definitely Not Your Face', NOW()
),
(
  'Grudge Chess Set',
  'Finally, a chess set where every piece is sculpted in the likeness of someone who wronged you. Upon purchase, submit up to 32 names and offences via our proprietary Grievance Form and receive a custom-cast resin set within 6-8 weeks. Your ex is the opposing queen. Your landlord is a rook. That colleague who takes credit for your ideas? A knight — because of course they are. Includes a velvet carrying case and a Therapeutic Match Journal for processing feelings during gameplay. Not recommended for therapy — highly recommended instead of therapy.',
  249, 'Toys & Games',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'chessy_vengeance', 'from-yellow-400 to-orange-400', 'grudge-chess-set', 'trending', 93, 'The Moral High Ground', NOW()
),
(
  'Fluffy''s Existential Crisis Collar',
  'Your cat has been trying to tell you something for years. This smart collar uses FelineFrequency AI to translate your cat''s meows, chirps, and aggressive 3am yowls into fully-formed philosophical questions, displayed in real time on the companion app. Common translations include: "If I knock this glass off the table and no one reacts, does the glass exist?", "Why do you leave and then return? Is love not just cyclical suffering?", and the classic "Feed me, but also — what is hunger, really?" Waterproof. Flea-resistant. Existentially robust.',
  129, 'Pets',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'philosopurr', 'from-amber-400 to-orange-500', 'fluffys-existential-crisis-collar', 'trending', 782, 'Under Your Bed, Probably', NOW()
),
(
  'The Judgemental Canvas',
  'A blank canvas that audibly sighs whenever you make a creative decision it disagrees with. Equipped with a 4-speaker micro-array hidden within the stretched linen, the Judgemental Canvas responds to brushstroke patterns, colour choices, and composition decisions with a calibrated range of disappointed exhales, quiet tuts, and the occasional muttered "interesting choice." Three modes available: Art School Tutor (brutal), Supportive But Clearly Lying (gentle), and Silent Contempt (the loudest of all). 50x70cm. Ships with a tiny built-in therapist who is also a canvas.',
  189, 'Art & Creativity',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'brutus_brushstroke', 'from-rose-400 to-violet-500', 'the-judgemental-canvas', NULL, 418, 'The Critique Studio', NOW()
),
(
  'Cloak of Mild Invisibility',
  'Not fully invisible. Just... less there. The Cloak of Mild Invisibility renders you approximately 30% harder to notice at any social gathering you didn''t want to attend in the first place. Guests will vaguely sense your presence but be unable to maintain eye contact long enough to start a conversation. Works particularly well at: your partner''s work parties, family reunions where someone always asks about your career, and weddings where you only know the couple. Does not work on: your mum, the one person you''re trying to avoid, or anyone who has already spotted you. One size fits most social anxieties.',
  399, 'Magical',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'mysterio_merch', 'from-violet-500 to-cyan-400', 'cloak-of-mild-invisibility', 'trending', 1103, 'Somewhere Near The Snacks Table', NOW()
);

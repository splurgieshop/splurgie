-- ============================================================
-- SPLURGIE SEED PRODUCTS — DAY 1 (run on 2026-07-17)
-- 5 funny fictional products across mixed categories
-- ============================================================

INSERT INTO products (name, description, price, category, seller_id, seller_username, gradient, slug, badge, sold_count, location, created_at)
VALUES

(
  'The Invisible Tuxedo',
  'Look effortlessly underdressed at every black-tie event. This premium tuxedo uses patented Null-Fabric™ technology to render the wearer invisible from the neck down, leaving only a floating head gliding across the ballroom floor. Perfect for weddings you were not originally invited to, corporate galas, or any situation where you want to make a statement without technically showing up. Dry clean only. Do not attempt to wear at airport security.',
  489, 'Fashion',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'vanishing_vogue', 'from-purple-400 to-pink-400', 'the-invisible-tuxedo', 'trending', 312, 'Milan, Probably', NOW()
),
(
  'WiFiSniffer Pro 3000',
  'Stop paying for your own internet. The WiFiSniffer Pro 3000 uses advanced Embarrassment Detection™ to sense which of your neighbours is too polite to change their password. Simply point the device at any wall, wait for the shame sensor to vibrate, and connect instantly. Comes with a Guilt-Free Mode that rationalises your actions by reminding you they have unlimited data anyway. Not responsible for neighbourly confrontations. Batteries not included because honestly, just steal some.',
  199, 'Tech Gadgets',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'router_rouge', 'from-blue-400 to-purple-500', 'wifisniffer-pro-3000', 'new', 88, 'Somewhere With Thick Walls', NOW()
),
(
  'Antigravity Nap Sofa',
  'Hover two inches above the ground and tell everyone it is a lifestyle choice. The Antigravity Nap Sofa uses repulsion coils hidden inside luxurious chenille upholstery to keep you permanently slightly elevated — eliminating the effort of both sitting down AND getting up. Ideal for people who have given up on conventional furniture but still want somewhere to put their back problems. Comes in Existential Beige, Nihilist Navy, and Chaotic Neutral Cream. Maximum load 120kg. Minimum vibe: extremely chill.',
  1299, 'Home',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'hoverhome_hilda', 'from-green-400 to-teal-500', 'antigravity-nap-sofa', 'trending', 204, 'Above The Floor', NOW()
),
(
  'Defeat Tears Kombucha (12-Pack)',
  'Fermented using the actual tears of video game characters defeated on the hardest difficulty setting. Each batch is single-origin — clearly labelled by game title so you can taste the despair of a specific fictional soldier. Notes of bitter regret, a hint of respawn, and a clean finish of "maybe next time." Live cultures included. Comes in Dark Souls Edition (extremely sour), Mario Kart Blue Shell (unpredictably tangy), and Among Us Ejected (crisp, with a twist of betrayal). Vegan. Gluten free. Emotionally complicated.',
  48, 'Food & Drink',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'ferment_the_fallen', 'from-orange-400 to-yellow-400', 'defeat-tears-kombucha-12-pack', NULL, 671, 'The Cloud District', NOW()
),
(
  'Sentient Stress Bubble Wrap',
  'It knows. The Sentient Stress Bubble Wrap uses embedded biometric sensors to detect rising cortisol levels within a 2-metre radius and begins popping itself automatically — no hands required. Designed for open-plan offices, family dinners, and any situation where you physically cannot deal. Pop frequency adjusts based on your stress intensity: mild anxiety triggers gentle pops every 30 seconds; full existential spiral activates Rapid Fire Mode. Sheet size: A3. Feelings handled: all of them.',
  34, 'Weird & Wonderful',
  (SELECT id FROM auth.users WHERE email = 'melvinandnatalie@gmail.com' LIMIT 1),
  'pop_psychology_pete', 'from-indigo-400 to-purple-600', 'sentient-stress-bubble-wrap', 'trending', 1847, 'Your Desk Drawer', NOW()
);

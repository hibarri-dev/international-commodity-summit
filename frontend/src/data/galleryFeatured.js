// Hand-picked opening shots for the 2025 gallery, shown first in this order.
// Shared by Gallery2025.jsx and scripts/import-gallery-2025.mjs so a re-import keeps the curation.
export const FEATURED_ORDER = [
  '7bc02-wp-17637900209495994189476571695870.jpg',
  '566a5-wp-17637904075647702539036577233290.jpg',
  'd383b-wp-17637901454336146864034827261993.jpg',
  '2842b-wp-176379014549465442208699520604.jpg',
  'ce8f3-wp-17637901951722917787626026548535.jpg',
  'da9db-wp-17637904076493074705758272051544.jpg',
  'f5f98-wp-17637900209826259536930944734945.jpg',
  '439bf-wp-17637901952836134482399585890026.jpg',
  '894c2-wp-17637900213294726933698974211921.jpg',
  '9e989-wp-17637900210123441585350486601030.jpg',
  'ed359-wp-17637900219774145567855726030607.jpg',
  'a265b-wp-17637904078788973578557944850290.jpg',
];

const rank = new Map(FEATURED_ORDER.map((file, i) => [file, i]));

export function sortFeaturedFirst(photos) {
  const rankOf = (p) => rank.get(p.src.split('/').pop()) ?? Infinity;
  return photos
    .map((p, i) => ({ p, i }))
    .sort((a, b) => rankOf(a.p) - rankOf(b.p) || a.i - b.i)
    .map(({ p }) => p);
}

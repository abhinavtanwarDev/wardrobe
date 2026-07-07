import type { GarmentArtSpec } from "@/components/ui/GarmentArt";

/* Shared mock wardrobe dataset. Every screen (wardrobe, outfits, today,
   planner, insights) reads from here so counts, stats, and suggestions agree.
   Visuals are self-contained SVG garment illustrations (see GarmentArt) —
   offline-safe stand-ins until real item photos exist. */

export type Category =
  | "Tops"
  | "Bottoms"
  | "Outerwear"
  | "Shoes"
  | "Accessories";

export const CATEGORIES: Category[] = [
  "Tops",
  "Bottoms",
  "Outerwear",
  "Shoes",
  "Accessories",
];

export type ItemStatus = "Clean" | "In laundry" | "Lent out";

export interface WardrobeItem {
  id: string;
  name: string;
  brand: string;
  category: Category;
  color: string;
  seasons: string[];
  price: number;
  wears: number;
  lastWorn: string;
  status: ItemStatus;
  art: GarmentArtSpec;
  /** Tailwind aspect class for the masonry grid. */
  aspect: string;
}

export const ITEMS: WardrobeItem[] = [
  {
    id: "linen-shirt",
    name: "Linen shirt",
    brand: "Uniqlo",
    category: "Tops",
    color: "Off-white",
    seasons: ["Summer", "Spring"],
    price: 45,
    wears: 24,
    lastWorn: "2 days ago",
    status: "Clean",
    art: { kind: "shirt", color: "#efe9dc", detail: "#b8ad94" },
    aspect: "aspect-[3/4]",
  },
  {
    id: "charcoal-tee",
    name: "Charcoal tee",
    brand: "COS",
    category: "Tops",
    color: "Charcoal",
    seasons: ["All year"],
    price: 35,
    wears: 41,
    lastWorn: "Yesterday",
    status: "In laundry",
    art: { kind: "tee", color: "#3f3c39", detail: "#242220" },
    aspect: "aspect-square",
  },
  {
    id: "striped-knit",
    name: "Striped knit",
    brand: "Arket",
    category: "Tops",
    color: "Ecru stripe",
    seasons: ["Autumn", "Winter"],
    price: 89,
    wears: 12,
    lastWorn: "1 week ago",
    status: "Clean",
    art: { kind: "knit", color: "#e8e2d4", detail: "#9d9178", pattern: "stripes" },
    aspect: "aspect-[3/5]",
  },
  {
    id: "silk-blouse",
    name: "Silk blouse",
    brand: "Massimo Dutti",
    category: "Tops",
    color: "Ivory",
    seasons: ["Spring", "Summer"],
    price: 120,
    wears: 6,
    lastWorn: "3 weeks ago",
    status: "Clean",
    art: { kind: "shirt", color: "#f3ede2", detail: "#c4b795" },
    aspect: "aspect-[3/4]",
  },
  {
    id: "wide-leg-trousers",
    name: "Wide-leg trousers",
    brand: "Everlane",
    category: "Bottoms",
    color: "Stone",
    seasons: ["All year"],
    price: 98,
    wears: 33,
    lastWorn: "2 days ago",
    status: "Clean",
    art: { kind: "trousers", color: "#cfc8bc", detail: "#9a9184" },
    aspect: "aspect-[3/5]",
  },
  {
    id: "raw-denim",
    name: "Raw denim jeans",
    brand: "Levi's",
    category: "Bottoms",
    color: "Indigo",
    seasons: ["All year"],
    price: 110,
    wears: 58,
    lastWorn: "Yesterday",
    status: "Clean",
    art: { kind: "jeans", color: "#3b4a63", detail: "#273347" },
    aspect: "aspect-[3/4]",
  },
  {
    id: "pleated-skirt",
    name: "Pleated midi skirt",
    brand: "& Other Stories",
    category: "Bottoms",
    color: "Warm gray",
    seasons: ["Spring", "Autumn"],
    price: 75,
    wears: 9,
    lastWorn: "2 weeks ago",
    status: "Clean",
    art: { kind: "skirt", color: "#d9d5cf", detail: "#a29c92" },
    aspect: "aspect-[3/5]",
  },
  {
    id: "linen-shorts",
    name: "Linen shorts",
    brand: "Muji",
    category: "Bottoms",
    color: "Sand",
    seasons: ["Summer"],
    price: 40,
    wears: 15,
    lastWorn: "4 days ago",
    status: "Clean",
    art: { kind: "shorts", color: "#e6ddcc", detail: "#b3a684" },
    aspect: "aspect-square",
  },
  {
    id: "wool-overcoat",
    name: "Wool overcoat",
    brand: "COS",
    category: "Outerwear",
    color: "Camel",
    seasons: ["Winter"],
    price: 290,
    wears: 18,
    lastWorn: "5 months ago",
    status: "Clean",
    art: { kind: "coat", color: "#c8b295", detail: "#94805f" },
    aspect: "aspect-[3/5]",
  },
  {
    id: "denim-jacket",
    name: "Denim jacket",
    brand: "Levi's",
    category: "Outerwear",
    color: "Washed blue",
    seasons: ["Spring", "Autumn"],
    price: 95,
    wears: 27,
    lastWorn: "1 week ago",
    status: "Clean",
    art: { kind: "jacket", color: "#7d9bc0", detail: "#52709a" },
    aspect: "aspect-[3/4]",
  },
  {
    id: "rain-shell",
    name: "Rain shell",
    brand: "Rains",
    category: "Outerwear",
    color: "Slate",
    seasons: ["Monsoon"],
    price: 130,
    wears: 7,
    lastWorn: "3 days ago",
    status: "Clean",
    art: { kind: "shell", color: "#6d7b8c", detail: "#485563" },
    aspect: "aspect-[3/4]",
  },
  {
    id: "white-sneakers",
    name: "White sneakers",
    brand: "Veja",
    category: "Shoes",
    color: "White",
    seasons: ["All year"],
    price: 150,
    wears: 74,
    lastWorn: "Today",
    status: "Clean",
    art: { kind: "sneaker", color: "#f7f6f3", detail: "#b5b1a8" },
    aspect: "aspect-square",
  },
  {
    id: "leather-loafers",
    name: "Leather loafers",
    brand: "G.H. Bass",
    category: "Shoes",
    color: "Espresso",
    seasons: ["All year"],
    price: 180,
    wears: 21,
    lastWorn: "6 days ago",
    status: "Clean",
    art: { kind: "loafer", color: "#5b4636", detail: "#372a1f" },
    aspect: "aspect-[4/5]",
  },
  {
    id: "suede-boots",
    name: "Suede chelsea boots",
    brand: "Clarks",
    category: "Shoes",
    color: "Taupe",
    seasons: ["Autumn", "Winter"],
    price: 160,
    wears: 11,
    lastWorn: "4 months ago",
    status: "Lent out",
    art: { kind: "boot", color: "#a58a70", detail: "#71604e" },
    aspect: "aspect-[3/4]",
  },
  {
    id: "canvas-tote",
    name: "Canvas tote",
    brand: "Baggu",
    category: "Accessories",
    color: "Natural",
    seasons: ["All year"],
    price: 42,
    wears: 52,
    lastWorn: "Today",
    status: "Clean",
    art: { kind: "tote", color: "#e9e2d2", detail: "#ab9e7e" },
    aspect: "aspect-square",
  },
  {
    id: "steel-watch",
    name: "Steel watch",
    brand: "Seiko",
    category: "Accessories",
    color: "Silver",
    seasons: ["All year"],
    price: 260,
    wears: 63,
    lastWorn: "Yesterday",
    status: "Clean",
    art: { kind: "watch", color: "#cdd3d9", detail: "#828b94" },
    aspect: "aspect-[4/5]",
  },
  {
    id: "tortoise-sunglasses",
    name: "Tortoise sunglasses",
    brand: "Ray-Ban",
    category: "Accessories",
    color: "Tortoise",
    seasons: ["Summer"],
    price: 145,
    wears: 19,
    lastWorn: "3 days ago",
    status: "Clean",
    art: { kind: "glasses", color: "#6b4a2f", detail: "#402c1b" },
    aspect: "aspect-square",
  },
  {
    id: "gold-pendant",
    name: "Gold pendant",
    brand: "Mejuri",
    category: "Accessories",
    color: "Gold",
    seasons: ["All year"],
    price: 190,
    wears: 30,
    lastWorn: "2 days ago",
    status: "Clean",
    art: { kind: "pendant", color: "#d9b979", detail: "#a8853f" },
    aspect: "aspect-[3/4]",
  },
];

/* Starter catalog shown in the outfit builder ("Popular clothes") — pieces
   most closets have, so a look can be finished even before everything's
   been added. Not counted in wardrobe stats. */
export const POPULAR_ITEMS: WardrobeItem[] = [
  {
    id: "pop-white-tee",
    name: "White tee",
    brand: "Popular",
    category: "Tops",
    color: "White",
    seasons: ["All year"],
    price: 20,
    wears: 0,
    lastWorn: "—",
    status: "Clean",
    art: { kind: "tee", color: "#f8f7f4", detail: "#c4c0b6" },
    aspect: "aspect-square",
  },
  {
    id: "pop-black-tee",
    name: "Black tee",
    brand: "Popular",
    category: "Tops",
    color: "Black",
    seasons: ["All year"],
    price: 20,
    wears: 0,
    lastWorn: "—",
    status: "Clean",
    art: { kind: "tee", color: "#2b2926", detail: "#141312" },
    aspect: "aspect-square",
  },
  {
    id: "pop-grey-hoodie",
    name: "Grey hoodie",
    brand: "Popular",
    category: "Outerwear",
    color: "Heather gray",
    seasons: ["Autumn", "Winter"],
    price: 55,
    wears: 0,
    lastWorn: "—",
    status: "Clean",
    art: { kind: "hoodie", color: "#b8b4ae", detail: "#84807a" },
    aspect: "aspect-square",
  },
  {
    id: "pop-light-jeans",
    name: "Light-wash jeans",
    brand: "Popular",
    category: "Bottoms",
    color: "Light blue",
    seasons: ["All year"],
    price: 60,
    wears: 0,
    lastWorn: "—",
    status: "Clean",
    art: { kind: "jeans", color: "#8ba3c0", detail: "#5f7a99" },
    aspect: "aspect-square",
  },
  {
    id: "pop-court-sneakers",
    name: "Court sneakers",
    brand: "Popular",
    category: "Shoes",
    color: "White",
    seasons: ["All year"],
    price: 90,
    wears: 0,
    lastWorn: "—",
    status: "Clean",
    art: { kind: "sneaker", color: "#f4f4f2", detail: "#adaba4" },
    aspect: "aspect-square",
  },
  {
    id: "pop-black-cap",
    name: "Black cap",
    brand: "Popular",
    category: "Accessories",
    color: "Black",
    seasons: ["All year"],
    price: 30,
    wears: 0,
    lastWorn: "—",
    status: "Clean",
    art: { kind: "cap", color: "#2e2c2a", detail: "#171615" },
    aspect: "aspect-square",
  },
];

export type Occasion = "Work" | "Weekend" | "Date night" | "Travel";

export const OCCASIONS: Occasion[] = [
  "Work",
  "Weekend",
  "Date night",
  "Travel",
];

export interface Outfit {
  id: string;
  name: string;
  occasion: Occasion;
  pieceIds: string[];
  wears: number;
  note: string;
}

export const OUTFITS: Outfit[] = [
  {
    id: "monday-uniform",
    name: "Monday uniform",
    occasion: "Work",
    pieceIds: ["silk-blouse", "wide-leg-trousers", "leather-loafers", "steel-watch"],
    wears: 8,
    note: "Polished without trying — the loafers keep it grounded.",
  },
  {
    id: "sunday-market",
    name: "Sunday market",
    occasion: "Weekend",
    pieceIds: ["charcoal-tee", "raw-denim", "white-sneakers", "canvas-tote"],
    wears: 14,
    note: "Your most-repeated look. It just works.",
  },
  {
    id: "golden-hour",
    name: "Golden hour",
    occasion: "Date night",
    pieceIds: ["linen-shirt", "linen-shorts", "white-sneakers", "tortoise-sunglasses"],
    wears: 5,
    note: "Light layers for a warm evening out.",
  },
  {
    id: "gallery-day",
    name: "Gallery day",
    occasion: "Weekend",
    pieceIds: ["striped-knit", "pleated-skirt", "suede-boots", "gold-pendant"],
    wears: 3,
    note: "Soft textures, quiet colors.",
  },
  {
    id: "rain-ready",
    name: "Rain ready",
    occasion: "Work",
    pieceIds: ["rain-shell", "charcoal-tee", "raw-denim", "white-sneakers"],
    wears: 4,
    note: "Dry on the commute, easy all day.",
  },
  {
    id: "city-break",
    name: "City break",
    occasion: "Travel",
    pieceIds: ["denim-jacket", "linen-shirt", "wide-leg-trousers", "white-sneakers"],
    wears: 6,
    note: "Walks, museums, dinner — one look does it all.",
  },
];

export interface WeatherDay {
  /** Short label, e.g. "Today", "Wed". */
  label: string;
  condition: "Sunny" | "Partly cloudy" | "Light rain" | "Cloudy";
  high: number;
  low: number;
}

export const FORECAST: WeatherDay[] = [
  { label: "Today", condition: "Partly cloudy", high: 31, low: 26 },
  { label: "Tomorrow", condition: "Light rain", high: 29, low: 25 },
  { label: "Wed", condition: "Light rain", high: 28, low: 25 },
  { label: "Thu", condition: "Cloudy", high: 30, low: 26 },
  { label: "Fri", condition: "Sunny", high: 33, low: 27 },
  { label: "Sat", condition: "Sunny", high: 34, low: 27 },
  { label: "Sun", condition: "Partly cloudy", high: 32, low: 26 },
];

/** Days of the current month with an outfit planned or logged. */
export const PLANNED_DAYS: Record<number, string> = {
  2: "sunday-market",
  4: "monday-uniform",
  8: "rain-ready",
  11: "golden-hour",
  15: "gallery-day",
  18: "city-break",
  22: "monday-uniform",
  26: "sunday-market",
};

export interface Trip {
  id: string;
  name: string;
  dates: string;
  outfitIds: string[];
  /** Non-wardrobe things to pack. */
  extras: string[];
}

export const TRIPS: Trip[] = [
  {
    id: "goa-weekend",
    name: "Goa weekend",
    dates: "18 – 20 Jul",
    outfitIds: ["golden-hour", "sunday-market"],
    extras: ["Sunscreen", "Charger", "Kindle"],
  },
  {
    id: "paris-trip",
    name: "Paris",
    dates: "2 – 9 Sep",
    outfitIds: ["city-break", "monday-uniform", "gallery-day"],
    extras: ["Passport", "Adapter", "Umbrella"],
  },
];

/* ---------- helpers ---------- */

export function getItem(id: string): WardrobeItem | undefined {
  return ITEMS.find((i) => i.id === id) ?? POPULAR_ITEMS.find((i) => i.id === id);
}

export function getOutfit(id: string): Outfit | undefined {
  return OUTFITS.find((o) => o.id === id);
}

export function getTrip(id: string): Trip | undefined {
  return TRIPS.find((t) => t.id === id);
}

/** Resolve an outfit's piece ids to items, skipping any stale ids. */
export function outfitPieces(outfit: Outfit): WardrobeItem[] {
  return outfit.pieceIds
    .map(getItem)
    .filter((i): i is WardrobeItem => i !== undefined);
}

export function costPerWear(itm: WardrobeItem): number {
  return itm.price / Math.max(itm.wears, 1);
}

export function formatPrice(value: number): string {
  return `$${Math.round(value) === value ? value : value.toFixed(2)}`;
}

export function outfitsFeaturing(itemId: string): Outfit[] {
  return OUTFITS.filter((o) => o.pieceIds.includes(itemId));
}

export const WARDROBE_VALUE = ITEMS.reduce((sum, i) => sum + i.price, 0);

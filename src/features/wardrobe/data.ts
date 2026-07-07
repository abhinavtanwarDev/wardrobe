import {
  Footprints,
  Gem,
  Glasses,
  Layers,
  Shirt,
  ShoppingBag,
  Watch,
  type LucideIcon,
} from "lucide-react";

/* Shared mock wardrobe dataset. Every screen (wardrobe, outfits, today,
   planner, insights) reads from here so counts, stats, and suggestions agree.
   Visuals are offline-safe CSS gradients until real item photos exist. */

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
  gradient: string;
  icon: LucideIcon;
  /** Tailwind aspect class for the masonry grid. */
  aspect: string;
}

const CATEGORY_ICON: Record<Category, LucideIcon> = {
  Tops: Shirt,
  Bottoms: Layers,
  Outerwear: Shirt,
  Shoes: Footprints,
  Accessories: Watch,
};

const item = (
  i: Omit<WardrobeItem, "icon"> & { icon?: LucideIcon },
): WardrobeItem => ({ icon: CATEGORY_ICON[i.category], ...i });

export const ITEMS: WardrobeItem[] = [
  item({
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
    gradient: "linear-gradient(150deg,#f5f5f4,#d6d3d1)",
    aspect: "aspect-[3/4]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#44403c,#292524)",
    aspect: "aspect-square",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#e7e5e4,#a8a29e)",
    aspect: "aspect-[3/5]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#efebe9,#d7ccc8)",
    aspect: "aspect-[3/4]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#d6d3d1,#a8a29e)",
    aspect: "aspect-[3/5]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#334155,#1e293b)",
    aspect: "aspect-[3/4]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#e5e7eb,#9ca3af)",
    aspect: "aspect-[3/5]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#efebe9,#bcaaa4)",
    aspect: "aspect-square",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#c7b8a5,#a68d6e)",
    aspect: "aspect-[3/5]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#93c5fd,#60a5fa)",
    aspect: "aspect-[3/4]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#64748b,#475569)",
    aspect: "aspect-[3/4]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#fafaf9,#d6d3d1)",
    aspect: "aspect-square",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#57534e,#292524)",
    aspect: "aspect-[4/5]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#bcaaa4,#8d6e63)",
    aspect: "aspect-[3/4]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#e7e5e4,#c7c2bd)",
    aspect: "aspect-square",
    icon: ShoppingBag,
  }),
  item({
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
    gradient: "linear-gradient(150deg,#cbd5e1,#94a3b8)",
    aspect: "aspect-[4/5]",
  }),
  item({
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
    gradient: "linear-gradient(150deg,#a8a29e,#78716c)",
    aspect: "aspect-square",
    icon: Glasses,
  }),
  item({
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
    gradient: "linear-gradient(150deg,#e7dbc7,#cbb27f)",
    aspect: "aspect-[3/4]",
    icon: Gem,
  }),
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
  return ITEMS.find((i) => i.id === id);
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

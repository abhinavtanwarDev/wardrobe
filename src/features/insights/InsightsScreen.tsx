"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { GarmentTile } from "@/components/ui/GarmentTile";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import {
  costPerWear,
  formatPrice,
  ITEMS,
  WARDROBE_VALUE,
  type WardrobeItem,
} from "@/features/wardrobe/data";

/* Editorial wardrobe stats — the numbers competitors bury in "engineer UI",
   presented like a magazine spread. All derived from the shared mock data. */

const WORN_OFTEN_THRESHOLD = 10;

const utilization =
  ITEMS.filter((i) => i.wears >= WORN_OFTEN_THRESHOLD).length / ITEMS.length;

const mostWorn = [...ITEMS].sort((a, b) => b.wears - a.wears).slice(0, 3);
const bestValue = [...ITEMS].sort((a, b) => costPerWear(a) - costPerWear(b)).slice(0, 3);
const barelyWorn = [...ITEMS].sort((a, b) => costPerWear(b) - costPerWear(a)).slice(0, 3);

/* Color story: bucket literal garment colors into families. The bar's colors
   ARE the data (your closet's palette), and every family is direct-labeled. */
const COLOR_FAMILIES: { name: string; swatch: string; match: (c: string) => boolean }[] = [
  {
    name: "Light neutrals",
    swatch: "#d6d3d1",
    match: (c) =>
      ["off-white", "ivory", "ecru", "stone", "sand", "white", "natural", "warm gray", "silver"].some(
        (n) => c.toLowerCase().includes(n),
      ),
  },
  {
    name: "Darks",
    swatch: "#44403c",
    match: (c) => ["charcoal", "ink", "espresso", "black"].some((n) => c.toLowerCase().includes(n)),
  },
  {
    name: "Earth tones",
    swatch: "#b08968",
    match: (c) => ["camel", "taupe", "tortoise", "gold"].some((n) => c.toLowerCase().includes(n)),
  },
  {
    name: "Blues",
    swatch: "#64748b",
    match: (c) => ["indigo", "blue", "slate"].some((n) => c.toLowerCase().includes(n)),
  },
];

const colorStory = COLOR_FAMILIES.map((family) => ({
  ...family,
  count: ITEMS.filter((i) => family.match(i.color)).length,
})).filter((f) => f.count > 0);

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const section: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 26 },
  },
};

function UtilizationRing({ value }: { value: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative grid h-24 w-24 place-items-center">
      <svg viewBox="0 0 84 84" className="h-24 w-24 -rotate-90">
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          strokeWidth="7"
          className="stroke-border"
        />
        <motion.circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - value) }}
          transition={{ delay: 0.4, type: "spring", stiffness: 60, damping: 20 }}
          className="stroke-accent"
        />
      </svg>
      <span className="absolute text-lg font-semibold">{Math.round(value * 100)}%</span>
    </div>
  );
}

function RankedRows({ items, metric }: { items: WardrobeItem[]; metric: (i: WardrobeItem) => string }) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/items/${item.id}`}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-2.5 shadow-sm active:bg-background"
        >
          <GarmentTile
            item={item}
            aspect="aspect-square"
            className="h-14 w-14 shrink-0 rounded-xl shadow-sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-medium">{item.name}</p>
            <p className="truncate text-sm text-muted">{item.brand}</p>
          </div>
          <p className="shrink-0 text-sm font-semibold">{metric(item)}</p>
        </Link>
      ))}
    </div>
  );
}

export function InsightsScreen() {
  const totalPieces = colorStory.reduce((sum, f) => sum + f.count, 0);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <ScreenHeader
          title="In numbers"
          subtitle="What your closet is quietly telling you"
          backHref="/profile"
        />

        <motion.div variants={list} initial="hidden" animate="show">
          {/* Hero: value + utilization */}
          <motion.div
            variants={section}
            className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm"
          >
            <div>
              <p className="text-sm font-medium text-muted">Wardrobe value</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight">
                ${WARDROBE_VALUE.toLocaleString()}
              </p>
              <p className="mt-2 text-sm leading-snug text-muted">
                You reach for{" "}
                <span className="font-semibold text-foreground">
                  {Math.round(utilization * 100)}%
                </span>{" "}
                of your {ITEMS.length} pieces
              </p>
            </div>
            <UtilizationRing value={utilization} />
          </motion.div>

          {/* Most worn */}
          <motion.section variants={section} className="mt-7">
            <h2 className="text-lg font-semibold tracking-tight">Working hardest</h2>
            <p className="mt-0.5 text-sm text-muted">Your most-worn pieces</p>
            <RankedRows items={mostWorn} metric={(i) => `${i.wears} wears`} />
          </motion.section>

          {/* Best cost per wear */}
          <motion.section variants={section} className="mt-7">
            <h2 className="text-lg font-semibold tracking-tight">Best value</h2>
            <p className="mt-0.5 text-sm text-muted">Lowest cost per wear</p>
            <RankedRows items={bestValue} metric={(i) => `${formatPrice(costPerWear(i))}/wear`} />
          </motion.section>

          {/* Barely worn */}
          <motion.section variants={section} className="mt-7">
            <h2 className="text-lg font-semibold tracking-tight">Barely worn</h2>
            <p className="mt-0.5 text-sm text-muted">Wear them once and the math improves</p>
            <RankedRows items={barelyWorn} metric={(i) => `${formatPrice(costPerWear(i))}/wear`} />
          </motion.section>

          {/* Color story */}
          <motion.section variants={section} className="mt-7">
            <h2 className="text-lg font-semibold tracking-tight">Your color story</h2>
            <p className="mt-0.5 text-sm text-muted">The palette you actually own</p>
            <div className="mt-4 rounded-3xl border border-border bg-card p-4 shadow-sm">
              <div className="flex h-4 gap-0.5 overflow-hidden rounded-full">
                {colorStory.map((family) => (
                  <motion.div
                    key={family.name}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 22 }}
                    style={{
                      width: `${(family.count / totalPieces) * 100}%`,
                      backgroundColor: family.swatch,
                      transformOrigin: "left",
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {colorStory.map((family) => (
                  <div key={family.name} className="flex items-center gap-3">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-black/10"
                      style={{ backgroundColor: family.swatch }}
                    />
                    <span className="flex-1 text-sm font-medium">{family.name}</span>
                    <span className="text-sm text-muted">
                      {family.count} {family.count === 1 ? "piece" : "pieces"} ·{" "}
                      {Math.round((family.count / totalPieces) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}

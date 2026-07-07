"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Plus, Search, SearchX, X } from "lucide-react";
import { useMemo, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { GarmentTile } from "@/components/ui/GarmentTile";
import { RoundIconButton } from "@/components/ui/RoundIconButton";
import { CategoryChips } from "@/features/welcome/CategoryChips";
import { CATEGORIES, ITEMS, OUTFITS } from "@/features/wardrobe/data";

const MotionLink = motion.create(Link);

const FILTERS = ["All", ...CATEGORIES];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export function HomeScreen() {
  const [filter, setFilter] = useState(0);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () =>
      filter === 0
        ? ITEMS
        : ITEMS.filter((i) => i.category === FILTERS[filter]),
    [filter],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.brand.toLowerCase().includes(q) ||
        i.color.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-32">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="mb-6 flex items-start justify-between"
        >
          <div>
            <p className="text-sm font-medium text-muted-2">Good to see you</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Your Wardrobe
            </h1>
            <p className="mt-1 text-sm text-muted">
              {ITEMS.length} pieces · {OUTFITS.length} looks
            </p>
          </div>
          <RoundIconButton
            icon={Search}
            label="Search wardrobe"
            onClick={() => setSearching(true)}
          />
        </motion.header>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 220, damping: 24 }}
          className="mb-6"
        >
          <CategoryChips
            items={FILTERS}
            layoutId="home-collections"
            value={filter}
            onChange={setFilter}
          />
        </motion.div>

        {/* Masonry grid — re-staggers on filter change */}
        <motion.div
          key={filter}
          variants={grid}
          initial="hidden"
          animate="show"
          className="columns-2 gap-3 [column-fill:_balance]"
        >
          {visible.map((item) => (
            <MotionLink
              key={item.id}
              href={`/items/${item.id}`}
              variants={tile}
              whileTap={{ scale: 0.97 }}
              className="mb-3 block break-inside-avoid"
            >
              <GarmentTile item={item} label />
            </MotionLink>
          ))}
        </motion.div>
      </div>

      {/* Floating add button */}
      <MotionLink
        href="/items/new"
        aria-label="Add a piece"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="fixed right-5 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-40 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-xl shadow-accent/30"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </MotionLink>

      {/* Search overlay */}
      <AnimatePresence>
        {searching && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex flex-col bg-background px-5 pt-[calc(env(safe-area-inset-top)+1rem)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 flex-1 items-center gap-2.5 rounded-full border border-border bg-card px-4 shadow-sm">
                <Search className="h-5 w-5 shrink-0 text-muted" strokeWidth={2} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, brand, or color"
                  className="w-full bg-transparent text-base outline-none placeholder:text-muted-2"
                />
              </div>
              <RoundIconButton
                icon={X}
                label="Close search"
                onClick={() => {
                  setSearching(false);
                  setQuery("");
                }}
              />
            </div>

            <div className="no-scrollbar mt-5 flex-1 overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
              {results.length === 0 ? (
                <div className="flex flex-col items-center px-8 pt-20 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border border-border bg-card shadow-sm">
                    <SearchX className="h-7 w-7 text-muted" strokeWidth={1.5} />
                  </div>
                  <p className="mt-4 text-base font-semibold">Nothing matches</p>
                  <p className="mt-1 text-sm text-muted">
                    Try a different word — or add it to your wardrobe.
                  </p>
                </div>
              ) : (
                <motion.ul variants={grid} initial="hidden" animate="show">
                  {results.map((item) => (
                    <motion.li key={item.id} variants={tile}>
                      <Link
                        href={`/items/${item.id}`}
                        className="flex items-center gap-4 rounded-2xl px-2 py-2.5 active:bg-card"
                      >
                        <GarmentTile
                          item={item}
                          aspect="aspect-square"
                          className="h-14 w-14 rounded-xl shadow-sm"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-base font-medium">{item.name}</p>
                          <p className="truncate text-sm text-muted">
                            {item.brand} · {item.category}
                          </p>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav active="wardrobe" />
    </div>
  );
}

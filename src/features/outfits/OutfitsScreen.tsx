"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Plus, Shuffle } from "lucide-react";
import { useMemo, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { OutfitCollage } from "@/components/ui/OutfitCollage";
import { CategoryChips } from "@/features/welcome/CategoryChips";
import { OCCASIONS, OUTFITS } from "@/features/wardrobe/data";

const MotionLink = motion.create(Link);

const FILTERS = ["All", ...OCCASIONS];

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

export function OutfitsScreen() {
  const [filter, setFilter] = useState(0);

  const visible = useMemo(
    () =>
      filter === 0
        ? OUTFITS
        : OUTFITS.filter((o) => o.occasion === FILTERS[filter]),
    [filter],
  );

  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-32">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="mb-6"
        >
          <p className="text-sm font-medium text-muted-2">Put together</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Your Looks</h1>
          <p className="mt-1 text-sm text-muted">{OUTFITS.length} saved looks</p>
        </motion.header>

        {/* Dress-me banner */}
        <MotionLink
          href="/outfits/new"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, type: "spring", stiffness: 220, damping: 24 }}
          whileTap={{ scale: 0.98 }}
          className="mb-6 flex items-center justify-between rounded-3xl bg-foreground p-5 text-background shadow-lg shadow-black/15"
        >
          <div>
            <p className="text-lg font-semibold">Dress me</p>
            <p className="mt-0.5 text-sm opacity-70">
              Shuffle your closet into something new
            </p>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-background text-foreground">
            <Shuffle className="h-5 w-5" strokeWidth={2} />
          </span>
        </MotionLink>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 24 }}
          className="mb-6"
        >
          <CategoryChips
            items={FILTERS}
            layoutId="outfit-occasions"
            value={filter}
            onChange={setFilter}
          />
        </motion.div>

        {/* Looks grid */}
        <motion.div
          key={filter}
          variants={grid}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3"
        >
          {visible.map((outfit) => (
            <MotionLink
              key={outfit.id}
              href={`/outfits/${outfit.id}`}
              variants={tile}
              whileTap={{ scale: 0.97 }}
              className="block"
            >
              <OutfitCollage outfit={outfit} />
              <p className="mt-2 truncate text-sm font-medium">{outfit.name}</p>
              <p className="text-xs text-muted">
                {outfit.occasion} · worn {outfit.wears}×
              </p>
            </MotionLink>
          ))}
        </motion.div>
      </div>

      {/* Create look FAB */}
      <MotionLink
        href="/outfits/new"
        aria-label="Create a look"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="fixed right-5 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-40 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-xl shadow-accent/30"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </MotionLink>

      <BottomNav active="outfits" />
    </div>
  );
}

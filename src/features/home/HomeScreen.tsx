"use client";

import { motion, type Variants } from "framer-motion";
import {
  Footprints,
  Plus,
  Search,
  Shirt,
  ShoppingBag,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategoryChips } from "@/features/welcome/CategoryChips";

const COLLECTIONS = ["All", "Paris Trip", "Summer", "Work", "Weekend"];

interface Piece {
  gradient: string;
  aspect: string; // tailwind aspect ratio for a masonry feel
  icon: LucideIcon;
}

const PIECES: Piece[] = [
  { gradient: "linear-gradient(150deg,#e7e5e4,#a8a29e)", aspect: "aspect-[3/4]", icon: Shirt },
  { gradient: "linear-gradient(150deg,#292524,#57534e)", aspect: "aspect-[3/5]", icon: ShoppingBag },
  { gradient: "linear-gradient(150deg,#efebe9,#bcaaa4)", aspect: "aspect-square", icon: Watch },
  { gradient: "linear-gradient(150deg,#dbeafe,#93c5fd)", aspect: "aspect-[3/4]", icon: Footprints },
  { gradient: "linear-gradient(150deg,#f5f5f4,#d6d3d1)", aspect: "aspect-[3/5]", icon: Shirt },
  { gradient: "linear-gradient(150deg,#d6d3d1,#78716c)", aspect: "aspect-square", icon: ShoppingBag },
  { gradient: "linear-gradient(150deg,#e5e7eb,#9ca3af)", aspect: "aspect-[3/4]", icon: Watch },
  { gradient: "linear-gradient(150deg,#c7c2bd,#8a8580)", aspect: "aspect-[4/5]", icon: Footprints },
  { gradient: "linear-gradient(150deg,#efebe9,#bcaaa4)", aspect: "aspect-[3/4]", icon: Shirt },
  { gradient: "linear-gradient(150deg,#e7e5e4,#a8a29e)", aspect: "aspect-square", icon: ShoppingBag },
];

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
            <p className="mt-1 text-sm text-muted">42 pieces · 6 collections</p>
          </div>
          <motion.button
            type="button"
            aria-label="Search wardrobe"
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card shadow-sm"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </motion.button>
        </motion.header>

        {/* Collections */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 220, damping: 24 }}
          className="mb-6"
        >
          <CategoryChips items={COLLECTIONS} layoutId="home-collections" />
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          variants={grid}
          initial="hidden"
          animate="show"
          className="columns-2 gap-3 [column-fill:_balance]"
        >
          {PIECES.map((piece, i) => {
            const Icon = piece.icon;
            return (
              <motion.button
                key={i}
                type="button"
                variants={tile}
                whileTap={{ scale: 0.97 }}
                className={`mb-3 grid w-full break-inside-avoid place-items-center overflow-hidden rounded-2xl shadow-md shadow-black/10 ring-1 ring-black/5 ${piece.aspect}`}
                style={{ backgroundImage: piece.gradient }}
              >
                <Icon
                  className="h-8 w-8 text-white/70 mix-blend-overlay"
                  strokeWidth={1.5}
                />
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Floating add button */}
      <motion.button
        type="button"
        aria-label="Add a piece"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="fixed right-5 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-40 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-xl shadow-accent/30"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </motion.button>

      <BottomNav active="wardrobe" />
    </div>
  );
}

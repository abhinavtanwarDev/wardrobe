"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { GarmentTile } from "@/components/ui/GarmentTile";
import { OutfitCollage } from "@/components/ui/OutfitCollage";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import {
  getItem,
  getOutfit,
  type Trip,
  type WardrobeItem,
} from "@/features/wardrobe/data";
import { cn } from "@/lib/cn";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

interface TripPackingScreenProps {
  trip: Trip;
}

export function TripPackingScreen({ trip }: TripPackingScreenProps) {
  const outfits = useMemo(
    () => trip.outfitIds.map(getOutfit).filter((o) => o !== undefined),
    [trip],
  );

  // The checklist auto-populates from the trip's looks — pieces first, extras after.
  const pieces = useMemo(() => {
    const seen = new Map<string, WardrobeItem>();
    for (const outfit of outfits) {
      for (const id of outfit.pieceIds) {
        const item = getItem(id);
        if (item) seen.set(id, item);
      }
    }
    return [...seen.values()];
  }, [outfits]);

  const [packed, setPacked] = useState<Set<string>>(new Set());
  const total = pieces.length + trip.extras.length;
  const progress = total === 0 ? 0 : packed.size / total;

  const toggle = (key: string) =>
    setPacked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const CheckRow = ({
    id,
    title,
    subtitle,
    visual,
  }: {
    id: string;
    title: string;
    subtitle?: string;
    visual?: React.ReactNode;
  }) => {
    const done = packed.has(id);
    return (
      <motion.button
        type="button"
        variants={row}
        whileTap={{ scale: 0.98 }}
        onClick={() => toggle(id)}
        className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-2.5 text-left shadow-sm"
      >
        {visual ?? (
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-background ring-1 ring-border">
            <Plus className="h-5 w-5 rotate-45 text-muted-2" strokeWidth={2} />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block truncate text-base font-medium transition-colors",
              done && "text-muted line-through",
            )}
          >
            {title}
          </span>
          {subtitle && <span className="block truncate text-sm text-muted">{subtitle}</span>}
        </span>
        <motion.span
          animate={{
            backgroundColor: done ? "var(--accent)" : "rgba(0,0,0,0)",
            scale: done ? 1 : 0.96,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center rounded-full",
            done ? "text-accent-foreground" : "ring-1 ring-border-strong",
          )}
        >
          {done && <Check className="h-4 w-4" strokeWidth={3} />}
        </motion.span>
      </motion.button>
    );
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <ScreenHeader title={trip.name} subtitle={trip.dates} backHref="/planner" />

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          className="mb-6 rounded-3xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="flex items-baseline justify-between">
            <p className="text-base font-semibold">
              {packed.size === total && total > 0 ? "All packed" : "Packing"}
            </p>
            <p className="text-sm text-muted">
              {packed.size} of {total}
            </p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-background ring-1 ring-border">
            <motion.div
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
              className="h-full rounded-full bg-accent"
            />
          </div>
        </motion.div>

        {/* The looks going along */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, type: "spring", stiffness: 240, damping: 26 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold tracking-tight">The looks going along</h2>
          <div className="no-scrollbar -mx-5 mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
            {outfits.map((outfit) => (
              <div key={outfit.id} className="w-28 shrink-0 snap-start">
                <OutfitCollage outfit={outfit} />
                <p className="mt-2 truncate text-sm font-medium">{outfit.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Checklist */}
        <motion.div variants={list} initial="hidden" animate="show" className="flex flex-col gap-2">
          <motion.h2 variants={row} className="mb-1 text-lg font-semibold tracking-tight">
            To pack
          </motion.h2>
          {pieces.map((piece) => (
            <CheckRow
              key={piece.id}
              id={piece.id}
              title={piece.name}
              subtitle={`${piece.brand} · ${piece.category}`}
              visual={
                <GarmentTile
                  item={piece}
                  aspect="aspect-square"
                  className="h-14 w-14 shrink-0 rounded-xl shadow-sm"
                />
              }
            />
          ))}
          {trip.extras.map((extra) => (
            <CheckRow key={extra} id={extra} title={extra} subtitle="Essentials" />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

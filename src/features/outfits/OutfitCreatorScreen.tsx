"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Lock,
  LockOpen,
  Shuffle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { GarmentTile } from "@/components/ui/GarmentTile";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ITEMS, OCCASIONS, type WardrobeItem } from "@/features/wardrobe/data";
import { cn } from "@/lib/cn";

/* Whering-style "Dress Me": one slider per garment slot, shuffle the rest,
   lock what you love. Slot-aware so a shuffle never pairs two tops. */

interface Slot {
  key: string;
  label: string;
  items: WardrobeItem[];
}

const SLOTS: Slot[] = [
  { key: "top", label: "Top", items: ITEMS.filter((i) => i.category === "Tops") },
  { key: "bottom", label: "Bottom", items: ITEMS.filter((i) => i.category === "Bottoms") },
  { key: "shoes", label: "Shoes", items: ITEMS.filter((i) => i.category === "Shoes") },
  {
    key: "accessory",
    label: "Accessory",
    items: ITEMS.filter((i) => i.category === "Accessories"),
  },
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 26 },
  },
};

export function OutfitCreatorScreen() {
  const router = useRouter();
  const [indices, setIndices] = useState<number[]>(SLOTS.map(() => 0));
  const [locked, setLocked] = useState<boolean[]>(SLOTS.map(() => false));
  const [direction, setDirection] = useState(1);
  const [spins, setSpins] = useState(0);
  const [saving, setSaving] = useState(false);
  const [occasion, setOccasion] = useState(0);

  const step = (slot: number, dir: number) => {
    setDirection(dir);
    setIndices((prev) =>
      prev.map((idx, i) =>
        i === slot
          ? (idx + dir + SLOTS[i].items.length) % SLOTS[i].items.length
          : idx,
      ),
    );
  };

  const shuffle = () => {
    setDirection(1);
    setSpins((s) => s + 1);
    setIndices((prev) =>
      prev.map((idx, i) => {
        const count = SLOTS[i].items.length;
        if (locked[i] || count < 2) return idx;
        // Land on a different piece every spin.
        return (idx + 1 + Math.floor(Math.random() * (count - 1))) % count;
      }),
    );
  };

  const toggleLock = (slot: number) =>
    setLocked((prev) => prev.map((l, i) => (i === slot ? !l : l)));

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <ScreenHeader
          title="Dress me"
          subtitle="Spin the closet. Lock what you love."
          backHref="/outfits"
        />

        <motion.div variants={list} initial="hidden" animate="show" className="flex flex-col gap-3">
          {SLOTS.map((slot, s) => {
            const item = slot.items[indices[s]];
            const isLocked = locked[s];
            return (
              <motion.div
                key={slot.key}
                variants={row}
                className={cn(
                  "relative flex items-center gap-2 rounded-3xl border border-border bg-card p-3 shadow-sm transition-colors",
                  isLocked && "border-border-strong",
                )}
              >
                <motion.button
                  type="button"
                  aria-label={`Previous ${slot.label.toLowerCase()}`}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => step(s, -1)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                </motion.button>

                {/* Sliding piece */}
                <div className="flex min-w-0 flex-1 items-center gap-3.5 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={item.id}
                      initial={{ x: direction * 72, opacity: 0, scale: 0.9 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ x: direction * -72, opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 340, damping: 28 }}
                      className="flex min-w-0 items-center gap-3.5"
                    >
                      <GarmentTile
                        item={item}
                        aspect="aspect-square"
                        className="h-18 w-18 shrink-0 rounded-2xl"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-2 uppercase tracking-wide">
                          {slot.label}
                        </p>
                        <p className="truncate text-base font-semibold">{item.name}</p>
                        <p className="truncate text-sm text-muted">{item.brand}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.button
                  type="button"
                  aria-label={`Next ${slot.label.toLowerCase()}`}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => step(s, 1)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2} />
                </motion.button>

                <motion.button
                  type="button"
                  aria-label={isLocked ? `Unlock ${slot.label}` : `Lock ${slot.label}`}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleLock(s)}
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                    isLocked ? "bg-foreground text-background" : "bg-background text-muted ring-1 ring-border",
                  )}
                >
                  {isLocked ? (
                    <Lock className="h-4.5 w-4.5" strokeWidth={2} />
                  ) : (
                    <LockOpen className="h-4.5 w-4.5" strokeWidth={2} />
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Shuffle + save */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 240, damping: 26 }}
          className="mt-8 flex flex-col gap-3"
        >
          <motion.button
            type="button"
            onClick={shuffle}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-accent text-base font-semibold text-accent-foreground shadow-xl shadow-accent/30"
          >
            <motion.span
              key={spins}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Shuffle className="h-5 w-5" strokeWidth={2} />
            </motion.span>
            Shuffle
          </motion.button>
          <ArrowPill label="Save this look" onClick={() => setSaving(true)} variant="outline" icon={Check} />
        </motion.div>
      </div>

      {/* Save sheet */}
      <AnimatePresence>
        {saving && (
          <>
            <motion.button
              type="button"
              aria-label="Close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSaving(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-border bg-card px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] shadow-2xl"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border-strong" />
              <h2 className="text-xl font-semibold tracking-tight">Name this look</h2>
              <input
                autoFocus
                placeholder="Something you'd actually call it"
                className="mt-4 w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-base outline-none placeholder:text-muted-2 focus:border-border-strong"
              />
              <p className="mt-5 mb-2.5 text-sm font-medium text-muted">Occasion</p>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((o, i) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOccasion(i)}
                    className={cn(
                      "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                      i === occasion
                        ? "bg-foreground text-background"
                        : "border border-border-strong",
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <ArrowPill label="Save look" onClick={() => router.push("/outfits")} icon={Check} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

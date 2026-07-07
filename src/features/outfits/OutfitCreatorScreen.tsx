"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Lock,
  LockOpen,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { GarmentTile } from "@/components/ui/GarmentTile";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SaveLookSheet } from "@/features/outfits/SaveLookSheet";
import {
  ITEMS,
  POPULAR_ITEMS,
  type WardrobeItem,
} from "@/features/wardrobe/data";
import { cn } from "@/lib/cn";

/* Two ways to build a look, per the best competitor patterns:
   - "Dress me" (Whering): one slider per garment slot, shuffle, lock.
   - "Hand pick" (Fits): multi-select grid over your closet plus a
     starter catalog, with suggestions quietly pre-selecting a combo. */

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

const MODES = [
  { key: "shuffle", label: "Dress me" },
  { key: "pick", label: "Hand pick" },
] as const;

type Mode = (typeof MODES)[number]["key"];

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

function SelectableTile({
  item,
  selected,
  onToggle,
}: {
  item: WardrobeItem;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="relative text-left"
      aria-pressed={selected}
      aria-label={item.name}
    >
      <GarmentTile
        item={item}
        aspect="aspect-square"
        className={cn(selected && "ring-2 ring-accent")}
      />
      <motion.span
        animate={{ scale: selected ? 1 : 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 24 }}
        className={cn(
          "absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full",
          selected
            ? "bg-accent text-accent-foreground"
            : "bg-card/90 ring-1 ring-border-strong",
        )}
      >
        {selected && <Check className="h-4 w-4" strokeWidth={3} />}
      </motion.span>
      <p className="mt-1.5 truncate text-xs font-medium">{item.name}</p>
    </motion.button>
  );
}

export function OutfitCreatorScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("shuffle");

  // Dress-me state
  const [indices, setIndices] = useState<number[]>(SLOTS.map(() => 0));
  const [locked, setLocked] = useState<boolean[]>(SLOTS.map(() => false));
  const [direction, setDirection] = useState(1);
  const [spins, setSpins] = useState(0);

  // Hand-pick state
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [suggested, setSuggested] = useState(false);

  const [saving, setSaving] = useState(false);

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

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // One tap, one wearable combo — slot-aware so it never picks two tops.
  const suggest = () => {
    const picks = SLOTS.map(
      (slot) => slot.items[Math.floor(Math.random() * slot.items.length)].id,
    );
    setSelected(new Set(picks));
    setSuggested(true);
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+7rem)]">
        <ScreenHeader
          title="Create a look"
          subtitle={
            mode === "shuffle"
              ? "Spin the closet. Lock what you love."
              : "Pick the pieces. We'll keep up."
          }
          backHref="/outfits"
        />

        {/* Mode toggle */}
        <div className="mb-6 flex rounded-full border border-border bg-card p-1 shadow-sm">
          {MODES.map((m) => {
            const isActive = m.key === mode;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setMode(m.key)}
                className={cn(
                  "relative h-11 flex-1 rounded-full text-sm font-medium",
                  isActive ? "text-background" : "text-muted",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="creator-mode"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-foreground"
                  />
                )}
                <span className="relative z-10">{m.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {mode === "shuffle" ? (
            <motion.div
              key="shuffle"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
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
                          isLocked
                            ? "bg-foreground text-background"
                            : "bg-background text-muted ring-1 ring-border",
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

              <div className="mt-8 flex flex-col gap-3">
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
                <ArrowPill
                  label="Save this look"
                  onClick={() => setSaving(true)}
                  variant="outline"
                  icon={Check}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pick"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Quick actions */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-card px-4 py-5 shadow-sm"
                >
                  <Camera className="h-6 w-6" strokeWidth={1.75} />
                  <span className="text-sm font-medium">Selfie</span>
                  <span className="text-xs text-muted">Log the whole look</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={suggest}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-card px-4 py-5 shadow-sm"
                >
                  <Sparkles className="h-6 w-6" strokeWidth={1.75} />
                  <span className="text-sm font-medium">Suggestions</span>
                  <span className="text-xs text-muted">
                    {suggested ? "Another combo? Tap again" : "We'll pick a combo"}
                  </span>
                </motion.button>
              </div>

              {/* Your clothes */}
              <section>
                <h2 className="text-lg font-semibold tracking-tight">Your clothes</h2>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {ITEMS.map((item) => (
                    <SelectableTile
                      key={item.id}
                      item={item}
                      selected={selected.has(item.id)}
                      onToggle={() => toggle(item.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Popular clothes */}
              <section className="mt-8">
                <h2 className="text-lg font-semibold tracking-tight">Popular clothes</h2>
                <p className="mt-0.5 text-sm text-muted">
                  Basics most closets have — yours the moment you use one
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {POPULAR_ITEMS.map((item) => (
                    <SelectableTile
                      key={item.id}
                      item={item}
                      selected={selected.has(item.id)}
                      onToggle={() => toggle(item.id)}
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky save bar for hand-pick mode */}
      <AnimatePresence>
        {mode === "pick" && selected.size > 0 && !saving && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)]"
          >
            <motion.button
              type="button"
              onClick={() => setSaving(true)}
              whileTap={{ scale: 0.96 }}
              className="flex h-14 w-full max-w-md items-center justify-between rounded-full bg-foreground py-2 pr-2 pl-6 text-base font-medium text-background shadow-xl shadow-black/25"
            >
              <span>
                {selected.size} {selected.size === 1 ? "piece" : "pieces"} picked
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-background text-foreground">
                <Check className="h-5 w-5" strokeWidth={2} />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <SaveLookSheet
        open={saving}
        onClose={() => setSaving(false)}
        onSave={() => router.push("/outfits")}
      />
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { OCCASIONS } from "@/features/wardrobe/data";
import { cn } from "@/lib/cn";

const WEAR_OPTIONS = ["Today", "Tomorrow", "Just save"];

interface SaveLookSheetProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

/** Bottom sheet for naming a look, tagging its occasion, and optionally
    dropping it straight onto the planner (Fits-style "Today"). */
export function SaveLookSheet({ open, onClose, onSave }: SaveLookSheetProps) {
  const [occasion, setOccasion] = useState(0);
  const [wearOn, setWearOn] = useState(0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
            <p className="mt-5 mb-2.5 text-sm font-medium text-muted">Wear it</p>
            <div className="flex flex-wrap gap-2">
              {WEAR_OPTIONS.map((w, i) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWearOn(i)}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                    i === wearOn
                      ? "bg-foreground text-background"
                      : "border border-border-strong",
                  )}
                >
                  {w}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <ArrowPill
                label={wearOn === 2 ? "Save look" : `Save & plan for ${WEAR_OPTIONS[wearOn].toLowerCase()}`}
                onClick={onSave}
                icon={Check}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

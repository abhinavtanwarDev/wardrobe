"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";

const DEFAULT_CATEGORIES = [
  "Shots",
  "Ads",
  "Stories",
  "Street style",
  "Portraits",
  "Editorial",
];

interface CategoryChipsProps {
  items?: string[];
  /** Unique id so multiple chip rows don't share the same sliding indicator. */
  layoutId?: string;
  className?: string;
}

/** Horizontal snap-scroll category filter. The active chip fills; others stay outlined. */
export function CategoryChips({
  items = DEFAULT_CATEGORIES,
  layoutId = "chip-active",
  className,
}: CategoryChipsProps) {
  const [active, setActive] = useState(0);

  return (
    <div
      className={cn(
        "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1",
        className,
      )}
    >
      {items.map((label, i) => {
        const isActive = i === active;
        return (
          <motion.button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "relative shrink-0 snap-start rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
              isActive
                ? "text-background"
                : "border border-border-strong text-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-foreground"
              />
            )}
            <span className="relative z-10">{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

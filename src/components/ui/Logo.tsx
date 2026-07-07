"use client";

import { motion } from "framer-motion";
import { Shirt } from "lucide-react";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** Play the entrance animation (used by the splash screen). */
  animated?: boolean;
  className?: string;
}

/** App wordmark: a squircle mark + name. Swap the glyph/name to rebrand. */
export function Logo({ animated = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.div
        initial={animated ? { scale: 0.5, opacity: 0, rotate: -12 } : false}
        animate={animated ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="grid h-12 w-12 place-items-center rounded-2xl bg-foreground text-background shadow-lg shadow-black/15"
      >
        <Shirt className="h-6 w-6" strokeWidth={2} />
      </motion.div>
      <motion.span
        initial={animated ? { opacity: 0, x: -10 } : false}
        animate={animated ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.28, type: "spring", stiffness: 200, damping: 22 }}
        className="text-2xl font-semibold tracking-tight"
      >
        Wardrobe
      </motion.span>
    </div>
  );
}

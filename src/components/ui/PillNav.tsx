"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Floating dark pill navigation: menu, theme toggle, and a live scroll-progress
 * readout. Sits below the top safe-area inset so it clears notches.
 */
export function PillNav() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(Math.round(v * 100));
  });

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.1 }}
      className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+0.75rem)] z-50 flex justify-center px-4"
    >
      <div className="flex items-center gap-1 rounded-full bg-nav p-1.5 pl-2 text-nav-foreground shadow-lg shadow-black/10 backdrop-blur">
        <motion.button
          type="button"
          aria-label="Open menu"
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors hover:bg-white/10"
        >
          <Menu className="h-[18px] w-[18px]" strokeWidth={2} />
          <span>Menu</span>
        </motion.button>

        <ThemeToggle />

        <div className="ml-0.5 grid h-9 min-w-[3rem] place-items-center rounded-full bg-white/10 px-3 text-sm font-semibold tabular-nums">
          {progress}%
        </div>
      </div>
    </motion.nav>
  );
}

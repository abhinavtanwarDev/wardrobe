"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

interface ThemeToggleProps {
  className?: string;
}

/** Circular dark/light toggle with an animated icon swap. Lives inside the pill nav. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full",
        "text-[color:var(--nav-foreground)]",
        "transition-colors hover:bg-white/10",
        className,
      )}
    >
      <span className="relative grid h-5 w-5 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 grid place-items-center"
          >
            {isDark ? (
              <Sun className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Moon className="h-5 w-5" strokeWidth={2} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

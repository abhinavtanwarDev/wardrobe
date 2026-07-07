"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Sparkles, User, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface NavItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

const ITEMS: NavItem[] = [
  { key: "wardrobe", label: "Wardrobe", icon: LayoutGrid },
  { key: "feed", label: "Feed", icon: Sparkles },
  { key: "account", label: "Account", icon: User },
];

interface BottomNavProps {
  active?: string;
}

/** Fixed bottom navigation with an animated active pill. Sits above the home indicator. */
export function BottomNav({ active = "wardrobe" }: BottomNavProps) {
  const [current, setCurrent] = useState(active);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl">
        {ITEMS.map((item) => {
          const isActive = item.key === current;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.key}
              type="button"
              onClick={() => setCurrent(item.key)}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium",
                isActive ? "text-background" : "text-muted",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bottomnav-active"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-foreground"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="h-5 w-5" strokeWidth={2} />
                {isActive && <span>{item.label}</span>}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarDays,
  LayoutGrid,
  Layers,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";

const MotionLink = motion.create(Link);

export type NavKey = "today" | "wardrobe" | "outfits" | "planner" | "profile";

interface NavItem {
  key: NavKey;
  label: string;
  icon: LucideIcon;
  href: string;
}

const ITEMS: NavItem[] = [
  { key: "today", label: "Today", icon: Sparkles, href: "/today" },
  { key: "wardrobe", label: "Wardrobe", icon: LayoutGrid, href: "/home" },
  { key: "outfits", label: "Outfits", icon: Layers, href: "/outfits" },
  { key: "planner", label: "Planner", icon: CalendarDays, href: "/planner" },
  { key: "profile", label: "Profile", icon: User, href: "/profile" },
];

interface BottomNavProps {
  active: NavKey;
}

/** Fixed bottom navigation with an animated active pill. Sits above the home indicator. */
export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <div className="flex items-center gap-0.5 rounded-full border border-border bg-card/80 p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl">
        {ITEMS.map((item) => {
          const isActive = item.key === active;
          const Icon = item.icon;
          return (
            <MotionLink
              key={item.key}
              href={item.href}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
              className={`relative flex h-11 items-center gap-1.5 rounded-full text-sm font-medium ${
                isActive ? "px-3.5 text-background" : "px-3 text-muted"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="bottomnav-active"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-foreground"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="h-5 w-5" strokeWidth={2} />
                {isActive && <span>{item.label}</span>}
              </span>
            </MotionLink>
          );
        })}
      </div>
    </nav>
  );
}

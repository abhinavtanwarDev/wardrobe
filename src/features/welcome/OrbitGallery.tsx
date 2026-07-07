"use client";

import { motion, type Variants } from "framer-motion";
import {
  Footprints,
  Paperclip,
  Shirt,
  ShoppingBag,
  Watch,
  type LucideIcon,
} from "lucide-react";

/** One orbiting garment tile. Positions are hand-tuned for an editorial, scattered ring. */
interface OrbitItem {
  angle: number; // degrees, 0 = right, -90 = top
  radius: number; // % of container half-size
  size: number; // % of container width
  radiusStyle: string; // per-tile border radius for an organic squircle feel
  gradient: string;
  icon: LucideIcon;
}

const ITEMS: OrbitItem[] = [
  {
    angle: -90,
    radius: 78,
    size: 26,
    radiusStyle: "42% 58% 55% 45% / 55% 42% 58% 45%",
    gradient: "linear-gradient(135deg,#e7e5e4,#a8a29e)",
    icon: Shirt,
  },
  {
    angle: -45,
    radius: 88,
    size: 30,
    radiusStyle: "58% 42% 45% 55% / 45% 55% 45% 55%",
    gradient: "linear-gradient(135deg,#292524,#57534e)",
    icon: ShoppingBag,
  },
  {
    angle: 0,
    radius: 82,
    size: 25,
    radiusStyle: "48% 52% 40% 60% / 60% 45% 55% 40%",
    gradient: "linear-gradient(135deg,#dbeafe,#93c5fd)",
    icon: Watch,
  },
  {
    angle: 45,
    radius: 90,
    size: 27,
    radiusStyle: "55% 45% 58% 42% / 42% 58% 42% 58%",
    gradient: "linear-gradient(160deg,#d6d3d1,#78716c)",
    icon: Footprints,
  },
  {
    angle: 90,
    radius: 80,
    size: 28,
    radiusStyle: "45% 55% 50% 50% / 55% 50% 50% 45%",
    gradient: "linear-gradient(135deg,#efebe9,#bcaaa4)",
    icon: Shirt,
  },
  {
    angle: 135,
    radius: 90,
    size: 26,
    radiusStyle: "58% 42% 42% 58% / 45% 45% 55% 55%",
    gradient: "linear-gradient(135deg,#e5e7eb,#9ca3af)",
    icon: ShoppingBag,
  },
  {
    angle: 180,
    radius: 82,
    size: 24,
    radiusStyle: "50% 50% 55% 45% / 45% 55% 45% 55%",
    gradient: "linear-gradient(135deg,#f5f5f4,#d6d3d1)",
    icon: Watch,
  },
  {
    angle: 225,
    radius: 88,
    size: 29,
    radiusStyle: "45% 55% 45% 55% / 58% 42% 58% 42%",
    gradient: "linear-gradient(160deg,#c7c2bd,#8a8580)",
    icon: Footprints,
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const tileVariant: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

function polarToPercent(angleDeg: number, radiusPct: number) {
  const rad = (angleDeg * Math.PI) / 180;
  // radius is a % of the half-size, so scale to a 0-50 offset from center.
  const half = (radiusPct / 100) * 50;
  return {
    left: `${50 + half * Math.cos(rad)}%`,
    top: `${50 + half * Math.sin(rad)}%`,
  };
}

export function OrbitGallery() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative mx-auto aspect-square w-full max-w-[420px]"
    >
      {ITEMS.map((item, i) => {
        const { left, top } = polarToPercent(item.angle, item.radius);
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            variants={tileVariant}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left, top, width: `${item.size}%` }}
          >
            <motion.div
              // Gentle, offset float so the ring feels alive.
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 3.2 + (i % 3) * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
              whileHover={{ scale: 1.06, y: -6 }}
              whileTap={{ scale: 0.94 }}
              className="grid aspect-[4/5] w-full place-items-center overflow-hidden shadow-lg shadow-black/10 ring-1 ring-black/5"
              style={{
                borderRadius: item.radiusStyle,
                backgroundImage: item.gradient,
              }}
            >
              <Icon
                className="h-1/3 w-1/3 text-white/70 mix-blend-overlay"
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Center upload CTA */}
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.15 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="absolute left-1/2 top-1/2 flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-[28%] border-2 border-dashed border-border-strong bg-card p-3 text-center shadow-xl shadow-black/10"
      >
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground/5">
          <Paperclip
            className="h-5 w-5 text-foreground/70"
            strokeWidth={1.75}
          />
        </span>
        <span className="text-[11px] font-medium leading-tight text-muted">
          Upload or drop
          <br />
          your wardrobe
        </span>
      </motion.button>
    </motion.div>
  );
}

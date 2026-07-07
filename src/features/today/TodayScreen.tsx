"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  ChartPie,
  ChevronRight,
  Cloud,
  CloudDrizzle,
  CloudSun,
  Heart,
  Sun,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { GarmentTile } from "@/components/ui/GarmentTile";
import { OutfitCollage } from "@/components/ui/OutfitCollage";
import {
  FORECAST,
  getItem,
  getOutfit,
  ITEMS,
  outfitsFeaturing,
  type Outfit,
  type WeatherDay,
} from "@/features/wardrobe/data";
import { cn } from "@/lib/cn";

const WEATHER_ICON: Record<WeatherDay["condition"], LucideIcon> = {
  Sunny: Sun,
  "Partly cloudy": CloudSun,
  "Light rain": CloudDrizzle,
  Cloudy: Cloud,
};

/* Three picks for today's weather, with a human one-liner each —
   stand-ins until the real styling service arrives. */
const PICKS: { outfit: Outfit; reason: string }[] = [
  { outfit: getOutfit("golden-hour")!, reason: "Light linen for a warm afternoon" },
  { outfit: getOutfit("sunday-market")!, reason: "Easy layers that breathe" },
  { outfit: getOutfit("rain-ready")!, reason: "Covered if the rain arrives early" },
];

const HERO_ITEM = getItem("denim-jacket")!;

const LEAST_WORN = [...ITEMS].sort((a, b) => a.wears - b.wears).slice(0, 5);

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const section: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 26 },
  },
};

export function TodayScreen() {
  const today = FORECAST[0];
  const TodayIcon = WEATHER_ICON[today.condition];
  const [verdicts, setVerdicts] = useState<Record<string, "yay" | "nay">>({});

  const dateLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const vote = (id: string, verdict: "yay" | "nay") =>
    setVerdicts((prev) => ({ ...prev, [id]: verdict }));

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-32">
        <motion.div variants={list} initial="hidden" animate="show">
          {/* Header */}
          <motion.header variants={section} className="mb-6">
            <p className="text-sm font-medium text-muted-2">{dateLabel}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Today</h1>
          </motion.header>

          {/* Weather card */}
          <motion.div
            variants={section}
            className="mb-8 rounded-3xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-semibold tracking-tight">{today.high}°</p>
                <p className="mt-1 text-sm text-muted">
                  {today.condition} · low {today.low}°
                </p>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-background ring-1 ring-border">
                <TodayIcon className="h-7 w-7" strokeWidth={1.75} />
              </span>
            </div>
            <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
              {FORECAST.slice(1).map((day) => {
                const Icon = WEATHER_ICON[day.condition];
                return (
                  <div
                    key={day.label}
                    className="flex shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-background px-3.5 py-3 ring-1 ring-border"
                  >
                    <span className="text-xs font-medium text-muted">{day.label}</span>
                    <Icon className="h-4.5 w-4.5 text-muted" strokeWidth={2} />
                    <span className="text-xs font-semibold">{day.high}°</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Three picks */}
          <motion.section variants={section} className="mb-8">
            <h2 className="text-lg font-semibold tracking-tight">Your three picks</h2>
            <p className="mt-0.5 text-sm text-muted">Chosen for today&apos;s weather</p>
            <div className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
              {PICKS.map(({ outfit, reason }) => {
                const verdict = verdicts[outfit.id];
                return (
                  <motion.div
                    key={outfit.id}
                    animate={{ opacity: verdict === "nay" ? 0.45 : 1, scale: verdict === "nay" ? 0.97 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    className="w-56 shrink-0 snap-start rounded-3xl border border-border bg-card p-3 shadow-sm"
                  >
                    <Link href={`/outfits/${outfit.id}`}>
                      <OutfitCollage outfit={outfit} className="shadow-none ring-0" />
                    </Link>
                    <p className="mt-2.5 truncate px-1 text-base font-semibold">{outfit.name}</p>
                    <p className="mt-0.5 px-1 text-sm leading-snug text-muted">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={verdict ?? "reason"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="block"
                        >
                          {verdict === "yay"
                            ? "Noted — more like this."
                            : verdict === "nay"
                              ? "Got it, fewer like this."
                              : reason}
                        </motion.span>
                      </AnimatePresence>
                    </p>
                    <div className="mt-3 flex gap-2 px-1 pb-1">
                      <motion.button
                        type="button"
                        aria-label="More like this"
                        whileTap={{ scale: 0.85 }}
                        onClick={() => vote(outfit.id, "yay")}
                        className={cn(
                          "grid h-11 flex-1 place-items-center rounded-full ring-1 ring-border",
                          verdict === "yay"
                            ? "bg-foreground text-background ring-0"
                            : "bg-background text-foreground",
                        )}
                      >
                        <Heart className="h-4.5 w-4.5" strokeWidth={2} />
                      </motion.button>
                      <motion.button
                        type="button"
                        aria-label="Not for me"
                        whileTap={{ scale: 0.85 }}
                        onClick={() => vote(outfit.id, "nay")}
                        className="grid h-11 flex-1 place-items-center rounded-full bg-background text-muted ring-1 ring-border"
                      >
                        <X className="h-4.5 w-4.5" strokeWidth={2} />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Featuring a hero piece */}
          <motion.section variants={section} className="mb-8">
            <h2 className="text-lg font-semibold tracking-tight">
              Featuring your {HERO_ITEM.name.toLowerCase()}
            </h2>
            <p className="mt-0.5 text-sm text-muted">It&apos;s been quiet for a week</p>
            <div className="no-scrollbar -mx-5 mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
              {outfitsFeaturing(HERO_ITEM.id).map((outfit) => (
                <Link key={outfit.id} href={`/outfits/${outfit.id}`} className="w-36 shrink-0 snap-start">
                  <OutfitCollage outfit={outfit} />
                  <p className="mt-2 truncate text-sm font-medium">{outfit.name}</p>
                  <p className="text-xs text-muted">{outfit.occasion}</p>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Least worn */}
          <motion.section variants={section} className="mb-8">
            <h2 className="text-lg font-semibold tracking-tight">Give these some love</h2>
            <p className="mt-0.5 text-sm text-muted">The quiet corners of your closet</p>
            <div className="no-scrollbar -mx-5 mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
              {LEAST_WORN.map((item) => (
                <Link key={item.id} href={`/items/${item.id}`} className="w-28 shrink-0 snap-start">
                  <GarmentTile item={item} aspect="aspect-[3/4]" />
                  <p className="mt-2 truncate text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted">{item.wears} wears</p>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Insights teaser */}
          <motion.div variants={section}>
            <Link
              href="/insights"
              className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm active:bg-background"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-background ring-1 ring-border">
                <ChartPie className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold">Your wardrobe, in numbers</span>
                <span className="mt-0.5 block text-sm text-muted">
                  Value, cost per wear, and what you actually reach for
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-2" strokeWidth={2} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <BottomNav active="today" />
    </div>
  );
}

"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { CalendarPlus, ChevronRight, Luggage } from "lucide-react";
import { useMemo, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { OutfitCollage } from "@/components/ui/OutfitCollage";
import {
  getOutfit,
  outfitPieces,
  PLANNED_DAYS,
  TRIPS,
  type Trip,
} from "@/features/wardrobe/data";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

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

function tripItemCount(trip: Trip): number {
  const pieces = new Set(
    trip.outfitIds.flatMap((id) => {
      const outfit = getOutfit(id);
      return outfit ? outfit.pieceIds : [];
    }),
  );
  return pieces.size + trip.extras.length;
}

export function PlannerScreen() {
  const now = useMemo(() => new Date(), []);
  const todayDate = now.getDate();
  const [selected, setSelected] = useState(todayDate);

  const monthLabel = now.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  // Monday-first offset for the 1st of the month.
  const offset = (new Date(now.getFullYear(), now.getMonth(), 1).getDay() + 6) % 7;

  const cells: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const plannedOutfit = PLANNED_DAYS[selected]
    ? getOutfit(PLANNED_DAYS[selected])
    : undefined;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-32">
        <motion.div variants={list} initial="hidden" animate="show">
          <motion.header variants={section} className="mb-6">
            <p className="text-sm font-medium text-muted-2">Plan ahead</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Planner</h1>
            <p className="mt-1 text-sm text-muted">{monthLabel}</p>
          </motion.header>

          {/* Month calendar */}
          <motion.div
            variants={section}
            className="rounded-3xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="grid grid-cols-7 text-center">
              {WEEKDAYS.map((d, i) => (
                <span key={i} className="py-1 text-xs font-medium text-muted-2">
                  {d}
                </span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-y-1">
              {cells.map((day, i) => {
                if (day === null) return <span key={`pad-${i}`} />;
                const isToday = day === todayDate;
                const isSelected = day === selected;
                const hasPlan = day in PLANNED_DAYS;
                return (
                  <motion.button
                    key={day}
                    type="button"
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setSelected(day)}
                    className={cn(
                      "relative mx-auto grid h-11 w-11 place-items-center rounded-full text-sm font-medium",
                      isSelected
                        ? "bg-foreground text-background"
                        : isToday
                          ? "text-accent"
                          : "text-foreground",
                    )}
                  >
                    {day}
                    {hasPlan && (
                      <span
                        className={cn(
                          "absolute bottom-1.5 h-1 w-1 rounded-full",
                          isSelected ? "bg-background" : "bg-accent",
                        )}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Selected day */}
          <motion.div variants={section} className="mt-4">
            <AnimatePresence mode="wait" initial={false}>
              {plannedOutfit ? (
                <motion.div
                  key={`plan-${selected}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                >
                  <Link
                    href={`/outfits/${plannedOutfit.id}`}
                    className="flex items-center gap-4 rounded-3xl border border-border bg-card p-3.5 shadow-sm active:bg-background"
                  >
                    <OutfitCollage
                      outfit={plannedOutfit}
                      className="h-20 w-20 shrink-0 rounded-2xl p-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-2">
                        {selected === todayDate ? "Today" : `${selected} ${monthLabel.split(" ")[0]}`}
                      </p>
                      <p className="mt-0.5 truncate text-base font-semibold">
                        {plannedOutfit.name}
                      </p>
                      <p className="truncate text-sm text-muted">
                        {plannedOutfit.occasion} · {outfitPieces(plannedOutfit).length} pieces
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-2" strokeWidth={2} />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={`empty-${selected}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="flex items-center gap-4 rounded-3xl border border-dashed border-border-strong p-4"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-card ring-1 ring-border">
                    <CalendarPlus className="h-5 w-5 text-muted" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold">Nothing planned</p>
                    <p className="text-sm text-muted">Pick a look for this day</p>
                  </div>
                  <Link
                    href="/outfits"
                    className="shrink-0 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background"
                  >
                    Plan
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trips */}
          <motion.section variants={section} className="mt-8">
            <h2 className="text-lg font-semibold tracking-tight">Trips</h2>
            <p className="mt-0.5 text-sm text-muted">Pack from your looks, not from memory</p>
            <div className="mt-4 flex flex-col gap-3">
              {TRIPS.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/planner/trips/${trip.id}`}
                  className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm active:bg-background"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-background ring-1 ring-border">
                    <Luggage className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold">{trip.name}</p>
                    <p className="text-sm text-muted">
                      {trip.dates} · {tripItemCount(trip)} things to pack
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-2" strokeWidth={2} />
                </Link>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>

      <BottomNav active="planner" />
    </div>
  );
}

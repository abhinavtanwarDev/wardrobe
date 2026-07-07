"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { CalendarCheck, Pencil, Sparkles } from "lucide-react";
import { useState } from "react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { GarmentTile } from "@/components/ui/GarmentTile";
import { OutfitCollage } from "@/components/ui/OutfitCollage";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { notFound } from "next/navigation";
import {
  costPerWear,
  formatPrice,
  getItem,
  outfitsFeaturing,
} from "@/features/wardrobe/data";

const section: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 26 },
  },
};

interface ItemDetailScreenProps {
  id: string;
}

export function ItemDetailScreen({ id }: ItemDetailScreenProps) {
  const [worn, setWorn] = useState(false);
  const item = getItem(id);
  if (!item) notFound();
  const looks = outfitsFeaturing(item.id);
  const chips = [item.category, item.color, ...item.seasons];

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <ScreenHeader
          title={item.name}
          subtitle={`${item.brand} · ${formatPrice(item.price)}`}
          backHref="/home"
          action={{ icon: Pencil, label: "Edit piece" }}
        />

        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.07 }}
        >
          {/* Hero visual */}
          <motion.div variants={section} className="relative">
            <GarmentTile item={item} aspect="aspect-[4/5]" className="rounded-3xl" />
            <span className="absolute top-3 right-3 rounded-full bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {item.status}
            </span>
          </motion.div>

          {/* Attribute chips */}
          <motion.div variants={section} className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border-strong px-4 py-2 text-sm font-medium"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Wear stats */}
          <motion.div variants={section} className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Wears", value: `${item.wears + (worn ? 1 : 0)}` },
              { label: "Cost per wear", value: formatPrice(costPerWear(item)) },
              { label: "Last worn", value: worn ? "Today" : item.lastWorn },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card px-3 py-4 text-center shadow-sm"
              >
                <p className="text-base font-semibold">{stat.value}</p>
                <p className="mt-1 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Outfits featuring this piece */}
          {looks.length > 0 && (
            <motion.section variants={section} className="mt-8">
              <h2 className="text-lg font-semibold tracking-tight">
                Worn in these looks
              </h2>
              <div className="no-scrollbar -mx-5 mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
                {looks.map((outfit) => (
                  <Link
                    key={outfit.id}
                    href={`/outfits/${outfit.id}`}
                    className="w-36 shrink-0 snap-start"
                  >
                    <OutfitCollage outfit={outfit} />
                    <p className="mt-2 truncate text-sm font-medium">{outfit.name}</p>
                    <p className="text-xs text-muted">{outfit.occasion}</p>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Actions */}
          <motion.div variants={section} className="mt-8 flex flex-col gap-3">
            <ArrowPill label="Style this piece" href="/outfits/new" icon={Sparkles} />
            <ArrowPill
              label={worn ? "Logged for today" : "I wore this today"}
              onClick={() => setWorn(true)}
              icon={CalendarCheck}
              variant="outline"
              disabled={worn}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

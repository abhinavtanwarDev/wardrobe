"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { CalendarCheck, CalendarPlus, ChevronRight, Pencil } from "lucide-react";
import { useState } from "react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { GarmentTile } from "@/components/ui/GarmentTile";
import { OutfitCollage } from "@/components/ui/OutfitCollage";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { outfitPieces, type Outfit } from "@/features/wardrobe/data";

const section: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 26 },
  },
};

interface OutfitDetailScreenProps {
  outfit: Outfit;
}

export function OutfitDetailScreen({ outfit }: OutfitDetailScreenProps) {
  const [worn, setWorn] = useState(false);
  const pieces = outfitPieces(outfit);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <ScreenHeader
          title={outfit.name}
          subtitle={`${outfit.occasion} · worn ${outfit.wears + (worn ? 1 : 0)}×`}
          backHref="/outfits"
          action={{ icon: Pencil, label: "Edit look" }}
        />

        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.07 }}>
          <motion.div variants={section}>
            <OutfitCollage outfit={outfit} className="rounded-3xl" />
            <p className="mt-4 text-base leading-relaxed text-muted">{outfit.note}</p>
          </motion.div>

          {/* Pieces */}
          <motion.section variants={section} className="mt-7">
            <h2 className="text-lg font-semibold tracking-tight">The pieces</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {pieces.map((piece) => (
                <li key={piece.id}>
                  <Link
                    href={`/items/${piece.id}`}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-2.5 shadow-sm active:bg-background"
                  >
                    <GarmentTile
                      item={piece}
                      aspect="aspect-square"
                      className="h-14 w-14 rounded-xl shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-medium">{piece.name}</p>
                      <p className="truncate text-sm text-muted">
                        {piece.brand} · {piece.category}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-2" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Actions */}
          <motion.div variants={section} className="mt-8 flex flex-col gap-3">
            <ArrowPill
              label={worn ? "Logged for today" : "Wear this today"}
              onClick={() => setWorn(true)}
              icon={CalendarCheck}
              disabled={worn}
            />
            <ArrowPill
              label="Plan it for a day"
              href="/planner"
              icon={CalendarPlus}
              variant="outline"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

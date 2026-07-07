"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Camera,
  Check,
  Images,
  Link2,
  Mail,
  Shirt,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { CATEGORIES } from "@/features/wardrobe/data";
import { cn } from "@/lib/cn";

/* Capture paths modeled on the lowest-friction competitors:
   camera / library / product link / receipt forwarding. All are visual
   placeholders until the real capture + background-removal service lands. */

interface CaptureOption {
  icon: LucideIcon;
  title: string;
  body: string;
}

const CAPTURE_OPTIONS: CaptureOption[] = [
  { icon: Camera, title: "Take a photo", body: "We'll tidy the background for you" },
  { icon: Images, title: "Pick from library", body: "Add several pieces at once" },
  { icon: Link2, title: "Paste a product link", body: "We'll pull the photo and details" },
  { icon: Mail, title: "Forward a receipt", body: "New buys add themselves" },
];

const SWATCHES = [
  { name: "Off-white", value: "#f5f5f4" },
  { name: "Stone", value: "#d6d3d1" },
  { name: "Camel", value: "#c7b8a5" },
  { name: "Charcoal", value: "#44403c" },
  { name: "Ink", value: "#1c1917" },
  { name: "Slate blue", value: "#64748b" },
];

const SEASONS = ["Spring", "Summer", "Autumn", "Winter", "All year"];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 26 },
  },
};

type Step = "capture" | "preparing" | "details";

export function AddItemScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("capture");
  const [category, setCategory] = useState(0);
  const [swatch, setSwatch] = useState(1);
  const [seasons, setSeasons] = useState<string[]>(["Summer"]);

  const capture = () => {
    setStep("preparing");
    setTimeout(() => setStep("details"), 1100);
  };

  const toggleSeason = (s: string) =>
    setSeasons((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <AnimatePresence mode="wait">
          {step === "capture" && (
            <motion.div
              key="capture"
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
            >
              <ScreenHeader
                title="Add a piece"
                subtitle="However it arrives, it ends up beautiful."
                backHref="/home"
              />
              <motion.div variants={list} initial="hidden" animate="show" className="flex flex-col gap-3">
                {CAPTURE_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.title}
                      type="button"
                      variants={row}
                      whileTap={{ scale: 0.97 }}
                      onClick={capture}
                      className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4 text-left shadow-sm"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-background ring-1 ring-border">
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <span>
                        <span className="block text-base font-semibold">{option.title}</span>
                        <span className="mt-0.5 block text-sm text-muted">{option.body}</span>
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          {step === "preparing" && (
            <motion.div
              key="preparing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[80dvh] flex-col items-center justify-center text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                className="grid h-24 w-24 place-items-center rounded-3xl shadow-lg shadow-black/10 ring-1 ring-black/5"
                style={{ backgroundImage: "linear-gradient(150deg,#e7e5e4,#a8a29e)" }}
              >
                <Shirt className="h-9 w-9 text-white/70 mix-blend-overlay" strokeWidth={1.5} />
              </motion.div>
              <p className="mt-6 text-lg font-semibold">Preparing your piece…</p>
              <p className="mt-1 text-sm text-muted">Lifting it onto a clean canvas</p>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
            >
              <ScreenHeader
                title="Looks good"
                subtitle="We filled in what we could — tweak anything."
                backHref="/home"
              />
              <motion.div variants={list} initial="hidden" animate="show" className="flex flex-col gap-6">
                {/* Preview */}
                <motion.div variants={row} className="flex items-center gap-4">
                  <div
                    className="grid h-24 w-24 place-items-center rounded-3xl shadow-md shadow-black/10 ring-1 ring-black/5"
                    style={{
                      backgroundImage: `linear-gradient(150deg,${SWATCHES[swatch].value},#a8a29e)`,
                    }}
                  >
                    <Shirt className="h-8 w-8 text-white/70 mix-blend-overlay" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-2 text-sm font-medium text-accent">
                    <Sparkles className="h-4 w-4" strokeWidth={2} />
                    Added to your wardrobe
                  </div>
                </motion.div>

                {/* Name + brand */}
                <motion.div variants={row} className="flex flex-col gap-3">
                  <input
                    defaultValue="Linen overshirt"
                    aria-label="Piece name"
                    className="h-13 rounded-2xl border border-border bg-card px-4 py-3.5 text-base font-medium shadow-sm outline-none focus:border-border-strong"
                  />
                  <div className="flex gap-3">
                    <input
                      placeholder="Brand"
                      aria-label="Brand"
                      className="min-w-0 flex-1 rounded-2xl border border-border bg-card px-4 py-3.5 text-base shadow-sm outline-none placeholder:text-muted-2 focus:border-border-strong"
                    />
                    <input
                      placeholder="Price"
                      aria-label="Price"
                      inputMode="decimal"
                      className="w-28 rounded-2xl border border-border bg-card px-4 py-3.5 text-base shadow-sm outline-none placeholder:text-muted-2 focus:border-border-strong"
                    />
                  </div>
                </motion.div>

                {/* Category */}
                <motion.div variants={row}>
                  <p className="mb-2.5 text-sm font-medium text-muted">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c, i) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCategory(i)}
                        className={cn(
                          "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                          i === category
                            ? "bg-foreground text-background"
                            : "border border-border-strong",
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Color */}
                <motion.div variants={row}>
                  <p className="mb-2.5 text-sm font-medium text-muted">Color</p>
                  <div className="flex gap-3">
                    {SWATCHES.map((s, i) => (
                      <motion.button
                        key={s.name}
                        type="button"
                        aria-label={s.name}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => setSwatch(i)}
                        className={cn(
                          "grid h-11 w-11 place-items-center rounded-full ring-1 ring-black/10 transition-shadow",
                          i === swatch && "ring-2 ring-accent ring-offset-2 ring-offset-background",
                        )}
                        style={{ backgroundColor: s.value }}
                      >
                        {i === swatch && (
                          <Check className="h-4 w-4 text-white mix-blend-difference" strokeWidth={3} />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Seasons */}
                <motion.div variants={row}>
                  <p className="mb-2.5 text-sm font-medium text-muted">Seasons</p>
                  <div className="flex flex-wrap gap-2">
                    {SEASONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSeason(s)}
                        className={cn(
                          "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                          seasons.includes(s)
                            ? "bg-foreground text-background"
                            : "border border-border-strong",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={row} className="mt-2">
                  <ArrowPill label="Save to wardrobe" onClick={() => router.push("/home")} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

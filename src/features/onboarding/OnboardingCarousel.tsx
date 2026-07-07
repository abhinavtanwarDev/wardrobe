"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { cn } from "@/lib/cn";
import { SLIDES } from "@/features/onboarding/slides";

const SWIPE_THRESHOLD = 60; // px of drag (or velocity) before a page turn

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -64 : 64, opacity: 0 }),
};

// Small decorative sparkles that drift around the illustration.
const SPARKLES = [
  { top: "6%", left: "12%", size: 10, delay: 0 },
  { top: "18%", left: "84%", size: 7, delay: 0.6 },
  { top: "78%", left: "8%", size: 8, delay: 1.1 },
  { top: "88%", left: "78%", size: 12, delay: 0.3 },
];

export function OnboardingCarousel() {
  const router = useRouter();
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);

  const isLast = index === SLIDES.length - 1;

  const paginate = (dir: number) => {
    const next = index + dir;
    if (next < 0 || next >= SLIDES.length) return;
    setPage([next, dir]);
  };

  const finish = () => router.push("/home");

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.1;
    if (swipe < -SWIPE_THRESHOLD) paginate(1);
    else if (swipe > SWIPE_THRESHOLD) paginate(-1);
  };

  const slide = SLIDES[index];
  const Icon = slide.icon;
  const progress = (index + 1) / SLIDES.length;

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background text-foreground">
      {/* Ambient glow that crossfades its color per slide */}
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="pointer-events-none absolute top-1/4 left-1/2 h-[70vw] max-h-[420px] w-[70vw] max-w-[420px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: slide.glow }}
        />
      </AnimatePresence>

      {/* Top: progress bar + Skip */}
      <div className="relative flex items-center gap-4 px-5 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-border-strong">
          <motion.div
            className="h-full rounded-full bg-foreground"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />
        </div>
        {!isLast && (
          <motion.button
            type="button"
            onClick={finish}
            whileTap={{ scale: 0.94 }}
            className="shrink-0 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Skip
          </motion.button>
        )}
      </div>

      {/* Slide area (swipeable) */}
      <div className="relative flex flex-1 items-center">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            className="absolute inset-0 flex touch-pan-y flex-col items-center justify-center gap-9 px-6"
          >
            {/* Illustration */}
            <div className="relative grid aspect-square w-full max-w-[300px] place-items-center">
              {SPARKLES.map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-foreground/25"
                  style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
                  animate={{ y: [0, -10, 0], opacity: [0.25, 0.7, 0.25] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: s.delay,
                  }}
                />
              ))}
              <motion.div
                initial={{ scale: 0.85, opacity: 0, rotate: -4 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="grid h-full w-full place-items-center rounded-[34%] shadow-xl shadow-black/10 ring-1 ring-black/5"
                style={{ backgroundImage: slide.gradient }}
              >
                <motion.span
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="grid h-24 w-24 place-items-center rounded-3xl bg-white/25 backdrop-blur-sm"
                >
                  <Icon className="h-11 w-11 text-white" strokeWidth={1.5} />
                </motion.span>
              </motion.div>
            </div>

            {/* Copy — staggered in */}
            <div className="max-w-sm text-center">
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, type: "spring", stiffness: 220, damping: 24 }}
                className="text-[1.7rem] leading-tight font-semibold tracking-tight"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, type: "spring", stiffness: 220, damping: 24 }}
                className="mt-3 text-[15px] leading-relaxed text-muted"
              >
                {slide.body}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="relative flex flex-col gap-6 px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
        {/* Dots */}
        <div
          className="flex justify-center gap-2"
          role="tablist"
          aria-label="Onboarding progress"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === index}
              role="tab"
              onClick={() => setPage([i, i > index ? 1 : -1])}
              className="grid h-6 place-items-center"
            >
              <motion.span
                animate={{ width: i === index ? 24 : 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                  "block h-2 rounded-full",
                  i === index ? "bg-foreground" : "bg-border-strong",
                )}
              />
            </button>
          ))}
        </div>

        {/* Advance / finish */}
        <div className="mx-auto w-full max-w-sm">
          {isLast ? (
            <ArrowPill label="Get started" onClick={finish} />
          ) : (
            <ArrowPill label="Next" onClick={() => paginate(1)} />
          )}
        </div>
      </div>
    </div>
  );
}

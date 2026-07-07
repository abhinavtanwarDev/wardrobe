"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { PillNav } from "@/components/ui/PillNav";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { OrbitGallery } from "@/features/welcome/OrbitGallery";

export function WelcomeScreen() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background text-foreground">
        <PillNav />

        <main className="flex flex-1 flex-col px-5 pt-[calc(env(safe-area-inset-top)+6rem)] pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: showSplash ? 0 : 0.1,
              type: "spring",
              stiffness: 200,
              damping: 24,
            }}
            className="text-center text-[2.1rem] leading-[1.05] font-semibold tracking-tight sm:text-5xl"
          >
            Your wardrobe,
            <br />
            <span className="text-muted-2">beautifully kept.</span>
          </motion.h1>

          {/* Orbital hero */}
          <div className="flex flex-1 items-center justify-center py-6">
            <OrbitGallery />
          </div>

          {/* Arrow pill CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 26,
            }}
            className="mx-auto w-full max-w-sm"
          >
            <ArrowPill label="Get started" href="/onboarding" />
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-muted-2">
              ©2026 · A calmer way to dress
            </p>
          </motion.div>
        </main>
      </div>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Logo } from "@/components/ui/Logo";

interface SplashScreenProps {
  onDone: () => void;
  /** Total time the splash stays up before dismissing (ms). */
  duration?: number;
}

/** Full-screen logo intro that reveals the app beneath it, then dismisses. */
export function SplashScreen({ onDone, duration = 2000 }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, duration);
    return () => clearTimeout(timer);
  }, [onDone, duration]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.08, y: -8 }}
        transition={{ duration: 0.45, ease: "easeIn" }}
      >
        <Logo animated />
      </motion.div>
    </motion.div>
  );
}

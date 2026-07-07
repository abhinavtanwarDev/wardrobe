"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

interface ArrowPillProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: "solid" | "outline";
  disabled?: boolean;
  className?: string;
}

/**
 * Primary pill-shaped CTA with an arrow knob that nudges on hover. Renders as a
 * link when `href` is given, otherwise a button.
 */
export function ArrowPill({
  label,
  href,
  onClick,
  icon: Icon = ArrowRight,
  variant = "solid",
  disabled = false,
  className,
}: ArrowPillProps) {
  const base = cn(
    "group flex w-full items-center justify-between gap-3 rounded-full py-2 pr-2 pl-6 text-base font-medium shadow-lg shadow-black/10 select-none",
    variant === "solid"
      ? "bg-foreground text-background"
      : "border border-border-strong bg-card text-foreground shadow-none",
    disabled && "pointer-events-none opacity-40",
    className,
  );

  const knob = cn(
    "grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5",
    variant === "solid" ? "bg-background text-foreground" : "bg-foreground text-background",
  );

  const content = (
    <>
      <span>{label}</span>
      <span className={knob}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
    </>
  );

  const motionProps = {
    whileTap: { scale: 0.97 },
    whileHover: { scale: 1.01 },
    transition: { type: "spring" as const, stiffness: 400, damping: 30 },
  };

  if (href) {
    return (
      <MotionLink href={href} className={base} {...motionProps}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={base}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}

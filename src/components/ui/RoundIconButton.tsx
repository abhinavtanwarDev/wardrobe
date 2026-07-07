"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

interface RoundIconButtonProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/** Circular 44px icon button used for screen-corner actions (search, back, …).
    Renders as a link when `href` is given. */
export function RoundIconButton({
  icon: Icon,
  label,
  href,
  onClick,
  className,
}: RoundIconButtonProps) {
  const classes = cn(
    "grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm",
    className,
  );
  const motionProps = {
    whileTap: { scale: 0.9 },
    transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  };

  if (href) {
    return (
      <MotionLink href={href} aria-label={label} className={classes} {...motionProps}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={classes}
      {...motionProps}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </motion.button>
  );
}

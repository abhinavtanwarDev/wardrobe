"use client";

import { motion } from "framer-motion";
import { ChevronLeft, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { RoundIconButton } from "@/components/ui/RoundIconButton";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  /** Where the back chevron navigates; omit to hide it. */
  backHref?: string;
  /** Optional right-corner action. */
  action?: { icon: LucideIcon; label: string; href?: string; onClick?: () => void };
  children?: ReactNode;
}

/** Sub-screen header: back chevron, big title, optional corner action. */
export function ScreenHeader({ title, subtitle, backHref, action, children }: ScreenHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between">
        {backHref ? (
          <RoundIconButton icon={ChevronLeft} label="Back" href={backHref} />
        ) : (
          <span className="h-11 w-11" />
        )}
        {action && (
          <RoundIconButton
            icon={action.icon}
            label={action.label}
            href={action.href}
            onClick={action.onClick}
          />
        )}
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      {children}
    </motion.header>
  );
}

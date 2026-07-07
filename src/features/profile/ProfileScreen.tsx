"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  Bell,
  ChartPie,
  ChevronRight,
  Download,
  LogOut,
  Moon,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { ITEMS, OUTFITS, TRIPS } from "@/features/wardrobe/data";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

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

function SettingsRow({
  icon: Icon,
  title,
  subtitle,
  onClick,
  trailing,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="flex w-full items-center gap-4 px-4 py-3.5 text-left"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-background ring-1 ring-border">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-medium">{title}</span>
        {subtitle && <span className="block text-sm text-muted">{subtitle}</span>}
      </span>
      {trailing ?? (
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-2" strokeWidth={2} />
      )}
    </motion.button>
  );
}

function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors",
        on ? "bg-accent" : "bg-border-strong",
      )}
    >
      <motion.span
        animate={{ x: on ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="h-5 w-5 rounded-full bg-white shadow-sm"
      />
    </span>
  );
}

export function ProfileScreen() {
  const { theme, toggle } = useTheme();
  const { canInstall, promptInstall } = useInstallPrompt();

  const stats = [
    { label: "Pieces", value: ITEMS.length },
    { label: "Looks", value: OUTFITS.length },
    { label: "Trips", value: TRIPS.length },
  ];

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="px-5 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-32">
        <motion.div variants={list} initial="hidden" animate="show">
          {/* Identity */}
          <motion.header variants={section} className="mb-7 flex items-center gap-4">
            <span
              className="grid h-16 w-16 place-items-center rounded-full text-lg font-semibold text-white shadow-md shadow-black/10 ring-1 ring-black/5"
              style={{ backgroundImage: "linear-gradient(150deg,#78716c,#44403c)" }}
            >
              AT
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Abhinav</h1>
              <p className="mt-0.5 text-sm text-muted">Building a lighter closet</p>
            </div>
          </motion.header>

          {/* Quick numbers */}
          <motion.div variants={section} className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card px-3 py-4 text-center shadow-sm"
              >
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Insights */}
          <motion.div variants={section} className="mt-4">
            <Link
              href="/insights"
              className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm active:bg-background"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-background ring-1 ring-border">
                <ChartPie className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold">Your wardrobe, in numbers</span>
                <span className="mt-0.5 block text-sm text-muted">
                  Value, cost per wear, color story
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-2" strokeWidth={2} />
            </Link>
          </motion.div>

          {/* Settings */}
          <motion.section variants={section} className="mt-7">
            <h2 className="px-1 text-lg font-semibold tracking-tight">Settings</h2>
            <div className="mt-3 flex flex-col divide-y divide-border rounded-3xl border border-border bg-card shadow-sm">
              <SettingsRow
                icon={Moon}
                title="Dark mode"
                subtitle="Easy on the eyes, easy on the fits"
                onClick={toggle}
                trailing={<Switch on={theme === "dark"} />}
              />
              <SettingsRow
                icon={Bell}
                title="Morning outfit"
                subtitle="A look in your pocket by 7:30"
              />
              <SettingsRow
                icon={Download}
                title="Install the app"
                subtitle={canInstall ? "Add it to your home screen" : "Open from your home screen"}
                onClick={canInstall ? promptInstall : undefined}
              />
              <SettingsRow
                icon={ShieldCheck}
                title="Data & privacy"
                subtitle="Your closet stays yours"
              />
            </div>
          </motion.section>

          {/* Sign out */}
          <motion.div variants={section} className="mt-4">
            <div className="rounded-3xl border border-border bg-card shadow-sm">
              <SettingsRow icon={LogOut} title="Sign out" trailing={<span />} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <BottomNav active="profile" />
    </div>
  );
}

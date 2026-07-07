import {
  Camera,
  LayoutGrid,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface OnboardingSlide {
  icon: LucideIcon;
  title: string;
  body: string;
  gradient: string; // illustration backdrop
  glow: string; // ambient background color that shifts per slide
}

export const SLIDES: OnboardingSlide[] = [
  {
    icon: Camera,
    title: "Your wardrobe, digitized",
    body: "Snap or upload your clothes and we lift each piece onto a clean canvas — no studio required.",
    gradient: "linear-gradient(150deg,#e7e5e4,#a8a29e)",
    glow: "#a8a29e",
  },
  {
    icon: LayoutGrid,
    title: "Organize into collections",
    body: "Group pieces by trip, season, or mood. Your closet, arranged the way you actually think.",
    gradient: "linear-gradient(150deg,#efebe9,#bcaaa4)",
    glow: "#bcaaa4",
  },
  {
    icon: Sparkles,
    title: "Style, effortlessly",
    body: "Outfit ideas that feel like you — quietly suggested as you browse, never in the way.",
    gradient: "linear-gradient(150deg,#dbeafe,#93c5fd)",
    glow: "#93c5fd",
  },
  {
    icon: Smartphone,
    title: "Carry it everywhere",
    body: "Works offline and installs like a native app, so your wardrobe is always a tap away.",
    gradient: "linear-gradient(150deg,#d6d3d1,#78716c)",
    glow: "#94908c",
  },
];

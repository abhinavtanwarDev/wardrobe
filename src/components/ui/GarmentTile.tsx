import type { WardrobeItem } from "@/features/wardrobe/data";
import { cn } from "@/lib/cn";

interface GarmentTileProps {
  item: WardrobeItem;
  /** Tailwind aspect class; defaults to the item's own masonry aspect. */
  aspect?: string;
  /** Show the name chip in the bottom-left corner. */
  label?: boolean;
  className?: string;
}

/** Offline-safe garment visual: gradient placeholder + icon watermark,
    standing in for a real item photo everywhere one is needed. */
export function GarmentTile({ item, aspect, label = false, className }: GarmentTileProps) {
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "relative grid w-full place-items-center overflow-hidden rounded-2xl shadow-md shadow-black/10 ring-1 ring-black/5",
        aspect ?? item.aspect,
        className,
      )}
      style={{ backgroundImage: item.gradient }}
    >
      <Icon className="h-8 w-8 text-white/70 mix-blend-overlay" strokeWidth={1.5} />
      {label && (
        <span className="absolute bottom-2 left-2 rounded-full bg-black/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {item.name}
        </span>
      )}
    </div>
  );
}

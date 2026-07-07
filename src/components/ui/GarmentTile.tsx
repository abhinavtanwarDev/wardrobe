import { GarmentArt } from "@/components/ui/GarmentArt";
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

/** Product-style garment visual: flat-lay illustration on a clean tile,
    standing in for a real item photo everywhere one is needed. */
export function GarmentTile({ item, aspect, label = false, className }: GarmentTileProps) {
  return (
    <div
      className={cn(
        "relative grid w-full place-items-center overflow-hidden rounded-2xl bg-card shadow-md shadow-black/10 ring-1 ring-black/5 dark:ring-white/10",
        aspect ?? item.aspect,
        className,
      )}
    >
      <GarmentArt {...item.art} className="h-[82%] w-[82%]" />
      {label && (
        <span className="absolute bottom-2 left-2 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {item.name}
        </span>
      )}
    </div>
  );
}

import { GarmentArt } from "@/components/ui/GarmentArt";
import { outfitPieces, type Outfit } from "@/features/wardrobe/data";
import { cn } from "@/lib/cn";

interface OutfitCollageProps {
  outfit: Outfit;
  className?: string;
}

/** 2×2 collage of an outfit's pieces — the visual identity of a saved look. */
export function OutfitCollage({ outfit, className }: OutfitCollageProps) {
  const pieces = outfitPieces(outfit).slice(0, 4);

  return (
    <div
      className={cn(
        "grid aspect-square grid-cols-2 gap-1 overflow-hidden rounded-2xl bg-card p-1 shadow-md shadow-black/10 ring-1 ring-black/5 dark:ring-white/10",
        className,
      )}
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="grid place-items-center overflow-hidden rounded-xl bg-background"
        >
          <GarmentArt {...piece.art} className="h-[85%] w-[85%]" />
        </div>
      ))}
    </div>
  );
}

import { notFound } from "next/navigation";
import { OutfitDetailScreen } from "@/features/outfits/OutfitDetailScreen";
import { getOutfit } from "@/features/wardrobe/data";

export default async function OutfitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const outfit = getOutfit(id);
  if (!outfit) notFound();

  return <OutfitDetailScreen outfit={outfit} />;
}

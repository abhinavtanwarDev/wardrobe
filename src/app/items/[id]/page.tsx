import { notFound } from "next/navigation";
import { ItemDetailScreen } from "@/features/items/ItemDetailScreen";
import { getItem } from "@/features/wardrobe/data";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // The item itself carries a Lucide icon component, which can't cross the
  // server → client boundary — validate here, look up again client-side.
  if (!getItem(id)) notFound();

  return <ItemDetailScreen id={id} />;
}

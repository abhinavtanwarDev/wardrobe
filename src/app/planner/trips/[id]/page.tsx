import { notFound } from "next/navigation";
import { TripPackingScreen } from "@/features/planner/TripPackingScreen";
import { getTrip } from "@/features/wardrobe/data";

export default async function TripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trip = getTrip(id);
  if (!trip) notFound();

  return <TripPackingScreen trip={trip} />;
}

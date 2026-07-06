import { NextResponse } from "next/server";
import type { Item } from "@/types";

const ITEMS: Item[] = [
  { id: "1", name: "First item", description: "Fetched from /api/items" },
  { id: "2", name: "Second item", description: "Cached for offline use" },
  { id: "3", name: "Third item", description: "Served via network-first" },
];

export async function GET() {
  return NextResponse.json(ITEMS);
}

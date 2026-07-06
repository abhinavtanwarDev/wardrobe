"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import type { Item } from "@/types";

export function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json() as Promise<Item[]>;
      })
      .then(setItems)
      .catch(() => setError("Couldn't load items."));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <Card key={item.id}>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.description}</p>
        </Card>
      ))}
    </ul>
  );
}

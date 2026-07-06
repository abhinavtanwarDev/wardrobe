import { ItemsList } from "@/features/items/ItemsList";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">PWA App</h1>
        <p className="text-gray-500">
          A production-ready Progressive Web App scaffold.
        </p>
      </div>
      <ItemsList />
    </div>
  );
}

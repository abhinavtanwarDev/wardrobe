export const dynamic = "force-static";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center gap-2 py-16 text-center">
      <h1 className="text-2xl font-semibold">You&apos;re offline</h1>
      <p className="text-gray-500">
        This page isn&apos;t available without an internet connection. Once
        you&apos;re back online, reload to try again.
      </p>
    </div>
  );
}

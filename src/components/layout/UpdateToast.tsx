"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export function UpdateToast() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );
  const userInitiatedRefresh = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const trackInstalling = (worker: ServiceWorker) => {
      worker.addEventListener("statechange", () => {
        if (
          worker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          setWaitingWorker(worker);
        }
      });
    };

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        if (registration.waiting && navigator.serviceWorker.controller) {
          setWaitingWorker(registration.waiting);
        }

        registration.addEventListener("updatefound", () => {
          if (registration.installing) trackInstalling(registration.installing);
        });
      })
      .catch(() => {});

    let hasReloaded = false;
    const handleControllerChange = () => {
      if (hasReloaded || !userInitiatedRefresh.current) return;
      hasReloaded = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange,
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
    };
  }, []);

  if (!waitingWorker) return null;

  const refresh = () => {
    userInitiatedRefresh.current = true;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gray-900 px-4 py-3 text-sm text-white">
      <p>A new version is available.</p>
      <Button onClick={refresh}>Refresh</Button>
    </div>
  );
}

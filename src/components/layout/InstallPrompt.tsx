"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

const DISMISS_KEY = "install-prompt-dismissed";

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isInStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function InstallPrompt() {
  const { canInstall, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(true);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(localStorage.getItem(DISMISS_KEY) === "true");
    setShowIosInstructions(isIos() && !isInStandaloneMode());
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setDismissed(true);
  };

  if (dismissed || (!canInstall && !showIosInstructions)) return null;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-blue-200 bg-blue-50 px-4 py-3 text-sm dark:border-blue-900 dark:bg-blue-950">
      {showIosInstructions ? (
        <p>
          Install this app: tap the Share icon, then &quot;Add to Home
          Screen&quot;.
        </p>
      ) : (
        <p>Install this app for a faster, offline-capable experience.</p>
      )}
      <div className="flex shrink-0 gap-2">
        {!showIosInstructions && (
          <Button onClick={promptInstall}>Install</Button>
        )}
        <Button variant="secondary" onClick={dismiss}>
          Dismiss
        </Button>
      </div>
    </div>
  );
}

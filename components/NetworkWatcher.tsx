// components/NetworkWatcher.tsx
"use client";
import { useEffect } from "react";
import { useKamijiStore } from "@/store";

export function NetworkWatcher() {
  const setOffline = useKamijiStore((state) => state.setOffline);

  useEffect(() => {
    // Set initial state based on current network status
    setOffline(!navigator.onLine);

    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOffline]);

  return null; // Pure side-effect component — renders nothing
}

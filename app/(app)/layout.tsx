// app/(app)/layout.tsx
// Authenticated shell layout — guards all routes inside this group
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import { OfflineBanner } from "@/components/OfflineBanner";
import DictionaryLoader from "@/components/DictionaryLoader";
import { useCurrentLevel } from "@/store";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, initializing } = useAuth();
  const router = useRouter();
  const currentLevel = useCurrentLevel();

  useEffect(() => {
    if (!initializing && !user) {
      router.replace("/login");
    }
  }, [user, initializing, router]);

  // Still resolving auth — render nothing (SplashScreen handled by AuthProvider above)
  if (initializing || !user) {
    return null;
  }

  return (
    <div
      id="app-shell"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100svh",
        // Account for bottom nav + iOS safe area
        paddingBottom: "calc(64px + env(safe-area-inset-bottom))",
        backgroundColor: "var(--color-bg)",
        position: "relative",
      }}
    >
      <OfflineBanner />

      <main
        id="app-main"
        style={{
          flex: 1,
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        <DictionaryLoader level={currentLevel}>
          {children}
        </DictionaryLoader>
      </main>

      <BottomNav />
    </div>
  );
}

// components/AuthProvider.tsx
"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthContext } from "@/contexts/AuthContext";
import { SplashScreen } from "@/components/SplashScreen";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const { restoreProgressFromFirestore } = await import("@/lib/sync/firestore");
          await restoreProgressFromFirestore(firebaseUser.uid);
        } catch (err) {
          console.error("Progress restore failed:", err);
        }
      }

      if (!cancelled) {
        setUser(firebaseUser);
        setInitializing(false);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  // Show branded splash while Firebase resolves auth state
  if (initializing) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}

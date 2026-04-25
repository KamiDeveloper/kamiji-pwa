// store/index.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "firebase/auth";

export type JLPTLevel = "n5" | "n4" | "n3" | "n2" | "n1";

// ── Slice interfaces ──────────────────────────────────────

interface AuthSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface ThemeSlice {
  currentLevel: JLPTLevel;
  setLevel: (level: JLPTLevel) => void;
}

interface AppSlice {
  isOffline: boolean;
  setOffline: (offline: boolean) => void;
}

type KamijiStore = AuthSlice & ThemeSlice & AppSlice;

// ── Store ─────────────────────────────────────────────────

export const useKamijiStore = create<KamijiStore>()(
  persist(
    (set) => ({
      // Auth slice
      user: null,
      setUser: (user) => set({ user }),

      // Theme slice — persisted so level survives page refresh
      currentLevel: "n5",
      setLevel: (level) => set({ currentLevel: level }),

      // App slice
      isOffline: false,
      setOffline: (offline) => set({ isOffline: offline }),
    }),
    {
      name: "kamiji-store",
      storage: createJSONStorage(() => localStorage),
      // Only persist level — user is managed by Firebase auth state
      // isOffline is transient (derived from network events)
      partialize: (state) => ({
        currentLevel: state.currentLevel,
      }),
    }
  )
);

// ── Selector hooks (stable references) ─────────────────────

export const useCurrentLevel = () =>
  useKamijiStore((state) => state.currentLevel);

export const useSetLevel = () =>
  useKamijiStore((state) => state.setLevel);

export const useAuthUser = () =>
  useKamijiStore((state) => state.user);

export const useIsOffline = () =>
  useKamijiStore((state) => state.isOffline);

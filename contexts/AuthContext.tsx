// contexts/AuthContext.tsx
"use client";
import { createContext, useContext } from "react";
import type { User } from "firebase/auth";

interface AuthContextValue {
  user: User | null;
  initializing: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  initializing: true,
});

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

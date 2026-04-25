// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace("/");
    } catch (err) {
      const errorCode = (err as { code?: string }).code;
      if (errorCode === "auth/popup-closed-by-user") {
        setError(null); // User cancelled — not an error
      } else {
        setError("No pudimos iniciar sesión. Por favor intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      id="login-page"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-bg)",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-cormorant-garamond, serif)",
            fontSize: "4rem",
            color: "var(--color-brand-vermilion)",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          神字
        </div>
        <h1
          style={{
            fontFamily: "var(--font-cormorant-garamond, serif)",
            fontSize: "2rem",
            fontWeight: 600,
            color: "var(--color-text)",
            margin: "0.5rem 0 0",
            letterSpacing: "0.1em",
          }}
        >
          KamiJi
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--color-text-muted)",
            margin: "0.5rem 0 0",
          }}
        >
          La aplicación que crece contigo
        </p>
      </div>

      {/* Sign-in section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          maxWidth: "320px",
        }}
      >
        <button
          id="google-signin-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            width: "100%",
            padding: "0.875rem 1.5rem",
            backgroundColor: loading ? "var(--color-border)" : "#FFFFFF",
            color: "#0F1320",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-button)",
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            transition: "all 0.2s ease",
          }}
          aria-label="Iniciar sesión con Google"
        >
          {/* Google G icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {loading ? "Iniciando sesión..." : "Continuar con Google"}
        </button>

        {error && (
          <p
            role="alert"
            style={{
              color: "var(--color-brand-vermilion)",
              fontSize: "0.875rem",
              textAlign: "center",
              fontFamily: "var(--font-body)",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </main>
  );
}

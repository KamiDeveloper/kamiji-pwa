// app/(app)/review/page.tsx - Review/SRS (tab: Repasar)
import { SrsContextPanel } from "@/components/srs/SrsContextPanel";

export default function ReviewPage() {
  return (
    <div
      id="review-page"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)", margin: 0 }}>
        Repasar
      </h1>
      <SrsContextPanel surface="review" />
      <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)", margin: 0 }}>
        La sesión visual completa sigue pendiente, pero la cola diaria ya refleja límites, bienvenida y progreso local.
      </p>
    </div>
  );
}

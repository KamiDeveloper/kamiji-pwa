'use client';

// hooks/useGestureSystem.ts
// 7-gesture interaction system using Pointer Events.
// Handles scroll priority, ghost-click guard, and iOS Safari contextmenu suppression.

import { RefObject, useEffect, useRef } from 'react';

export interface GestureCallbacks {
  /** GESTURE-01: single tap → reveal furigana for this kanji */
  onChuleta: (kanji: string) => void;
  /** GESTURE-02: triple tap → reveal all furigana in container */
  onChuletaGlobal: () => void;
  /** GESTURE-03: long-press ≥ 500ms → open Translation Panel */
  onRayoX: (kanji: string, el: HTMLElement) => void;
  /** GESTURE-04: long-press + horizontal drag → group translation */
  onSubrayado: (kanjiRange: string[]) => void;
  /** GESTURE-05: scan mode drag (fires per new kanji entered) */
  onScan: (kanji: string) => void;
}

export function useGestureSystem(
  containerRef: RefObject<HTMLElement | null>,
  callbacks: GestureCallbacks
): void {
  // Keep callbacks in a ref so the effect closure never becomes stale
  const cb = useRef(callbacks);
  useEffect(() => { cb.current = callbacks; }, [callbacks]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Gesture state ─────────────────────────────────────────────────────────
    let activePointerId: number | null = null;
    let downTime = 0;
    let downX = 0;
    let downY = 0;

    // Long-press
    let longPressTimer: ReturnType<typeof setTimeout> | null = null;
    let isLongPress = false;
    let longPressKanji: string | null = null;
    let longPressEl: HTMLElement | null = null;

    // Scroll cancellation
    let cancelled = false;

    // Ghost click guard
    let ghostGuard = false;
    let ghostTimer: ReturnType<typeof setTimeout> | null = null;

    // Triple-tap tracking
    let tapCount = 0;
    let tapResetTimer: ReturnType<typeof setTimeout> | null = null;

    // Scan mode (long-press + horizontal drag)
    let isDragScan = false;
    const scannedKanjis = new Set<string>();

    // ── Helpers ───────────────────────────────────────────────────────────────
    function getKanjiEl(target: EventTarget | null): HTMLElement | null {
      if (!(target instanceof Element)) return null;
      return (target.closest('[data-kanji]') as HTMLElement) ?? null;
    }

    function clearLP() {
      if (longPressTimer !== null) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    }

    // ── Event handlers ────────────────────────────────────────────────────────
    function onPointerDown(e: PointerEvent) {
      // Only process the first pointer (ignore multi-touch)
      if (activePointerId !== null) return;
      activePointerId = e.pointerId;
      downTime = Date.now();
      downX = e.clientX;
      downY = e.clientY;
      isLongPress = false;
      cancelled = false;
      isDragScan = false;
      scannedKanjis.clear();

      const el = getKanjiEl(e.target);
      longPressEl = el;
      longPressKanji = el?.dataset.kanji ?? null;

      if (el && longPressKanji) {
        longPressTimer = setTimeout(() => {
          isLongPress = true;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          cb.current.onRayoX(longPressKanji!, el);
        }, 500);
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerId !== activePointerId) return;

      const dx = e.clientX - downX;
      const dy = e.clientY - downY;
      const elapsed = Date.now() - downTime;

      // GESTURE-09: vertical scroll priority — cancel all gestures
      if (!cancelled && Math.abs(dy) > 10 && elapsed < 100) {
        cancelled = true;
        clearLP();
        return;
      }
      if (cancelled) return;

      const dist = Math.hypot(dx, dy);

      if (!isLongPress) {
        // Cancel long-press if moved too far before 500ms
        if (dist > 10) clearLP();
      } else {
        // Long-press confirmed — check for horizontal drag (scan mode)
        if (!isDragScan && Math.abs(dx) > 10) {
          isDragScan = true;
          if (longPressKanji) scannedKanjis.add(longPressKanji);
        }
        if (isDragScan) {
          const el = getKanjiEl(e.target);
          const kanji = el?.dataset.kanji;
          if (kanji && !scannedKanjis.has(kanji)) {
            scannedKanjis.add(kanji);
            cb.current.onScan(kanji);
          }
        }
      }
    }

    function onPointerUp(e: PointerEvent) {
      if (e.pointerId !== activePointerId) return;
      activePointerId = null;

      const elapsed = Date.now() - downTime;
      const dx = e.clientX - downX;
      const dy = e.clientY - downY;
      const dist = Math.hypot(dx, dy);

      clearLP();

      if (isLongPress) {
        // GESTURE-10: ghost click guard — 50ms window after long-press ends
        ghostGuard = true;
        if (ghostTimer) clearTimeout(ghostTimer);
        ghostTimer = setTimeout(() => { ghostGuard = false; }, 50);

        // Fire SubrayadoX if dragged across multiple kanjis
        if (isDragScan && scannedKanjis.size > 1) {
          cb.current.onSubrayado(Array.from(scannedKanjis));
        }

        isLongPress = false;
        isDragScan = false;
        scannedKanjis.clear();
        return;
      }

      if (cancelled) {
        cancelled = false;
        return;
      }

      // Tap: < 300ms, movement < 5px
      if (elapsed < 300 && dist < 5) {
        const el = getKanjiEl(e.target);
        const kanji = el?.dataset.kanji;
        if (!kanji) return;

        // Triple-tap detection (within 600ms)
        tapCount++;
        if (tapResetTimer) clearTimeout(tapResetTimer);
        tapResetTimer = setTimeout(() => { tapCount = 0; }, 600);

        if (tapCount >= 3) {
          tapCount = 0;
          if (tapResetTimer) clearTimeout(tapResetTimer);
          cb.current.onChuletaGlobal();
        } else {
          cb.current.onChuleta(kanji);
        }
      }
    }

    function onPointerCancel(e: PointerEvent) {
      if (e.pointerId !== activePointerId) return;
      activePointerId = null;
      clearLP();
      isLongPress = false;
      isDragScan = false;
      scannedKanjis.clear();
      cancelled = false;
    }

    // GESTURE-10: suppress ghost clicks after long-press (capture phase)
    function onClickCapture(e: MouseEvent) {
      if (ghostGuard) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    // GESTURE-11: iOS Safari — suppress native context menu on kanji elements
    function onContextMenu(e: Event) {
      if ((e.target as Element).closest('[data-kanji]')) {
        e.preventDefault();
      }
    }

    // ── Attach listeners ──────────────────────────────────────────────────────
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerCancel);
    container.addEventListener('click', onClickCapture, true); // capture phase
    container.addEventListener('contextmenu', onContextMenu);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerCancel);
      container.removeEventListener('click', onClickCapture, true);
      container.removeEventListener('contextmenu', onContextMenu);
      clearLP();
      if (ghostTimer) clearTimeout(ghostTimer);
      if (tapResetTimer) clearTimeout(tapResetTimer);
    };
  }, [containerRef]);
}

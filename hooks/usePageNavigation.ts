'use client';

// hooks/usePageNavigation.ts
// Horizontal swipe pagination with debounce and pointer event binding.

import { useState, useRef, useCallback } from 'react';
import type React from 'react';

export interface UsePageNavigationProps {
  pages: string[];
  initialPage?: number;
  onPageChange?: (page: number) => void;
  /** When true, swipe-to-page is disabled (Translation Panel takes priority) */
  isPanelOpen?: boolean;
}

export interface UsePageNavigationReturn {
  currentPage: number;
  totalPages: number;
  pageContent: string;
  goNext: () => void;
  goPrev: () => void;
  goTo: (page: number) => void;
  bindSwipe: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
  };
}

export function usePageNavigation({
  pages,
  initialPage = 0,
  onPageChange,
  isPanelOpen = false,
}: UsePageNavigationProps): UsePageNavigationReturn {
  const maxPage = Math.max(0, pages.length - 1);
  const [currentPage, setCurrentPage] = useState(() =>
    Math.max(0, Math.min(initialPage, maxPage))
  );

  // Debounce flag — prevents multi-page jumps (300ms window)
  const debounceRef = useRef(false);

  // Swipe tracking
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);

  const goNext = useCallback(() => {
    setCurrentPage((p) => {
      const next = Math.min(p + 1, maxPage);
      onPageChange?.(next);
      return next;
    });
  }, [maxPage, onPageChange]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => {
      const prev = Math.max(Math.min(p, maxPage) - 1, 0);
      onPageChange?.(prev);
      return prev;
    });
  }, [maxPage, onPageChange]);

  const goTo = useCallback(
    (page: number) => {
      const clamped = Math.max(0, Math.min(page, maxPage));
      setCurrentPage(clamped);
      onPageChange?.(clamped);
    },
    [maxPage, onPageChange]
  );

  const safeCurrentPage = Math.min(currentPage, maxPage);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    swipeStartX.current = e.clientX;
    swipeStartY.current = e.clientY;
  }, []);

  // No-op: swipe evaluation happens at pointerup
  const onPointerMove = useCallback(() => {}, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (swipeStartX.current === null || swipeStartY.current === null) return;

      const dx = e.clientX - swipeStartX.current;
      const dy = e.clientY - swipeStartY.current;
      swipeStartX.current = null;
      swipeStartY.current = null;

      // Yield to panel gesture system when panel is open
      if (isPanelOpen) return;
      // Respect debounce window
      if (debounceRef.current) return;

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Angle from horizontal: must be < 30°
      const angle = Math.atan2(absDy, absDx) * (180 / Math.PI);

      if (absDx > 100 && angle < 30) {
        // Arm debounce
        debounceRef.current = true;
        setTimeout(() => {
          debounceRef.current = false;
        }, 300);

        if (dx < 0) {
          // Swipe left → next page
          setCurrentPage((p) => {
            const next = Math.min(p + 1, maxPage);
            onPageChange?.(next);
            return next;
          });
        } else {
          // Swipe right → previous page
          setCurrentPage((p) => {
            const prev = Math.max(Math.min(p, maxPage) - 1, 0);
            onPageChange?.(prev);
            return prev;
          });
        }
      }
    },
    [isPanelOpen, maxPage, onPageChange]
  );

  return {
    currentPage: safeCurrentPage,
    totalPages: pages.length,
    pageContent: pages[safeCurrentPage] ?? '',
    goNext,
    goPrev,
    goTo,
    bindSwipe: { onPointerDown, onPointerMove, onPointerUp },
  };
}

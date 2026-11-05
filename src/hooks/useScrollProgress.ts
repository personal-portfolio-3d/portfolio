"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { SECTIONS } from "@/data/portfolioData";

export const MIN_Z = 5;
export const MAX_Z = -735;
const TOTAL_SPAN = Math.abs(MAX_Z - MIN_Z);

export function useScrollProgress(isLocked: boolean = false) {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [currentZ, setCurrentZ] = useState(MIN_Z);
  const [velocity, setVelocity] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const targetZRef = useRef(MIN_Z);
  const currentZRef = useRef(MIN_Z);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isLockedRef = useRef(isLocked);

  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  // Jump to specific section
  const jumpToSection = useCallback((index: number) => {
    if (index >= 0 && index < SECTIONS.length) {
      const target = SECTIONS[index].zPos;
      targetZRef.current = target;
    }
  }, []);

  const jumpToZ = useCallback((z: number) => {
    targetZRef.current = Math.max(MAX_Z, Math.min(MIN_Z, z));
  }, []);

  useEffect(() => {
    let animId: number;
    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      if (isLockedRef.current) return;
      // Controlled scroll speed: 0.05 for cinematic, weighted camera travel
      const delta = e.deltaY;
      const speedMultiplier = 0.052;
      targetZRef.current = Math.max(
        MAX_Z,
        Math.min(MIN_Z, targetZRef.current - delta * speedMultiplier)
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isLockedRef.current) return;
      if (e.touches.length > 0) {
        const delta = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        const touchMultiplier = 0.11;
        targetZRef.current = Math.max(
          MAX_Z,
          Math.min(MIN_Z, targetZRef.current - delta * touchMultiplier)
        );
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isLockedRef.current) return;
      const step = 8;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        targetZRef.current = Math.max(MAX_Z, targetZRef.current - step);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        targetZRef.current = Math.min(MIN_Z, targetZRef.current + step);
      } else if (e.key === "Home") {
        targetZRef.current = MIN_Z;
      } else if (e.key === "End") {
        targetZRef.current = MAX_Z;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // Animation Loop for Butter-smooth Damped Lerping
    const updateLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaMs = Math.min(timestamp - lastTimeRef.current, 50);
      lastTimeRef.current = timestamp;

      const prevZ = currentZRef.current;
      // Smooth cinematic damping
      const factor = 1 - Math.pow(0.003, deltaMs / 1000);
      currentZRef.current += (targetZRef.current - currentZRef.current) * factor;

      const instantVel = Math.abs(currentZRef.current - prevZ) * (1000 / Math.max(deltaMs, 1));
      velocityRef.current = velocityRef.current * 0.88 + instantVel * 0.12;

      const progress = Math.max(
        0,
        Math.min(1, (MIN_Z - currentZRef.current) / TOTAL_SPAN)
      );

      // Find closest section
      let closestIdx = 0;
      let minDistance = Infinity;
      SECTIONS.forEach((sec, idx) => {
        const dist = Math.abs(currentZRef.current - sec.zPos);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setCurrentZ(currentZRef.current);
      setScrollProgress(progress);
      setVelocity(velocityRef.current);
      setActiveSectionIndex(closestIdx);

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return {
    scrollProgress,
    currentZ,
    targetZ: targetZRef.current,
    velocity,
    activeSectionIndex,
    jumpToSection,
    jumpToZ,
  };
}

"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      // Detect interactive targets
      const target = (e.target as HTMLElement)?.closest(
        "a, button, [role='button'], [data-cursor], .skills-chip, .bleed-item, .hero-flip-card, .interactive-sticker, input, textarea"
      ) as HTMLElement | null;

      if (target) {
        setIsHovering(true);
        const label = target.getAttribute("data-cursor-label");
        setCursorLabel(label || null);
      } else {
        setIsHovering(false);
        setCursorLabel(null);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let rafId: number;
    const animate = () => {
      // Smooth lerp for outer target ring
      ringRef.current.x += (posRef.current.x - ringRef.current.x) * 0.32;
      ringRef.current.y += (posRef.current.y - ringRef.current.y) * 0.32;
      setRingPosition({ x: ringRef.current.x, y: ringRef.current.y });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Target Circle - Exactly as in Image 2 */}
      <div
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={`rounded-full border border-[#111111] transition-all duration-200 ease-out flex items-center justify-center ${
            isClicking
              ? "w-5 h-5 scale-90 border-[#b42318]"
              : isHovering
              ? "w-9 h-9 border-[#111111] scale-110 shadow-sm"
              : "w-[26px] h-[26px] border-[#111111]/90"
          }`}
          style={{
            borderWidth: "1.35px",
          }}
        />
      </div>

      {/* Solid Center Dot - Exactly as in Image 2 (Instant tracking for zero click lag) */}
      <div
        className="pointer-events-none fixed z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={`rounded-full bg-[#111111] transition-all duration-150 ${
            isClicking
              ? "w-2 h-2 bg-[#b42318] scale-125"
              : isHovering
              ? "w-1.5 h-1.5"
              : "w-[4.5px] h-[4.5px]"
          }`}
        />

        {/* Floating Pill Label beside cursor (e.g. "MAKE IT YOURS", "TURN", "CLICK ĐỔI MÓN") */}
        {cursorLabel && (
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-[#111111] text-[#fafaf8] text-[10px] font-mono tracking-widest uppercase shadow-md animate-in fade-in zoom-in-90 duration-150 border border-white/10"
          >
            {cursorLabel}
          </div>
        )}
      </div>
    </>
  );
}


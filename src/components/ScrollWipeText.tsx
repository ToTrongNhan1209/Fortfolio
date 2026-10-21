"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface ScrollWipeTextProps {
  text: string;
  className?: string;
  accentWords?: string[];
  as?: "p" | "h2" | "h3" | "span" | "div";
}

export function ScrollWipeText({
  text,
  className = "",
  accentWords = [],
  as: Component = "p",
}: ScrollWipeTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const calculateProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start filling when top of element enters 88% of screen height
    // Fully inked when top reaches 32% of screen height
    const triggerStart = windowHeight * 0.88;
    const triggerEnd = windowHeight * 0.32;

    const currentProgress = Math.min(
      1,
      Math.max(0, (triggerStart - rect.top) / (triggerStart - triggerEnd))
    );

    setProgress(currentProgress);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    calculateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [calculateProgress]);

  const words = text.split(" ");
  const cleanWord = (w: string) => w.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").toLowerCase();

  return (
    <Component
      ref={containerRef as any}
      className={`relative leading-relaxed select-text ${className}`}
    >
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;
        const wordProgress = Math.min(
          1,
          Math.max(0, (progress - wordStart) / (wordEnd - wordStart))
        );

        const isAccent = accentWords.some(
          (acc) => cleanWord(acc) === cleanWord(word)
        );

        return (
          <span
            key={i}
            className="inline-block relative whitespace-pre mr-[0.28em] my-[0.05em]"
          >
            {/* Ghost background ink layer */}
            <span className="text-[#111111]/25 select-none transition-colors duration-200">
              {word}
            </span>

            {/* Crisp filled foreground layer responding to scroll */}
            <span
              className={`absolute inset-0 select-text pointer-events-none transition-all duration-75 ${
                isAccent ? "text-[#b42318] font-medium" : "text-[#111111]"
              }`}
              style={{
                clipPath: `inset(0 ${(1 - wordProgress) * 100}% 0 0)`,
                opacity: wordProgress > 0.05 ? 1 : 0,
                filter: wordProgress < 0.25 ? `blur(${(1 - wordProgress) * 3}px)` : "none",
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
}

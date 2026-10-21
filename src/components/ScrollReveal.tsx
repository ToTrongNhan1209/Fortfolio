"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  as?: "div" | "section" | "article" | "li" | "ul" | "span" | "header" | "aside" | "p";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.12,
  direction = "up",
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(26px)";
      case "down":
        return "translateY(-26px)";
      case "left":
        return "translateX(26px)";
      case "right":
        return "translateX(-26px)";
      case "none":
        return "none";
    }
  };

  return (
    <Component
      ref={ref as any}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: isRevealed ? 1 : 0,
        filter: isRevealed ? "blur(0px)" : "blur(8px)",
        transform: isRevealed ? "none" : getInitialTransform(),
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </Component>
  );
}

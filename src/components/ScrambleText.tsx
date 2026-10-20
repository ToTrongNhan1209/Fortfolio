"use client";

import React, { useState, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

const GLYPH_ENTRIES = [
  { glyph: ">", color: "#00c4b4" }, // cyan (as in screenshot)
  { glyph: "#", color: "#10b981" }, // emerald green (as in screenshot)
  { glyph: ">", color: "#00c4b4" }, // weighted
  { glyph: "#", color: "#10b981" }, // weighted
  { glyph: "*", color: "#b42318" }, // terracotta
  { glyph: "~", color: "#00c4b4" }, // cyan
  { glyph: "^", color: "#10b981" }, // emerald
  { glyph: "%", color: "#f59e0b" }, // warm amber
  { glyph: "&", color: "#8b5cf6" }, // violet
  { glyph: "+", color: "#00c4b4" }, // cyan
  { glyph: "/", color: "#b42318" }, // terracotta
  { glyph: "!", color: "#b42318" }, // red
  { glyph: "$", color: "#10b981" }, // green
  { glyph: "=", color: "#00c4b4" }, // cyan
  { glyph: "?", color: "#ec4899" }, // pink
];

interface CharState {
  original: string;
  display: string;
  isGlitching: boolean;
  color?: string;
}

export function ScrambleText({
  text,
  className = "",
  as: Component = "span",
}: ScrambleTextProps) {
  const [chars, setChars] = useState<CharState[]>(() =>
    text.split("").map((c) => ({
      original: c,
      display: c,
      isGlitching: false,
    }))
  );

  const timeoutRefs = useRef<Record<number, NodeJS.Timeout>>({});

  // When text prop changes
  React.useEffect(() => {
    setChars(
      text.split("").map((c) => ({
        original: c,
        display: c,
        isGlitching: false,
      }))
    );
  }, [text]);

  // Scramble a specific character on direct hover
  const triggerCharGlitch = (index: number) => {
    if (!chars[index] || chars[index].original === " " || chars[index].original === "\n") return;

    if (timeoutRefs.current[index]) {
      clearTimeout(timeoutRefs.current[index]);
    }

    const randomPick = GLYPH_ENTRIES[Math.floor(Math.random() * GLYPH_ENTRIES.length)];

    setChars((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = {
          ...next[index],
          display: randomPick.glyph,
          isGlitching: true,
          color: randomPick.color,
        };
      }
      return next;
    });

    timeoutRefs.current[index] = setTimeout(() => {
      setChars((prev) => {
        const next = [...prev];
        if (next[index]) {
          next[index] = {
            ...next[index],
            display: next[index].original,
            isGlitching: false,
            color: undefined,
          };
        }
        return next;
      });
    }, 550);
  };

  return (
    <Component className={`inline-block select-none cursor-default ${className}`}>
      {chars.map((charItem, idx) => {
        if (charItem.original === " ") {
          return <span key={idx}> </span>;
        }

        return (
          <span
            key={idx}
            onMouseEnter={() => triggerCharGlitch(idx)}
            onMouseMove={() => {
              if (!charItem.isGlitching) triggerCharGlitch(idx);
            }}
            className="inline-block transition-transform duration-150"
            style={{
              color: charItem.isGlitching ? charItem.color : "inherit",
              transform: charItem.isGlitching ? "scale(1.15) translateY(-1px)" : "none",
              fontWeight: charItem.isGlitching ? 700 : "inherit",
              fontFamily: charItem.isGlitching
                ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                : "inherit",
              fontStyle: charItem.isGlitching ? "normal" : "inherit",
            }}
          >
            {charItem.display}
          </span>
        );
      })}
    </Component>
  );
}

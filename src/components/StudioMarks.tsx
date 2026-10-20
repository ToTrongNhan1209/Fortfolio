"use client";

import React from "react";
import Image from "next/image";

// The Gear mark circled in RED in the user's screenshot
export function GearMark({
  className = "w-6 h-6",
  isRotating = false,
}: {
  className?: string;
  isRotating?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={`${className} transition-transform duration-500 ${
        isRotating ? "animate-[spin_6s_linear_infinite]" : "hover:rotate-45"
      }`}
    >
      {/* Outer scalloped gear teeth */}
      <path
        d="M16 2.5 L18.2 5.5 L21.8 4.2 L23.2 7.7 L26.9 7.5 L27.2 11.2 L30.5 12.5 L29.5 16.1 L32 18.5 L29.8 21.5 L31.2 25 L27.6 26.2 L26.2 29.7 L22.5 29.5 L21.2 33 L17.5 32 L16 35 L14.5 32 L10.8 33 L9.5 29.5 L5.8 29.7 L4.4 26.2 L0.8 25 L2.2 21.5 L0 18.5 L2.5 16.1 L1.5 12.5 L4.8 11.2 L5.1 7.5 L8.8 7.7 L10.2 4.2 L13.8 5.5 Z"
        fill="#111111"
        transform="scale(0.85) translate(2.8, 2.8)"
      />
      {/* Precision 12-tooth industrial cog contour */}
      <path
        d="M14.2 4.5h3.6l.8 2.8a9.4 9.4 0 0 1 2.3 1l2.5-1.5 2.5 2.5-1.5 2.5a9.4 9.4 0 0 1 1 2.3l2.8.8v3.6l-2.8.8a9.4 9.4 0 0 1-1 2.3l1.5 2.5-2.5 2.5-2.5-1.5a9.4 9.4 0 0 1-2.3 1l-.8 2.8h-3.6l-.8-2.8a9.4 9.4 0 0 1-2.3-1l-2.5 1.5-2.5-2.5 1.5-2.5a9.4 9.4 0 0 1-1-2.3l-2.8-.8v-3.6l2.8-.8a9.4 9.4 0 0 1 1-2.3l-1.5-2.5 2.5-2.5 2.5 1.5a9.4 9.4 0 0 1 2.3-1z"
        fill="#ffffff"
        stroke="#111111"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Inner circle */}
      <circle cx="16" cy="16" r="6" fill="#fafaf8" stroke="#111111" strokeWidth="1.4" />
      {/* Signature Red Dot / Eye Center in user's screenshot */}
      <circle cx="16" cy="16" r="3.2" fill="#b42318" />
    </svg>
  );
}

// 3D Mechanical Keycap illustration with red letter 'N'
export function KeycapIllustration({
  assembly = 100,
  letter = "N",
  isPressed = false,
}: {
  assembly?: number;
  letter?: string;
  isPressed?: boolean;
}) {
  const p = Math.max(0, Math.min(100, assembly)) / 100;
  const pressY = isPressed ? 8 : 0;

  return (
    <svg
      viewBox="0 0 200 160"
      className="w-full h-full max-h-48 select-none transition-transform duration-200"
      style={{
        transform: `translateY(${pressY}px)`,
        filter: "drop-shadow(0 12px 20px rgba(17,17,17,0.12))",
      }}
    >
      {/* Base / Stem (slides up during assembly) */}
      <g opacity={Math.min(1, p * 1.5)}>
        <polygon
          points="55,115 145,115 135,138 65,138"
          fill="#44423e"
          stroke="#111111"
          strokeWidth="1.8"
        />
        <polygon
          points="65,138 135,138 130,146 70,146"
          fill="#2b2a28"
          stroke="#111111"
          strokeWidth="1.8"
        />
      </g>

      {/* Keycap Housing Facets */}
      <g style={{ transform: `translateY(${(1 - p) * -30}px)` }}>
        {/* Left facet */}
        <polygon
          points="40,110 58,45 80,45 62,110"
          fill="#eae6dc"
          stroke="#111111"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Right facet */}
        <polygon
          points="138,110 120,45 142,45 160,110"
          fill="#d8d4c9"
          stroke="#111111"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Front skirt */}
        <polygon
          points="62,110 138,110 148,118 52,118"
          fill="#cfcac0"
          stroke="#111111"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Main curved top surface */}
        <polygon
          points="58,45 142,45 138,110 62,110"
          fill="#fbf9f4"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Dish indentation subtle curve */}
        <ellipse cx="100" cy="76" rx="32" ry="24" fill="#f4efe4" opacity="0.45" />

        {/* Inked Letter 'N' (or custom letter) in Fraunces Serif Red */}
        <text
          x="100"
          y="85"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#b42318"
          className="font-name-italic select-none"
          style={{
            fontSize: "44px",
            fontFamily: "var(--font-fraunces), serif",
            fontStyle: "italic",
            fontWeight: 600,
            opacity: Math.min(1, p * 2),
            transform: `scale(${0.7 + p * 0.3})`,
            transformOrigin: "100px 76px",
          }}
        >
          {letter}
        </text>
      </g>
    </svg>
  );
}

// Origami Paper Airplane illustration
export function PaperPlaneIllustration({
  assembly = 100,
}: {
  assembly?: number;
}) {
  const p = Math.max(0, Math.min(100, assembly)) / 100;

  return (
    <svg
      viewBox="0 0 240 180"
      className="w-full h-full max-h-48 select-none transition-transform duration-300 hover:-rotate-3 hover:scale-105"
      style={{
        filter: "drop-shadow(0 14px 24px rgba(17,17,17,0.1))",
      }}
    >
      <g transform="translate(120, 90) rotate(-22) translate(-120, -90)">
        {/* Shadow underside */}
        <polygon
          points="40,120 180,40 150,135"
          fill="#e4dfd4"
          stroke="#111111"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Center fuselage crease */}
        <polygon
          points="40,120 180,40 140,110"
          fill="#f4f0e6"
          stroke="#111111"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Upper wing panel */}
        <polygon
          points="40,120 180,40 85,90"
          fill="#ffffff"
          stroke="#111111"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Wing folds wireframe during assembly */}
        <line
          x1="180"
          y1="40"
          x2="140"
          y2="110"
          stroke="#111111"
          strokeWidth="1.6"
          strokeDasharray={p < 0.9 ? "4 4" : "none"}
        />
        <line
          x1="85"
          y1="90"
          x2="150"
          y2="135"
          stroke="#b42318"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity={1 - p}
        />
      </g>
    </svg>
  );
}

// Vietnamese Phin Coffee Filter illustration
export function PhinIllustration({
  assembly = 100,
}: {
  assembly?: number;
}) {
  const p = Math.max(0, Math.min(100, assembly)) / 100;

  return (
    <svg
      viewBox="0 0 160 180"
      className="w-full h-full max-h-48 select-none"
      style={{ filter: "drop-shadow(0 10px 18px rgba(17,17,17,0.1))" }}
    >
      {/* Coffee cup */}
      <path
        d="M50 120 L55 160 Q80 165 105 160 L110 120 Z"
        fill="#ffffff"
        stroke="#111111"
        strokeWidth="2"
      />
      {/* Coffee level in cup */}
      <path d="M57 142 Q80 146 103 142 L105 158 Q80 163 55 158 Z" fill="#3b2518" />

      {/* Drip Droplet */}
      <circle cx="80" cy="132" r="3" fill="#3b2518" className="animate-bounce" />

      {/* Drip saucer plate */}
      <ellipse cx="80" cy="118" rx="46" ry="7" fill="#d9d5cb" stroke="#111111" strokeWidth="2" />

      {/* Phin body chamber */}
      <g style={{ transform: `translateY(${(1 - p) * -20}px)` }}>
        <polygon
          points="52,65 108,65 102,118 58,118"
          fill="#ece7dc"
          stroke="#111111"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Chamber grooves */}
        <line x1="56" y1="85" x2="104" y2="85" stroke="#111111" strokeWidth="1.2" />
        <line x1="57" y1="102" x2="103" y2="102" stroke="#111111" strokeWidth="1.2" />
      </g>

      {/* Phin lid knob */}
      <g style={{ transform: `translateY(${(1 - p) * -40}px)` }}>
        <path d="M50 65 Q80 58 110 65 L108 58 Q80 53 52 58 Z" fill="#d0cbc0" stroke="#111111" strokeWidth="2" />
        <ellipse cx="80" cy="52" rx="6" ry="3" fill="#111111" />
      </g>
    </svg>
  );
}

// Fraunces Monogram Letter 'N' illustration
export function MonogramIllustration({
  assembly = 100,
  letter = "N",
}: {
  assembly?: number;
  letter?: string;
}) {
  const p = Math.max(0, Math.min(100, assembly)) / 100;

  return (
    <svg viewBox="0 0 160 160" className="w-full h-full max-h-48 select-none">
      {/* Background circular guide line */}
      <circle
        cx="80"
        cy="80"
        r="64"
        fill="none"
        stroke="#eae7e1"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      {/* Concentric construction circles */}
      <circle
        cx="80"
        cy="80"
        r="44"
        fill="none"
        stroke="#b42318"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        opacity={1 - p * 0.7}
      />

      {/* Elegant Fraunces Letter */}
      <text
        x="80"
        y="92"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#111111"
        style={{
          fontSize: "96px",
          fontFamily: "var(--font-fraunces), serif",
          fontStyle: "italic",
          fontWeight: 600,
          stroke: p < 0.8 ? "#b42318" : "none",
          strokeWidth: p < 0.8 ? "1.5" : "0",
          strokeDasharray: p < 0.6 ? "6 6" : "none",
        }}
      >
        {letter}
      </text>
    </svg>
  );
}

// Rainbow Swatches Fan
export function SwatchesMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 26" fill="none" className={`${className} transition-transform duration-300 hover:rotate-12`}>
      <g transform="translate(16, 24)">
        <path d="M0 0 L-15 -14 A20 20 0 0 1 -11 -17 Z" fill="#E53935" />
        <path d="M0 0 L-11 -17 A20 20 0 0 1 -6 -19 Z" fill="#FB8C00" />
        <path d="M0 0 L-6 -19 A20 20 0 0 1 0 -20 Z" fill="#FDD835" />
        <path d="M0 0 L0 -20 A20 20 0 0 1 6 -19 Z" fill="#43A047" />
        <path d="M0 0 L6 -19 A20 20 0 0 1 11 -17 Z" fill="#00ACC1" />
        <path d="M0 0 L11 -17 A20 20 0 0 1 15 -14 Z" fill="#1E88E5" />
        <path d="M0 0 L15 -14 A20 20 0 0 1 17 -10 Z" fill="#8E24AA" />
        <circle cx="0" cy="0" r="2.5" fill="#111111" />
      </g>
    </svg>
  );
}

// Artist Palette Mark
export function PaletteMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} transition-transform duration-300 hover:scale-110`}>
      <path
        d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.58 8 8 8 1.1 0 2-.9 2-2 0-.5-.2-.9-.5-1.3-.3-.3-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4c3.64 0 6.6-2.96 6.6-6.6C22 5.6 17.5 2 12 2z"
        fill="#f2f0ec"
        stroke="#111111"
        strokeWidth="1.5"
      />
      <circle cx="6.5" cy="11.5" r="1.5" fill="#ef4444" />
      <circle cx="9.5" cy="7.5" r="1.5" fill="#f59e0b" />
      <circle cx="14.5" cy="7.5" r="1.5" fill="#10b981" />
      <circle cx="17.5" cy="11.5" r="1.5" fill="#3b82f6" />
    </svg>
  );
}

// Dial Mark (Speedometer / Compass)
export function DialMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} transition-transform duration-300 hover:rotate-45`}>
      <circle cx="12" cy="12" r="9" stroke="#111111" strokeWidth="1.6" fill="#fdfcf9" />
      <circle cx="12" cy="12" r="2.5" fill="#111111" />
      <line x1="12" y1="12" x2="16" y2="7" stroke="#b42318" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Paintbrush Mark
export function BrushMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} transition-transform duration-300 hover:-rotate-12`}>
      <path d="M18 2l4 4-10 10H8v-4L18 2z" fill="#f2f0ec" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 20c0-2 2-4 4-4s4 2 4 4-4 2-8 0z" fill="#b42318" />
    </svg>
  );
}

// Toggle Switch Mark
export function ToggleMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 16" fill="none" className={`${className} transition-transform duration-300 hover:scale-105`}>
      <rect x="1" y="1" width="26" height="14" rx="7" fill="#111111" stroke="#111111" strokeWidth="1.2" />
      <circle cx="20" cy="8" r="5" fill="#fafaf8" />
      <circle cx="20" cy="8" r="2" fill="#b42318" />
    </svg>
  );
}

// Equalizer Faders Mark
export function FadersMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} transition-transform duration-200 hover:scale-110`}>
      <line x1="5" y1="3" x2="5" y2="21" stroke="#6b675f" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="3" y="11" width="4" height="4" rx="1" fill="#111111" />
      <line x1="12" y1="3" x2="12" y2="21" stroke="#6b675f" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="10" y="6" width="4" height="4" rx="1" fill="#b42318" />
      <line x1="19" y1="3" x2="19" y2="21" stroke="#6b675f" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="17" y="14" width="4" height="4" rx="1" fill="#111111" />
    </svg>
  );
}

// Magic Wand Mark
export function WandMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} transition-transform duration-300 hover:rotate-12`}>
      <path d="M15 4l5 5L7 21l-5-5L15 4z" fill="#f2f0ec" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 7l5 5" stroke="#b42318" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#f59e0b" />
    </svg>
  );
}

// Paint Roller Mark
export function RollerMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} transition-transform duration-300 hover:scale-110`}>
      <rect x="4" y="3" width="16" height="6" rx="2" fill="#00c4b4" stroke="#111111" strokeWidth="1.5" />
      <path d="M20 6h2v6h-9v6h-2" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9" y="16" width="4" height="6" rx="1" fill="#111111" />
    </svg>
  );
}

// Dynamic corner mark selector
export function ActiveCornerIcon({
  mark = "gear",
  className = "w-5 h-5",
  isAnimated = false,
}: {
  mark: string;
  className?: string;
  isAnimated?: boolean;
}) {
  switch (mark) {
    case "swatches":
      return <SwatchesMark className={className} />;
    case "palette":
      return <PaletteMark className={className} />;
    case "dial":
      return <DialMark className={className} />;
    case "brush":
      return <BrushMark className={className} />;
    case "toggle":
      return <ToggleMark className={className} />;
    case "faders":
      return <FadersMark className={className} />;
    case "wand":
      return <WandMark className={className} />;
    case "roller":
      return <RollerMark className={className} />;
    case "mascot":
      return (
        <div className={`relative ${className} rounded-full overflow-hidden border border-[#111111]/30`}>
          <Image src="/images/avatar-v2.png" alt="Tô Trọng Nhân" fill className="object-cover" />
        </div>
      );
    case "cube":
      return (
        <svg viewBox="0 0 32 32" fill="none" className={`${className} transition-transform duration-300 hover:rotate-12`}>
          <polygon points="16,5 26,11 16,17 6,11" fill="#fdfcf9" stroke="#111111" strokeWidth="1.4" />
          <polygon points="6,11 16,17 16,27 6,21" fill="#ece7dc" stroke="#111111" strokeWidth="1.4" />
          <polygon points="16,17 26,11 26,21 16,27" fill="#d9d4c7" stroke="#111111" strokeWidth="1.4" />
        </svg>
      );
    case "monogram":
      return (
        <span className="font-name-italic text-sm font-semibold text-[#b42318] leading-none select-none">
          N
        </span>
      );
    case "phin":
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className}>
          <ellipse cx="16" cy="22" rx="9" ry="2.2" fill="#d9d5cb" stroke="#111111" strokeWidth="1.2" />
          <path d="M10 13 L22 13 L20 22 L12 22 Z" fill="#ece7dc" stroke="#111111" strokeWidth="1.2" />
          <rect x="14" y="9" width="4" height="4" rx="0.5" fill="#cfcac0" stroke="#111111" strokeWidth="1.2" />
          <circle cx="16" cy="25" r="1.5" fill="#3b2518" />
        </svg>
      );
    case "keycap":
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className}>
          <polygon points="5,22 9,9 23,9 27,22" fill="#cfcac0" stroke="#111111" strokeWidth="1.2" />
          <polygon points="9,9 23,9 22,21 10,21" fill="#fafaf8" stroke="#111111" strokeWidth="1.2" />
          <text x="16" y="16.5" textAnchor="middle" dominantBaseline="central" fill="#b42318" fontSize="11" fontWeight="700" fontFamily="var(--font-fraunces), serif" fontStyle="italic">N</text>
        </svg>
      );
    case "plane":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} -rotate-12`}>
          <polygon points="3,19 21,5 15,20" fill="#e4dfd4" stroke="#111111" strokeWidth="1.2" />
          <polygon points="3,19 21,5 11,13" fill="#ffffff" stroke="#111111" strokeWidth="1.2" />
        </svg>
      );
    case "gear":
    default:
      return <GearMark className={className} isRotating={isAnimated} />;
  }
}

// Dynamic main mark selector (Top left, every page)
export function ActiveMainMarkIcon({
  mark = "mascot",
  className = "w-8 h-8",
  avatarUrl,
}: {
  mark: string;
  className?: string;
  avatarUrl?: string;
}) {
  switch (mark) {
    case "monogram":
      return (
        <div
          className={`${className} rounded-full border border-[#eae7e1] bg-[#f2f0ec] flex items-center justify-center font-name-italic text-base font-semibold text-[#b42318] shadow-sm transition-transform duration-200 group-hover:scale-110 select-none`}
          title="Monogram N"
        >
          N
        </div>
      );
    case "phin":
      return (
        <div
          className={`${className} rounded-full border border-[#eae7e1] bg-[#f2f0ec] flex items-center justify-center p-1 shadow-sm transition-transform duration-200 group-hover:scale-110`}
          title="Phin cà phê"
        >
          <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
            <ellipse cx="16" cy="22" rx="9" ry="2.2" fill="#d9d5cb" stroke="#111111" strokeWidth="1.2" />
            <path d="M10 13 L22 13 L20 22 L12 22 Z" fill="#ece7dc" stroke="#111111" strokeWidth="1.2" />
            <rect x="14" y="9" width="4" height="4" rx="0.5" fill="#cfcac0" stroke="#111111" strokeWidth="1.2" />
            <circle cx="16" cy="25" r="1.5" fill="#3b2518" />
          </svg>
        </div>
      );
    case "keycap":
      return (
        <div
          className={`${className} rounded-xl border border-[#eae7e1] bg-[#f2f0ec] flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-110`}
          title="Keycap N"
        >
          <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
            <polygon points="5,22 9,9 23,9 27,22" fill="#cfcac0" stroke="#111111" strokeWidth="1.2" />
            <polygon points="9,9 23,9 22,21 10,21" fill="#fafaf8" stroke="#111111" strokeWidth="1.2" />
            <text
              x="16"
              y="16.5"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#b42318"
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-fraunces), serif"
              fontStyle="italic"
            >
              N
            </text>
          </svg>
        </div>
      );
    case "plane":
      return (
        <div
          className={`${className} rounded-full border border-[#eae7e1] bg-[#f2f0ec] flex items-center justify-center p-1 shadow-sm transition-transform duration-200 group-hover:scale-110`}
          title="Paper plane"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 -rotate-12">
            <polygon points="3,19 21,5 15,20" fill="#e4dfd4" stroke="#111111" strokeWidth="1.2" />
            <polygon points="3,19 21,5 11,13" fill="#ffffff" stroke="#111111" strokeWidth="1.2" />
          </svg>
        </div>
      );
    case "cube":
      return (
        <div
          className={`${className} rounded-xl border border-[#eae7e1] bg-[#f2f0ec] flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-110`}
          title="Cube"
        >
          <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
            <polygon points="16,5 26,11 16,17 6,11" fill="#fdfcf9" stroke="#111111" strokeWidth="1.2" />
            <polygon points="6,11 16,17 16,27 6,21" fill="#ece7dc" stroke="#111111" strokeWidth="1.2" />
            <polygon points="16,17 26,11 26,21 16,27" fill="#d9d4c7" stroke="#111111" strokeWidth="1.2" />
          </svg>
        </div>
      );
    case "mascot":
    default:
      return (
        <div
          className={`relative ${className} rounded-full overflow-hidden border border-[#eae7e1] bg-[#f2f0ec] shadow-sm transition-transform duration-200 group-hover:scale-110`}
          title="Mascot"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Mascot"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#f2f0ec] flex items-center justify-center font-bold text-xs">
              TN
            </div>
          )}
        </div>
      );
  }
}



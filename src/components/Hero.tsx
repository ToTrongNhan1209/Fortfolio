"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ScrambleText } from "./ScrambleText";
import { HeroFlipCard } from "./HeroFlipCard";

interface HeroProps {
  lang: "en" | "vi";
  onOpenCv: () => void;
}

export function Hero({ lang, onOpenCv }: HeroProps) {
  const { profile } = PORTFOLIO_DATA;
  const isEn = lang === "en";

  return (
    <section className="pt-8 sm:pt-12 pb-16 hairline-b">
      {/* Top Status & Location Eyebrow - Exactly as in Image 1 */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.14em] text-[#6b675f] mb-10">
        <span className="inline-flex items-center gap-2 text-[#111111] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#b42318] inline-block animate-pulse"></span>
          <span>{isEn ? profile.statusEn : profile.statusVi}</span>
        </span>
        <span className="tracking-[0.16em]">{isEn ? profile.locationEn : profile.locationVi}</span>
      </div>

      {/* Main Grid: Left Narrative + Right Interactive 3D Flip Card */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(15rem,24vw,22rem)] gap-x-12 gap-y-10 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Display Name in Fraunces Italic Serif - Exactly as in Image 1 */}
          <h1 className="font-name-italic text-5xl sm:text-6xl md:text-[68px] leading-[1.04] text-[#111111] tracking-normal font-medium">
            <span className="block">
              <ScrambleText text="Tô Trọng" />
            </span>
            <span className="block">
              <ScrambleText text="Nhân" />
            </span>
          </h1>

          {/* Role Subtitle with Salmon Ticket Badge - Exactly as in Image 1 */}
          <div className="flex items-center gap-3 mt-1">
            <div className="w-9 h-9 rounded-xl bg-[#fae8e6] border border-[#f3d2cf] flex items-center justify-center text-base shadow-sm shrink-0">
              <span>🎟️</span>
            </div>
            <p className="font-name leading-tight">
              <span className="font-semibold text-[#111111] text-xl sm:text-2xl">
                <ScrambleText text="Software Engineer" />
              </span>{" "}
              <span className="text-[#6b675f] font-normal text-xl sm:text-2xl">
                / <ScrambleText text="Full-stack" />
              </span>
            </p>
          </div>

          {/* Narrative Paragraphs */}
          <div className="flex flex-col gap-4 text-[15px] sm:text-[16px] text-[#33332f] leading-relaxed max-w-[48ch]">
            <p className="font-normal text-[#222220]">
              {isEn ? profile.greetingEn : profile.greetingVi}
            </p>
            <p className="text-[#4e4b45] leading-relaxed">
              {isEn ? profile.bioEn : profile.bioVi}
            </p>
          </div>

          {/* Action Buttons - Exactly as in Image 1 */}
          <div className="flex items-center gap-3.5 mt-2 flex-wrap">
            <a
              href="#work"
              data-cursor="true"
              data-cursor-label={isEn ? "Projects" : "Xem dự án"}
              className="group inline-flex items-center gap-2 px-6 py-2.5 text-[13px] font-medium text-[#fafaf8] bg-[#111111] hover:bg-black rounded-full shadow-sm transition-all duration-200"
            >
              <span>{isEn ? "See my work" : "Xem dự án"}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              >
                <path d="M2 2l8 8m0-6v6H4" />
              </svg>
            </a>

            <button
              onClick={onOpenCv}
              data-cursor="true"
              data-cursor-label={isEn ? "Dossier" : "Hồ sơ CV"}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-[#111111] hover:border-[#111111] bg-transparent border border-[#eae7e1] rounded-full transition-all duration-200"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#6b675f]"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>{isEn ? "View CV" : "Xem CV"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Flip Card with User's Chibi Avatar */}
        <div className="w-full flex justify-center lg:justify-end">
          <HeroFlipCard
            avatar={profile.avatar}
            name={profile.name}
            motto={isEn ? profile.mottoEn : profile.mottoVi}
            status={isEn ? "Available for hire" : "Sẵn sàng làm việc"}
            location={isEn ? profile.locationEn : profile.locationVi}
          />
        </div>
      </div>
    </section>
  );
}

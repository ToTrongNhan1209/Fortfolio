"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ScrambleText } from "./ScrambleText";

interface ManifestoProps {
  lang: "en" | "vi";
}

export function Manifesto({ lang }: ManifestoProps) {
  const { manifesto } = PORTFOLIO_DATA;
  const isEn = lang === "en";

  return (
    <section id="manifesto" className="py-16 sm:py-20 hairline-b">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 lg:gap-20">
        {/* Left Column */}
        <div className="flex flex-col">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b675f] mb-4 block">
            {isEn ? "How I work" : "Cách tôi làm việc"}
          </span>

          <h2 className="font-name text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] leading-[1.12] mb-6">
            <ScrambleText text={isEn ? "I like understanding" : "Tôi thích thấu hiểu"} />{" "}
            <span className="block font-name-italic text-[#b42318] mt-1">
              <ScrambleText text={isEn ? "the whole feature." : "toàn bộ tính năng."} />
            </span>
          </h2>

          <div className="text-[16px] text-[#33332f] leading-relaxed max-w-[46ch] space-y-4">
            <p>{isEn ? manifesto.introEn : manifesto.introVi}</p>
          </div>
        </div>

        {/* Right Column: 6-Step Pipeline List & Aside */}
        <div className="flex flex-col lg:pt-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-xl bg-[#b42318]/10 text-[#b42318] inline-flex items-center justify-center font-mono text-xs font-bold">
              ✦
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold">
              {isEn ? "From idea to working feature" : "Từ ý tưởng đến tính năng hoàn chỉnh"}
            </span>
          </div>

          <ol className="border-t border-[#eae7e1]">
            {manifesto.steps.map((step) => (
              <li
                key={step.num}
                className="flex items-baseline gap-4 border-b border-[#eae7e1] py-3.5 group hover:bg-[#f2f0ec]/40 transition-colors px-2 rounded"
              >
                <span className="text-xs font-mono text-[#6b675f] w-6 shrink-0 tabular-nums">
                  {step.num}
                </span>
                <span className="flex-1 text-sm font-medium text-[#111111] group-hover:text-[#b42318] transition-colors">
                  <ScrambleText text={isEn ? step.titleEn : step.titleVi} />
                </span>
              </li>
            ))}
          </ol>

          <aside className="mt-5 text-sm font-serif italic text-[#6b675f] rotate-[1.5deg] pl-2">
            &ldquo;{isEn ? "I usually find the edge cases while testing the flow." : "Mình thường tìm ra các lỗi biên khi trực tiếp kiểm thử luồng."}&rdquo;
          </aside>
        </div>
      </div>

      {/* 3 Core Philosophical Insights */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {manifesto.principles.map((p, idx) => (
          <div
            key={idx}
            className="border-t border-[#eae7e1] pt-5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-md bg-[#111111] text-[#fafaf8] inline-flex items-center justify-center text-[10px] font-mono">
                  {idx + 1}
                </span>
                <h3 className="text-[15px] font-semibold text-[#111111] group-hover:text-[#b42318] transition-colors">
                  <ScrambleText text={isEn ? p.titleEn : p.titleVi} />
                </h3>
              </div>
              <p className="text-[13px] text-[#55524c] leading-relaxed mb-4">
                {isEn ? p.descEn : p.descVi}
              </p>
            </div>
            <div className="text-[12px] font-mono text-[#b42318] pt-2 border-t border-[#eae7e1]/60">
              {isEn ? p.takeawayEn : p.takeawayVi}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

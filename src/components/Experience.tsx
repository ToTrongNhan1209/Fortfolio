"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ScrambleText } from "./ScrambleText";
import { ArrowUpRight } from "lucide-react";

interface ExperienceProps {
  lang: "en" | "vi";
}

export function Experience({ lang }: ExperienceProps) {
  const { experiences } = PORTFOLIO_DATA;
  const isEn = lang === "en";

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="trajectory" className="py-16 sm:py-20 hairline-b">
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b675f] mb-1 block">
            {isEn ? "Experience" : "Kinh nghiệm làm việc"}
          </span>
          <h2 className="font-name text-3xl sm:text-4xl font-medium tracking-tight text-[#111111]">
            <ScrambleText text={isEn ? "Career Trajectory." : "Quá trình Công tác."} />
          </h2>
        </div>

        {/* Experience Items List */}
        <div className="flex flex-col divide-y divide-[#eae7e1]">
          {experiences.map((exp) => (
            <div key={exp.id} className="py-10 first:pt-0 last:pb-0 flex flex-col gap-4 group">
              {/* Meta Date & Badge */}
              <div className="flex items-center justify-between text-xs font-mono text-[#6b675f] flex-wrap gap-2">
                <span>{isEn ? exp.periodEn : exp.periodVi}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f2f0ec] border border-[#eae7e1] text-[#111111]">
                  {isEn ? exp.badgeEn : exp.badgeVi}
                </span>
              </div>

              {/* Role Title & Company */}
              <div>
                <h3 className="font-name text-2xl font-medium text-[#111111] group-hover:text-[#b42318] transition-colors inline-flex items-center gap-2">
                  <ScrambleText text={isEn ? exp.roleEn : exp.roleVi} />
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6b675f] hover:text-[#111111]"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </h3>
                <div className="text-sm font-semibold text-[#b42318] mt-0.5">
                  {exp.company}
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-[15px] text-[#33332f] leading-relaxed max-w-2xl">
                {isEn ? exp.descriptionEn : exp.descriptionVi}
              </p>

              {/* Highlight Metrics */}
              {exp.stats && exp.stats.length > 0 && (
                <div className="flex items-center gap-6 py-2 border-y border-[#eae7e1]/80 my-1 flex-wrap">
                  {exp.stats.map((s, idx) => (
                    <div key={idx} className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#111111] font-mono">
                        {s.val}
                      </span>
                      <span className="text-xs text-[#6b675f]">
                        {isEn ? s.labelEn : s.labelVi}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Achievements / Points */}
              <ul className="flex flex-col gap-2 text-sm text-[#55524c] list-disc list-inside">
                {(isEn ? exp.achievementsEn : exp.achievementsVi).map((pt, pIdx) => (
                  <li key={pIdx} className="leading-relaxed">
                    <span className="text-[#33332f]">{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.stack.map((t, tIdx) => {
                  const tilts = [-1.5, 1.2, -0.8, 1.8, -1.2, 0.9];
                  const tilt = tilts[tIdx % tilts.length];
                  return (
                    <span
                      key={t}
                      className="skills-chip"
                      style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

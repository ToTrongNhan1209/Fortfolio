"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ScrambleText } from "./ScrambleText";

interface StackProps {
  lang: "en" | "vi";
}

export function Stack({ lang }: StackProps) {
  const { stackGroups } = PORTFOLIO_DATA;
  const isEn = lang === "en";

  return (
    <section id="skills" className="py-16 sm:py-20 hairline-b">
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b675f] mb-1 block">
            {isEn ? "Stack" : "Kỹ năng"}
          </span>
          <h2 className="font-name text-3xl sm:text-4xl font-medium tracking-tight text-[#111111]">
            <ScrambleText text={isEn ? "Tools I work with." : "Các công cụ tôi làm việc."} />
          </h2>
        </div>

        {/* 2-Column Grid matching voanhphi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          {stackGroups.map((group) => (
            <div key={group.categoryEn} className="flex flex-col gap-3 group">
              <div className="border-b border-[#eae7e1] pb-2">
                <h3 className="font-name text-xl font-medium text-[#111111] group-hover:text-[#b42318] transition-colors">
                  <ScrambleText text={isEn ? group.categoryEn : group.categoryVi} />
                </h3>
              </div>

              {/* Items List as Interactive Tilting Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {group.items.map((item, idx) => {
                  const tilts = [-1.5, 2.0, -2.2, 1.4, -0.9, 1.8, -1.1];
                  const tilt = tilts[idx % tilts.length];
                  return (
                    <span
                      key={item}
                      className="skills-chip"
                      style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>

              {/* Personal Developer Note */}
              <p className="text-xs font-mono text-[#6b675f] pt-1.5 italic">
                {isEn ? group.noteEn : group.noteVi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { X, Printer } from "lucide-react";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "vi";
}

export function CvModal({ isOpen, onClose, lang }: CvModalProps) {
  if (!isOpen) return null;

  const { profile, experiences, stackGroups } = PORTFOLIO_DATA;
  const isEn = lang === "en";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#fafaf8] border border-[#eae7e1] rounded-2xl p-6 sm:p-8 shadow-2xl text-left text-[#111111]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#6b675f] hover:text-[#111111] bg-[#f2f0ec] hover:bg-[#eae7e1] transition-all no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#eae7e1] pb-5 mb-6 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              {profile.name}
            </h1>
            <div className="text-sm font-mono text-[#b42318] mt-1">
              {isEn ? profile.titleEn : profile.titleVi}
            </div>
            <div className="text-xs text-[#6b675f] font-mono mt-2">
              {profile.locationEn} · {profile.phone} · {profile.email}
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-[#f5f3ee] bg-[#111111] hover:bg-[#b42318] rounded-full transition-all no-print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#b42318] mb-2 font-semibold">
            {isEn ? "Summary" : "Tóm tắt chuyên môn"}
          </h2>
          <p className="text-sm text-[#33332f] leading-relaxed">
            {isEn ? profile.bioEn : profile.bioVi}
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#b42318] mb-4 font-semibold">
            {isEn ? "Featured Projects" : "Dự án tiêu biểu"}
          </h2>
          <div className="flex flex-col gap-5">
            {PORTFOLIO_DATA.projects.map((proj) => (
              <div key={proj.id} className="text-sm">
                <div className="flex justify-between items-baseline flex-wrap">
                  <span className="font-semibold text-[#111111]">
                    {proj.title}
                  </span>
                  <span className="text-xs font-mono text-[#6b675f]">
                    {isEn ? proj.categoryEn : proj.categoryVi} · {proj.year}
                  </span>
                </div>
                <p className="text-xs text-[#55524c] mt-1 mb-2">
                  {isEn ? proj.descriptionEn : proj.descriptionVi}
                </p>
                <div className="flex flex-wrap gap-1">
                  {proj.stack.map((s) => (
                    <span key={s} className="px-2 py-0.5 text-[10px] font-mono bg-[#f2f0ec] rounded text-[#33332f]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack */}
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#b42318] mb-3 font-semibold">
            {isEn ? "Core Technologies" : "Công nghệ cốt lõi"}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {stackGroups.flatMap((g) => g.items).slice(0, 20).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs font-mono bg-[#f2f0ec] border border-[#eae7e1] rounded text-[#33332f]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

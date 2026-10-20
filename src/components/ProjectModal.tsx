"use client";

import React from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/portfolio";
import { X, ArrowUpRight } from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  lang: "en" | "vi";
}

export function ProjectModal({ project, onClose, lang }: ProjectModalProps) {
  if (!project) return null;

  const isEn = lang === "en";
  const highlights = isEn ? project.highlightsEn : project.highlightsVi;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#fafaf8] border border-[#eae7e1] rounded-2xl p-6 sm:p-8 shadow-2xl text-left text-[#111111]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#6b675f] hover:text-[#111111] bg-[#f2f0ec] hover:bg-[#eae7e1] transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image */}
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#eae7e1] mb-6 bg-[#f2f0ec]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            quality={95}
            className="object-cover"
          />
        </div>

        {/* Category & Title */}
        <div className="text-xs font-mono text-[#b42318] mb-1">
          {isEn ? project.categoryEn : project.categoryVi} · {project.year}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-3">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-[#33332f] leading-relaxed mb-6">
          {isEn ? project.descriptionEn : project.descriptionVi}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#eae7e1] mb-6">
          {project.stats.map((s, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-lg font-bold font-mono text-[#111111]">
                {s.val}
              </span>
              <span className="text-xs text-[#6b675f]">
                {isEn ? s.labelEn : s.labelVi}
              </span>
            </div>
          ))}
        </div>

        {/* Technical Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#111111] mb-2 font-semibold">
              {isEn ? "Technical Highlights" : "Điểm nổi bật về kỹ thuật"}
            </h3>
            <ul className="list-disc list-inside text-xs sm:text-sm text-[#33332f] flex flex-col gap-1.5">
              {highlights.map((h, i) => (
                <li key={i} className="leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stack */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#6b675f] mb-2">
            {isEn ? "Technologies" : "Công nghệ sử dụng"}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-mono rounded bg-[#f2f0ec] border border-[#eae7e1] text-[#33332f]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Direct Link */}
        {project.liveUrl && (
          <div className="pt-4 border-t border-[#eae7e1] flex justify-end">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#f5f3ee] bg-[#111111] hover:bg-[#b42318] rounded-full transition-all"
            >
              <span>{isEn ? "Visit Live Platform" : "Truy cập hệ thống trực tiếp"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

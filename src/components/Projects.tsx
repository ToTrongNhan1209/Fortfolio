"use client";

import React from "react";
import Image from "next/image";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolio";
import { ScrambleText } from "./ScrambleText";
import { ArrowUpRight, BookOpen } from "lucide-react";

interface ProjectsProps {
  lang: "en" | "vi";
  onSelectProject: (p: ProjectItem) => void;
}

export function Projects({ lang, onSelectProject }: ProjectsProps) {
  const { projects } = PORTFOLIO_DATA;
  const isEn = lang === "en";

  return (
    <section id="work" className="py-16 sm:py-20 hairline-b">
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b675f] mb-1 block">
            {isEn ? "Selected work" : "Dự án tiêu biểu"}
          </span>
          <h2 className="font-name text-3xl sm:text-4xl font-medium tracking-tight text-[#111111] mb-2">
            <ScrambleText text={isEn ? "A few projects I have worked on." : "Một số dự án tôi từng phát triển."} />
          </h2>
          <p className="text-xs font-mono text-[#6b675f]">
            {isEn
              ? "Screenshots are of the running products, taken from the live sites."
              : "Hình ảnh giao diện từ các hệ thống đang hoạt động thực tế."}
          </p>
        </div>

        {/* Project Cards List */}
        <div className="flex flex-col gap-20">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-4 group"
            >
              {/* Category & Year */}
              <div className="flex items-center justify-between text-xs font-mono text-[#6b675f]">
                <span>{isEn ? project.categoryEn : project.categoryVi} · {project.year}</span>
              </div>

              {/* Title with ScrambleText */}
              <h3 className="font-name text-3xl sm:text-4xl font-medium text-[#111111] group-hover:text-[#b42318] transition-colors">
                <ScrambleText text={project.title} />
              </h3>

              {/* Browser Mockup Card Cover */}
              <div
                onClick={() => onSelectProject(project)}
                className="w-full rounded-2xl overflow-hidden border border-[#eae7e1] bg-[#f2f0ec] shadow-[0_22px_44px_-26px_rgba(17,17,17,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_56px_-28px_rgba(17,17,17,0.45)] cursor-pointer"
              >
                {/* Browser bar */}
                <div className="h-8 bg-[#fafaf8] border-b border-[#eae7e1] flex items-center px-4 gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eae7e1]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eae7e1]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eae7e1]"></span>
                  </div>
                  <div className="flex-1 text-center font-mono text-[11px] text-[#6b675f] tracking-wider">
                    {project.liveUrl ? new URL(project.liveUrl).hostname : "system.preview"}
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#fafaf8]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    quality={95}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-[15px] text-[#33332f] leading-relaxed max-w-2xl mt-1">
                {isEn ? project.descriptionEn : project.descriptionVi}
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-6 py-2.5 border-y border-[#eae7e1] my-1 flex-wrap">
                {project.stats.map((s, idx) => (
                  <div key={idx} className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-bold text-[#111111] font-mono">
                      {s.val}
                    </span>
                    <span className="text-xs text-[#6b675f]">
                      {isEn ? s.labelEn : s.labelVi}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stack Pills with Tilts */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t, idx) => {
                  const tilts = [-1.0, 1.5, -1.2, 1.0, -0.8];
                  const tilt = tilts[idx % tilts.length];
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

              {/* Actions */}
              <div className="flex items-center gap-5 mt-2 text-xs font-medium">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-[#111111] hover:text-[#b42318] underline underline-offset-4 decoration-[#eae7e1] hover:decoration-[#b42318] transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isEn ? "Read the project" : "Xem chi tiết dự án"}</span>
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#6b675f] hover:text-[#111111] transition-colors"
                  >
                    <span>{isEn ? "Live site" : "Trang trực tiếp"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

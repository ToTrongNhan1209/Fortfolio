"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  lang: "en" | "vi";
}

export function Footer({ lang }: FooterProps) {
  const isEn = lang === "en";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="pt-16 pb-12 text-xs font-mono text-[#6b675f] overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#eae7e1] pt-8">
        <div>
          <div className="font-name font-semibold text-base text-[#111111] mb-1">
            Tô Trọng Nhân
          </div>
          <div>© 2026 To Trong Nhan · Software Engineer</div>
          <div className="text-[11px] text-[#888c91] mt-1">
            Built with Next.js, React 19, Tailwind CSS and Lenis
          </div>
        </div>

        <button
          onClick={scrollToTop}
          data-cursor="true"
          data-cursor-label="TOP"
          className="inline-flex items-center gap-1.5 text-[#111111] hover:text-[#b42318] transition-colors group px-3 py-1.5 rounded-full border border-[#eae7e1] hover:border-[#111111]"
        >
          <span>{isEn ? "Back to top" : "Về đầu trang"}</span>
          <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Editorial Ink Watermark across the page bottom */}
      <div className="mt-12 select-none pointer-events-none">
        <p
          aria-hidden="true"
          className="font-name-italic w-full text-center leading-[0.8] whitespace-nowrap text-[#111111]/[0.08] tracking-tight"
          style={{
            fontSize: "clamp(3rem, 11vw, 8.5rem)",
            fontVariationSettings: '"SOFT" 40, "WONK" 1, "opsz" 144',
          }}
        >
          Tô Trọng Nhân
        </p>
      </div>
    </footer>
  );
}

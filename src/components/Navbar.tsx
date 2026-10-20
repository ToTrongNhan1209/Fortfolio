"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Check, Sparkles, X } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ActiveCornerIcon } from "./StudioMarks";

export const AVAILABLE_HEADER_MARKS = [
  { id: "cube", nameVi: "Khối 3D (Cube)", nameEn: "3D Cube", tag: "3D" },
  { id: "phin", nameVi: "Phin Cà Phê", nameEn: "Coffee Phin", tag: "Icon" },
  { id: "keycap", nameVi: "Keycap Phím N", nameEn: "Keycap N", tag: "3D" },
  { id: "plane", nameVi: "Máy Bay Giấy", nameEn: "Paper Plane", tag: "Origami" },
  { id: "gear", nameVi: "Bánh Răng", nameEn: "Industrial Gear", tag: "Kinetic" },
  { id: "monogram", nameVi: "Monogram N", nameEn: "Monogram N", tag: "Type" },
  { id: "swatches", nameVi: "Quạt Thẻ Màu", nameEn: "Color Swatches", tag: "Color" },
  { id: "palette", nameVi: "Bảng Pha Màu", nameEn: "Artist Palette", tag: "Design" },
  { id: "dial", nameVi: "Đồng Hồ Đo", nameEn: "Speed Dial", tag: "Gauge" },
  { id: "brush", nameVi: "Cọ Vẽ Sơn", nameEn: "Paintbrush", tag: "Art" },
  { id: "toggle", nameVi: "Công Tắc Gạt", nameEn: "Toggle Switch", tag: "UI" },
  { id: "faders", nameVi: "Cần Mixer", nameEn: "Audio Faders", tag: "Audio" },
  { id: "wand", nameVi: "Đũa Thần", nameEn: "Magic Wand", tag: "Magic" },
  { id: "roller", nameVi: "Cây Lăn Sơn", nameEn: "Paint Roller", tag: "Tool" },
];

interface NavbarProps {
  lang: "en" | "vi";
  setLang: (l: "en" | "vi") => void;
  onOpenCv: () => void;
}

export function Navbar({ lang, setLang, onOpenCv }: NavbarProps) {
  const { profile } = PORTFOLIO_DATA;
  const isEn = lang === "en";
  const [activeCornerMark, setActiveCornerMark] = useState<string>("cube");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedCorner = localStorage.getItem("toti_active_corner_mark");
    if (savedCorner) {
      setActiveCornerMark(savedCorner);
    } else {
      setActiveCornerMark("cube");
    }

    const onCornerChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveCornerMark(customEvent.detail);
      } else {
        const current = localStorage.getItem("toti_active_corner_mark");
        if (current) setActiveCornerMark(current);
      }
    };

    window.addEventListener("toti_mark_changed", onCornerChange);
    const onStorage = () => {
      const c = localStorage.getItem("toti_active_corner_mark");
      if (c) setActiveCornerMark(c);
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("toti_mark_changed", onCornerChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isMenuOpen]);

  // Select a mark directly in-place
  const selectMark = useCallback(
    (markId: string) => {
      setActiveCornerMark(markId);
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 350);

      if (typeof window !== "undefined") {
        localStorage.setItem("toti_active_corner_mark", markId);
        localStorage.setItem("toti_active_main_mark", markId);
        window.dispatchEvent(new CustomEvent("toti_mark_changed", { detail: markId }));
      }

      const markObj = AVAILABLE_HEADER_MARKS.find((m) => m.id === markId);
      const name = markObj ? (isEn ? markObj.nameEn : markObj.nameVi) : markId;
      setToastMessage(isEn ? `Model: ${name}` : `Đã đổi: ${name}`);

      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 2200);
    },
    [isEn]
  );

  // Cycle to next mark on direct click
  const handleCycleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentIndex = AVAILABLE_HEADER_MARKS.findIndex((m) => m.id === activeCornerMark);
    const nextIndex = (currentIndex + 1) % AVAILABLE_HEADER_MARKS.length;
    selectMark(AVAILABLE_HEADER_MARKS[nextIndex].id);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#fafaf8]/85 border-b border-[#eae7e1]/70 transition-all">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand: Logo Avatar (Left) - Always the user's permanent avatar logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            // Always return cleanly to root localhost:3000 without hash or pagination
            if (window.location.pathname === "/" && !window.location.hash) {
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.dispatchEvent(new CustomEvent("toti_replay_opening"));
            } else {
              window.location.href = "/";
            }
          }}
          className="flex items-center gap-3 group"
          data-cursor="true"
          data-cursor-label="TÔ TRỌNG NHÂN"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#eae7e1] bg-[#f2f0ec] shadow-sm transition-transform duration-200 group-hover:scale-110">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </a>

        {/* Center: Spaced Uppercase Monospace Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.15em] text-[#6b675f]">
          <a
            href="#manifesto"
            className="hover:text-[#b42318] transition-colors duration-150"
            data-cursor="true"
            data-cursor-label="HOW I WORK"
          >
            {isEn ? "HOW I WORK" : "CÁCH LÀM VIỆC"}
          </a>
          <a
            href="#skills"
            className="hover:text-[#b42318] transition-colors duration-150"
            data-cursor="true"
            data-cursor-label="STACK"
          >
            {isEn ? "STACK" : "KỸ NĂNG"}
          </a>
          <a
            href="#work"
            className="hover:text-[#b42318] transition-colors duration-150"
            data-cursor="true"
            data-cursor-label="WORK"
          >
            {isEn ? "WORK" : "DỰ ÁN"}
          </a>
          <a
            href="#contact"
            className="hover:text-[#b42318] transition-colors duration-150"
            data-cursor="true"
            data-cursor-label="CONTACT"
          >
            {isEn ? "CONTACT" : "LIÊN HỆ"}
          </a>
        </nav>

        {/* Right: Language switch + Dynamic In-place Model Changer */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(isEn ? "vi" : "en")}
            data-cursor="true"
            data-cursor-label="NGÔN NGỮ"
            className="px-2.5 py-1 text-[10.5px] font-mono tracking-wider text-[#6b675f] hover:text-[#111111] hover:border-[#111111] bg-[#f2f0ec] border border-[#eae7e1] rounded-full transition-all"
            title="Switch Language"
          >
            {isEn ? "VI" : "EN"}
          </button>

          {/* In-place Model Changer (Changes directly in home page, does not navigate) */}
          <div className="relative" ref={menuRef}>
            <div className="flex items-center rounded-full bg-[#fafaf8] border border-[#eae7e1] hover:border-[#111111]/40 shadow-sm transition-all duration-200">
              {/* Click to Cycle to Next Model */}
              <button
                type="button"
                onClick={handleCycleNext}
                data-cursor="true"
                data-cursor-label={isEn ? "CHANGE MODEL" : "ĐỔI MÔ HÌNH"}
                className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f2f0ec] transition-all duration-200 active:scale-95 ${
                  isPopping ? "scale-125 rotate-12" : "hover:scale-105"
                }`}
                title={isEn ? "Click to cycle model directly" : "Nhấp để đổi mô hình trực tiếp"}
              >
                <ActiveCornerIcon mark={activeCornerMark} className="w-5 h-5" isAnimated={true} />
              </button>

              {/* Dropdown Chevron for full model tray */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                data-cursor="true"
                data-cursor-label={isEn ? "ALL MODELS" : "TẤT CẢ MÔ HÌNH"}
                className={`h-9 px-1.5 flex items-center justify-center rounded-r-full text-[#6b675f] hover:text-[#111111] hover:bg-[#f2f0ec] transition-colors ${
                  isMenuOpen ? "bg-[#f2f0ec] text-[#111111]" : ""
                }`}
                title={isEn ? "Choose from all models" : "Chọn mô hình từ danh sách"}
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Notification Toast floating beneath button */}
            {toastMessage && (
              <div className="absolute right-0 top-full mt-2 pointer-events-none z-50 whitespace-nowrap animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="px-3 py-1 rounded-full bg-[#111111] text-[#fafaf8] text-[11px] font-mono tracking-wider shadow-lg flex items-center gap-1.5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b42318] inline-block" />
                  <span>{toastMessage}</span>
                </div>
              </div>
            )}

            {/* Dropdown Tray: Palette of all models */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-72 sm:w-80 rounded-2xl bg-[#fafaf8] border border-[#eae7e1] p-3 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                {/* Tray Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#eae7e1]/80">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6b675f]">
                    <Sparkles className="w-3.5 h-3.5 text-[#b42318]" />
                    <span>{isEn ? "Header Models" : "Mô hình Header"}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#f2f0ec] text-[#111111] font-bold">
                      {AVAILABLE_HEADER_MARKS.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#6b675f] hover:text-[#111111] hover:bg-[#f2f0ec]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Models Grid (2 columns) */}
                <div className="grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto pr-1">
                  {AVAILABLE_HEADER_MARKS.map((m) => {
                    const isActive = activeCornerMark === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          selectMark(m.id);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                          isActive
                            ? "bg-[#111111] text-[#fafaf8] shadow-sm font-medium"
                            : "hover:bg-[#f2f0ec] text-[#33332f]"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                            isActive
                              ? "bg-white/10 border-white/20"
                              : "bg-[#fafaf8] border-[#eae7e1]"
                          }`}
                        >
                          <ActiveCornerIcon mark={m.id} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] truncate leading-tight">
                            {isEn ? m.nameEn : m.nameVi}
                          </div>
                          <div
                            className={`text-[9px] font-mono tracking-wider uppercase ${
                              isActive ? "text-[#f39c12]" : "text-[#8a867c]"
                            }`}
                          >
                            {m.tag}
                          </div>
                        </div>
                        {isActive && <Check className="w-3.5 h-3.5 text-[#b42318] shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Tray Footer note */}
                <div className="mt-2.5 pt-2 border-t border-[#eae7e1]/80 flex items-center justify-between text-[10px] font-mono text-[#8a867c]">
                  <span>{isEn ? "Click icon to quick cycle" : "💡 Nhấp icon để đổi nhanh"}</span>
                  <Link
                    href="/studio"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#6b675f] hover:text-[#b42318] transition-colors underline decoration-dotted"
                  >
                    {isEn ? "Studio ↗" : "Studio ↗"}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

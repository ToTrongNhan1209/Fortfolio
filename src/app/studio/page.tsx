"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import {
  GearMark,
  KeycapIllustration,
  PaperPlaneIllustration,
  PhinIllustration,
  MonogramIllustration,
  ActiveCornerIcon,
  SwatchesMark,
  PaletteMark,
  DialMark,
  BrushMark,
  ToggleMark,
  FadersMark,
  WandMark,
  RollerMark,
} from "@/components/StudioMarks";
import { ScrambleText } from "@/components/ScrambleText";
import { Opening } from "@/components/Opening";

interface MarkItem {
  id: string;
  title: string;
  desc: string;
}

const PRIMARY_MARKS: MarkItem[] = [
  {
    id: "monogram",
    title: "Monogram",
    desc: "A letter N based on the type used in the portfolio.",
  },
  {
    id: "phin",
    title: "Phin",
    desc: "A Vietnamese coffee filter with a slow drip.",
  },
  {
    id: "keycap",
    title: "Keycap",
    desc: "A keyboard key with an N on it. Move closer to press it.",
  },
  {
    id: "plane",
    title: "Paper plane",
    desc: "The same paper plane from the opening, now following your movement.",
  },
  {
    id: "mascot",
    title: "Mascot",
    desc: "A small illustrated version of me. It follows the cursor and moves when you get close.",
  },
  {
    id: "cube",
    title: "Cube",
    desc: "A paper-like box that folds together and rotates as you scroll.",
  },
];

const CORNER_MARKS = [
  { id: "gear", title: "Gear", desc: "A precision gear that turns while you scroll." },
  { id: "swatches", title: "Swatches", desc: "A fan of colour cards that opens on hover." },
  { id: "palette", title: "Palette", desc: "Four spots of paint that move when you get close." },
  { id: "dial", title: "Dial", desc: "A small dial that turns as you scroll." },
  { id: "brush", title: "Brush", desc: "A brush that makes a new stroke when you approach." },
  { id: "toggle", title: "Toggle", desc: "A switch that flips when your cursor gets close." },
  { id: "faders", title: "Faders", desc: "Three sliders that react to scrolling and cursor movement." },
  { id: "wand", title: "Wand", desc: "A wand that sparkles when you move near it." },
  { id: "roller", title: "Roller", desc: "A paint roller that moves over its painted stripe." },
];

export default function StudioPage() {
  const { profile } = PORTFOLIO_DATA;
  const [activeMainMark, setActiveMainMark] = useState<string>("mascot");
  const [activeCornerMark, setActiveCornerMark] = useState<string>("gear");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCorner = localStorage.getItem("toti_active_corner_mark");
      if (savedCorner) setActiveCornerMark(savedCorner);

      const savedMain = localStorage.getItem("toti_active_main_mark");
      if (savedMain) setActiveMainMark(savedMain);
    }
  }, []);

  const handleSelectMainMark = (id: string) => {
    setActiveMainMark(id);
    setActiveCornerMark(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("toti_active_main_mark", id);
      localStorage.setItem("toti_active_corner_mark", id);
      window.dispatchEvent(new CustomEvent("toti_mark_changed", { detail: id }));
    }
  };

  const handleSelectCornerMark = (id: string) => {
    setActiveCornerMark(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("toti_active_corner_mark", id);
      window.dispatchEvent(new CustomEvent("toti_mark_changed", { detail: id }));
    }
  };

  // Assembly slider states (0 - 100)
  const [assemblies, setAssemblies] = useState<Record<string, number>>({
    monogram: 100,
    phin: 100,
    keycap: 100,
    plane: 100,
    mascot: 100,
    cube: 100,
  });

  const [isKeycapPressed, setIsKeycapPressed] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<"fast" | "avg" | "slow">("avg");

  const handleSliderChange = (id: string, value: number) => {
    setAssemblies((prev) => ({ ...prev, [id]: value }));
  };

  const handleBuildAnimate = (id: string) => {
    setAssemblies((prev) => ({ ...prev, [id]: 0 }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setAssemblies((prev) => ({ ...prev, [id]: progress }));
      if (progress >= 100) clearInterval(interval);
    }, 20);
  };

  const handleReplayOpening = () => {
    window.dispatchEvent(new CustomEvent("toti_replay_opening"));
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#111111] paper-field-bg selection:bg-[#b42318] selection:text-white relative">

      {/* Header matching voanhphi.vercel.app/studio */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#fafaf8]/85 border-b border-[#eae7e1]/70 transition-all">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Avatar Home link - Always user's permanent avatar logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
            data-cursor="true"
            data-cursor-label="HOME"
            className="flex items-center gap-3 group"
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

          {/* Navigation Links - hover red without text distortion */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.15em] text-[#6b675f]">
            <Link href="/#manifesto" className="hover:text-[#b42318] transition-colors" data-cursor="true">
              HOW I WORK
            </Link>
            <Link href="/#skills" className="hover:text-[#b42318] transition-colors" data-cursor="true">
              STACK
            </Link>
            <Link href="/#work" className="hover:text-[#b42318] transition-colors" data-cursor="true">
              WORK
            </Link>
            <Link href="/#contact" className="hover:text-[#b42318] transition-colors" data-cursor="true">
              CONTACT
            </Link>
          </nav>

          {/* Top-Right Mark: Dynamic Active Corner Icon matching Navbar */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              data-cursor="true"
              data-cursor-label="BACK TO HOME"
              className="w-9 h-9 rounded-xl border border-[#eae7e1] hover:border-[#111111] bg-[#fafaf8] shadow-sm transition-all duration-200 flex items-center justify-center group hover:scale-105"
              title="Trở về Trang chủ"
            >
              <ActiveCornerIcon mark={activeCornerMark} className="w-5 h-5" isAnimated={true} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="max-w-4xl mx-auto px-5 sm:px-6 pt-16 sm:pt-24 pb-28">
        {/* Eyebrow and Page Title */}
        <p className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#6b675f]">
          [ Studio ]
        </p>

        <h1 className="font-name text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111111] mt-4 max-w-[16ch] leading-[1.08]">
          Make the header <span className="font-name-italic text-[#b42318]">your own.</span>
        </h1>

        <p className="text-[16px] text-[#55524c] mt-5 max-w-[56ch] leading-relaxed">
          Choose the small objects shown in the corners of the site and replay the opening animation. Your choices stay in this browser.
        </p>

        {/* Section 1: The mark (Top left, every page) */}
        <section className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[#eae7e1] pb-4">
            <h2 className="font-name text-2xl sm:text-3xl font-medium text-[#111111]">
              The mark
            </h2>
            <p className="text-xs font-mono uppercase tracking-wider text-[#6b675f]">
              Top left, every page
            </p>
          </div>

          <p className="mt-3 text-[14px] text-[#6b675f] max-w-[60ch]">
            This object moves with your cursor and reacts as you scroll. Use the slider to see how it comes together.
          </p>

          {/* 6 Primary Mark Cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Card 1: Monogram */}
            <article
              className={`flex flex-col rounded-[22px] border bg-[#fafaf8] p-5 transition-all duration-200 ${
                activeMainMark === "monogram" ? "border-[#111111] shadow-md ring-1 ring-[#111111]" : "border-[#eae7e1]"
              }`}
            >
              <div
                onClick={() => handleSelectMainMark("monogram")}
                className="relative aspect-[4/3] w-full rounded-[14px] bg-[#f2f0ec] flex items-center justify-center p-4 overflow-hidden border border-[#eae7e1] cursor-pointer hover:bg-[#eae6dc]/60 transition-colors"
                title="Chọn Monogram"
              >
                <MonogramIllustration assembly={assemblies.monogram} letter="N" />
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <h3 className="font-name text-2xl font-medium">Monogram</h3>
                <button
                  type="button"
                  onClick={() => handleSelectMainMark("monogram")}
                  data-cursor="true"
                  className={`text-[12px] font-mono tracking-wider uppercase px-4 py-1.5 rounded-full border transition-all ${
                    activeMainMark === "monogram"
                      ? "bg-[#111111] text-[#fafaf8] border-[#111111]"
                      : "bg-transparent text-[#111111] border-[#eae7e1] hover:border-[#111111]"
                  }`}
                >
                  {activeMainMark === "monogram" ? "In use" : "Use this"}
                </button>
              </div>

              <p className="mt-2 text-[13.5px] text-[#6b675f]">
                A letter N based on the type used in the portfolio.
              </p>

              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-[#eae7e1] mt-4">
                <label className="text-[11px] font-mono uppercase text-[#6b675f] shrink-0 w-20">
                  Assembly
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assemblies.monogram}
                  onChange={(e) => handleSliderChange("monogram", Number(e.target.value))}
                  className="w-full accent-[#b42318] h-1.5 bg-[#eae7e1] rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleBuildAnimate("monogram")}
                  data-cursor="true"
                  data-cursor-label="BUILD"
                  className="text-[11px] font-mono uppercase px-3 py-1 rounded-full border border-[#eae7e1] hover:border-[#111111] transition-colors"
                >
                  Build
                </button>
              </div>
            </article>

            {/* Card 2: Phin */}
            <article
              className={`flex flex-col rounded-[22px] border bg-[#fafaf8] p-5 transition-all duration-200 ${
                activeMainMark === "phin" ? "border-[#111111] shadow-md ring-1 ring-[#111111]" : "border-[#eae7e1]"
              }`}
            >
              <div
                onClick={() => handleSelectMainMark("phin")}
                className="relative aspect-[4/3] w-full rounded-[14px] bg-[#f2f0ec] flex items-center justify-center p-4 overflow-hidden border border-[#eae7e1] cursor-pointer hover:bg-[#eae6dc]/60 transition-colors"
                title="Chọn Phin"
              >
                <PhinIllustration assembly={assemblies.phin} />
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <h3 className="font-name text-2xl font-medium">Phin</h3>
                <button
                  type="button"
                  onClick={() => handleSelectMainMark("phin")}
                  data-cursor="true"
                  className={`text-[12px] font-mono tracking-wider uppercase px-4 py-1.5 rounded-full border transition-all ${
                    activeMainMark === "phin"
                      ? "bg-[#111111] text-[#fafaf8] border-[#111111]"
                      : "bg-transparent text-[#111111] border-[#eae7e1] hover:border-[#111111]"
                  }`}
                >
                  {activeMainMark === "phin" ? "In use" : "Use this"}
                </button>
              </div>

              <p className="mt-2 text-[13.5px] text-[#6b675f]">
                A Vietnamese coffee filter with a slow drip.
              </p>

              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-[#eae7e1] mt-4">
                <label className="text-[11px] font-mono uppercase text-[#6b675f] shrink-0 w-20">
                  Assembly
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assemblies.phin}
                  onChange={(e) => handleSliderChange("phin", Number(e.target.value))}
                  className="w-full accent-[#b42318] h-1.5 bg-[#eae7e1] rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleBuildAnimate("phin")}
                  data-cursor="true"
                  data-cursor-label="BUILD"
                  className="text-[11px] font-mono uppercase px-3 py-1 rounded-full border border-[#eae7e1] hover:border-[#111111] transition-colors"
                >
                  Build
                </button>
              </div>
            </article>

            {/* Card 3: Keycap (As seen in the screenshot!) */}
            <article
              className={`flex flex-col rounded-[22px] border bg-[#fafaf8] p-5 transition-all duration-200 ${
                activeMainMark === "keycap" ? "border-[#111111] shadow-md ring-1 ring-[#111111]" : "border-[#eae7e1]"
              }`}
            >
              <div
                onClick={() => handleSelectMainMark("keycap")}
                onMouseDown={() => setIsKeycapPressed(true)}
                onMouseUp={() => setIsKeycapPressed(false)}
                className="relative aspect-[4/3] w-full rounded-[14px] bg-[#f2f0ec] flex items-center justify-center p-4 overflow-hidden border border-[#eae7e1] cursor-pointer hover:bg-[#eae6dc]/60 transition-colors"
                title="Chọn Keycap N"
              >
                <KeycapIllustration
                  assembly={assemblies.keycap}
                  letter="N"
                  isPressed={isKeycapPressed}
                />
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <h3 className="font-name text-2xl font-medium">Keycap</h3>
                <button
                  type="button"
                  onClick={() => handleSelectMainMark("keycap")}
                  data-cursor="true"
                  className={`text-[12px] font-mono tracking-wider uppercase px-4 py-1.5 rounded-full border transition-all ${
                    activeMainMark === "keycap"
                      ? "bg-[#111111] text-[#fafaf8] border-[#111111]"
                      : "bg-transparent text-[#111111] border-[#eae7e1] hover:border-[#111111]"
                  }`}
                >
                  {activeMainMark === "keycap" ? "In use" : "Use this"}
                </button>
              </div>

              <p className="mt-2 text-[13.5px] text-[#6b675f]">
                A keyboard key with an N on it. Move closer to press it.
              </p>

              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-[#eae7e1] mt-4">
                <label className="text-[11px] font-mono uppercase text-[#6b675f] shrink-0 w-20">
                  Assembly
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assemblies.keycap}
                  onChange={(e) => handleSliderChange("keycap", Number(e.target.value))}
                  className="w-full accent-[#b42318] h-1.5 bg-[#eae7e1] rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleBuildAnimate("keycap")}
                  data-cursor="true"
                  data-cursor-label="BUILD"
                  className="text-[11px] font-mono uppercase px-3 py-1 rounded-full border border-[#eae7e1] hover:border-[#111111] transition-colors"
                >
                  Build
                </button>
              </div>
            </article>

            {/* Card 4: Paper Plane */}
            <article
              className={`flex flex-col rounded-[22px] border bg-[#fafaf8] p-5 transition-all duration-200 ${
                activeMainMark === "plane" ? "border-[#111111] shadow-md ring-1 ring-[#111111]" : "border-[#eae7e1]"
              }`}
            >
              <div
                onClick={() => handleSelectMainMark("plane")}
                className="relative aspect-[4/3] w-full rounded-[14px] bg-[#f2f0ec] flex items-center justify-center p-4 overflow-hidden border border-[#eae7e1] cursor-pointer hover:bg-[#eae6dc]/60 transition-colors"
                title="Chọn Paper plane"
              >
                <PaperPlaneIllustration assembly={assemblies.plane} />
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <h3 className="font-name text-2xl font-medium">Paper plane</h3>
                <button
                  type="button"
                  onClick={() => handleSelectMainMark("plane")}
                  data-cursor="true"
                  className={`text-[12px] font-mono tracking-wider uppercase px-4 py-1.5 rounded-full border transition-all ${
                    activeMainMark === "plane"
                      ? "bg-[#111111] text-[#fafaf8] border-[#111111]"
                      : "bg-transparent text-[#111111] border-[#eae7e1] hover:border-[#111111]"
                  }`}
                >
                  {activeMainMark === "plane" ? "In use" : "Use this"}
                </button>
              </div>

              <p className="mt-2 text-[13.5px] text-[#6b675f]">
                The same paper plane from the opening, now following your movement.
              </p>

              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-[#eae7e1] mt-4">
                <label className="text-[11px] font-mono uppercase text-[#6b675f] shrink-0 w-20">
                  Assembly
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assemblies.plane}
                  onChange={(e) => handleSliderChange("plane", Number(e.target.value))}
                  className="w-full accent-[#b42318] h-1.5 bg-[#eae7e1] rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleBuildAnimate("plane")}
                  data-cursor="true"
                  data-cursor-label="BUILD"
                  className="text-[11px] font-mono uppercase px-3 py-1 rounded-full border border-[#eae7e1] hover:border-[#111111] transition-colors"
                >
                  Build
                </button>
              </div>
            </article>

            {/* Card 5: Mascot */}
            <article
              className={`flex flex-col rounded-[22px] border bg-[#fafaf8] p-5 transition-all duration-200 ${
                activeMainMark === "mascot" ? "border-[#111111] shadow-md ring-1 ring-[#111111]" : "border-[#eae7e1]"
              }`}
            >
              <div
                onClick={() => handleSelectMainMark("mascot")}
                className="relative aspect-[4/3] w-full rounded-[14px] bg-[#f2f0ec] flex items-center justify-center p-4 overflow-hidden border border-[#eae7e1] cursor-pointer hover:bg-[#eae6dc]/60 transition-colors"
                title="Chọn Mascot"
              >
                <div
                  className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform duration-300 hover:scale-110"
                  style={{ opacity: 0.2 + (assemblies.mascot / 100) * 0.8 }}
                >
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <h3 className="font-name text-2xl font-medium">Mascot</h3>
                <button
                  type="button"
                  onClick={() => handleSelectMainMark("mascot")}
                  data-cursor="true"
                  className={`text-[12px] font-mono tracking-wider uppercase px-4 py-1.5 rounded-full border transition-all ${
                    activeMainMark === "mascot"
                      ? "bg-[#111111] text-[#fafaf8] border-[#111111]"
                      : "bg-transparent text-[#111111] border-[#eae7e1] hover:border-[#111111]"
                  }`}
                >
                  {activeMainMark === "mascot" ? "In use" : "Use this"}
                </button>
              </div>

              <p className="mt-2 text-[13.5px] text-[#6b675f]">
                A small illustrated version of me. It follows the cursor and moves when you get close.
              </p>

              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-[#eae7e1] mt-4">
                <label className="text-[11px] font-mono uppercase text-[#6b675f] shrink-0 w-20">
                  Assembly
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assemblies.mascot}
                  onChange={(e) => handleSliderChange("mascot", Number(e.target.value))}
                  className="w-full accent-[#b42318] h-1.5 bg-[#eae7e1] rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleBuildAnimate("mascot")}
                  data-cursor="true"
                  data-cursor-label="BUILD"
                  className="text-[11px] font-mono uppercase px-3 py-1 rounded-full border border-[#eae7e1] hover:border-[#111111] transition-colors"
                >
                  Build
                </button>
              </div>
            </article>

            {/* Card 6: Cube */}
            <article
              className={`flex flex-col rounded-[22px] border bg-[#fafaf8] p-5 transition-all duration-200 ${
                activeMainMark === "cube" ? "border-[#111111] shadow-md ring-1 ring-[#111111]" : "border-[#eae7e1]"
              }`}
            >
              <div
                onClick={() => handleSelectMainMark("cube")}
                className="relative aspect-[4/3] w-full rounded-[14px] bg-[#f2f0ec] flex items-center justify-center p-4 overflow-hidden border border-[#eae7e1] cursor-pointer hover:bg-[#eae6dc]/60 transition-colors"
                title="Chọn Cube"
              >
                <svg viewBox="0 0 100 100" className="w-28 h-28 animate-[spin_8s_linear_infinite]">
                  <polygon points="50,15 85,35 50,55 15,35" fill="#fdfcf9" stroke="#111111" strokeWidth="2" />
                  <polygon points="15,35 50,55 50,85 15,65" fill="#ece7dc" stroke="#111111" strokeWidth="2" />
                  <polygon points="50,55 85,35 85,65 50,85" fill="#d9d4c7" stroke="#111111" strokeWidth="2" />
                </svg>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <h3 className="font-name text-2xl font-medium">Cube</h3>
                <button
                  type="button"
                  onClick={() => handleSelectMainMark("cube")}
                  data-cursor="true"
                  className={`text-[12px] font-mono tracking-wider uppercase px-4 py-1.5 rounded-full border transition-all ${
                    activeMainMark === "cube"
                      ? "bg-[#111111] text-[#fafaf8] border-[#111111]"
                      : "bg-transparent text-[#111111] border-[#eae7e1] hover:border-[#111111]"
                  }`}
                >
                  {activeMainMark === "cube" ? "In use" : "Use this"}
                </button>
              </div>

              <p className="mt-2 text-[13.5px] text-[#6b675f]">
                A paper-like box that folds together and rotates as you scroll.
              </p>

              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-[#eae7e1] mt-4">
                <label className="text-[11px] font-mono uppercase text-[#6b675f] shrink-0 w-20">
                  Assembly
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assemblies.cube}
                  onChange={(e) => handleSliderChange("cube", Number(e.target.value))}
                  className="w-full accent-[#b42318] h-1.5 bg-[#eae7e1] rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleBuildAnimate("cube")}
                  data-cursor="true"
                  data-cursor-label="BUILD"
                  className="text-[11px] font-mono uppercase px-3 py-1 rounded-full border border-[#eae7e1] hover:border-[#111111] transition-colors"
                >
                  Build
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* Section 2: The way in (Top right, every page - INCLUDING THE GEAR IN THE RED BOX) */}
        <section className="mt-28">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[#eae7e1] pb-4">
            <h2 className="font-name text-2xl sm:text-3xl font-medium text-[#111111]">
              The way in
            </h2>
            <p className="text-xs font-mono uppercase tracking-wider text-[#6b675f]">
              Top right, every page
            </p>
          </div>

          <p className="mt-3 text-[14px] text-[#6b675f] max-w-[60ch]">
            Pick another small object for the top-right corner. Each one reacts a little differently.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {CORNER_MARKS.map((item) => (
              <article
                key={item.id}
                className={`flex flex-col rounded-[20px] border bg-[#fafaf8] p-5 transition-all duration-200 ${
                  activeCornerMark === item.id
                    ? "border-[#111111] shadow-md ring-1 ring-[#111111]"
                    : "border-[#eae7e1]"
                }`}
              >
                <div
                  className="aspect-square w-full rounded-[14px] bg-[#f2f0ec] border border-[#eae7e1] flex items-center justify-center p-6 cursor-pointer group hover:bg-[#eae6dc]/60 transition-colors"
                  onClick={() => handleSelectCornerMark(item.id)}
                  title={`Chọn ${item.title}`}
                >
                  {item.id === "gear" && (
                    <GearMark className="w-16 h-16" isRotating={activeCornerMark === "gear"} />
                  )}
                  {item.id === "swatches" && (
                    <SwatchesMark className="w-20 h-20" />
                  )}
                  {item.id === "palette" && (
                    <PaletteMark className="w-20 h-20" />
                  )}
                  {item.id === "dial" && (
                    <DialMark className="w-16 h-16" />
                  )}
                  {item.id === "brush" && (
                    <BrushMark className="w-16 h-16" />
                  )}
                  {item.id === "toggle" && (
                    <ToggleMark className="w-20 h-10" />
                  )}
                  {item.id === "faders" && (
                    <FadersMark className="w-16 h-16" />
                  )}
                  {item.id === "wand" && (
                    <WandMark className="w-16 h-16" />
                  )}
                  {item.id === "roller" && (
                    <RollerMark className="w-16 h-16" />
                  )}
                </div>

                <h3 className="font-name text-xl font-medium mt-4">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] text-[#6b675f] leading-normal">
                  {item.desc}
                </p>

                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    onClick={() => handleSelectCornerMark(item.id)}
                    data-cursor="true"
                    data-cursor-label={activeCornerMark === item.id ? "ACTIVE" : "SELECT"}
                    className={`w-full text-[11.5px] font-mono tracking-wider uppercase px-4 py-2 rounded-full border transition-all ${
                      activeCornerMark === item.id
                        ? "bg-[#111111] text-[#fafaf8] border-[#111111]"
                        : "bg-transparent text-[#111111] border-[#eae7e1] hover:border-[#111111]"
                    }`}
                  >
                    {activeCornerMark === item.id ? "In use" : "Use this"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 3: The opening */}
        <section className="mt-28">
          <h2 className="font-name text-2xl sm:text-3xl font-medium text-[#111111]">
            The opening
          </h2>
          <p className="mt-3 text-[14px] text-[#6b675f] max-w-[60ch]">
            The opening runs once per visit. It follows the real loading progress, and you can skip it at any time.
          </p>

          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            <li className="rounded-[18px] border border-[#eae7e1] bg-[#fafaf8] p-5">
              <p className="font-name text-2xl font-medium">First visit</p>
              <p className="mt-2 text-[13.5px] text-[#6b675f]">
                On a first visit, the paper plane folds while the page loads.
              </p>
            </li>
            <li className="rounded-[18px] border border-[#eae7e1] bg-[#fafaf8] p-5">
              <p className="font-name text-2xl font-medium">Play</p>
              <p className="mt-2 text-[13.5px] text-[#6b675f]">
                Move your cursor or tap to guide the plane.
              </p>
            </li>
            <li className="rounded-[18px] border border-[#eae7e1] bg-[#fafaf8] p-5">
              <p className="font-name text-2xl font-medium">Skip</p>
              <p className="mt-2 text-[13.5px] text-[#6b675f]">
                Press Esc or choose Skip to go straight to the page.
              </p>
            </li>
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase text-[#6b675f]">Connection</span>
              <div className="flex rounded-full border border-[#eae7e1] bg-[#fafaf8] p-1">
                {(["fast", "avg", "slow"] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setConnectionSpeed(spd)}
                    data-cursor="true"
                    className={`text-[11px] font-mono uppercase px-3 py-1 rounded-full transition-all ${
                      connectionSpeed === spd
                        ? "bg-[#111111] text-[#fafaf8]"
                        : "text-[#6b675f] hover:text-[#111111]"
                    }`}
                  >
                    {spd === "fast" ? "Fast" : spd === "avg" ? "Average" : "Slow"}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleReplayOpening}
              data-cursor="true"
              data-cursor-label="REPLAY"
              className="px-5 py-2.5 rounded-full bg-[#111111] text-[#fafaf8] text-[13px] font-medium hover:bg-[#b42318] transition-colors shadow-sm"
            >
              Replay opening
            </button>
          </div>

          <p className="mt-4 text-[13px] text-[#6b675f]">
            Replays the opening a first visit gets, against the connection you pick.
          </p>
        </section>

        {/* Bottom Actions */}
        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-[#eae7e1] pt-8">
          <p className="text-[13px] text-[#6b675f]">
            Saved in this browser. Resetting site data will clear your choices.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveMainMark("keycap");
              setActiveCornerMark("gear");
              setAssemblies({
                monogram: 100,
                phin: 100,
                keycap: 100,
                plane: 100,
                mascot: 100,
                cube: 100,
              });
            }}
            data-cursor="true"
            className="text-[12px] font-mono uppercase px-4 py-2 rounded-full border border-[#eae7e1] hover:border-[#111111] text-[#111111] transition-colors"
          >
            Reset to default
          </button>
        </div>
      </main>

      {/* Signature Giant Fraunces Watermark Footer */}
      <footer className="hairline-t pt-14 pb-8 overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4 text-xs font-mono text-[#6b675f]">
            <p>© 2026 Tô Trọng Nhân</p>
            <p>Built with Next.js, React 19, Tailwind CSS and Lenis</p>
            <Link href="/" data-cursor="true" className="text-[#111111] hover:text-[#b42318] transition-colors">
              Back to homepage ↗
            </Link>
          </div>

          {/* Giant Serif Watermark across the whole page bottom */}
          <div className="mt-12 select-none pointer-events-none">
            <p
              aria-hidden="true"
              className="font-name-italic w-full text-center leading-[0.78] whitespace-nowrap text-[#eae7e1] tracking-tight"
              style={{
                fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
                fontVariationSettings: '"SOFT" 40, "WONK" 1, "opsz" 144',
              }}
            >
              Tô Trọng Nhân
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

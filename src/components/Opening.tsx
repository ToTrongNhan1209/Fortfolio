"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const clamp01 = (v: number, min: number, max: number) =>
  Math.min(1, Math.max(0, (v - min) / (max - min)));

// Pre-computed fixed coordinate ticks for astrolabe to prevent SSR/client floating point differences
const ASTROLABE_TICKS = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  return {
    x1: Number((200 + 172 * Math.cos(angle)).toFixed(2)),
    y1: Number((200 + 172 * Math.sin(angle)).toFixed(2)),
    x2: Number((200 + 185 * Math.cos(angle)).toFixed(2)),
    y2: Number((200 + 185 * Math.sin(angle)).toFixed(2)),
  };
});

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export function Opening() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isStamped, setIsStamped] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  const animFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, rawX: 0, rawY: 0 });
  const spinImpulseRef = useRef(0);

  // Dismiss opening and reveal portfolio
  const dismiss = useCallback(() => {
    setIsLeaving(true);

    setTimeout(() => {
      setIsOpen(false);
      document.documentElement.classList.remove("overflow-hidden");
    }, 850);
  }, []);

  // Start the opening animation (relaxed, cinematic pace: ~6.8s)
  const startOpening = useCallback(() => {
    setIsOpen(true);
    setIsLeaving(false);
    setCount(0);
    setProgress(0);
    setIsStamped(false);
    document.documentElement.classList.add("overflow-hidden");

    let currentProgress = 0;
    const startTime = performance.now();
    const duration = 6800; // ~6.8s relaxed countdown, majestic assembly & blooming

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const target = Math.min(1, elapsed / duration);
      
      // Smooth dampening towards target
      currentProgress += (target - currentProgress) * 0.08;

      // Stamp shockwave trigger at 90%
      if (currentProgress >= 0.9) {
        setIsStamped(true);
      }

      if (currentProgress > 0.995 && elapsed >= duration) {
        currentProgress = 1;
        setProgress(1);
        setCount(100);
        setTimeout(dismiss, 700);
        return;
      }

      const percent = Math.min(100, Math.round(currentProgress * 100));
      setCount(percent);
      setProgress(currentProgress);

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [dismiss]);

  // Trigger on every refresh / F5 / page load
  useEffect(() => {
    setMounted(true);
    startOpening();

    // Replay opening listener from /studio or any trigger
    const handleReplay = () => {
      startOpening();
    };
    window.addEventListener("toti_replay_opening", handleReplay);

    // Escape key shortcut to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("toti_replay_opening", handleReplay);
      window.removeEventListener("keydown", handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [startOpening, dismiss]);

  // Mouse move listener for smooth 3D parallax tilt & canvas interaction
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const onPointerMove = (e: PointerEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - halfW) / halfW;
      mouseRef.current.targetY = (e.clientY - halfH) / halfH;
      mouseRef.current.rawX = e.clientX;
      mouseRef.current.rawY = e.clientY;
    };

    let frameId: number;
    const updateMouse = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      
      // Decay spin impulse
      if (Math.abs(spinImpulseRef.current) > 0.01) {
        spinImpulseRef.current *= 0.94;
      } else {
        spinImpulseRef.current = 0;
      }

      frameId = requestAnimationFrame(updateMouse);
    };
    frameId = requestAnimationFrame(updateMouse);

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frameId);
    };
  }, [mounted, isOpen]);

  const [clickPulse, setClickPulse] = useState(false);

  // Interactive Click Ripple, Spin Impulse & Spring Shockwave Expansion
  const handleScreenClick = (e: React.MouseEvent) => {
    const id = Date.now();
    setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
    spinImpulseRef.current += 45;
    setClickPulse(true);
    setTimeout(() => setClickPulse(false), 450);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 750);
  };

  // Ambient Dust & Golden Ink Particles Canvas
  useEffect(() => {
    if (!mounted || !isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Particle setup
    const particleCount = 38;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.15,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.35 + 0.15,
      color: Math.random() > 0.35 ? "#111111" : "#b42318",
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = p.x - mouseRef.current.rawX;
        const dy = p.y - mouseRef.current.rawY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [mounted, isOpen]);

  if (!mounted || !isOpen) return null;

  // =========================================================================
  // 3-PHASE 6-SIDED HEXAGONAL ORIGAMI BOX & SURPRISE POP-UP (SCALED UP)
  // =========================================================================
  const S = 100; // Wall width / Hexagon side (expanded from 64 to 100)
  const H = 144; // Wall height (expanded from 96 to 144)
  const r = 86.6; // Inradius (distance from center to edge midpoint: 100 * sqrt(3)/2)
  const floorY = H / 2; // 72px

  // 6 Faceted Origami Walls definition
  const HEX_WALLS = [
    { angle: 0, label: "TTN ✦ 2026", sub: "CHEST-01", hasLatch: true },
    { angle: 60, label: "HEX // 60°", sub: "FACET-02", hasLatch: false },
    { angle: 120, label: "Nhân", sub: "SEAL-03", isCrest: true, hasLatch: false },
    { angle: 180, label: "H:144 // W:100", sub: "SPEC-04", hasLatch: false },
    { angle: 240, label: "ORIGAMI", sub: "LOTUS-05", hasLatch: false },
    { angle: 300, label: "LAT: 10.76°N", sub: "GEOM-06", hasLatch: false },
  ];

  // Phase 1: Assembly (progress: 0.0 -> 0.46)
  // 6 walls fold upright from flat ground (90deg) to vertical (0deg)
  const assembleT = clamp01(progress, 0.04, 0.44);
  const assembleEase = assembleT < 0.5 ? 4 * assembleT * assembleT * assembleT : 1 - Math.pow(-2 * assembleT + 2, 3) / 2;
  const assembleWallAngle = (1 - assembleEase) * 90;

  // Phase 2: Sealed & Anticipation (progress: 0.46 -> 0.67)
  const isShaking = progress >= 0.52 && progress < 0.67;

  // Phase 3: Burst Open & Surprise Pop-up (progress: 0.67 -> 1.0)
  const openT = clamp01(progress, 0.67, 0.84);
  const openEase = openT < 0.5 ? 4 * openT * openT * openT : 1 - Math.pow(-2 * openT + 2, 3) / 2;
  const burstWallAngle = openEase * 74; // blooms open to 74deg like a 6-petal lotus chalice

  // Combined Wall Angle
  let currentWallAngle = 0;
  if (progress < 0.5) {
    currentWallAngle = assembleWallAngle;
  } else if (progress >= 0.67) {
    currentWallAngle = burstWallAngle;
  }

  // Top Hexagonal Lid Lift/Fade
  const lidY = progress < 0.46
    ? -floorY - (1 - assembleEase) * 160
    : -floorY - openEase * 200;
  const lidScale = progress < 0.46
    ? 0.7 + assembleEase * 0.3
    : 1 + openEase * 0.25;
  const lidOpacity = progress < 0.15
    ? clamp01(progress, 0.05, 0.15)
    : Math.max(0, 1 - openEase * 1.6);

  // The Grand Surprise (progress: 0.68 -> 0.96)
  const surpriseT = clamp01(progress, 0.68, 0.93);
  const springT = Math.sin(surpriseT * Math.PI * 0.5);
  const avatarY = 15 - springT * 140; // Vaults upward from inside the box into the air
  const avatarScale = surpriseT <= 0 ? 0 : Math.min(1.05, surpriseT * 1.2);

  // Mini Origami Airplane Flight Takeoff (Circles around Avatar):
  const planeActive = surpriseT > 0.03;
  const planeAngle = surpriseT * 360 * 1.8;
  const planeRadius = 120 + Math.sin(surpriseT * Math.PI) * 26;
  const planeRad = (planeAngle * Math.PI) / 180;
  const planeX = Math.cos(planeRad) * planeRadius;
  const planeZ = Math.sin(planeRad) * planeRadius;
  const planeY = avatarY - 20 + Math.sin(planeAngle * 0.06) * 18;

  // Dynamic status text based on progress
  let statusText = "Chuẩn bị 6 cánh giấy origami tạo hình hộp lục giác...";
  if (progress >= 0.22 && progress < 0.46) {
    statusText = "Lắp ráp 6 cạnh hộp lục giác cơ khí & chốt kim loại...";
  } else if (progress >= 0.46 && progress < 0.56) {
    statusText = "Đóng dấu triện son niêm phong hộp lục giác...";
  } else if (progress >= 0.56 && progress < 0.67) {
    statusText = "Hộp lục giác rung lắc... Chuẩn bị mở ra điều bất ngờ!";
  } else if (progress >= 0.67) {
    statusText = "BÙM! 6 cánh hoa bung nở: Phi đội Origami & Tô Trọng Nhân!";
  }

  // Camera Tilt: Symmetrical frontal perspective (chính diện), 26deg downward view for 3D hexagonal depth
  const baseTiltX = 26;
  const baseTiltY = 0;
  const tiltX = baseTiltX + mouseRef.current.y * 8;
  const tiltY = baseTiltY + mouseRef.current.x * 12 + spinImpulseRef.current;

  return (
    <div
      id="opening"
      onClick={handleScreenClick}
      className={`opening fixed inset-0 z-[100] select-none ${
        isLeaving ? "is-leaving" : ""
      }`}
      aria-label="Portfolio opening sequence"
    >
      {/* Interactive Click Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="opening__click-ripple"
          style={{ left: `${r.x}px`, top: `${r.y}px` }}
        />
      ))}

      {/* Ambient Floating Dust & Gold Ink Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[2]"
        aria-hidden="true"
      />

      {/* Split paper curtains for seamless exit reveal */}
      <div className="opening__curtain opening__curtain--top" aria-hidden="true" />
      <div className="opening__curtain opening__curtain--bottom" aria-hidden="true" />

      {/* Main Content inside the opening screen */}
      <div className="opening__content absolute inset-0 transition-all duration-500 z-[10]">
        {/* Drafting blueprint grid background */}
        <div className="opening__blueprint" aria-hidden="true" />

        {/* Outer Registration Marks Crosshairs */}
        <div className="absolute inset-6 sm:inset-10 pointer-events-none border border-[#111111]/[0.08]" aria-hidden="true">
          <span className="absolute -top-2.5 -left-2.5 text-[#111111]/30 font-mono text-xs select-none">+</span>
          <span className="absolute -top-2.5 -right-2.5 text-[#111111]/30 font-mono text-xs select-none">+</span>
          <span className="absolute -bottom-2.5 -left-2.5 text-[#111111]/30 font-mono text-xs select-none">+</span>
          <span className="absolute -bottom-2.5 -right-2.5 text-[#111111]/30 font-mono text-xs select-none">+</span>
        </div>

        {/* UI Frame Corner 1: Top-Left (Chỉ để Tên: TÔ TRỌNG NHÂN) */}
        <div className="opening__corner opening__corner--tl" aria-hidden="true">
          <h1 className="font-name text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] leading-none">
            Tô Trọng Nhân
          </h1>
          <p className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#6b675f] mt-1">
            Software Engineer / Full-stack
          </p>
        </div>

        {/* UI Frame Corner 2: Top-Right (CHỈ GIỮ NÚT SKIP) */}
        <div className="opening__corner opening__corner--tr">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            data-cursor="true"
            data-cursor-label="BỎ QUA"
            className="opening__skip shadow-sm cursor-pointer"
            aria-label="Skip the intro sequence"
          >
            <span>Skip</span>
            <span className="text-[10px] text-[#6b675f] group-hover:text-white font-mono opacity-70">[ESC]</span>
          </button>
        </div>

        {/* UI Frame Corner 3: Bottom-Left (Dynamic Terminal Log - Đã ẩn dòng phụ thứ 2) */}
        <div className="opening__corner opening__corner--bl" aria-hidden="true">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#b42318] font-semibold tracking-wider uppercase">
            <span className="inline-block w-1.5 h-1.5 bg-[#b42318] rounded-full animate-ping" />
            <span>TRẠNG THÁI KHỞI ĐỘNG // STATUS</span>
          </div>
          <p className="text-sm font-mono text-[#111111] font-medium leading-snug flex items-center gap-1 mt-0.5">
            <span>&gt; {statusText}</span>
            <span className="inline-block w-2 h-3.5 bg-[#111111] animate-pulse" />
          </p>
        </div>

        {/* UI Frame Corner 4: Bottom-Right (Scale Ruler & Big Counter) */}
        <div className="opening__corner opening__corner--br" aria-hidden="true">
          {/* Millimeter Scale Ruler with moving marker */}
          <div className="w-32 sm:w-48 opening__ruler mb-2 opacity-75">
            <div
              className="opening__ruler-marker"
              style={{ left: `${progress * 100}%` }}
            />
          </div>

          {/* Big Editorial Serif Percentage Counter */}
          <div className="flex items-baseline gap-1">
            <span
              className="opening__count select-none"
              suppressHydrationWarning
            >
              {String(count).padStart(2, "0")}
            </span>
            <span className="font-name text-2xl text-[#b42318] select-none font-semibold">
              %
            </span>
          </div>
        </div>

        {/* =========================================================================
            CENTERPIECE: ROTATING ASTROLABE COMPASS, ORBITING SATELLITES & 3D CUBE
            ========================================================================= */}
        <div className="opening__scene">
          {/* Astrolabe / Celestial Drafting Rings */}
          <div className="opening__astrolabe" aria-hidden="true">
            {/* Sweeping Radar Scanner Line */}
            <div className="opening__radar-sweep" />

            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible" suppressHydrationWarning>
              {/* Outer Rotating Degree Ring (Clockwise) */}
              <g className="opening__ring-spin opacity-45">
                <circle cx="200" cy="200" r="185" fill="none" stroke="#111111" strokeWidth="1" strokeDasharray="3 7" />
                <circle cx="200" cy="200" r="172" fill="none" stroke="#111111" strokeWidth="0.75" />
                {ASTROLABE_TICKS.map((tick, i) => (
                  <line
                    key={i}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke="#111111"
                    strokeWidth="1.2"
                  />
                ))}
              </g>

              {/* Inner Counter-Rotating Technical Ring */}
              <g className="opening__ring-spin-reverse opacity-35">
                <circle cx="200" cy="200" r="145" fill="none" stroke="#111111" strokeWidth="0.75" strokeDasharray="12 6 2 6" />
                <circle cx="200" cy="200" r="115" fill="none" stroke="#b42318" strokeWidth="0.5" strokeOpacity="0.4" />
              </g>

              {/* Self-drawing blueprint measurement arcs */}
              <circle
                cx="200"
                cy="200"
                r="160"
                fill="none"
                stroke="#b42318"
                strokeWidth="1"
                strokeDasharray="1005"
                strokeDashoffset={1005 * (1 - progress)}
                strokeOpacity="0.45"
              />

              {/* Center Crosshairs */}
              <line x1="15" y1="200" x2="385" y2="200" stroke="#111111" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 8" />
              <line x1="200" y1="15" x2="200" y2="385" stroke="#111111" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 8" />
            </svg>
          </div>

          {/* =========================================================================
              3D MYSTERY ORIGAMI WONDER CHEST & SURPRISE POP-UP (Tô Trọng Nhân)
              ========================================================================= */}
          <div
            className={`opening__box-rig ${isShaking ? "opening__box-shake" : ""}`}
            style={
              {
                "--bx": `${baseTiltX}deg`,
                "--by": `${baseTiltY}deg`,
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transition: isShaking ? "none" : "transform 0.12s ease-out",
              } as React.CSSProperties
            }
          >
            {/* Hexagonal Box Base (Floor plate) */}
            <div className="opening__hex-base">
              <svg viewBox="0 0 210 210" className="w-full h-full overflow-visible">
                {/* Regular Hexagon Base Outer Rim */}
                <polygon
                  points="155,191.6 55,191.6 5,105 55,18.4 155,18.4 205,105"
                  fill="#fdfbf7"
                  stroke="#111111"
                  strokeWidth="2"
                />
                {/* Gold Inset Hexagon */}
                <polygon
                  points="151.2,185 58.8,185 12.6,105 58.8,25 151.2,25 197.4,105"
                  fill="none"
                  stroke="#e6af2e"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                {/* Vermilion Guilloche Center Medallion */}
                <circle cx="105" cy="105" r="48" fill="none" stroke="#b42318" strokeWidth="0.8" />
                <circle cx="105" cy="105" r="34" fill="none" stroke="#e6af2e" strokeWidth="0.6" strokeDasharray="3 3" />
                {/* Radial Axes to 6 Vertices */}
                <line x1="105" y1="105" x2="155" y2="191.6" stroke="#e6af2e" strokeWidth="0.5" strokeOpacity="0.5" />
                <line x1="105" y1="105" x2="55" y2="191.6" stroke="#e6af2e" strokeWidth="0.5" strokeOpacity="0.5" />
                <line x1="105" y1="105" x2="5" y2="105" stroke="#e6af2e" strokeWidth="0.5" strokeOpacity="0.5" />
                <line x1="105" y1="105" x2="55" y2="18.4" stroke="#e6af2e" strokeWidth="0.5" strokeOpacity="0.5" />
                <line x1="105" y1="105" x2="155" y2="18.4" stroke="#e6af2e" strokeWidth="0.5" strokeOpacity="0.5" />
                <line x1="105" y1="105" x2="205" y2="105" stroke="#e6af2e" strokeWidth="0.5" strokeOpacity="0.5" />
              </svg>
            </div>

            {/* 6 Folding Hexagonal Walls (Origami Facets) */}
            {HEX_WALLS.map((wall, idx) => (
              <div
                key={idx}
                className="opening__hex-wall"
                style={{
                  transform: `rotateY(${wall.angle}deg) translateZ(${r}px) rotateX(${currentWallAngle}deg)`,
                }}
              >
                {/* Outer Wall Face */}
                <div className="opening__wall-face opening__wall-outer">
                  <div className="opening__wall-facet-left" />
                  <div className="opening__wall-facet-right" />
                  <div className="opening__ribbon-v" />

                  {/* Wall Specific Feature */}
                  {wall.hasLatch && (
                    <div className="opening__brass-latch">
                      <div className="opening__latch-hole" />
                      <span className="opening__latch-serial">{wall.label}</span>
                    </div>
                  )}

                  {wall.isCrest && (
                    <div className="absolute z-10 w-8 h-8 rounded-full border border-[#b42318] bg-white flex items-center justify-center shadow-sm">
                      <span className="font-name text-xs text-[#b42318] font-bold">Nhân</span>
                    </div>
                  )}

                  {!wall.hasLatch && !wall.isCrest && (
                    <div className="opening__tech-stamp">
                      <span>{wall.label}</span>
                      <span>{wall.sub}</span>
                    </div>
                  )}

                  <span className="opening__corner-bracket top-1.5 left-1.5" />
                  <span className="opening__corner-bracket top-1.5 right-1.5" />
                  <span className="opening__corner-bracket bottom-1.5 left-1.5" />
                  <span className="opening__corner-bracket bottom-1.5 right-1.5" />
                </div>

                {/* Inner Wall Face (Golden Origami Blossom Pattern) */}
                <div className="opening__wall-face opening__wall-inner">
                  <svg viewBox="0 0 100 144" className="w-full h-full p-2 overflow-visible">
                    <rect x="2" y="2" width="96" height="140" rx="3" fill="none" stroke="#e6af2e" strokeWidth="0.8" strokeDasharray="3 2" />
                    <circle cx="50" cy="72" r="34" fill="none" stroke="#b42318" strokeWidth="0.7" />
                    <polygon
                      points="50,38 56,66 84,72 56,78 50,106 44,78 16,72 44,66"
                      fill="#e6af2e"
                      fillOpacity="0.25"
                      stroke="#e6af2e"
                      strokeWidth="0.75"
                    />
                    <line x1="50" y1="8" x2="50" y2="136" stroke="#e6af2e" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="2 3" />
                  </svg>
                </div>
              </div>
            ))}

            {/* Hexagonal Top Lid with Cinnabar Master Seal */}
            <div
              className="opening__hex-lid"
              style={{
                transform: `translateY(${lidY}px) rotateX(-90deg) rotateZ(${openEase * 36}deg) scale(${lidScale})`,
                opacity: lidOpacity,
                pointerEvents: lidOpacity < 0.2 ? "none" : "auto",
              }}
            >
              <svg viewBox="0 0 210 210" className="absolute inset-0 w-full h-full overflow-visible">
                {/* Regular Hexagon Base Outer Rim */}
                <polygon
                  points="155,191.6 55,191.6 5,105 55,18.4 155,18.4 205,105"
                  fill="#fdfbf7"
                  stroke="#111111"
                  strokeWidth="2"
                />
                {/* Gold Inset Hexagon */}
                <polygon
                  points="151.2,185 58.8,185 12.6,105 58.8,25 151.2,25 197.4,105"
                  fill="none"
                  stroke="#e6af2e"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
              </svg>

              <div className="opening__ribbon-v" />
              <div className="opening__ribbon-h" />

              {/* Master Traditional Cinnabar Seal Stamp on Lid */}
              <div
                className={`opening__seal select-none transition-transform duration-300 relative ${
                  isStamped ? "scale-100" : "scale-85 opacity-85"
                }`}
              >
                <svg className="opening__guilloche" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#b42318" strokeWidth="0.8" strokeDasharray="3 4" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#e6af2e" strokeWidth="0.6" strokeDasharray="2 3" />
                </svg>
                <div className="opening__seal-ring" />
                {isStamped && <div className="opening__shockwave" />}

                <span className="text-[7.5px] font-mono tracking-widest font-semibold uppercase text-[#b42318] opacity-90">
                  TÔ TRỌNG
                </span>
                <span className="font-name-italic text-2xl font-bold leading-none tracking-tight my-0.5 text-[#b42318]">
                  Nhân
                </span>
                <span className="text-[7.5px] font-mono tracking-widest font-semibold text-[#b42318] opacity-90">
                  ✦ 2026 ✦
                </span>
              </div>
            </div>

            {/* =========================================================================
                THE GRAND SURPRISE: POPPING AVATAR, AUTHENTIC MINI PLANE & STARBURST
                ========================================================================= */}
            {openT > 0.05 && (
              <>
                {/* Confetti Starlight Diamonds Bursting Outward */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const dist = 40 + surpriseT * 95;
                  const cx = Math.cos(rad) * dist;
                  const cz = Math.sin(rad) * dist;
                  const cy = -20 - surpriseT * 60;
                  return (
                    <div
                      key={i}
                      className="opening__confetti-star"
                      style={{
                        transform: `translate3d(${cx}px, ${cy}px, ${cz}px) scale(${1 - surpriseT * 0.3})`,
                        opacity: Math.max(0, 1 - surpriseT * 0.85),
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <polygon
                          points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9"
                          fill={i % 2 === 0 ? "#e6af2e" : "#b42318"}
                        />
                      </svg>
                    </div>
                  );
                })}

                {/* The Popping Chibi Avatar (Surprise Character, Clean & Completely Unobstructed) */}
                <div
                  className="opening__surprise-avatar"
                  style={{
                    transform: `translate3d(0, ${avatarY}px, 20px) scale(${avatarScale})`,
                    opacity: Math.min(1, surpriseT * 4),
                  }}
                >
                  <div className="opening__avatar-medallion">
                    <Image
                      src="/images/avatar-v2.png"
                      alt="Tô Trọng Nhân"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="opening__light-shimmer" />
                  </div>

                  {/* 4 Cardinal Gold Starlight Studs */}
                  <span className="opening__stud opening__stud--t" />
                  <span className="opening__stud opening__stud--b" />
                  <span className="opening__stud opening__stud--l" />
                  <span className="opening__stud opening__stud--r" />
                </div>

                {/* Celestial Astrolabe Ring Orbiting the Avatar */}
                <div
                  className="opening__celestial-halo"
                  style={{
                    transform: `translate3d(0, ${avatarY}px, 15px) scale(${avatarScale})`,
                    opacity: Math.min(1, surpriseT * 3),
                  }}
                />

                {/* Floating Architectural Name Plaque Under Avatar - Ultra Crisp, 100% Legible */}
                {surpriseT > 0.25 && (
                  <div
                    className="opening__surprise-badge"
                    style={{
                      transform: `translate3d(-50%, calc(-50% + ${avatarY + 104}px), 32px) scale(${Math.min(
                        1,
                        (surpriseT - 0.25) * 2.2
                      )})`,
                      opacity: Math.min(1, (surpriseT - 0.25) * 3),
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#b42318] text-[9px] font-bold">✦</span>
                      <span className="opening__badge-title">TÔ TRỌNG NHÂN</span>
                      <span className="text-[#b42318] text-[9px] font-bold">✦</span>
                    </div>
                    <span className="opening__badge-sub">SOFTWARE ENGINEER // 2026</span>
                  </div>
                )}

                {/* The Soaring Authentic Mini Origami Paper Airplane */}
                {planeActive && (
                  <div
                    className="opening__surprise-plane"
                    style={{
                      transform: `translate3d(${planeX}px, ${planeY}px, ${planeZ}px) rotateY(${
                        -planeAngle - 90
                      }deg) rotateZ(18deg) scale(1)`,
                    }}
                    data-cursor="true"
                    data-cursor-label="ORIGAMI"
                  >
                    <svg viewBox="-0.62 -0.62 1.24 1.24" className="w-10 h-10 overflow-visible drop-shadow-md">
                      {/* Airplane Body */}
                      <polygon
                        points="0,-0.62 0.44,0.6 0.08,0.62 0,0.56 -0.08,0.62 -0.44,0.6"
                        fill="#fdfbf6"
                        stroke="#111111"
                        strokeWidth="0.04"
                        strokeLinejoin="round"
                      />
                      {/* Right Wing Origami Shadow */}
                      <polygon
                        points="0,-0.62 0.44,0.6 0.08,0.62 0.02,0.6"
                        fill="#ece4d4"
                        stroke="#111111"
                        strokeWidth="0.03"
                        strokeLinejoin="round"
                      />
                      {/* Origami Fold Creases */}
                      <path
                        d="M0 -0.62 L0 0.56 M0 -0.62 L0.07 0.6 M0 -0.62 L-0.07 0.6"
                        fill="none"
                        stroke="#b42318"
                        strokeWidth="0.028"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

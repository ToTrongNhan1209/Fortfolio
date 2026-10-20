"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";

interface HeroFlipCardProps {
  avatar: string;
  name: string;
  motto: string;
  status: string;
  location: string;
}

export function HeroFlipCard({ avatar, name, motto, status, location }: HeroFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="hero-flip-scene w-full max-w-[20rem] sm:max-w-[22rem] justify-self-end">
      <div
        onClick={() => setFlipped(!flipped)}
        data-cursor="true"
        data-cursor-label="TURN"
        className={`hero-flip-card relative aspect-[4/5] w-full cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          flipped ? "is-flipped" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face: User Chibi Avatar Photo */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-[#eae7e1] bg-[#f2f0ec] shadow-[0_26px_50px_-30px_rgba(17,17,17,0.42)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] text-[#f5f3ee] text-[11px] font-mono tracking-wider uppercase shadow-md transition-transform hover:scale-105">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Turn</span>
          </div>
        </div>

        {/* Back Face: Philosophy Note & Origin */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between border border-[#eae7e1] bg-[#fafaf8] text-left shadow-[0_26px_50px_-30px_rgba(17,17,17,0.42)]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top Stamp */}
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#111111]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b42318]"></span>
            <span>{status}</span>
          </div>

          {/* Handwritten-feel Note */}
          <div className="my-auto py-4">
            <p className="text-[17px] text-[#33332f] font-serif italic leading-relaxed">
              &ldquo;{motto}&rdquo;
            </p>
          </div>

          {/* Bottom Foot */}
          <div className="pt-3 border-t border-[#eae7e1] text-[11px] font-mono uppercase tracking-wider text-[#6b675f] flex justify-between items-center">
            <span>{location} · 2026</span>
            <span className="text-[10px] text-[#b42318] font-bold">TÔ TRỌNG NHÂN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

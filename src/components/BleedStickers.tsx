"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FoodItem {
  id: string;
  nameVi: string;
  nameEn: string;
  image: string;
}

const FOOD_ITEMS: FoodItem[] = [
  { id: "goi-cuon", nameVi: "Gỏi cuốn tôm thịt", nameEn: "Fresh spring rolls", image: "/images/stickers/goi-cuon-doi.webp" },
  { id: "com-tam", nameVi: "Cơm tấm sườn bì chả", nameEn: "Saigon broken rice", image: "/images/stickers/com-tam-dia.webp" },
  { id: "pho-tai", nameVi: "Phở bò tái lăn", nameEn: "Beef pho noodle", image: "/images/stickers/pho-tai.webp" },
  { id: "banh-xeo", nameVi: "Bánh xèo giòn rụm", nameEn: "Crispy pancake", image: "/images/stickers/banh-xeo.webp" },
  { id: "phin-ly", nameVi: "Cà phê phin sữa đá", nameEn: "Vietnamese drip coffee", image: "/images/stickers/phin-ly.webp" },
  { id: "bun-bo", nameVi: "Bún bò Huế cay nồng", nameEn: "Spicy beef noodles", image: "/images/stickers/bun-bo-hue.webp" },
  { id: "banh-mi", nameVi: "Bánh mì pate chả lụa", nameEn: "Vietnamese banh mi", image: "/images/stickers/banh-mi-cha.webp" },
  { id: "thit-kho", nameVi: "Thịt kho hột vịt", nameEn: "Braised pork & egg", image: "/images/stickers/thit-kho.webp" },
  { id: "tra-tac", nameVi: "Trà tắc hạt chia mát lạnh", nameEn: "Iced kumquat tea", image: "/images/stickers/tra-tac-da.webp" },
  { id: "cha-gio", nameVi: "Mẹt chả giò chiên", nameEn: "Crispy fried rolls", image: "/images/stickers/met-cha-gio.webp" },
  { id: "pho-cuon", nameVi: "Phở cuốn Hà Nội", nameEn: "Rolled pho beef", image: "/images/stickers/pho-cuon.webp" },
  { id: "met-banh-xeo", nameVi: "Mẹt bánh xèo miền Tây", nameEn: "Mekong pancake feast", image: "/images/stickers/banh-xeo-met.webp" },
];

interface StickerSlotProps {
  initialIndex: number;
  side: "left" | "right";
  topPx: number;
  baseRotate: number;
  size?: number;
}

function StickerSlot({
  initialIndex,
  side,
  topPx,
  baseRotate,
  size = 42,
}: StickerSlotProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const currentFood = FOOD_ITEMS[index % FOOD_ITEMS.length];

  const handleCycle = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % FOOD_ITEMS.length);
      setIsSwapping(false);
    }, 150);
  };

  return (
    <div
      className={`absolute z-20 select-none pointer-events-auto transition-all duration-300 ${
        side === "left"
          ? "left-3 sm:left-6 xl:left-8 2xl:left-14"
          : "right-3 sm:right-6 xl:right-8 2xl:right-14"
      }`}
      style={{
        top: `${topPx}px`,
      }}
    >
      <div
        className="group relative cursor-pointer interactive-sticker"
        onClick={handleCycle}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="true"
      >
        {/* Subtle glow halo behind on hover */}
        <div
          className={`absolute inset-0 -m-2 rounded-full bg-amber-500/10 blur-sm transition-opacity duration-300 ${
            isHovered ? "opacity-100 scale-110" : "opacity-0"
          }`}
        />

        {/* Sticker Container with gentle floating motion - compact size (42px) with subtle pop */}
        <div
          className={`${
            initialIndex % 2 === 0 ? "animate-sticker-sway-1" : "animate-sticker-sway-2"
          }`}
        >
          <div
            className={`relative transition-all duration-300 ease-out transform ${
              isSwapping ? "scale-75 rotate-12 opacity-50" : isHovered ? "scale-115 rotate-6" : "scale-100"
            }`}
            style={{
              transform: isHovered
                ? `scale(1.18) rotate(${baseRotate + 6}deg)`
                : `rotate(${baseRotate}deg)`,
              filter: "drop-shadow(0 3px 8px rgba(17, 17, 17, 0.08))",
            }}
          >
            <div
              className="relative"
              style={{ width: `${size}px`, height: `${size}px` }}
            >
              <Image
                src={currentFood.image}
                alt=""
                fill
                sizes="42px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BleedStickers() {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:block absolute inset-0 pointer-events-none"
    >
      {/* Left Rail: 6 street food stickers placed down the page */}
      <StickerSlot initialIndex={0} side="left" topPx={200} baseRotate={-6} size={42} />
      <StickerSlot initialIndex={2} side="left" topPx={750} baseRotate={10} size={44} />
      <StickerSlot initialIndex={4} side="left" topPx={1400} baseRotate={-8} size={40} />
      <StickerSlot initialIndex={6} side="left" topPx={2100} baseRotate={7} size={42} />
      <StickerSlot initialIndex={8} side="left" topPx={2850} baseRotate={-10} size={40} />
      <StickerSlot initialIndex={10} side="left" topPx={3600} baseRotate={6} size={42} />

      {/* Right Rail: 6 street food stickers placed down the page */}
      <StickerSlot initialIndex={1} side="right" topPx={380} baseRotate={8} size={44} />
      <StickerSlot initialIndex={3} side="right" topPx={950} baseRotate={-6} size={42} />
      <StickerSlot initialIndex={5} side="right" topPx={1700} baseRotate={12} size={42} />
      <StickerSlot initialIndex={7} side="right" topPx={2450} baseRotate={-8} size={40} />
      <StickerSlot initialIndex={9} side="right" topPx={3200} baseRotate={10} size={44} />
      <StickerSlot initialIndex={11} side="right" topPx={3850} baseRotate={-6} size={42} />
    </div>
  );
}

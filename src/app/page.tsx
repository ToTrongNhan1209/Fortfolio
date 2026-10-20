"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Stack } from "@/components/Stack";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CvModal } from "@/components/CvModal";
import { ProjectModal } from "@/components/ProjectModal";
import { BleedStickers } from "@/components/BleedStickers";
import { ProjectItem } from "@/data/portfolio";
import { Opening } from "@/components/Opening";

export default function Home() {
  const [lang, setLang] = useState<"en" | "vi">("en");
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#111111] selection:bg-[#b42318] selection:text-white paper-field-bg relative">
      {/* Intro Opening Animation (Paper plane folding & rising sky) matching voanhphi */}
      <Opening />
      {/* SVG Ink Wobble Filter matching voanhphi */}
      <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="ink-wobble" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves={1} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={1.4} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Floating Vietnamese Street Food Bleed Stickers along Left and Right margins */}
      <BleedStickers />

      {/* Top Floating Glass Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenCv={() => setIsCvOpen(true)}
      />

      {/* Main Content Container (Constrained & Centered like voanhphi.vercel.app) */}
      <main className="max-w-4xl mx-auto px-5 sm:px-6">
        <Hero
          lang={lang}
          onOpenCv={() => setIsCvOpen(true)}
        />

        <Manifesto lang={lang} />

        <Stack lang={lang} />

        <Projects
          lang={lang}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <Contact
          lang={lang}
          onOpenCv={() => setIsCvOpen(true)}
        />

        <Footer lang={lang} />
      </main>

      {/* CV Dossier Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        lang={lang}
      />

      {/* Project Deep-dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
      />
    </div>
  );
}

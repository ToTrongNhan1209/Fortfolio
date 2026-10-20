"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ScrambleText } from "./ScrambleText";
import { Mail, Check, Copy, ArrowUpRight, FileText, Send, Phone, MapPin } from "lucide-react";

interface ContactProps {
  lang: "en" | "vi";
  onOpenCv: () => void;
}

export function Contact({ lang, onOpenCv }: ContactProps) {
  const { profile } = PORTFOLIO_DATA;
  const isEn = lang === "en";

  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSent(true);
      setTimeout(() => setFormSent(false), 4000);
    }, 800);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 hairline-b">
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#6b675f] mb-3 block">
            {isEn ? "[ Contact ]" : "[ Liên hệ ]"}
          </span>
          <h2 className="font-name text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] mb-4">
            <ScrambleText text={isEn ? "Want to get in touch?" : "Kết nối & Trao đổi."} />
          </h2>
          <p className="text-[16px] text-[#33332f] leading-relaxed max-w-2xl">
            {isEn
              ? "I'm open to Software Engineer opportunities where I can keep working across frontend and backend, learn from a team and take responsibility for real features. If you think we could work together, feel free to reach out."
              : "Mình luôn sẵn sàng đón nhận cơ hội Kỹ sư Phần mềm để tiếp tục làm việc xuyên suốt giữa frontend và backend, học hỏi cùng đội ngũ và chịu trách nhiệm cho các tính năng thực tế. Đừng ngần ngại kết nối cùng mình."}
          </p>
        </div>

        {/* Massive Signature Clickable Email Link matching voanhphi */}
        <div className="py-2">
          <a
            href={`mailto:${profile.email}`}
            data-cursor="true"
            data-cursor-label={isEn ? "Send Email" : "Gửi Email"}
            className="group font-name-italic text-2xl sm:text-4xl md:text-[46px] text-[#111111] hover:text-[#b42318] transition-colors leading-tight inline-flex items-center gap-3 break-all"
          >
            <span>{profile.email}</span>
            <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#b42318] shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Contact Details & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#eae7e1]">
          {/* Left: Direct Channels List */}
          <div className="flex flex-col gap-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#6b675f]">
              {isEn ? "Direct channels" : "Kênh liên lạc trực tiếp"}
            </div>

            <div className="flex flex-col gap-3">
              {/* Email row with Copy button */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f0ec] border border-[#eae7e1] text-sm">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#b42318]" />
                  <span className="font-mono text-xs sm:text-sm text-[#111111]">{profile.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  data-cursor="true"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-[#6b675f] hover:text-[#111111] bg-[#fafaf8] border border-[#eae7e1] rounded-lg transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">{isEn ? "Copied" : "Đã chép"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isEn ? "Copy" : "Sao chép"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* GitHub Link */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="true"
                data-cursor-label="GITHUB"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f0ec] border border-[#eae7e1] text-sm text-[#111111] hover:border-[#111111] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 fill-current text-[#111111]" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="font-mono text-xs sm:text-sm">@ToTrongNhan1209 (GitHub)</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#6b675f] group-hover:text-[#111111]" />
              </a>

              {/* View CV button */}
              <button
                onClick={onOpenCv}
                data-cursor="true"
                data-cursor-label="CV DOSSIER"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f0ec] border border-[#eae7e1] text-sm text-[#111111] hover:border-[#111111] transition-all group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#b42318]" />
                  <span className="font-mono text-xs sm:text-sm">{isEn ? "View Complete CV Dossier" : "Xem Hồ sơ CV chi tiết"}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#6b675f] group-hover:text-[#111111]" />
              </button>
            </div>

            {/* Location & Phone */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#6b675f] pt-2">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#b42318]" />
                {isEn ? profile.locationEn : profile.locationVi}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#b42318]" />
                {profile.phone}
              </span>
            </div>
          </div>

          {/* Right: Quick Note Box + Sign-off */}
          <div className="flex flex-col justify-between">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f2f0ec] border border-[#eae7e1]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#6b675f] mb-3">
                {isEn ? "Send a quick note" : "Gửi tin nhắn nhanh"}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder={isEn ? "Your name" : "Tên bạn"}
                    required
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#fafaf8] border border-[#eae7e1] rounded-lg text-[#111111] placeholder-[#888c91] focus:outline-none focus:border-[#111111]"
                  />
                  <input
                    type="email"
                    placeholder={isEn ? "Your email" : "Email"}
                    required
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#fafaf8] border border-[#eae7e1] rounded-lg text-[#111111] placeholder-[#888c91] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <textarea
                  placeholder={isEn ? "How can we collaborate?" : "Lời nhắn hoặc dự án hợp tác..."}
                  required
                  rows={2}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#fafaf8] border border-[#eae7e1] rounded-lg text-[#111111] placeholder-[#888c91] focus:outline-none focus:border-[#111111] resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="true"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-medium text-[#fafaf8] bg-[#111111] hover:bg-[#b42318] rounded-full transition-all w-fit disabled:opacity-50"
                >
                  {loading ? (
                    <span>{isEn ? "Sending..." : "Đang gửi..."}</span>
                  ) : formSent ? (
                    <span className="text-emerald-300">{isEn ? "Note received! Thank you." : "Đã nhận! Cảm ơn bạn."}</span>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      <span>{isEn ? "Send note" : "Gửi tin nhắn"}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Handwritten Signature and Thanks Note */}
            <div className="mt-6 pt-4 flex flex-col items-start sm:items-end">
              <p className="font-name-italic text-3xl sm:text-4xl text-[#111111] tracking-normal">
                Tô Trọng Nhân
              </p>
              <p className="text-xs font-mono text-[#6b675f] mt-1">
                {isEn ? "Thanks for taking a look around." : "Cảm ơn bạn đã ghé thăm trang cá nhân của mình."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

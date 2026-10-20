import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "vietnamese"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tô Trọng Nhân | Software Engineer / Full-stack",
  description:
    "Portfolio of To Trong Nhan, Software Engineer based in Ho Chi Minh City. Building web and mobile features with React, Next.js, React Native, NestJS and PostgreSQL.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Tô Trọng Nhân | Software Engineer / Full-stack",
    description:
      "Writing software from Ho Chi Minh City, Vietnam. Working on both frontend and backend across fintech, healthcare, and e-commerce.",
    images: ["/images/avatar-v2.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="bg-[#fafaf8] text-[#111111] min-h-screen">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}


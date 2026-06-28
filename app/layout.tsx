import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const base = process.env.GITHUB_PAGES === "true" ? "/Kiran-Website" : "";

export const metadata: Metadata = {
  title: "Kiran Sen — Web Designer & Developer",
  description:
    "Award-worthy web design by Kiran Sen. Conversion-focused landing pages, custom front-end builds, and animated SaaS products.",
  keywords: ["web design", "web developer", "freelance", "Next.js", "Framer Motion", "Washington DC"],
  icons: {
    icon: `${base}/favicon.svg`,
    shortcut: `${base}/favicon.svg`,
  },
  openGraph: {
    title: "Kiran Sen — Web Designer & Developer",
    description:
      "Custom websites that win clients — built with Next.js, Tailwind, and Framer Motion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-background text-body overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

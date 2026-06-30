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

const isGhPages = process.env.GITHUB_PAGES === "true";
const base = isGhPages ? "/Kiran-Website" : "";
const siteUrl = isGhPages
  ? "https://kirans0615.github.io/Kiran-Website"
  : (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kiransendesign.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kiran Sen — Web Designer & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiran Sen — Web Designer & Developer",
    description: "Custom websites that win clients — built with Next.js, Tailwind, and Framer Motion.",
    images: ["/og-image.png"],
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

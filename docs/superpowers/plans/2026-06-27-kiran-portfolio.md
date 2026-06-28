# Kiran Sen Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality, award-worthy Next.js 14 portfolio for Kiran Sen showcasing 8 live client websites with animated browser-frame cards, heavy Framer Motion choreography, and Lenis smooth scroll.

**Architecture:** Single-page Next.js App Router app; all animation-heavy sections are `"use client"` components; providers wrap the app in the root layout; data lives in a static `lib/projects.ts` file; iframe loads live sites with Microlink screenshot fallback.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, @studio-freight/lenis (or lenis), react-intersection-observer, lucide-react

## Global Constraints

- Node ≥ 18, Next.js 14, TypeScript strict mode
- Dark-mode-first: background `#0A0906`, accent amber `#F59E0B` / `#FBBF24`
- Fonts: Clash Display (fontshare CDN via globals.css @import) + Inter (next/font/google)
- All heavy animations gated by `useReducedMotion()` from framer-motion
- Netlify deploy target: `netlify.toml` included, Netlify Forms on contact
- Zero console errors, zero build errors before handoff
- `prefers-reduced-motion` must produce instant, non-animated fallbacks

---

### Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json` (via npx create-next-app)
- Create: `next.config.ts`
- Create: `netlify.toml`
- Create: `.gitignore`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/kiransen
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
cd portfolio
```

- [ ] **Step 2: Install animation and utility dependencies**

```bash
npm install framer-motion lenis @studio-freight/lenis react-intersection-observer lucide-react
```

- [ ] **Step 3: Verify scaffold runs**

```bash
npm run dev &
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
# Expected: 200
kill %1
```

- [ ] **Step 4: Update next.config.ts to allow Microlink and thum.io image domains**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.microlink.io" },
      { protocol: "https", hostname: "image.thum.io" },
      { protocol: "https", hostname: "**.github.io" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Create netlify.toml**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

- [ ] **Step 6: Commit**

```bash
cd /Users/kiransen/portfolio
git init
git add .
git commit -m "feat: scaffold Next.js 14 portfolio with dependencies"
```

---

### Task 2: Design System — Tailwind Config, Fonts, Global CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update tailwind.config.ts with design tokens**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0906",
        surface: "#141210",
        "surface-2": "#1E1B17",
        accent: "#F59E0B",
        "accent-light": "#FBBF24",
        "accent-glow": "rgba(245,158,11,0.15)",
        muted: "#A8956E",
        "muted-2": "#6B5F4A",
        border: "rgba(245,158,11,0.12)",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url('/noise.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Write globals.css with Clash Display, grain, and scroll styles**

```css
/* app/globals.css */
@import url("https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0A0906;
  --accent: #F59E0B;
  --accent-light: #FBBF24;
  --cursor-size: 8px;
  --cursor-ring: 40px;
}

* {
  cursor: none;
}

html {
  scroll-behavior: auto; /* Lenis handles this */
}

body {
  background-color: var(--background);
  color: #A8956E;
  overflow-x: hidden;
}

/* Grain texture overlay */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* Smooth scrollbar styling */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: var(--background);
}
::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 2px;
}

/* Selection color */
::selection {
  background: rgba(245, 158, 11, 0.3);
  color: #fff;
}

/* Hide default cursor everywhere */
a, button, [role="button"] {
  cursor: none;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .clip-path-none {
    clip-path: none;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: design system tokens, Clash Display font, grain texture"
```

---

### Task 3: Root Layout, Providers, and Inter Font

**Files:**
- Create: `components/providers/LenisProvider.tsx`
- Create: `components/cursor/CustomCursor.tsx` (stub, fleshed out in Task 5)
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create LenisProvider**

```tsx
// components/providers/LenisProvider.tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Update app/layout.tsx**

```tsx
// app/layout.tsx
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

export const metadata: Metadata = {
  title: "Kiran Sen — Web Designer & Developer",
  description:
    "Award-worthy web design by Kiran Sen. Conversion-focused landing pages, custom front-end builds, and animated SaaS products.",
  keywords: ["web design", "web developer", "freelance", "Next.js", "Framer Motion"],
  openGraph: {
    title: "Kiran Sen — Web Designer & Developer",
    description: "Award-worthy web design by Kiran Sen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-muted antialiased">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create stub CustomCursor (full implementation in Task 5)**

```tsx
// components/cursor/CustomCursor.tsx
"use client";
export function CustomCursor() { return null; }
```

- [ ] **Step 4: Commit**

```bash
git add components/ app/layout.tsx
git commit -m "feat: root layout, Lenis provider, Inter font"
```

---

### Task 4: Shared Utility Components

**Files:**
- Create: `components/shared/ScrollProgress.tsx`
- Create: `components/shared/MagneticButton.tsx`
- Create: `components/shared/RevealText.tsx`
- Create: `components/shared/SectionHeading.tsx`
- Create: `components/shared/CountUpStat.tsx`
- Create: `components/shared/MarqueeTicker.tsx`

- [ ] **Step 1: ScrollProgress — fixed amber bar at top**

```tsx
// components/shared/ScrollProgress.tsx
"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[9998]"
      style={{ scaleX }}
    />
  );
}
```

- [ ] **Step 2: MagneticButton**

```tsx
// components/shared/MagneticButton.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "data-cursor"?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  onClick,
  type = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
      className={className}
      data-cursor={props["data-cursor"] || "hover"}
    >
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 3: RevealText — per-word y-translate reveal**

```tsx
// components/shared/RevealText.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  as: Tag = "p",
}: RevealTextProps) {
  const shouldReduce = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const words = text.split(" ");

  if (shouldReduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 4: SectionHeading — horizontal clip reveal**

```tsx
// components/shared/SectionHeading.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionHeadingProps {
  label: string;
  title: string;
  className?: string;
}

export function SectionHeading({ label, title, className = "" }: SectionHeadingProps) {
  const shouldReduce = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className={`mb-16 ${className}`}>
      <motion.span
        className="text-accent text-sm font-medium tracking-[0.2em] uppercase block mb-4"
        initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
      <div className="overflow-hidden">
        <motion.h2
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          initial={shouldReduce ? {} : { y: "100%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: CountUpStat**

```tsx
// components/shared/CountUpStat.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";

interface CountUpStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export function CountUpStat({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
}: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const shouldReduce = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (shouldReduce) {
      setCount(end);
      return;
    }

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration, shouldReduce]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-bold text-white mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-muted text-sm tracking-wide uppercase">{label}</div>
    </div>
  );
}
```

- [ ] **Step 6: MarqueeTicker**

```tsx
// components/shared/MarqueeTicker.tsx
"use client";

import { useReducedMotion } from "framer-motion";

const SKILLS = [
  "Next.js", "Framer Motion", "TypeScript", "Tailwind CSS",
  "Responsive Design", "Animation", "Netlify", "Calendly Integration",
  "Conversion-Focused UI", "Brand-Consistent Design", "SaaS Landing Pages",
  "Custom Front-End", "Lenis Scroll", "WebGL", "React", "UI/UX",
];

export function MarqueeTicker() {
  const shouldReduce = useReducedMotion();
  const items = [...SKILLS, ...SKILLS];

  return (
    <div className="overflow-hidden py-6 border-y border-border">
      <div
        className={`flex gap-8 whitespace-nowrap ${
          shouldReduce ? "" : "animate-marquee"
        }`}
        style={{ width: "max-content" }}
      >
        {items.map((skill, i) => (
          <span key={i} className="flex items-center gap-8 text-muted text-sm tracking-wider uppercase">
            {skill}
            <span className="text-accent text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add components/shared/
git commit -m "feat: shared utility components (ScrollProgress, MagneticButton, RevealText, SectionHeading, CountUpStat, MarqueeTicker)"
```

---

### Task 5: Custom Cursor

**Files:**
- Modify: `components/cursor/CustomCursor.tsx`

- [ ] **Step 1: Full CustomCursor implementation**

```tsx
// components/cursor/CustomCursor.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    setMounted(true);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        const label = el.dataset.cursor || "";
        setCursorLabel(label === "hover" ? "" : label);
        setIsHovering(true);
      } else {
        setCursorLabel("");
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || shouldReduce) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full border border-accent/60 flex items-center justify-center w-full h-full"
          animate={{ scale: isHovering ? 1 : 1 }}
        >
          {cursorLabel && (
            <span className="text-accent text-[9px] font-medium tracking-wider uppercase">
              {cursorLabel}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/cursor/CustomCursor.tsx
git commit -m "feat: custom cursor with dot, spring-lag ring, and hover label"
```

---

### Task 6: Preloader

**Files:**
- Create: `components/preloader/Preloader.tsx`

- [ ] **Step 1: Implement Preloader**

```tsx
// components/preloader/Preloader.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    // Check session storage so preloader only shows once
    if (sessionStorage.getItem("preloader-shown")) {
      onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem("preloader-shown", "1");
          setTimeout(onComplete, shouldReduce ? 0 : 700);
        }, 400);
      } else {
        setProgress(Math.round(current));
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Curtain panels */}
          <motion.div
            className="absolute inset-0 flex"
            exit="exit"
            variants={{
              exit: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-surface"
                variants={{
                  exit: {
                    scaleY: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 },
                  },
                }}
                style={{ originY: 1 }}
              />
            ))}
          </motion.div>

          {/* Name reveal */}
          <div className="relative z-10 overflow-hidden">
            <motion.h1
              className="font-display text-6xl md:text-8xl font-bold text-white"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Kiran Sen
            </motion.h1>
          </div>

          {/* Progress counter */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-48 h-[1px] bg-surface-2 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="text-muted text-xs tracking-[0.3em] font-medium">
              {String(progress).padStart(3, "0")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/preloader/Preloader.tsx
git commit -m "feat: session-once preloader with name reveal, curtain exit, progress counter"
```

---

### Task 7: Navbar

**Files:**
- Create: `components/nav/Navbar.tsx`

- [ ] **Step 1: Implement sticky frosted-glass Navbar**

```tsx
// components/nav/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/shared/MagneticButton";

const NAV_LINKS = [
  { label: "Work", href: "#portfolio" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth" });
    setActive(href);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-bold text-white text-lg tracking-tight"
          whileHover={shouldReduce ? {} : { scale: 1.02 }}
          data-cursor="hover"
        >
          KS
        </motion.button>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="relative text-sm text-muted hover:text-white transition-colors duration-300 group"
                data-cursor="hover"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <MagneticButton
          className="px-5 py-2 border border-accent text-accent text-sm font-medium rounded-full hover:bg-accent hover:text-background transition-colors duration-300"
          onClick={() => scrollTo("#contact")}
          data-cursor="hover"
        >
          Hire Me
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/nav/Navbar.tsx
git commit -m "feat: sticky frosted-glass navbar with animated underline and Hire Me CTA"
```

---

### Task 8: Hero Section

**Files:**
- Create: `components/hero/Hero.tsx`
- Create: `components/hero/AnimatedHeadline.tsx`
- Create: `components/hero/MeshBackground.tsx`

- [ ] **Step 1: MeshBackground — animated gradient reacting to cursor**

```tsx
// components/hero/MeshBackground.tsx
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const draw = () => {
      t += 0.003;
      const { x: mx, y: my } = mouseRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ambient orbs
      const orbs = [
        { x: 0.2 + Math.sin(t) * 0.15 + mx * 0.1, y: 0.3 + Math.cos(t * 0.7) * 0.1, r: 0.35, a: 0.12 },
        { x: 0.8 + Math.cos(t * 0.8) * 0.1 + mx * -0.05, y: 0.5 + Math.sin(t) * 0.15, r: 0.3, a: 0.08 },
        { x: 0.5 + Math.sin(t * 1.2) * 0.08, y: 0.8 + Math.cos(t * 0.9) * 0.05 + my * -0.1, r: 0.25, a: 0.06 },
      ];

      orbs.forEach((orb) => {
        const grad = ctx.createRadialGradient(
          orb.x * canvas.width, orb.y * canvas.height, 0,
          orb.x * canvas.width, orb.y * canvas.height, orb.r * canvas.width
        );
        grad.addColorStop(0, `rgba(245,158,11,${orb.a})`);
        grad.addColorStop(1, "rgba(245,158,11,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [shouldReduce]);

  if (shouldReduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
```

- [ ] **Step 2: AnimatedHeadline — per-word staggered reveal**

```tsx
// components/hero/AnimatedHeadline.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const LINE_1 = ["Websites", "That"];
const LINE_2 = ["Win", "Clients."];

interface WordProps { word: string; delay: number; inView: boolean; }

function Word({ word, delay, inView }: WordProps) {
  const shouldReduce = useReducedMotion();
  return (
    <span className="inline-block overflow-hidden mr-[0.15em]">
      <motion.span
        className="inline-block"
        initial={shouldReduce ? {} : { y: "115%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function AnimatedHeadline({ inView }: { inView: boolean }) {
  let wordIndex = 0;
  const nextDelay = () => {
    const d = 0.1 + wordIndex * 0.1;
    wordIndex++;
    return d;
  };

  return (
    <h1 className="font-display font-bold text-white leading-none tracking-tight">
      <div className="text-[clamp(3.5rem,10vw,9rem)] flex flex-wrap">
        {LINE_1.map((word) => (
          <Word key={word} word={word} delay={nextDelay()} inView={inView} />
        ))}
      </div>
      <div className="text-[clamp(3.5rem,10vw,9rem)] flex flex-wrap">
        {LINE_2.map((word, i) => (
          <Word
            key={word}
            word={word}
            delay={nextDelay()}
            inView={inView}
          />
        )).map((el, i) =>
          i === 1
            ? <span key="accent" className="inline-block overflow-hidden mr-[0.15em]">
                <motion.span
                  className="inline-block text-accent"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: nextDelay() - 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {LINE_2[1]}
                </motion.span>
              </span>
            : el
        )}
      </div>
    </h1>
  );
}
```

- [ ] **Step 3: Hero section**

```tsx
// components/hero/Hero.tsx
"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MeshBackground } from "./MeshBackground";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const shouldReduce = useReducedMotion();
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : 120]);

  const words1 = ["Websites", "That"];
  const words2 = ["Win", "Clients."];
  let wordIndex = 0;
  const getDelay = () => { const d = 0.1 + wordIndex * 0.1; wordIndex++; return d; };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <MeshBackground />

      {/* Parallax content */}
      <motion.div
        ref={inViewRef}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24"
        style={{ y }}
      >
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="w-8 h-px bg-accent" />
          <span className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
            Web Designer & Developer
          </span>
        </motion.div>

        {/* Headline — per-word */}
        <h1 className="font-display font-bold text-white leading-none tracking-tight mb-8">
          <div className="text-[clamp(3.5rem,10vw,9rem)] flex flex-wrap">
            {words1.map((w) => {
              const d = getDelay();
              return (
                <span key={w} className="inline-block overflow-hidden mr-[0.15em]">
                  <motion.span
                    className="inline-block"
                    initial={shouldReduce ? {} : { y: "115%" }}
                    animate={inView ? { y: "0%" } : {}}
                    transition={{ duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] }}
                  >{w}</motion.span>
                </span>
              );
            })}
          </div>
          <div className="text-[clamp(3.5rem,10vw,9rem)] flex flex-wrap">
            {words2.map((w, i) => {
              const d = getDelay();
              return (
                <span key={w} className="inline-block overflow-hidden mr-[0.15em]">
                  <motion.span
                    className={`inline-block ${i === 1 ? "text-accent" : ""}`}
                    initial={shouldReduce ? {} : { y: "115%" }}
                    animate={inView ? { y: "0%" } : {}}
                    transition={{ duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] }}
                  >{w}</motion.span>
                </span>
              );
            })}
          </div>
        </h1>

        {/* Subheading */}
        <motion.p
          className="text-muted text-lg md:text-xl max-w-xl leading-relaxed mb-12"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          I build custom, conversion-focused websites that look as good as they perform — for businesses, nonprofits, and SaaS brands.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-5"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            className="px-8 py-4 bg-accent text-background font-display font-semibold rounded-full hover:bg-accent-light transition-colors text-sm tracking-wide"
            onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor="View"
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            className="px-8 py-4 border border-border text-white font-display font-medium rounded-full hover:border-accent hover:text-accent transition-colors text-sm tracking-wide"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor="hover"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/hero/
git commit -m "feat: hero section with per-word reveal, mesh canvas bg, scroll indicator"
```

---

### Task 9: Project Data & BrowserFrame

**Files:**
- Create: `lib/projects.ts`
- Create: `components/portfolio/BrowserFrame.tsx`

- [ ] **Step 1: Create lib/projects.ts**

```ts
// lib/projects.ts
export type Category = "All" | "SaaS" | "Business" | "Nonprofit";

export interface Project {
  id: string;
  num: string;
  title: string;
  url: string;
  description: string;
  category: Exclude<Category, "All">;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "omalley",
    num: "01",
    title: "O'Malley Fabrics",
    url: "https://omalleyfabrics.com/",
    description: "DMV seamstress studio with live price estimator and booking system.",
    category: "Business",
    tags: ["Booking", "Price Estimator", "Local Business"],
  },
  {
    id: "empower",
    num: "02",
    title: "Empower Estates Network",
    url: "https://empowerestatesnetwork.com/",
    description: "Real estate investment brand with conversion-focused design.",
    category: "Business",
    tags: ["Real Estate", "Investment", "Brand"],
  },
  {
    id: "arvyx",
    num: "03",
    title: "ARVYX",
    url: "https://kirans0615.github.io/ARVYX-test/",
    description: "Real estate deal-intelligence SaaS platform with dashboard UI.",
    category: "SaaS",
    tags: ["SaaS", "Dashboard", "Real Estate Tech"],
  },
  {
    id: "freight",
    num: "04",
    title: "J&A Freight Logistics",
    url: "https://kirans0615.github.io/J-A-Freight-Logistics-Mock/",
    description: "Freight & logistics company with professional brand presence.",
    category: "Business",
    tags: ["Logistics", "Freight", "B2B"],
  },
  {
    id: "ctd",
    num: "05",
    title: "CTD Entertainment",
    url: "https://kirans0615.github.io/CTD-Entertainment-Management/",
    description: "Entertainment management company with bold creative direction.",
    category: "Business",
    tags: ["Entertainment", "Management", "Creative"],
  },
  {
    id: "iam",
    num: "06",
    title: "I Am Movement",
    url: "https://kirans0615.github.io/I-Am-Movement-Mockup/",
    description: "Inspiring movement campaign with emotional storytelling design.",
    category: "Nonprofit",
    tags: ["Campaign", "Movement", "Storytelling"],
  },
  {
    id: "vts",
    num: "07",
    title: "Vanishing Twin Foundation",
    url: "https://kirans0615.github.io/International-Vanishing-Twin-Syndrome-Foundation/",
    description: "International nonprofit foundation raising awareness for VTS.",
    category: "Nonprofit",
    tags: ["Foundation", "Health", "Awareness"],
  },
  {
    id: "kenya",
    num: "08",
    title: "Early Childhood Center Kenya",
    url: "https://kirans0615.github.io/EARLY-CHILDHOOD-CTR-KENYA/",
    description: "Education nonprofit supporting early childhood development in Kenya.",
    category: "Nonprofit",
    tags: ["Education", "Africa", "Children"],
  },
];

export const CATEGORIES: Category[] = ["All", "SaaS", "Business", "Nonprofit"];
```

- [ ] **Step 2: Create BrowserFrame with iframe + screenshot fallback**

```tsx
// components/portfolio/BrowserFrame.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BrowserFrameProps {
  url: string;
  title: string;
  deviceMode: "desktop" | "mobile";
}

function getMicrolinkUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

function getThumioUrl(url: string) {
  return `https://image.thum.io/get/width/800/crop/600/${url}`;
}

export function BrowserFrame({ url, title, deviceMode }: BrowserFrameProps) {
  const [mode, setMode] = useState<"iframe" | "microlink" | "thumio" | "error">("iframe");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Reset on URL change
    setMode("iframe");
  }, [url]);

  useEffect(() => {
    if (mode !== "iframe") return;
    // Timeout fallback: if iframe doesn't load in 6s, try screenshot
    timeoutRef.current = setTimeout(() => {
      setMode("microlink");
    }, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [mode, url]);

  const handleIframeLoad = () => {
    clearTimeout(timeoutRef.current);
    // Iframe loaded successfully
  };

  const handleIframeError = () => {
    clearTimeout(timeoutRef.current);
    setMode("microlink");
  };

  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="w-full bg-surface-2 rounded-xl overflow-hidden border border-border/40">
      {/* Browser chrome */}
      <div className="bg-surface px-4 py-3 flex items-center gap-3 border-b border-border/30">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        </div>
        {/* Address bar */}
        <div className="flex-1 flex items-center gap-2 bg-background/60 rounded-md px-3 py-1">
          <svg className="w-3 h-3 text-muted-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-muted-2 text-xs truncate font-mono">{displayUrl}</span>
        </div>
      </div>

      {/* Viewport */}
      <div
        className="relative overflow-hidden bg-white transition-all duration-500"
        style={{ height: deviceMode === "mobile" ? 420 : 340 }}
      >
        {mode === "iframe" ? (
          <iframe
            ref={iframeRef}
            src={url}
            title={title}
            className="absolute top-0 left-0 w-full h-full border-0"
            style={
              deviceMode === "mobile"
                ? { width: "390px", height: "100%", transform: "scale(0.7)", transformOrigin: "top left", left: "50%", marginLeft: "-137px" }
                : { width: "100%", height: "100%", transform: "scale(0.75)", transformOrigin: "top left", width: "133.33%", height: "133.33%" }
            }
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        ) : mode === "microlink" ? (
          <img
            src={getMicrolinkUrl(url)}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover object-top"
            onError={() => setMode("thumio")}
          />
        ) : mode === "thumio" ? (
          <img
            src={getThumioUrl(url)}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover object-top"
            onError={() => setMode("error")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-2">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </div>
              <p className="text-muted text-xs">Visit the live site</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/projects.ts components/portfolio/BrowserFrame.tsx
git commit -m "feat: project data and BrowserFrame with iframe + Microlink/thumio fallback"
```

---

### Task 10: ProjectCard & DeviceToggle

**Files:**
- Create: `components/portfolio/ProjectCard.tsx`
- Create: `components/portfolio/DeviceToggle.tsx`

- [ ] **Step 1: DeviceToggle**

```tsx
// components/portfolio/DeviceToggle.tsx
"use client";

import { Monitor, Smartphone } from "lucide-react";

interface DeviceToggleProps {
  mode: "desktop" | "mobile";
  onChange: (mode: "desktop" | "mobile") => void;
}

export function DeviceToggle({ mode, onChange }: DeviceToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-surface rounded-full p-1 border border-border/40">
      {(["desktop", "mobile"] as const).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            mode === m ? "bg-accent text-background" : "text-muted hover:text-white"
          }`}
          aria-label={`${m} view`}
          data-cursor="hover"
        >
          {m === "desktop" ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: ProjectCard with 3D tilt, glow, reveal**

```tsx
// components/portfolio/ProjectCard.tsx
"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";
import { DeviceToggle } from "./DeviceToggle";
import type { Project } from "@/lib/projects";

const CATEGORY_COLORS: Record<string, string> = {
  SaaS: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Business: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Nonprofit: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const shouldReduce = useReducedMotion();
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduce) return;
    const rect = cardRef.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - centerX) / rect.width) * 12);
    rotateX.set(-((e.clientY - centerY) / rect.height) * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={shouldReduce ? {} : { y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-surface rounded-2xl overflow-hidden border border-border/40 hover:border-accent/30 transition-colors duration-500"
        data-cursor="View"
      >
        {/* Amber glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{ boxShadow: "0 0 60px rgba(245,158,11,0.12), inset 0 0 60px rgba(245,158,11,0.04)" }}
        />

        {/* Card header */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-muted-2 text-xs">{project.num}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs border ${CATEGORY_COLORS[project.category]}`}>
              {project.category}
            </span>
          </div>
          <DeviceToggle mode={deviceMode} onChange={setDeviceMode} />
        </div>

        {/* Browser frame */}
        <div className="px-5">
          <BrowserFrame url={project.url} title={project.title} deviceMode={deviceMode} />
        </div>

        {/* Card footer */}
        <div className="p-5 flex items-end justify-between">
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-1 group-hover:text-accent-light transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed max-w-xs">{project.description}</p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 ml-4 w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center text-accent hover:bg-accent hover:text-background transition-all duration-300 group/link"
            aria-label={`Visit ${project.title}`}
            data-cursor="Visit"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/portfolio/ProjectCard.tsx components/portfolio/DeviceToggle.tsx
git commit -m "feat: ProjectCard with 3D tilt/glow, DeviceToggle desktop/mobile"
```

---

### Task 11: PortfolioSection with Category Filter

**Files:**
- Create: `components/portfolio/PortfolioSection.tsx`

- [ ] **Step 1: PortfolioSection with AnimatePresence filter**

```tsx
// components/portfolio/PortfolioSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS, CATEGORIES, type Category } from "@/lib/projects";

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const shouldReduce = useReducedMotion();

  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeading label="Selected Work" title="The Portfolio" />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-background border-accent"
                  : "border-border/40 text-muted hover:text-white hover:border-accent/40"
              }`}
              data-cursor="hover"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-surface rounded-full p-1 border border-border/40">
          {([
            { mode: "grid", Icon: LayoutGrid },
            { mode: "list", Icon: List },
          ] as const).map(({ mode, Icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`p-2 rounded-full transition-all duration-200 ${
                viewMode === mode ? "bg-accent text-background" : "text-muted hover:text-white"
              }`}
              aria-label={`${mode} view`}
              data-cursor="hover"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout={!shouldReduce}
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 max-w-3xl"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout={!shouldReduce}
              initial={shouldReduce ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduce ? {} : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/portfolio/PortfolioSection.tsx
git commit -m "feat: portfolio section with animated category filter and view toggle"
```

---

### Task 12: Skills & Services Section

**Files:**
- Create: `components/skills/SkillsSection.tsx`

- [ ] **Step 1: Implement SkillsSection**

```tsx
// components/skills/SkillsSection.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Smartphone, Zap, Target, Code2, Send, CalendarCheck, Palette, Globe
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const SKILLS = [
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Pixel-perfect across every device — from iPhone SE to 4K display.",
    stat: "100%",
    statLabel: "device coverage",
  },
  {
    icon: Zap,
    title: "Framer Motion Animation",
    description: "Buttery smooth, purposeful animation that elevates user experience.",
    stat: "60fps",
    statLabel: "animation target",
  },
  {
    icon: Target,
    title: "Conversion-Focused UI",
    description: "Every element designed to guide visitors toward taking action.",
    stat: "8+",
    statLabel: "projects delivered",
  },
  {
    icon: Code2,
    title: "Custom Front-End Builds",
    description: "Next.js, TypeScript, and Tailwind — no page builders, no compromise.",
    stat: "0",
    statLabel: "templates used",
  },
  {
    icon: Send,
    title: "Netlify Forms",
    description: "Seamless contact and lead capture forms — no backend required.",
    stat: "< 1s",
    statLabel: "form response",
  },
  {
    icon: CalendarCheck,
    title: "Calendly Integration",
    description: "Embedded booking flows that convert visitors to scheduled calls.",
    stat: "3+",
    statLabel: "clients booked",
  },
  {
    icon: Palette,
    title: "Brand-Consistent UI",
    description: "Every color, font, and pixel aligned with your brand identity.",
    stat: "∞",
    statLabel: "revisions offered",
  },
  {
    icon: Globe,
    title: "Deploy & Launch",
    description: "From localhost to live — Netlify, Vercel, and GitHub Pages deploys.",
    stat: "< 24h",
    statLabel: "avg. deploy time",
  },
];

export function SkillsSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="skills" className="py-32 bg-surface/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Capabilities" title="Skills & Services" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.title}
                initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={shouldReduce ? {} : { y: -6, transition: { duration: 0.3 } }}
                className="group relative bg-surface rounded-2xl p-6 border border-border/40 hover:border-accent/30 transition-colors duration-500 overflow-hidden"
                data-cursor="hover"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 70%)" }}
                />

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-base mb-2 group-hover:text-accent-light transition-colors duration-300">
                    {skill.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-5">{skill.description}</p>
                  <div className="pt-4 border-t border-border/30">
                    <div className="font-display font-bold text-2xl text-accent">{skill.stat}</div>
                    <div className="text-muted-2 text-xs uppercase tracking-wide mt-0.5">{skill.statLabel}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/skills/SkillsSection.tsx
git commit -m "feat: skills & services section with animated flip cards and stat callouts"
```

---

### Task 13: About Section

**Files:**
- Create: `components/about/AboutSection.tsx`

- [ ] **Step 1: Implement AboutSection**

```tsx
// components/about/AboutSection.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CountUpStat } from "@/components/shared/CountUpStat";
import { RevealText } from "@/components/shared/RevealText";

const STATS = [
  { end: 8, suffix: "", label: "Projects Delivered" },
  { end: 3, suffix: "+", label: "Years Experience" },
  { end: 100, suffix: "%", label: "Client Satisfaction" },
  { end: 3, suffix: "", label: "Nonprofit Sites Built" },
];

const BIO_LINES = [
  "I'm Kiran Sen, a web designer and developer based in Washington, D.C., building custom digital experiences for businesses, nonprofits, and SaaS brands.",
  "My work lives at the intersection of design and engineering — every project I ship is handcrafted in Next.js and Tailwind, animated with Framer Motion, and optimized to convert visitors into clients.",
  "From local DMV businesses to international nonprofits, I build sites that look expensive, load fast, and actually work.",
];

export function AboutSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeading label="The Designer" title="About Kiran" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Portrait placeholder */}
        <motion.div
          className="relative"
          initial={shouldReduce ? {} : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-border/40">
            {/* Amber gradient portrait placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-surface to-amber-800/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-4xl text-accent">KS</span>
                </div>
                <p className="text-muted text-sm">Portrait coming soon</p>
              </div>
            </div>
            {/* Decorative corner accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-4 -right-4 bg-accent text-background rounded-2xl px-5 py-4 shadow-lg shadow-amber-500/20"
            initial={shouldReduce ? {} : { scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <div className="font-display font-bold text-2xl">GWU</div>
            <div className="text-background/70 text-xs font-medium">Washington, D.C.</div>
          </motion.div>
        </motion.div>

        {/* Bio + stats */}
        <div className="flex flex-col gap-8">
          <div className="space-y-5">
            {BIO_LINES.map((line, i) => (
              <RevealText
                key={i}
                text={line}
                className="text-muted leading-relaxed text-base"
                delay={i * 0.1}
                stagger={0.02}
              />
            ))}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border/40">
            {STATS.map((stat) => (
              <CountUpStat
                key={stat.label}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/about/AboutSection.tsx
git commit -m "feat: about section with portrait placeholder, bio reveal, count-up stats"
```

---

### Task 14: Contact Section

**Files:**
- Create: `components/contact/ContactSection.tsx`

- [ ] **Step 1: ContactSection with Netlify Forms + floating labels**

```tsx
// components/contact/ContactSection.tsx
"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

function FloatingInput({
  id, label, type = "text", required = false,
  value, onChange, rows,
}: {
  id: string; label: string; type?: string; required?: boolean;
  value: string; onChange: (v: string) => void; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const commonClass = `w-full bg-transparent border-b border-border/40 pt-6 pb-2 text-white text-sm outline-none transition-colors duration-300 resize-none peer ${
    focused ? "border-accent" : "hover:border-muted"
  }`;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 text-sm transition-all duration-300 pointer-events-none ${
          isActive ? "top-0 text-accent text-xs tracking-wider" : "top-6 text-muted"
        }`}
      >
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={commonClass}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={commonClass}
        />
      )}
      {/* Underline animation */}
      <div
        className="absolute bottom-0 left-0 h-px bg-accent transition-all duration-500"
        style={{ width: focused ? "100%" : "0%" }}
      />
    </div>
  );
}

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/Kirans0615" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/kiran-sen" },
  { icon: Mail, label: "Email", href: "mailto:alemarraa@gmail.com" },
];

export function ContactSection() {
  const shouldReduce = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          name, email, message,
        }).toString(),
      });

      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        // Fallback: open mailto
        window.location.href = `mailto:alemarraa@gmail.com?subject=Portfolio Inquiry from ${name}&body=${encodeURIComponent(message)}`;
        setStatus("idle");
      }
    } catch {
      window.location.href = `mailto:alemarraa@gmail.com?subject=Portfolio Inquiry from ${name}&body=${encodeURIComponent(message)}`;
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="py-32 bg-surface/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Get In Touch" title="Let's Work Together" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: copy + socials */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted text-lg leading-relaxed mb-10 max-w-sm">
              Have a project in mind? I'd love to hear about it. Send me a message and let's discuss what we can build together.
            </p>
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:alemarraa@gmail.com" className="text-white hover:text-accent transition-colors text-sm" data-cursor="hover">
                  alemarraa@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-300"
                  data-cursor="hover"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-muted">I'll get back to you within 24 hours.</p>
                <button
                  className="mt-8 text-accent text-sm hover:underline"
                  onClick={() => setStatus("idle")}
                  data-cursor="hover"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="hidden">
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </div>

                <FloatingInput id="name" label="Your Name" required value={name} onChange={setName} />
                <FloatingInput id="email" label="Email Address" type="email" required value={email} onChange={setEmail} />
                <FloatingInput id="message" label="Tell me about your project" required value={message} onChange={setMessage} rows={4} />

                <MagneticButton
                  type="submit"
                  className="w-full py-4 bg-accent text-background font-display font-semibold rounded-full hover:bg-accent-light transition-colors text-sm tracking-wide disabled:opacity-60"
                  data-cursor="hover"
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/contact/ContactSection.tsx
git commit -m "feat: contact section with Netlify Forms, floating labels, social links"
```

---

### Task 15: Footer

**Files:**
- Create: `components/footer/Footer.tsx`

- [ ] **Step 1: Implement Footer**

```tsx
// components/footer/Footer.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const shouldReduce = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduce ? "auto" : "smooth" });
  };

  const letters = "Kiran Sen".split("");

  return (
    <footer className="py-20 px-6 border-t border-border/40 relative overflow-hidden">
      {/* Big name reveal */}
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="overflow-hidden mb-12">
          <div className="flex flex-wrap font-display font-bold text-[clamp(3rem,12vw,10rem)] leading-none text-white/5 select-none">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={shouldReduce ? {} : { y: "100%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-muted-2 text-sm">
            © {new Date().getFullYear()} Kiran Sen. Built with Next.js & Framer Motion.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm group"
            data-cursor="hover"
            aria-label="Back to top"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center group-hover:border-accent/40 group-hover:text-accent transition-all duration-300">
              <ArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl bg-accent/5 pointer-events-none" />
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/footer/Footer.tsx
git commit -m "feat: footer with per-letter name reveal and back-to-top"
```

---

### Task 16: Main Page Composition & Final Wiring

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Compose all sections in app/page.tsx**

```tsx
// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/preloader/Preloader";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/hero/Hero";
import { MarqueeTicker } from "@/components/shared/MarqueeTicker";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: "opacity 0.5s ease",
          visibility: preloaderDone ? "visible" : "hidden",
        }}
      >
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <MarqueeTicker />
          <PortfolioSection />
          <SkillsSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose full single-page portfolio with preloader gate"
```

---

### Task 17: Build Verification & Polish

**Files:**
- Modify: various (fix any type errors, add missing aria labels)

- [ ] **Step 1: Run type check**

```bash
cd /Users/kiransen/portfolio && npx tsc --noEmit
```

- [ ] **Step 2: Fix any TypeScript errors found**

- [ ] **Step 3: Run production build**

```bash
npm run build
```
Expected: Exit 0, no errors.

- [ ] **Step 4: Run dev server and verify in browser**

```bash
npm run dev
```
Open http://localhost:3000 and confirm:
- Preloader shows and dismisses
- Hero headline animates
- Portfolio grid loads with browser frames
- Category filter works
- Contact form fields animate on focus
- No console errors

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: production-ready Kiran Sen portfolio — verified build + dev"
```

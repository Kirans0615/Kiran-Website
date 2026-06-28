"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MeshBackground } from "./MeshBackground";
import { FloatingCode } from "./FloatingCode";
import { TextScramble } from "./TextScramble";
import { SkillTypewriter } from "./SkillTypewriter";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { ChevronDown } from "lucide-react";

const TECH_PILLS = ["Next.js 16", "TypeScript", "Tailwind v4", "Framer Motion", "Lenis"];

const HEADLINE_WORDS = [
  { word: "Websites", accent: false },
  { word: "That",     accent: false },
  { word: "Win",      accent: false },
  { word: "Clients.", accent: true  },
];

function PerspectiveGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "320px",
        overflow: "hidden",
        pointerEvents: "none",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        {[0.1, 0.2, 0.3, 0.4, 0.55, 0.7, 0.85, 1].map((t, i) => {
          const y = 320 * (1 - Math.pow(1 - t, 2));
          const xLeft  = 720 - 720 * t;
          const xRight = 720 + 720 * t;
          return (
            <line key={`h${i}`} x1={xLeft} y1={y} x2={xRight} y2={y}
              stroke="rgba(19,41,75,0.07)" strokeWidth={0.5} />
          );
        })}
        {[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6].map((n, i) => (
          <line key={`v${i}`} x1={720} y1={0} x2={720 + n * 120} y2={320}
            stroke="rgba(19,41,75,0.04)" strokeWidth={0.5} />
        ))}
        <ellipse cx="720" cy="0" rx="340" ry="18" fill="rgba(200,144,42,0.04)" />
      </svg>
    </div>
  );
}

export function Hero() {
  const shouldReduce = useReducedMotion();
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, shouldReduce ? 0 : 100]);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth" });

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", background: "#EDE8DF" }}
    >
      <MeshBackground />

      {/* Dot-grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(19,41,75,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      <FloatingCode />
      <PerspectiveGrid />

      {/* Main content — responsive padding replaces 9rem fixed */}
      <motion.div
        ref={inViewRef}
        className="relative z-10 w-full max-w-[1280px] mx-auto
                   pt-24 pb-16 px-5
                   sm:pt-32 sm:pb-20 sm:px-6
                   md:pt-36 md:pb-24"
        style={{ y: parallaxY }}
      >
        {/* Terminal label */}
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28CA41", display: "inline-block" }} />
          </span>
          <span style={{ width: "1px", height: "20px", background: "rgba(200,144,42,0.4)" }} />
          <TextScramble
            text="Web Designer & Developer"
            delay={0.3}
            style={{ color: "#A8761F", fontSize: "0.75rem", letterSpacing: "0.22em", textTransform: "uppercase" }}
          />
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display font-bold"
          style={{ fontSize: "clamp(2.6rem, 9.5vw, 9rem)", lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "1.25rem", color: "#13294B" }}
        >
          {HEADLINE_WORDS.map(({ word, accent }, i) => (
            <span key={word} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.15em" }}>
              <motion.span
                style={{ display: "inline-block", color: accent ? "#C8902A" : "#13294B" }}
                initial={shouldReduce ? {} : { y: "115%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.95, delay: 0.15 + i * 0.11, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Typewriter */}
        <motion.div
          style={{ marginBottom: "1.25rem" }}
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <SkillTypewriter />
        </motion.div>

        {/* Sub copy */}
        <motion.p
          style={{ color: "#4A5568", fontSize: "1rem", lineHeight: 1.7, maxWidth: "480px", marginBottom: "2rem" }}
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          I build custom, conversion-focused websites that look as good as they perform — for businesses, nonprofits, and SaaS brands.
        </motion.p>

        {/* Tech pills */}
        <motion.div
          style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2rem" }}
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {TECH_PILLS.map((pill, i) => (
            <motion.span
              key={pill}
              style={{
                padding: "4px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(19,41,75,0.18)",
                background: "rgba(19,41,75,0.05)",
                color: "#4A5568",
                fontSize: "11px",
                letterSpacing: "0.08em",
                fontFamily: "monospace",
              }}
              initial={shouldReduce ? {} : { opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduce ? {} : { borderColor: "rgba(200,144,42,0.5)", color: "#A8761F", y: -2, transition: { duration: 0.2 } }}
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            onClick={() => scrollTo("#portfolio")}
            data-cursor="View"
            className="font-display font-semibold rounded-full text-sm tracking-wide"
            style={{ padding: "13px 28px", backgroundColor: "#13294B", color: "#EDE8DF", boxShadow: "0 4px 24px rgba(19,41,75,0.2)" }}
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("#contact")}
            data-cursor="hover"
            className="font-display font-medium rounded-full text-sm tracking-wide"
            style={{ padding: "13px 28px", border: "1px solid rgba(19,41,75,0.3)", color: "#13294B" }}
          >
            Get in Touch
          </MagneticButton>

          {/* Available indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span
              style={{
                width: "8px", height: "8px", borderRadius: "50%", background: "#10b981",
                display: "inline-block", boxShadow: "0 0 10px rgba(16,185,129,0.6)",
                animation: "pulse-dot 2s infinite",
              }}
            />
            <span style={{ color: "#4A5568", fontSize: "12px" }}>Available for projects</span>
          </div>
        </motion.div>

        {/* Stats strip — responsive gap and margin */}
        <motion.div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(20px, 5vw, 40px)",
            marginTop: "clamp(36px, 6vw, 72px)",
            paddingTop: "clamp(20px, 4vw, 40px)",
            borderTop: "1px solid rgba(19,41,75,0.1)",
          }}
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {[
            { n: "8+",   label: "Projects Delivered" },
            { n: "3+",   label: "Years Experience"   },
            { n: "100%", label: "Client Satisfaction" },
            { n: "0",    label: "Templates Used"     },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="font-display font-bold" style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", lineHeight: 1, color: "#13294B" }}>{n}</div>
              <div style={{ color: "#6B7280", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "4px" }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: "#6B7280", zIndex: 10 }}
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase" }}>Scroll</span>
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown style={{ width: "14px", height: "14px", color: "#C8902A" }} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(0.8); }
        }
      `}</style>
    </section>
  );
}

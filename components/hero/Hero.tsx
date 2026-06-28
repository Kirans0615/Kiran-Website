"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MeshBackground } from "./MeshBackground";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { ChevronDown } from "lucide-react";

const HEADLINE_WORDS = [
  { word: "Websites", accent: false },
  { word: "That",     accent: false },
  { word: "Win",      accent: false },
  { word: "Clients.", accent: true  },
];

export function Hero() {
  const shouldReduce            = useReducedMotion();
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const sectionRef              = useRef<HTMLElement>(null);
  const { scrollY }             = useScroll();
  const parallaxY               = useTransform(scrollY, [0, 700], [0, shouldReduce ? 0 : 100]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <MeshBackground />

      {/* Grid lines decorative */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(245,158,11,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        ref={inViewRef}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-28 w-full"
        style={{ y: parallaxY }}
      >
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ width: "2rem", height: "1px", backgroundColor: "#F59E0B", display: "block" }} />
          <span
            className="font-medium"
            style={{ color: "#F59E0B", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
          >
            Web Designer & Developer
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display font-bold text-white leading-none tracking-tight mb-8"
          style={{ fontSize: "clamp(3.2rem, 9.5vw, 9rem)" }}
        >
          <div className="flex flex-wrap">
            {HEADLINE_WORDS.map(({ word, accent }, i) => (
              <span
                key={word}
                style={{ display: "inline-block", overflow: "hidden", marginRight: "0.18em" }}
              >
                <motion.span
                  className="inline-block"
                  style={{ color: accent ? "#F59E0B" : "#fff" }}
                  initial={shouldReduce ? {} : { y: "115%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    duration: 0.95,
                    delay: 0.12 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </h1>

        {/* Sub */}
        <motion.p
          className="text-muted leading-relaxed mb-14 max-w-lg"
          style={{ fontSize: "1.1rem" }}
          initial={shouldReduce ? {} : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          I build custom, conversion-focused websites that look as good as they perform — for businesses, nonprofits, and SaaS brands.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-5"
          initial={shouldReduce ? {} : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            onClick={() => scrollTo("#portfolio")}
            data-cursor="View"
            className="px-8 py-4 font-display font-semibold rounded-full text-sm tracking-wide transition-colors duration-300"
            style={{ backgroundColor: "#F59E0B", color: "#0A0906" }}
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("#contact")}
            data-cursor="hover"
            className="px-8 py-4 font-display font-medium rounded-full text-sm tracking-wide transition-all duration-300"
            style={{ border: "1px solid rgba(245,158,11,0.3)", color: "#fff" }}
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="flex flex-wrap gap-10 mt-20 pt-10"
          style={{ borderTop: "1px solid rgba(245,158,11,0.1)" }}
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          {[
            { n: "8+", label: "Projects Delivered" },
            { n: "3+", label: "Years Experience" },
            { n: "100%", label: "Client Satisfaction" },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="font-display font-bold text-white text-2xl">{n}</div>
              <div style={{ color: "#6B5F4A", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "2px" }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: "translateX(-50%)", color: "#6B5F4A" }}
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.3 }}
      >
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown style={{ width: "1rem", height: "1rem", color: "#F59E0B" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

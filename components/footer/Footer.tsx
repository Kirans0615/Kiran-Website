"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUp } from "lucide-react";

const LETTERS = "Kiran Sen".split("");

export function Footer() {
  const shouldReduce = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduce ? "auto" : "smooth" });
  };

  return (
    <footer
      ref={ref}
      style={{
        padding: "5rem 1.5rem 3rem",
        borderTop: "1px solid rgba(245,158,11,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(245,158,11,0.04)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto" style={{ position: "relative" }}>
        {/* Big name */}
        <div style={{ overflow: "hidden", marginBottom: "40px" }}>
          <div
            className="font-display font-bold"
            style={{
              fontSize: "clamp(3rem, 13vw, 11rem)",
              lineHeight: 0.85,
              color: "rgba(255,255,255,0.04)",
              display: "flex",
              flexWrap: "wrap",
              userSelect: "none",
            }}
          >
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={shouldReduce ? {} : { y: "100%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  duration: 0.85,
                  delay: i * 0.045,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ display: "inline-block" }}
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <p style={{ color: "#6B5F4A", fontSize: "12px", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Kiran Sen. Built with Next.js & Framer Motion.
          </p>

          <button
            onClick={scrollToTop}
            data-cursor="hover"
            aria-label="Back to top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#A8956E",
              background: "none",
              border: "none",
              fontSize: "12px",
              cursor: "none",
              transition: "color 0.3s",
            }}
          >
            Back to top
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid rgba(245,158,11,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowUp style={{ width: "12px", height: "12px" }} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

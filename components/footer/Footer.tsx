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
      className="pt-16 pb-10 px-5 md:pt-20 md:pb-12 md:px-6"
      style={{
        background: "#13294B",
        borderTop: "none",
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
          background: "rgba(200,144,42,0.06)",
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
              color: "rgba(255,255,255,0.05)",
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
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p style={{ color: "rgba(250,248,244,0.45)", fontSize: "12px", letterSpacing: "0.05em" }}>
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
              color: "rgba(250,248,244,0.6)",
              background: "none",
              border: "none",
              fontSize: "12px",
              transition: "color 0.3s",
            }}
          >
            Back to top
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid rgba(200,144,42,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C8902A",
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

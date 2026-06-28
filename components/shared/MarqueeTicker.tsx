"use client";

import { useReducedMotion } from "framer-motion";

const SKILLS = [
  "Next.js", "Framer Motion", "TypeScript", "Tailwind CSS",
  "Responsive Design", "Animation", "Netlify", "Calendly Integration",
  "Conversion-Focused UI", "Brand-Consistent Design", "SaaS Landing Pages",
  "Custom Front-End", "Lenis Scroll", "React", "UI/UX Design",
];

export function MarqueeTicker() {
  const shouldReduce = useReducedMotion();
  const items = [...SKILLS, ...SKILLS];

  return (
    <div
      className="overflow-hidden py-6 border-y border-border/10"
      style={{ borderColor: "rgba(245,158,11,0.1)" }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          whiteSpace: "nowrap",
          width: "max-content",
          animation: shouldReduce ? "none" : "marquee 30s linear infinite",
        }}
      >
        {items.map((skill, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2rem",
              color: "#A8956E",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {skill}
            <span style={{ color: "#F59E0B", fontSize: "1rem" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

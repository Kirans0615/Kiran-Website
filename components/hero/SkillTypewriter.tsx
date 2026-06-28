"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SKILLS = [
  "Framer Motion Animation",
  "Next.js & TypeScript",
  "Conversion-Focused Landing Pages",
  "Responsive Design Systems",
  "Custom SaaS Interfaces",
  "Lenis Smooth Scroll",
  "Netlify & GitHub Pages Deploys",
  "Brand-Consistent UI",
];

export function SkillTypewriter() {
  const shouldReduce = useReducedMotion();
  const [skillIndex, setSkillIndex] = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [deleting, setDeleting]     = useState(false);
  const [displayed, setDisplayed]   = useState("");

  useEffect(() => {
    if (shouldReduce) { setDisplayed(SKILLS[0]); return; }

    const skill = SKILLS[skillIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIndex < skill.length) {
        timeout = setTimeout(() => {
          setDisplayed(skill.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 45);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayed(skill.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 22);
      } else {
        setDeleting(false);
        setSkillIndex((i) => (i + 1) % SKILLS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, skillIndex, shouldReduce]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "0.9rem",
        color: "#4A5568",
        minHeight: "1.4em",
      }}
    >
      <span style={{ color: "#C8902A", fontFamily: "monospace", fontSize: "1rem" }}>→</span>
      <span style={{ color: "#13294B", fontWeight: 500 }}>{displayed}</span>
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          backgroundColor: "#C8902A",
          animation: "blink 1s step-end infinite",
          verticalAlign: "middle",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Smartphone, Zap, Target, Code2, Send, CalendarCheck, Palette, Globe,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const SKILLS = [
  { Icon: Smartphone,    title: "Responsive Design",          desc: "Pixel-perfect across every device — from iPhone SE to 4K display.",              stat: "100%",  statLabel: "device coverage"    },
  { Icon: Zap,          title: "Framer Motion Animation",     desc: "Buttery smooth, purposeful animation that elevates user experience.",             stat: "60fps", statLabel: "animation target"   },
  { Icon: Target,       title: "Conversion-Focused UI",       desc: "Every element designed to guide visitors toward taking action.",                  stat: "8+",   statLabel: "projects delivered" },
  { Icon: Code2,        title: "Custom Front-End Builds",     desc: "Next.js, TypeScript, Tailwind — no page builders, no compromise.",                stat: "0",    statLabel: "templates used"     },
  { Icon: Send,         title: "Netlify Forms",               desc: "Seamless contact and lead capture forms — no backend required.",                  stat: "< 1s", statLabel: "form response"      },
  { Icon: CalendarCheck,title: "Calendly Integration",        desc: "Embedded booking flows that convert visitors to scheduled calls.",                stat: "3+",   statLabel: "clients booked"     },
  { Icon: Palette,      title: "Brand-Consistent UI",         desc: "Every color, font, and pixel aligned with your brand identity.",                  stat: "∞",    statLabel: "revisions offered"  },
  { Icon: Globe,        title: "Deploy & Launch",             desc: "From localhost to live — Netlify, Vercel, and GitHub Pages deploys.",             stat: "< 24h",statLabel: "avg. deploy time"   },
];

function SkillCard({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();
  const { Icon, title, desc, stat, statLabel } = skill;

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      style={{
        position: "relative",
        background: "#141210",
        borderRadius: "20px",
        padding: "24px",
        border: `1px solid ${hovered ? "rgba(245,158,11,0.25)" : "rgba(245,158,11,0.08)"}`,
        overflow: "hidden",
        transform: shouldReduce ? "none" : hovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "transform 0.3s ease, border-color 0.4s ease",
      }}
    >
      {/* Hover radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s",
          background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.09) 0%, transparent 70%)",
        }}
      />

      <div style={{ position: "relative" }}>
        {/* Icon */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            background: hovered ? "rgba(245,158,11,0.2)" : "rgba(245,158,11,0.1)",
            transition: "background 0.3s",
          }}
        >
          <Icon style={{ width: "18px", height: "18px", color: "#F59E0B" }} />
        </div>

        {/* Title */}
        <h3
          className="font-display font-semibold"
          style={{
            color: hovered ? "#FBBF24" : "#ffffff",
            fontSize: "1rem",
            marginBottom: "8px",
            transition: "color 0.3s",
          }}
        >
          {title}
        </h3>

        {/* Desc */}
        <p style={{ color: "#A8956E", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "20px" }}>
          {desc}
        </p>

        {/* Stat */}
        <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(245,158,11,0.08)" }}>
          <div className="font-display font-bold" style={{ fontSize: "1.6rem", color: "#F59E0B" }}>
            {stat}
          </div>
          <div style={{ color: "#6B5F4A", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "2px" }}>
            {statLabel}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" style={{ padding: "8rem 1.5rem", background: "rgba(20,18,16,0.5)" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="Capabilities" title="Skills & Services" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "20px",
          }}
        >
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

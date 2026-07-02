"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";
import { DeviceToggle } from "./DeviceToggle";
import type { Project } from "@/lib/projects";

const CAT_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  SaaS:      { bg: "rgba(19,41,75,0.08)",  color: "#13294B",  border: "rgba(19,41,75,0.2)"   },
  Business:  { bg: "rgba(200,144,42,0.1)", color: "#A8761F",  border: "rgba(200,144,42,0.3)" },
  Nonprofit: { bg: "rgba(16,185,129,0.1)", color: "#0d7a5f",  border: "rgba(16,185,129,0.3)" },
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shouldReduce              = useReducedMotion();
  const [device, setDevice]       = useState<"desktop" | "mobile">("desktop");
  const cardRef                   = useRef<HTMLDivElement>(null);
  const [hovered, setHovered]     = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 100, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 100, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (shouldReduce || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    rotY.set(((e.clientX - r.left - r.width  / 2) / r.width)  * 8);
    rotX.set(-((e.clientY - r.top  - r.height / 2) / r.height) * 8);
  };

  const onLeave = () => { rotX.set(0); rotY.set(0); setHovered(false); };

  const cat = CAT_STYLES[project.category] ?? CAT_STYLES.Business;

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 50, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: sRotX,
          rotateY: sRotY,
          transformStyle: "preserve-3d" as const,
          background: "#FFFFFF",
          borderColor: hovered ? "rgba(200,144,42,0.35)" : "#D9D0C3",
        }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        whileHover={shouldReduce ? {} : { y: -8 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-2xl overflow-hidden border transition-colors duration-500"
        data-cursor="View"
      >
        {/* Hover shadow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s",
            boxShadow: "0 16px 48px rgba(19,41,75,0.1), inset 0 0 0 1px rgba(200,144,42,0.12)",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            background: "#EDE8DF",
            borderBottom: "1px solid #D9D0C3",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#6B7280" }}>
              {project.num}
            </span>
            <span
              style={{
                padding: "2px 10px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 500,
                background: cat.bg,
                color: cat.color,
                border: `1px solid ${cat.border}`,
              }}
            >
              {project.category}
            </span>
          </div>
          <DeviceToggle mode={device} onChange={setDevice} />
        </div>

        {/* Browser frame */}
        <div style={{ padding: "0 16px", background: "#E5DDD0" }}>
          <BrowserFrame url={project.url} title={project.title} deviceMode={device} embed={project.embed} />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "16px 20px 20px",
            background: "#FFFFFF",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              className="font-display font-semibold"
              style={{
                color: hovered ? "#C8902A" : "#13294B",
                fontSize: "1.1rem",
                marginBottom: "4px",
                transition: "color 0.3s",
              }}
            >
              {project.title}
            </h3>
            <p style={{ color: "#4A5568", fontSize: "0.82rem", lineHeight: 1.5 }}>
              {project.description}
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
              {project.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "10px",
                    color: "#4A5568",
                    border: "1px solid #D9D0C3",
                    borderRadius: "4px",
                    padding: "1px 6px",
                    background: "#EDE8DF",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Visit ${project.title}`}
            data-cursor="Visit"
            style={{
              flexShrink: 0,
              marginLeft: "16px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid rgba(200,144,42,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C8902A",
              transition: "all 0.3s",
              textDecoration: "none",
              background: "rgba(200,144,42,0.06)",
            }}
          >
            <ExternalLink style={{ width: "15px", height: "15px" }} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

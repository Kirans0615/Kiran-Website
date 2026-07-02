"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS, CATEGORIES, type Category } from "@/lib/projects";

export function PortfolioSection() {
  const [cat, setCat]   = useState<Category>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const shouldReduce    = useReducedMotion();

  const filtered = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  return (
    <section id="portfolio" className="py-16 md:py-28 lg:py-32 px-5 md:px-6" style={{ background: "#EDE8DF" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="Selected Work" title="The Portfolio" />

        {/* Controls */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {/* Filter pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {CATEGORIES.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  data-cursor="hover"
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 500,
                    border: "1px solid",
                    transition: "all 0.3s",
                    background: active ? "#13294B" : "transparent",
                    color: active ? "#EDE8DF" : "#4A5568",
                    borderColor: active ? "#13294B" : "#D9D0C3",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* View toggle */}
          <div
            style={{
              display: "flex",
              gap: "2px",
              background: "#D9D0C3",
              borderRadius: "999px",
              padding: "3px",
              border: "1px solid #D9D0C3",
            }}
          >
            {([
              { m: "grid" as const, Icon: LayoutGrid },
              { m: "list" as const, Icon: List },
            ]).map(({ m, Icon }) => {
              const active = view === m;
              return (
                <button
                  key={m}
                  onClick={() => setView(m)}
                  aria-label={`${m} view`}
                  data-cursor="hover"
                  style={{
                    padding: "6px 8px",
                    borderRadius: "999px",
                    border: "none",
                    background: active ? "#13294B" : "transparent",
                    color: active ? "#EDE8DF" : "#4A5568",
                    transition: "all 0.2s",
                    display: "flex",
                  }}
                >
                  <Icon style={{ width: "14px", height: "14px" }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout={!shouldReduce}
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: view === "grid" ? "repeat(auto-fill, minmax(min(100%, 520px), 1fr))" : "1fr",
            maxWidth: view === "list" ? "760px" : undefined,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout={!shouldReduce}
                initial={shouldReduce ? {} : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduce ? {} : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

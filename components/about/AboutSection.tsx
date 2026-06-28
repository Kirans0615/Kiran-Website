"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CountUpStat } from "@/components/shared/CountUpStat";
import { RevealText } from "@/components/shared/RevealText";

const STATS = [
  { end: 8,   suffix: "",   label: "Projects Delivered"   },
  { end: 3,   suffix: "+",  label: "Years Experience"     },
  { end: 100, suffix: "%",  label: "Client Satisfaction"  },
  { end: 3,   suffix: "",   label: "Nonprofit Sites Built" },
];

const BIO = [
  "I'm Kiran Sen, a web designer and developer based in Washington, D.C., building custom digital experiences for businesses, nonprofits, and SaaS brands.",
  "My work lives at the intersection of design and engineering — every project I ship is handcrafted in Next.js and Tailwind, animated with Framer Motion, and optimized to convert visitors into clients.",
  "From local DMV businesses to international nonprofits, I build sites that look expensive, load fast, and actually work.",
];

export function AboutSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" style={{ padding: "8rem 1.5rem" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="The Designer" title="About Kiran" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Portrait */}
          <motion.div
            style={{ position: "relative" }}
            initial={shouldReduce ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "20px",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(120,70,20,0.3) 0%, #141210 50%, rgba(100,60,10,0.2) 100%)",
                border: "1px solid rgba(245,158,11,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    background: "rgba(245,158,11,0.15)",
                    border: "2px solid rgba(245,158,11,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: "2.5rem", color: "#F59E0B" }}
                  >
                    KS
                  </span>
                </div>
                <p style={{ color: "#6B5F4A", fontSize: "12px", letterSpacing: "0.1em" }}>
                  Portrait coming soon
                </p>
              </div>

              {/* Bottom gradient */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  background: "linear-gradient(to top, rgba(10,9,6,0.5), transparent)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* GWU badge */}
            <motion.div
              style={{
                position: "absolute",
                bottom: "-16px",
                right: "-16px",
                background: "#F59E0B",
                color: "#0A0906",
                borderRadius: "16px",
                padding: "12px 20px",
                boxShadow: "0 8px 32px rgba(245,158,11,0.25)",
              }}
              initial={shouldReduce ? {} : { scale: 0, rotate: -12 }}
              whileInView={{ scale: 1, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <div className="font-display font-bold" style={{ fontSize: "1.4rem" }}>GWU</div>
              <div style={{ fontSize: "10px", fontWeight: 500, opacity: 0.7, marginTop: "2px" }}>
                Washington, D.C.
              </div>
            </motion.div>
          </motion.div>

          {/* Bio + stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {BIO.map((line, i) => (
                <RevealText
                  key={i}
                  text={line}
                  as="p"
                  className="text-muted leading-relaxed"
                  style={{ fontSize: "0.97rem" }}
                  delay={i * 0.12}
                  stagger={0.022}
                />
              ))}
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px",
                paddingTop: "28px",
                borderTop: "1px solid rgba(245,158,11,0.1)",
              }}
            >
              {STATS.map((s) => (
                <CountUpStat key={s.label} end={s.end} suffix={s.suffix} label={s.label} />
              ))}
            </div>

            {/* Availability pill */}
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              initial={shouldReduce ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                  display: "inline-block",
                  boxShadow: "0 0 8px rgba(16,185,129,0.6)",
                  animation: "pulse 2s infinite",
                }}
              />
              <span style={{ color: "#A8956E", fontSize: "0.82rem" }}>
                Available for new projects
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

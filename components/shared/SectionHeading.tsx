"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionHeadingProps {
  label: string;
  title: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ label, title, className = "", light = false }: SectionHeadingProps) {
  const shouldReduce = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className={`mb-16 ${className}`}>
      <motion.span
        className="text-sm font-medium tracking-[0.22em] uppercase block mb-5"
        style={{ color: "#A8761F" }}
        initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
      <div style={{ overflow: "hidden" }}>
        <motion.h2
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          style={{ color: light ? "#FAF8F4" : "#13294B" }}
          initial={shouldReduce ? {} : { y: "100%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}

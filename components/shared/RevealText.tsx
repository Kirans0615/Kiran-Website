"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface RevealTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  as?: Tag;
}

export function RevealText({
  text,
  className = "",
  style,
  delay = 0,
  stagger = 0.04,
  as: Tag = "p",
}: RevealTextProps) {
  const shouldReduce = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  if (shouldReduce) return <Tag className={className} style={style}>{text}</Tag>;

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} style={{ display: "block", ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

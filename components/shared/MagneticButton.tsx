"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "data-cursor"?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className = "",
  style,
  strength = 0.35,
  onClick,
  type = "button",
  disabled,
  "data-cursor": dataCursor,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shouldReduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });

  const onMove = (e: React.MouseEvent) => {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
      data-cursor={dataCursor ?? "hover"}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

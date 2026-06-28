"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function TextScramble({ text, className = "", style, delay = 0 }: TextScrambleProps) {
  const [display, setDisplay] = useState("");
  const shouldReduce = useReducedMotion();
  const frameRef = useRef(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldReduce) { setDisplay(text); return; }

    const startTime = Date.now() + delay * 1000;
    let frame = 0;

    const tick = () => {
      const now = Date.now();
      if (now < startTime) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      frame++;
      const progress = Math.min(frame / (text.length * 3), 1);
      const revealCount = Math.floor(progress * text.length);

      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") { result += " "; continue; }
        if (i < revealCount) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [text, delay, shouldReduce]);

  return (
    <span className={className} style={{ fontFamily: "monospace", ...style }}>
      {shouldReduce ? text : display}
    </span>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";

interface CountUpStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export function CountUpStat({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 1800,
}: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const shouldReduce = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    if (shouldReduce) { setCount(end); return; }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * end));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration, shouldReduce]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold mb-2" style={{ color: "#13294B" }}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs tracking-widest uppercase" style={{ color: "#4A5568" }}>{label}</div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const shouldReduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 30 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 30 });
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    // Only replace the native cursor on precise-pointer devices with motion
    // enabled — otherwise the native cursor must stay visible.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || shouldReduce) {
      setActive(false);
      return;
    }

    setActive(true);
    // Gates the `cursor: none` rules in globals.css so the native cursor is
    // hidden only while this replacement is actually rendered.
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        const label = el.dataset.cursor ?? "";
        setCursorLabel(label === "hover" ? "" : label);
        setIsHovering(true);
      } else {
        setCursorLabel("");
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY, shouldReduce]);

  if (!active) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#13294B",
          pointerEvents: "none",
          zIndex: 99999,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "1.5px solid rgba(200,144,42,0.7)",
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ width: isHovering ? 56 : 36, height: isHovering ? 56 : 36 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {cursorLabel && (
          <span style={{ color: "#A8761F", fontSize: "9px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", userSelect: "none" }}>
            {cursorLabel}
          </span>
        )}
      </motion.div>
    </>
  );
}

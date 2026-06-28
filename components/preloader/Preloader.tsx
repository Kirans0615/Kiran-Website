"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("ks-preloader")) {
      onComplete();
      return;
    }

    if (shouldReduce) {
      sessionStorage.setItem("ks-preloader", "1");
      onComplete();
      return;
    }

    let current = 0;
    const id = setInterval(() => {
      current += Math.random() * 18 + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(id);
        setTimeout(() => {
          setExiting(true);
          sessionStorage.setItem("ks-preloader", "1");
          setTimeout(onComplete, 900);
        }, 350);
      } else {
        setProgress(Math.round(current));
      }
    }, 75);

    return () => clearInterval(id);
  }, [onComplete, shouldReduce]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Curtain panels that slide away on exit */}
          <motion.div
            className="absolute inset-0 flex"
            exit="exit"
            variants={{ exit: { transition: { staggerChildren: 0.06 } } }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="flex-1"
                style={{ backgroundColor: "#141210", transformOrigin: "bottom" }}
                variants={{
                  exit: {
                    scaleY: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 },
                  },
                }}
              />
            ))}
          </motion.div>

          {/* Name */}
          <div className="relative z-10" style={{ overflow: "hidden" }}>
            <motion.h1
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 1 }}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Kiran Sen
            </motion.h1>
          </div>

          {/* Role */}
          <motion.p
            className="relative z-10 text-muted text-sm tracking-[0.25em] uppercase mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Web Designer & Developer
          </motion.p>

          {/* Progress */}
          <motion.div
            className="absolute bottom-12 left-1/2 flex flex-col items-center gap-3"
            style={{ transform: "translateX(-50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              style={{
                width: "180px",
                height: "1px",
                backgroundColor: "#1E1B17",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#F59E0B",
                  transformOrigin: "left",
                }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <span
              className="font-display font-bold text-accent"
              style={{ fontSize: "0.7rem", letterSpacing: "0.3em" }}
            >
              {String(progress).padStart(3, "0")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

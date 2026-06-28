"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]   = useState(false);
  const [skip, setSkip]         = useState(false);
  const shouldReduce             = useReducedMotion();
  const onCompleteRef            = useRef(onComplete);
  onCompleteRef.current          = onComplete;

  useEffect(() => {
    // Skip the preloader if already shown this session
    if (sessionStorage.getItem("ks-preloader")) {
      setSkip(true);
      onCompleteRef.current();
      return;
    }

    if (shouldReduce) {
      sessionStorage.setItem("ks-preloader", "1");
      setSkip(true);
      onCompleteRef.current();
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
          setTimeout(() => onCompleteRef.current(), 900);
        }, 350);
      } else {
        setProgress(Math.round(current));
      }
    }, 75);

    return () => clearInterval(id);
  }, [shouldReduce]);

  // Already shown — render nothing
  if (skip) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "#0A0906",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Curtain panels */}
          <motion.div
            style={{ position: "absolute", inset: 0, display: "flex" }}
            exit="exit"
            variants={{ exit: { transition: { staggerChildren: 0.06 } } }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                style={{ flex: 1, backgroundColor: "#141210", transformOrigin: "bottom" }}
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
          <div style={{ position: "relative", zIndex: 10, overflow: "hidden" }}>
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
            style={{ position: "relative", zIndex: 10, color: "#A8956E", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: "16px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Web Designer & Developer
          </motion.p>

          {/* Progress */}
          <motion.div
            style={{ position: "absolute", bottom: "48px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div style={{ width: "180px", height: "1px", backgroundColor: "#1E1B17", position: "relative", overflow: "hidden" }}>
              <motion.div
                style={{ position: "absolute", inset: 0, backgroundColor: "#F59E0B", transformOrigin: "left" }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <span className="font-display font-bold" style={{ color: "#F59E0B", fontSize: "0.7rem", letterSpacing: "0.3em" }}>
              {String(progress).padStart(3, "0")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

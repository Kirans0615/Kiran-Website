"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let animId = 0;
    let running = false;
    let t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const draw = () => {
      t += 0.003;
      const { x: mx, y: my } = mouseRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const orbs = [
        { cx: 0.18 + Math.sin(t) * 0.12 + mx * 0.08,  cy: 0.28 + Math.cos(t * 0.7) * 0.1,  r: 0.42, a: 0.06 },
        { cx: 0.82 + Math.cos(t * 0.9) * 0.08 - mx * 0.06, cy: 0.55 + Math.sin(t * 1.1) * 0.12, r: 0.35, a: 0.04 },
        { cx: 0.5  + Math.sin(t * 1.3) * 0.07,         cy: 0.85 - my * 0.1,                 r: 0.28, a: 0.03 },
      ];

      orbs.forEach(({ cx, cy, r, a }) => {
        const px = cx * canvas.width;
        const py = cy * canvas.height;
        const pr = r * canvas.width;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, pr);
        grad.addColorStop(0, `rgba(19,41,75,${a})`);
        grad.addColorStop(1, "rgba(19,41,75,0)");
        ctx.fillStyle = grad;
        // Fill only the orb's bounding box — a full-canvas fill per orb was
        // the main frame cost on large displays.
        ctx.fillRect(px - pr, py - pr, pr * 2, pr * 2);
      });

      animId = requestAnimationFrame(draw);
    };

    // Animate only while the hero is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        animId = requestAnimationFrame(draw);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(animId);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [shouldReduce]);

  if (shouldReduce) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(19,41,75,0.05) 0%, transparent 60%)" }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

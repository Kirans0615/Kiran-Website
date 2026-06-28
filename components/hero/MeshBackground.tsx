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
    let animId: number;
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
        { cx: 0.18 + Math.sin(t) * 0.12 + mx * 0.08,  cy: 0.28 + Math.cos(t * 0.7) * 0.1,  r: 0.42, a: 0.11 },
        { cx: 0.82 + Math.cos(t * 0.9) * 0.08 - mx * 0.06, cy: 0.55 + Math.sin(t * 1.1) * 0.12, r: 0.35, a: 0.07 },
        { cx: 0.5  + Math.sin(t * 1.3) * 0.07,         cy: 0.85 - my * 0.1,                 r: 0.28, a: 0.05 },
      ];

      orbs.forEach(({ cx, cy, r, a }) => {
        const grad = ctx.createRadialGradient(
          cx * canvas.width, cy * canvas.height, 0,
          cx * canvas.width, cy * canvas.height, r  * canvas.width,
        );
        grad.addColorStop(0, `rgba(245,158,11,${a})`);
        grad.addColorStop(1, "rgba(245,158,11,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [shouldReduce]);

  if (shouldReduce) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(245,158,11,0.08) 0%, transparent 60%)" }}
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

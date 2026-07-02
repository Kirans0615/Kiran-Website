"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const CODE_FRAGMENTS = [
  `const { scrollY } = useScroll();`,
  `<motion.div\n  whileHover={{ scale: 1.05 }}\n  transition={{ type: "spring" }}>`,
  `@theme {\n  --color-primary: #13294B;\n}`,
  `export default function Hero() {`,
  `useEffect(() => {\n  lenis.raf(time);\n}, []);`,
  `viewport={{ once: true,\n  margin: "-80px" }}`,
  `const springX = useSpring(x,\n  { stiffness: 180 });`,
  `npm run build\n✓ Compiled successfully`,
  `type Category =\n  "SaaS" | "Business";`,
  `git push origin main\n→ GitHub Pages deployed`,
  `framer-motion\nnext tailwindcss`,
  `<AnimatePresence mode="popLayout">`,
  `rotateX: sRotX,\ntransformStyle: "preserve-3d"`,
  `domain: "kiransenwebsites.com"`,
];

interface Fragment {
  text: string;
  x: number;
  y: number;
  opacity: number;
  speed: number;
  size: number;
  drift: number;
  phase: number;
}

export function FloatingCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduce = useReducedMotion();
  const fragsRef = useRef<Fragment[]>([]);

  useEffect(() => {
    if (shouldReduce) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId = 0;
    let running = false;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fragsRef.current = CODE_FRAGMENTS.map((text) => ({
        text,
        x: (Math.random() * 0.9 + 0.05) * canvas.width,
        y: (Math.random() * 0.85 + 0.05) * canvas.height,
        opacity: Math.random() * 0.07 + 0.03,
        speed: Math.random() * 0.3 + 0.1,
        size: Math.random() * 2 + 9,
        drift: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fontKerning = "none";

      fragsRef.current.forEach((frag) => {
        frag.y -= frag.speed * 0.4;
        frag.x += Math.sin(t * frag.speed + frag.phase) * frag.drift;

        if (frag.y < -120) frag.y = canvas.height + 40;
        if (frag.x < -200) frag.x = canvas.width + 50;
        if (frag.x > canvas.width + 200) frag.x = -50;

        const pulse = Math.sin(t * frag.speed * 2 + frag.phase) * 0.02;
        const alpha = Math.max(0, frag.opacity + pulse);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#13294B";
        ctx.font = `${frag.size}px "Geist Mono", "Fira Code", monospace`;

        const lines = frag.text.split("\n");
        lines.forEach((line, li) => {
          ctx.fillText(line, frag.x, frag.y + li * (frag.size + 3));
        });
        ctx.restore();
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
    };
  }, [shouldReduce]);

  if (shouldReduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
}

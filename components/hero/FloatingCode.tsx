"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const CODE_FRAGMENTS = [
  `const { scrollY } = useScroll();`,
  `<motion.div\n  whileHover={{ scale: 1.05 }}\n  transition={{ type: "spring" }}>`,
  `@theme {\n  --color-accent: #F59E0B;\n}`,
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
  `basePath: "/Kiran-Website"`,
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
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-seed fragments on resize
      fragsRef.current = CODE_FRAGMENTS.map((text, i) => ({
        text,
        x: (Math.random() * 0.9 + 0.05) * canvas.width,
        y: (Math.random() * 0.85 + 0.05) * canvas.height,
        opacity: Math.random() * 0.12 + 0.05,
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

        // Wrap
        if (frag.y < -120) frag.y = canvas.height + 40;
        if (frag.x < -200) frag.x = canvas.width + 50;
        if (frag.x > canvas.width + 200) frag.x = -50;

        const pulse = Math.sin(t * frag.speed * 2 + frag.phase) * 0.03;
        const alpha = Math.max(0, frag.opacity + pulse);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#F59E0B";
        ctx.font = `${frag.size}px "Geist Mono", "Fira Code", monospace`;

        const lines = frag.text.split("\n");
        lines.forEach((line, li) => {
          ctx.fillText(line, frag.x, frag.y + li * (frag.size + 3));
        });
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
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
        opacity: 0.6,
      }}
    />
  );
}

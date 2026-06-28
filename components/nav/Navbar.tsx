"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/shared/MagneticButton";

const NAV_LINKS = [
  { label: "Work",    href: "#portfolio" },
  { label: "Skills",  href: "#skills" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState("");
  const [menuOpen, setMenuOpen]   = useState(false);
  const shouldReduce              = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setActive(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth" });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[9990] transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(19,41,75,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-bold text-xl tracking-tighter"
            style={{ color: scrolled ? "#FAF8F4" : "#13294B" }}
            whileHover={shouldReduce ? {} : { scale: 1.04 }}
            data-cursor="hover"
          >
            KS<span style={{ color: "#C8902A" }}>.</span>
          </motion.button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="relative text-sm font-medium transition-colors duration-300 group"
                  style={{
                    color: active === link.href
                      ? "#C8902A"
                      : scrolled ? "rgba(250,248,244,0.75)" : "#4A5568",
                  }}
                  data-cursor="hover"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px transition-all duration-400"
                    style={{
                      width: active === link.href ? "100%" : "0%",
                      backgroundColor: "#C8902A",
                    }}
                  />
                  <span
                    className="absolute -bottom-1 left-0 h-px transition-all duration-400 opacity-0 group-hover:opacity-100 group-hover:w-full"
                    style={{ width: "0%", backgroundColor: "#C8902A" }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <MagneticButton
            className="hidden md:flex px-5 py-2.5 border text-sm font-medium rounded-full transition-all duration-300"
            style={{
              borderColor: scrolled ? "rgba(200,144,42,0.6)" : "rgba(19,41,75,0.35)",
              color: scrolled ? "#C8902A" : "#13294B",
            }}
            onClick={() => scrollTo("#contact")}
            data-cursor="hover"
          >
            Hire Me
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            data-cursor="hover"
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: scrolled ? "#FAF8F4" : "#13294B",
                transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
              }}
            />
            <span
              className="block h-px transition-all duration-300"
              style={{
                background: scrolled ? "#FAF8F4" : "#13294B",
                width: menuOpen ? "0" : "1.5rem",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: scrolled ? "#FAF8F4" : "#13294B",
                transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-[9980] md:hidden flex flex-col items-center justify-center"
        style={{ backgroundColor: "rgba(19,41,75,0.97)" }}
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={false}
              animate={{ y: menuOpen ? 0 : 20, opacity: menuOpen ? 1 : 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => scrollTo(link.href)}
                className="font-display font-bold text-4xl"
                style={{ color: "#FAF8F4" }}
                data-cursor="hover"
              >
                {link.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}

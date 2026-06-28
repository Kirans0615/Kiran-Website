"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader/Preloader";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/hero/Hero";
import { MarqueeTicker } from "@/components/shared/MarqueeTicker";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />

      <AnimatePresence>
        {ready && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ScrollProgress />
            <Navbar />
            <main>
              <Hero />
              <MarqueeTicker />
              <PortfolioSection />
              <SkillsSection />
              <AboutSection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

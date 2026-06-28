"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Mail, ArrowRight } from "lucide-react";

function FloatingField({
  id, label, type = "text", required = false,
  value, onChange, rows,
}: {
  id: string; label: string; type?: string; required?: boolean;
  value: string; onChange: (v: string) => void; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const baseStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "#C8902A" : "#E2DACD"}`,
    paddingTop: "24px",
    paddingBottom: "8px",
    color: "#1F2933",
    fontSize: "0.9rem",
    outline: "none",
    resize: "none",
    transition: "border-color 0.3s",
    fontFamily: "inherit",
  };

  return (
    <div style={{ position: "relative" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: 0,
          top: active ? "0" : "22px",
          fontSize: active ? "10px" : "14px",
          color: active ? "#A8761F" : "#4A5568",
          letterSpacing: active ? "0.15em" : "normal",
          textTransform: active ? "uppercase" : "none",
          transition: "all 0.25s ease",
          pointerEvents: "none",
        }}
      >
        {label}
      </label>

      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}

      {/* Underline draw-in */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          background: "#C8902A",
          width: focused ? "100%" : "0%",
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIALS = [
  { Icon: GithubIcon,   label: "GitHub",   href: "https://github.com/Kirans0615"   },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/in/kiran-sen" },
  { Icon: Mail,         label: "Email",    href: "mailto:alemarraa@gmail.com"        },
];

export function ContactSection() {
  const shouldReduce = useReducedMotion();
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contact", name, email, message }).toString(),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else throw new Error();
    } catch {
      window.location.href = `mailto:alemarraa@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-28 lg:py-32 px-5 md:px-6" style={{ background: "#E5DDD0" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="Get In Touch" title="Let's Work Together" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(36px, 5vw, 72px)",
          }}
        >
          {/* Left column */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ color: "#4A5568", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "40px", maxWidth: "340px" }}>
              Have a project in mind? I'd love to hear about it. Send me a message and let's discuss what we can build together.
            </p>

            <div style={{ marginBottom: "36px" }}>
              <a
                href="mailto:alemarraa@gmail.com"
                style={{ display: "flex", alignItems: "center", gap: "10px", color: "#13294B", textDecoration: "none", fontSize: "0.9rem" }}
                data-cursor="hover"
              >
                <Mail style={{ width: "16px", height: "16px", color: "#C8902A", flexShrink: 0 }} />
                alemarraa@gmail.com
              </a>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="hover"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border: "1px solid #E2DACD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4A5568",
                    textDecoration: "none",
                    background: "#FFFFFF",
                    transition: "all 0.3s",
                  }}
                >
                  {label === "Email" ? <Mail style={{ width: "16px", height: "16px" }} /> : <Icon />}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <motion.div
                style={{ textAlign: "center", padding: "60px 0" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: "1.5rem",
                  }}
                >
                  ✓
                </div>
                <h3 className="font-display font-bold" style={{ color: "#13294B", fontSize: "1.5rem", marginBottom: "12px" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "#4A5568", marginBottom: "24px" }}>I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{ color: "#A8761F", fontSize: "13px", background: "none", border: "none", cursor: "none" }}
                  data-cursor="hover"
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "36px" }}
              >
                <input type="hidden" name="form-name" value="contact" />
                <div style={{ display: "none" }}>
                  <label>Don&apos;t fill this out: <input name="bot-field" /></label>
                </div>

                <FloatingField id="name"    label="Your Name"                  required value={name}    onChange={setName}    />
                <FloatingField id="email"   label="Email Address" type="email" required value={email}   onChange={setEmail}   />
                <FloatingField id="message" label="Tell me about your project"  required value={message} onChange={setMessage} rows={4} />

                <MagneticButton
                  type="submit"
                  disabled={status === "sending"}
                  data-cursor="hover"
                  className="font-display font-semibold rounded-full text-sm tracking-wide transition-colors duration-300 flex items-center justify-center gap-2"
                  style={{
                    padding: "16px 32px",
                    background: "#13294B",
                    color: "#EDE8DF",
                    opacity: status === "sending" ? 0.7 : 1,
                    width: "100%",
                    boxShadow: "0 4px 20px rgba(19,41,75,0.2)",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

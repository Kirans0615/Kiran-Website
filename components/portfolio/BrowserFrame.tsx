"use client";

import { useState, useRef, useEffect } from "react";

interface BrowserFrameProps {
  url: string;
  title: string;
  deviceMode: "desktop" | "mobile";
}

function microlinkUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

function thumioUrl(url: string) {
  return `https://image.thum.io/get/width/900/crop/650/${url}`;
}

type Mode = "iframe" | "microlink" | "thumio" | "error";

export function BrowserFrame({ url, title, deviceMode }: BrowserFrameProps) {
  const [mode, setMode]           = useState<Mode>("iframe");
  const timeoutRef                = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const iframeKey                 = useRef(0);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    iframeKey.current += 1;
    setMode("iframe");
  }, [url]);

  useEffect(() => {
    if (mode !== "iframe") return;
    timeoutRef.current = setTimeout(() => setMode("microlink"), 7000);
    return () => clearTimeout(timeoutRef.current);
  }, [mode, url]);

  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const viewportH = deviceMode === "mobile" ? 460 : 360;

  return (
    <div
      style={{
        width: "100%",
        background: "#F2EDE4",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #E2DACD",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#E8E0D4",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid #E2DACD",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#28CA41" }} />
        </div>
        {/* Address bar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(250,248,244,0.8)",
            borderRadius: "6px",
            padding: "4px 10px",
            border: "1px solid #E2DACD",
          }}
        >
          {/* Lock icon */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span
            style={{
              color: "#4A5568",
              fontSize: "11px",
              fontFamily: "monospace",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {displayUrl}
          </span>
        </div>
      </div>

      {/* Viewport */}
      <div style={{ position: "relative", height: viewportH, overflow: "hidden", background: "#fff" }}>
        {mode === "iframe" ? (
          <iframe
            key={`${url}-${iframeKey.current}`}
            src={url}
            title={title}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => clearTimeout(timeoutRef.current)}
            onError={() => { clearTimeout(timeoutRef.current); setMode("microlink"); }}
            style={
              deviceMode === "mobile"
                ? {
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: "390px",
                    height: `${viewportH / 0.7}px`,
                    transform: "scale(0.7) translateX(-50%)",
                    transformOrigin: "top left",
                    border: "none",
                  }
                : {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "133%",
                    height: "133%",
                    transform: "scale(0.75)",
                    transformOrigin: "top left",
                    border: "none",
                  }
            }
          />
        ) : mode === "microlink" ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={microlinkUrl(url)}
            alt={`${title} preview`}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            onError={() => setMode("thumio")}
          />
        ) : mode === "thumio" ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumioUrl(url)}
            alt={`${title} preview`}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            onError={() => setMode("error")}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#F2EDE4",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8902A" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            <p style={{ color: "#4A5568", fontSize: "11px", marginTop: "10px" }}>
              Visit the live site →
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

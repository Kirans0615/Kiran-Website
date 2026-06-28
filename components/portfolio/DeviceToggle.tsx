"use client";

import { Monitor, Smartphone } from "lucide-react";

interface DeviceToggleProps {
  mode: "desktop" | "mobile";
  onChange: (m: "desktop" | "mobile") => void;
}

export function DeviceToggle({ mode, onChange }: DeviceToggleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2px",
        background: "#141210",
        borderRadius: "999px",
        padding: "3px",
        border: "1px solid rgba(245,158,11,0.15)",
      }}
    >
      {(["desktop", "mobile"] as const).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              borderRadius: "999px",
              border: "none",
              background: active ? "#F59E0B" : "transparent",
              color: active ? "#0A0906" : "#6B5F4A",
              transition: "all 0.2s ease",
              cursor: "none",
            }}
            aria-label={`${m} view`}
            data-cursor="hover"
          >
            {m === "desktop"
              ? <Monitor style={{ width: "12px", height: "12px" }} />
              : <Smartphone style={{ width: "12px", height: "12px" }} />
            }
          </button>
        );
      })}
    </div>
  );
}

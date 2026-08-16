"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ComboInput({
  value, onChange, options, placeholder, className, required, matchLastSegment,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
  required?: boolean;
  /** When true, filters/completes only the last comma-separated segment.
   *  Use for multi-value fields stored as "Asia, Southeast Asia". */
  matchLastSegment?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi]     = useState(-1);
  const [pos, setPos]   = useState<{ top: number; left: number; width: number } | null>(null);
  const inputRef        = useRef<HTMLInputElement>(null);
  const portalRef       = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let el = document.getElementById("combo-portal");
    if (!el) {
      el = document.createElement("div");
      el.id = "combo-portal";
      document.body.appendChild(el);
    }
    portalRef.current = el;
  }, []);

  useLayoutEffect(() => {
    if (open && inputRef.current) {
      const r = inputRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    } else {
      setPos(null);
    }
  }, [open, value]);

  // For multi-segment mode, match against the last typed segment
  const activeSeg = matchLastSegment
    ? (value.split(",").pop()?.trim() ?? "")
    : value;

  const filtered = options.filter(o =>
    !activeSeg || o.toLowerCase().includes(activeSeg.toLowerCase())
  );
  const show = open && filtered.length > 0;

  function pick(opt: string) {
    if (matchLastSegment) {
      const parts = value.split(",").map(s => s.trim()).filter((s, i, arr) => i < arr.length - 1 || s !== "");
      // Replace the last segment with the picked value, or append if currently empty last
      const prefix = parts.slice(0, -1);
      // If last part is empty (user just typed comma), append; otherwise replace last
      const lastPart = parts[parts.length - 1] ?? "";
      if (lastPart === "" || activeSeg !== "") {
        onChange([...prefix, opt].join(", "));
      } else {
        onChange([...prefix, opt].join(", "));
      }
    } else {
      onChange(opt);
    }
    setOpen(false);
    setHi(-1);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (!show) { if (e.key === "ArrowDown") setOpen(true); return; }
    if      (e.key === "ArrowDown") { e.preventDefault(); setHi(h => Math.min(h + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); setHi(h => Math.max(h - 1, 0)); }
    else if (e.key === "Enter" && hi >= 0) { e.preventDefault(); pick(filtered[hi]); }
    else if (e.key === "Escape")    { setOpen(false); setHi(-1); }
  }

  const dropdown = show && pos ? (
    <ul
      style={{
        position: "fixed",
        top: pos.top, left: pos.left, width: pos.width,
        zIndex: 99999,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        maxHeight: "200px",
        overflowY: "auto",
        padding: "4px 0",
        margin: 0,
        listStyle: "none",
      }}
    >
      {filtered.map((opt, i) => (
        <li key={opt}>
          <button
            type="button"
            onMouseDown={e => e.preventDefault()}
            onClick={() => pick(opt)}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "8px 12px", fontSize: "12px", border: "none", cursor: "pointer",
              background: i === hi ? "#fef3c7" : "transparent",
              color: i === hi ? "#c4883e" : "#374151",
              fontWeight: i === hi ? 600 : 400,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = i === hi ? "#fef3c7" : "transparent"; }}
          >
            {opt}
          </button>
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <div>
      <input
        ref={inputRef}
        className={className}
        value={value}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        onChange={e => { onChange(e.target.value); setOpen(true); setHi(-1); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => { setOpen(false); setHi(-1); }, 150)}
        onKeyDown={handleKey}
      />
      {portalRef.current && createPortal(dropdown, portalRef.current)}
    </div>
  );
}

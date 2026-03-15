"use client";

import { useState } from "react";

export default function FabricDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-4">
      {expanded && (
        <p className="mb-2 text-sm leading-relaxed text-muted">{text}</p>
      )}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="text-xs uppercase tracking-widest text-muted hover:text-gold transition-colors"
      >
        {expanded ? "Show less ↑" : "About this fabric ↓"}
      </button>
    </div>
  );
}

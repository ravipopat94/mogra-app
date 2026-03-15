"use client";

import { useState } from "react";

export default function FabricDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-4">
      <p
        className={`text-sm leading-relaxed text-muted transition-all ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-1.5 text-xs uppercase tracking-widest text-muted hover:text-gold transition-colors"
      >
        {expanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

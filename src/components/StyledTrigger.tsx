"use client";

import { useState } from "react";
import StyledModal from "./StyledModal";

interface Props {
  images: string[];
  fabricName: string;
  className?: string;
}

export default function StyledTrigger({ images, fabricName, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className ?? "mb-4 text-xs uppercase tracking-widest text-muted hover:text-gold transition-colors"}
      >
        See it styled →
      </button>

      {open && (
        <StyledModal
          images={images}
          fabricName={fabricName}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

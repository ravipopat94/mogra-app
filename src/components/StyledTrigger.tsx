"use client";

import { useState } from "react";
import StyledModal from "./StyledModal";

interface Props {
  images: string[];
  fabricName: string;
}

export default function StyledTrigger({ images, fabricName }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mb-4 text-xs uppercase tracking-widest text-muted hover:text-gold transition-colors"
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

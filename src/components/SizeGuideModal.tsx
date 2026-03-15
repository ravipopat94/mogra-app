"use client";

import { useEffect } from "react";

interface Props {
  onClose: () => void;
}

const sizes = [
  { size: "XS",  us: "30R–32R",  chest: '30¾–33¾"', waist: '26–29¼"',   arm: '24½"',       neckline: '13¼–13¾"' },
  { size: "S",   us: "34R–36R",  chest: '33¾–37"',   waist: '29¼–32¼"',  arm: '24½–24¾"',  neckline: '14–14½"'  },
  { size: "M",   us: "38R–40R",  chest: '37–40¼"',   waist: '32¼–35½"',  arm: '24¾–25"',   neckline: '15–15¼"'  },
  { size: "L",   us: "42R–44R",  chest: '40¼–43¼"',  waist: '35½–38¾"',  arm: '25–25½"',   neckline: '15¾–16"'  },
  { size: "XL",  us: "46R–48R",  chest: '43¼–46½"',  waist: '38¾–42¼"',  arm: '25½–25¾"',  neckline: '16½–17"'  },
  { size: "XXL", us: "50R–52R",  chest: '46½–49½"',  waist: '42¼–45¾"',  arm: '25¾–26"',   neckline: '17¼–17¾"' },
];

const cols = [
  { key: "size",     label: "Size"       },
  { key: "us",       label: "US"         },
  { key: "chest",    label: "Chest"      },
  { key: "waist",    label: "Waist"      },
  { key: "arm",      label: "Arm Length" },
  { key: "neckline", label: "Neckline"   },
];

export default function SizeGuideModal({ onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-background border border-brand-border shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
          <p className="text-xs uppercase tracking-widest text-foreground">Size Guide</p>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors text-lg leading-none"
            aria-label="Close size guide"
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-6 py-5">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                {cols.map((col) => (
                  <th
                    key={col.key}
                    className={`pb-3 pr-6 text-left text-[10px] uppercase tracking-widest text-muted font-normal whitespace-nowrap ${
                      col.key === "size"
                        ? "sticky left-0 z-10 bg-background"
                        : ""
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, i) => (
                <tr key={row.size} className={i < sizes.length - 1 ? "border-b border-brand-border" : ""}>
                  {cols.map((col) => (
                    <td
                      key={col.key}
                      className={`py-3 pr-6 whitespace-nowrap ${
                        col.key === "size"
                          ? "sticky left-0 z-10 bg-background font-medium text-foreground"
                          : "text-muted"
                      }`}
                    >
                      {row[col.key as keyof typeof row]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <p className="border-t border-brand-border px-6 py-4 text-[10px] uppercase tracking-widest text-muted">
          All measurements are in inches. Need something different?{" "}
          <a href="/contact" className="text-foreground underline underline-offset-4 hover:text-gold transition-colors" onClick={onClose}>
            Order custom
          </a>
          .
        </p>
      </div>
    </div>
  );
}

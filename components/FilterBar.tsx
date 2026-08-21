"use client";

import { REASONS, type ReasonKey } from "@/lib/types";

const PILLS: { key: ReasonKey | "all"; label: string; emoji: string }[] = [
  { key: "all", label: "すべて", emoji: "🔥" },
  { key: "cost", label: REASONS.cost.label, emoji: REASONS.cost.emoji },
  { key: "performance", label: REASONS.performance.label, emoji: REASONS.performance.emoji },
  { key: "dx", label: REASONS.dx.label, emoji: REASONS.dx.emoji },
  { key: "deprecation", label: REASONS.deprecation.label, emoji: REASONS.deprecation.emoji },
];

export function FilterBar({
  active,
  onChange,
}: {
  active: ReasonKey | "all";
  onChange: (v: ReasonKey | "all") => void;
}) {
  return (
    <div className="scrollbar-thin -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {PILLS.map((p) => {
        const isActive = active === p.key;
        return (
          <button
            key={p.key}
            onClick={() => onChange(p.key)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition ${
              isActive
                ? "border-[#3ea8ff] bg-[#3ea8ff] text-white shadow-sm"
                : "border-[#e2e5e5] bg-white text-[#40444d] hover:border-[#c7cbcb] hover:bg-[#f5f6f6]"
            }`}
          >
            <span>{p.emoji}</span>
            <span>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}

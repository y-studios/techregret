"use client";

import type { Category, ReasonKey } from "@/lib/types";
import { REASONS } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";

const CATEGORIES: Category[] = ["Hosting", "Framework", "DB", "Auth", "ORM", "UI", "Language", "Architecture"];
const REASON_KEYS: ReasonKey[] = ["cost", "performance", "dx", "deprecation"];

export function Sidebar({
  categoryActive,
  onCategoryChange,
  reasonActive,
  onReasonChange,
  categoryCounts,
  reasonCounts,
  total,
}: {
  categoryActive: Category | "all";
  onCategoryChange: (v: Category | "all") => void;
  reasonActive: ReasonKey | "all";
  onReasonChange: (v: ReasonKey | "all") => void;
  categoryCounts: Record<string, number>;
  reasonCounts: Record<string, number>;
  total: number;
}) {
  return (
    <aside className="hidden w-[220px] shrink-0 lg:block">
      <div className="sticky top-24 space-y-8">
        <div>
          <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-wider text-[#8f9faa]">カテゴリ</p>
          <nav className="flex flex-col gap-0.5">
            <button
              onClick={() => onCategoryChange("all")}
              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-bold transition ${
                categoryActive === "all" ? "bg-[#eaf4ff] text-[#1547B0]" : "text-[#40444d] hover:bg-[#f5f6f6]"
              }`}
            >
              すべて
              <span className="text-[11px] font-semibold text-[#8f9faa]">{total}</span>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => onCategoryChange(c)}
                className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-bold transition ${
                  categoryActive === c ? "bg-[#eaf4ff] text-[#1547B0]" : "text-[#40444d] hover:bg-[#f5f6f6]"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <CategoryIcon category={c} className="h-3.5 w-3.5" />
                  {c}
                </span>
                <span className="text-[11px] font-semibold text-[#8f9faa]">{categoryCounts[c] ?? 0}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-wider text-[#8f9faa]">乗り換え理由</p>
          <nav className="flex flex-col gap-0.5">
            <button
              onClick={() => onReasonChange("all")}
              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-bold transition ${
                reasonActive === "all" ? "bg-[#eaf4ff] text-[#1547B0]" : "text-[#40444d] hover:bg-[#f5f6f6]"
              }`}
            >
              すべて
              <span className="text-[11px] font-semibold text-[#8f9faa]">{total}</span>
            </button>
            {REASON_KEYS.map((r) => (
              <button
                key={r}
                onClick={() => onReasonChange(r)}
                className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-bold transition ${
                  reasonActive === r ? "bg-[#eaf4ff] text-[#1547B0]" : "text-[#40444d] hover:bg-[#f5f6f6]"
                }`}
              >
                <span>
                  {REASONS[r].emoji} {REASONS[r].label}
                </span>
                <span className="text-[11px] font-semibold text-[#8f9faa]">{reasonCounts[r] ?? 0}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

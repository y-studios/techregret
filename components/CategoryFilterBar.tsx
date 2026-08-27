"use client";

import type { Category } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";

const CATEGORIES: Category[] = ["Hosting", "Framework", "DB", "Auth", "ORM", "UI", "Language", "Architecture"];

export function CategoryFilterBar({
  active,
  onChange,
}: {
  active: Category | "all";
  onChange: (v: Category | "all") => void;
}) {
  return (
    <div className="scrollbar-thin -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      <button
        onClick={() => onChange("all")}
        className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition ${
          active === "all"
            ? "border-[#0f131a] bg-[#0f131a] text-white"
            : "border-[#e2e5e5] bg-white text-[#5c5f66] hover:border-[#c7cbcb] hover:bg-[#f5f6f6]"
        }`}
      >
        すべてのカテゴリ
      </button>
      {CATEGORIES.map((c) => {
        const isActive = active === c;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition ${
              isActive
                ? "border-[#0f131a] bg-[#0f131a] text-white"
                : "border-[#e2e5e5] bg-white text-[#5c5f66] hover:border-[#c7cbcb] hover:bg-[#f5f6f6]"
            }`}
          >
            <CategoryIcon category={c} className="h-3.5 w-3.5" />
            {c}
          </button>
        );
      })}
    </div>
  );
}

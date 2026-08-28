"use client";

import { Search, ArrowRightLeft } from "lucide-react";

export function Header({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e2e5e5] bg-white/90 backdrop-blur">
      <div className="h-[3px] bg-gradient-to-r from-[#FFC800] via-[#1E63E9] to-[#FFC800]" />
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#1547B0]">
            <ArrowRightLeft className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <p className="font-display text-[16px] font-extrabold tracking-tight text-[#1F2937]">TechRegret</p>
            <p className="text-[11px] text-[#8f9faa]">技術乗り換え・移行理由DB</p>
          </div>
        </div>

        <div className="w-full sm:max-w-xs">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f9faa]" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="技術名（From / To）・理由で検索"
              className="w-full rounded-full border border-[#e2e5e5] bg-[#f5f6f6] py-2 pl-9 pr-3 text-sm text-[#1F2937] outline-none placeholder:text-[#8f9faa] transition focus:border-[#1E63E9] focus:bg-white focus:ring-2 focus:ring-[#1E63E9]/20"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

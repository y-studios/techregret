"use client";

import { Search } from "lucide-react";

export function SearchBar({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-[#e2e5e5] bg-white p-1.5 shadow-[0_8px_28px_-8px_rgba(31,41,55,0.15)] transition focus-within:border-[#1E63E9] focus-within:shadow-[0_8px_28px_-6px_rgba(30,99,233,0.35)]">
      <Search className="ml-3 h-4.5 w-4.5 shrink-0 text-[#8f9faa]" />
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="技術名（例: Vercel, Prisma, MongoDB）や理由で検索"
        className="w-full min-w-0 bg-transparent py-2 text-[14px] text-[#1F2937] outline-none placeholder:text-[#8f9faa]"
      />
      <span className="hidden shrink-0 rounded-full bg-[#1E63E9] px-5 py-2 text-[13px] font-bold text-white sm:block">
        検索
      </span>
    </div>
  );
}

"use client";

import { Search, Plus, ArrowRightLeft } from "lucide-react";

export function Header({
  query,
  onQueryChange,
  onPost,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onPost: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00d09c]/10 text-[#00a37b]">
            <ArrowRightLeft className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-black tracking-tight text-slate-900">TechRegret</p>
            <p className="text-[11px] text-slate-400">技術乗り換え・移行理由DB</p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-2 sm:max-w-md">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="技術名（From / To）・理由で検索"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-[#00d09c] focus:bg-white focus:ring-2 focus:ring-[#00d09c]/20"
            />
          </div>
          <button
            onClick={onPost}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#0f172a] px-3.5 py-2 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">乗り換え理由を投稿する</span>
            <span className="sm:hidden">投稿</span>
          </button>
        </div>
      </div>
    </header>
  );
}

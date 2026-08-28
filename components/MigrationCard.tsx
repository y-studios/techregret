"use client";

import Link from "next/link";
import { Star, Lightbulb, ArrowRight, ExternalLink } from "lucide-react";
import type { Migration } from "@/lib/types";
import { REASONS } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";

export function MigrationCard({
  migration,
  upvoted,
  onUpvote,
  onOpen,
}: {
  migration: Migration;
  upvoted: boolean;
  onUpvote: () => void;
  onOpen: () => void;
}) {
  const m = migration;
  const isRealCase = Boolean(m.sourceUrl);

  return (
    <div className="group flex flex-col gap-3 rounded-2xl border border-[#e2e5e5] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#1E63E9]/40 hover:shadow-[0_8px_24px_-8px_rgba(30,99,233,0.25)] sm:p-5">
      <div className="flex items-center justify-between">
        {isRealCase ? (
          <div className="flex items-center gap-2">
            <img
              src={`/logos/${m.id}.png`}
              alt=""
              aria-hidden="true"
              className="h-6 w-6 rounded-md border border-[#e2e5e5] bg-white object-contain p-0.5"
            />
            <span className="text-[12.5px] font-bold text-[#1F2937]">{m.company}</span>
          </div>
        ) : (
          <span className="text-[12px] font-bold text-[#8f9faa]">投稿ログ</span>
        )}
        <span className="flex items-center gap-1 rounded-md bg-[#f5f6f6] px-2 py-1 text-[11px] font-bold text-[#5c5f66]">
          <CategoryIcon category={m.category} className="h-3 w-3" />
          {m.category}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-[12px] font-bold">
        <span className="rounded-md border border-[#f3c3ce] bg-[#fdf0f2] px-2 py-1 text-[#d60a34]">{m.from}</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
        <span className="rounded-md border border-[#c9ecab] bg-[#f2fbe9] px-2 py-1 text-[#378d00]">{m.to}</span>
      </div>

      {isRealCase ? (
        <Link href={`/case/${m.id}/`} className="text-left">
          <p className="text-[15px] font-bold leading-snug text-[#1F2937] group-hover:text-[#1547B0]">{m.title}</p>
          <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-[#5c5f66]">{m.summary}</p>
        </Link>
      ) : (
        <button onClick={onOpen} className="text-left">
          <p className="text-[15px] font-bold leading-snug text-[#1F2937] group-hover:text-[#1547B0]">{m.title}</p>
          <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-[#5c5f66]">{m.summary}</p>
        </button>
      )}

      <div className="flex flex-wrap gap-1.5">
        {m.reasons.map((r) => (
          <span key={r} className="rounded-full bg-[#f5f6f6] px-2 py-0.5 text-[11px] font-semibold text-[#40444d]">
            {REASONS[r].emoji} {REASONS[r].label}
          </span>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-[#edeeee] pt-3">
        {typeof m.satisfaction === "number" ? (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < m.satisfaction! ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
              />
            ))}
            <span className="ml-1 text-[11px] font-bold text-slate-400">{m.satisfaction.toFixed(1)}</span>
          </div>
        ) : isRealCase ? (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-[#8f9faa]">
            <ExternalLink className="h-3 w-3" />
            出典あり・詳細を見る
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={onUpvote}
          className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-bold transition active:scale-95 ${
            upvoted
              ? "border-[#ffd699] bg-[#fff6e4] text-[#ffa909]"
              : "border-[#e2e5e5] bg-white text-[#5c5f66] hover:border-[#ffd699] hover:text-[#ffa909]"
          }`}
        >
          <Lightbulb className={`h-3.5 w-3.5 ${upvoted ? "fill-[#ffa909]" : ""}`} />
          わかる ({(m.upvotes ?? 0) + (upvoted ? 1 : 0)})
        </button>
      </div>
    </div>
  );
}

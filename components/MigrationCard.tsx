"use client";

import Link from "next/link";
import { Lightbulb, ArrowRight, ExternalLink, CalendarDays } from "lucide-react";
import type { Migration } from "@/lib/types";
import { REASONS } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";

export function MigrationCard({
  migration,
  upvoted,
  onUpvote,
}: {
  migration: Migration;
  upvoted: boolean;
  onUpvote: () => void;
}) {
  const m = migration;
  const excerpt = m.background ?? m.narrative;

  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-[#e2e5e5] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#1E63E9]/40 hover:shadow-[0_12px_32px_-12px_rgba(30,99,233,0.25)] sm:p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={`/logos/${m.id}.png`}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 rounded-lg border border-[#e2e5e5] bg-white object-contain p-1"
          />
          <span className="text-[13.5px] font-bold text-[#1F2937]">{m.company}</span>
        </div>
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

      <Link href={`/case/${m.id}/`} className="block">
        <h2 className="font-display text-[19px] font-extrabold leading-snug text-[#1F2937] group-hover:text-[#1547B0] sm:text-[21px]">
          {m.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-[#5c5f66]">{excerpt}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-[#1547B0]">
          続きを読む
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>

      <div className="flex flex-wrap gap-1.5">
        {m.reasons.map((r) => (
          <span key={r} className="rounded-full bg-[#f5f6f6] px-2 py-0.5 text-[11px] font-semibold text-[#40444d]">
            {REASONS[r].emoji} {REASONS[r].label}
          </span>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-[#edeeee] pt-3">
        <div className="flex items-center gap-3 text-[11px] font-semibold text-[#8f9faa]">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {m.createdAt}
          </span>
          <span className="flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            出典あり
          </span>
        </div>
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
    </article>
  );
}

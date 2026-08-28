"use client";

import { useEffect } from "react";
import { X, ArrowRight, Star, ExternalLink, Share2 } from "lucide-react";
import type { Migration } from "@/lib/types";
import { REASONS } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";
import { MetricChart } from "@/components/MetricChart";

export function DetailModal({ migration, onClose }: { migration: Migration; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const m = migration;
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}?m=${m.id}` : "";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: m.title, text: m.summary, url: shareUrl }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="scrollbar-thin max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-3.5 backdrop-blur">
          <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500">
            <CategoryIcon category={m.category} className="h-3 w-3" />
            {m.category}
          </span>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2 text-[13px] font-bold">
              <span className="rounded-md border border-[#f3c3ce] bg-[#fdf0f2] px-2.5 py-1 text-[#d60a34]">{m.from}</span>
              <ArrowRight className="h-4 w-4 text-slate-300" />
              <span className="rounded-md border border-[#c9ecab] bg-[#f2fbe9] px-2.5 py-1 text-[#378d00]">{m.to}</span>
            </div>
            <h2 className="font-display mt-3 text-xl font-extrabold leading-snug text-[#1F2937]">{m.title}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{m.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {m.reasons.map((r) => (
                <span key={r} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {REASONS[r].emoji} {REASONS[r].label}
                </span>
              ))}
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < (m.satisfaction ?? 0) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
                ))}
              </span>
            </div>
          </div>

          <section>
            <h3 className="mb-2 text-[13px] font-black text-slate-700">A. 移行前後の比較サマリー</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#f3c3ce] bg-[#fdf0f2]/60 p-3">
                <p className="mb-1.5 text-[12px] font-bold text-[#d60a34]">{m.from}</p>
                <p className="mb-1 text-[11px] font-bold text-slate-400">メリット</p>
                <ul className="mb-2 space-y-0.5 text-[12px] text-slate-600">
                  {(m.prosBefore ?? []).map((v, i) => (
                    <li key={i}>・{v}</li>
                  ))}
                </ul>
                <p className="mb-1 text-[11px] font-bold text-slate-400">デメリット</p>
                <ul className="space-y-0.5 text-[12px] text-slate-600">
                  {(m.consBefore ?? []).map((v, i) => (
                    <li key={i}>・{v}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[#c9ecab] bg-[#f2fbe9]/60 p-3">
                <p className="mb-1.5 text-[12px] font-bold text-[#378d00]">{m.to}</p>
                <p className="mb-1 text-[11px] font-bold text-slate-400">メリット</p>
                <ul className="mb-2 space-y-0.5 text-[12px] text-slate-600">
                  {(m.prosAfter ?? []).map((v, i) => (
                    <li key={i}>・{v}</li>
                  ))}
                </ul>
                <p className="mb-1 text-[11px] font-bold text-slate-400">デメリット</p>
                <ul className="space-y-0.5 text-[12px] text-slate-600">
                  {(m.consAfter ?? []).map((v, i) => (
                    <li key={i}>・{v}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-[13px] font-black text-slate-700">B. 乗り換えた決め手・現場の生ログ</h3>
            <p className="whitespace-pre-line rounded-xl border border-slate-200 bg-slate-50 p-3 text-[13px] leading-relaxed text-slate-700">{m.narrative}</p>
            <p className="mb-1 mt-3 text-[11px] font-bold text-slate-400">移行時のハマりどころ・注意点</p>
            <p className="whitespace-pre-line rounded-xl border border-[#ffd699] bg-[#fff6e4] p-3 text-[13px] leading-relaxed text-[#8a5a00]">{m.pitfalls ?? ""}</p>
          </section>

          <section>
            <h3 className="mb-2 text-[13px] font-black text-slate-700">C. コスト・速度の変化 ＆ 満足度</h3>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {m.compareMetrics.map((row, i) => (
                <MetricChart key={i} row={row} />
              ))}
            </div>
          </section>

          <section className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-[13px] font-bold text-slate-700">投稿者: {m.author ?? "匿名"}</p>
              <p className="text-[11px] text-slate-400">{m.createdAt}</p>
            </div>
            <div className="flex items-center gap-2">
              {m.authorX && (
                <a
                  href={m.authorX}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[12px] font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <ExternalLink className="h-3.5 w-3.5" />X
                </a>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-1 rounded-lg bg-[#1E63E9] px-2.5 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#1547B0]"
              >
                <Share2 className="h-3.5 w-3.5" />
                共有
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

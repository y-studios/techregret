"use client";

import { useEffect, useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import { PRESET_MIGRATIONS } from "@/data/migrations";
import type { Migration, ReasonKey } from "@/lib/types";
import { getSubmissions, getUpvoted, toggleUpvote, addSubmission } from "@/lib/storage";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { MigrationCard } from "@/components/MigrationCard";
import { DetailModal } from "@/components/DetailModal";
import { SubmitModal } from "@/components/SubmitModal";
import { PricingModal } from "@/components/PricingModal";
import { StatsBento } from "@/components/StatsBento";

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ReasonKey | "all">("all");
  const [submissions, setSubmissions] = useState<Migration[]>([]);
  const [upvoted, setUpvoted] = useState<string[]>([]);
  const [selected, setSelected] = useState<Migration | null>(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    setSubmissions(getSubmissions());
    setUpvoted(getUpvoted());
  }, []);

  const migrations = useMemo(() => [...submissions, ...PRESET_MIGRATIONS], [submissions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return migrations.filter((m) => {
      const matchesReason = filter === "all" || m.reasons.includes(filter);
      const matchesQuery =
        !q ||
        m.from.toLowerCase().includes(q) ||
        m.to.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q);
      return matchesReason && matchesQuery;
    });
  }, [migrations, query, filter]);

  const handleUpvote = (id: string) => {
    toggleUpvote(id);
    setUpvoted(getUpvoted());
  };

  const handleSubmit = (m: Migration) => {
    addSubmission(m);
    setSubmissions(getSubmissions());
  };

  return (
    <div className="min-h-screen bg-[#f5f6f6]">
      <Header query={query} onQueryChange={setQuery} onPost={() => setShowSubmit(true)} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="mb-6 flex items-center gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-lg font-extrabold text-[#0f131a] sm:text-xl">
              公式ドキュメントに載っていない、現場の「乗り換えた決定打」
            </h1>
            <p className="mt-1 text-[13px] text-[#5c5f66]">
              料金高騰・ビルド遅延・開発体験・仕様変更——技術スタックを移行した生々しい理由を検索・投稿できる技術選定の罠回避DB。
            </p>
          </div>
          <img
            src="/illust/choose_5kz4.svg"
            alt=""
            aria-hidden="true"
            className="hidden h-20 w-auto shrink-0 sm:block sm:h-24"
          />
        </section>

        <section className="mb-6">
          <StatsBento migrations={migrations} />
        </section>

        <section className="mb-4 flex items-center justify-between gap-3">
          <FilterBar active={filter} onChange={setFilter} />
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MigrationCard
              key={m.id}
              migration={m}
              upvoted={upvoted.includes(m.id)}
              onUpvote={() => handleUpvote(m.id)}
              onOpen={() => setSelected(m)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center gap-4 py-16 text-center">
              <img src="/illust/file-searching_yska.svg" alt="" aria-hidden="true" className="h-40 w-auto" />
              <p className="text-sm text-[#8f9faa]">該当するログが見つかりませんでした。</p>
            </div>
          )}
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl bg-[#0f131a] p-5 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <img src="/illust/fixing-bugs_1ytu.svg" alt="" aria-hidden="true" className="hidden h-16 w-auto shrink-0 sm:block" />
              <div>
                <p className="font-display text-[14px] font-extrabold text-white">技術選定・乗り換えトレンド分析レポート</p>
                <p className="mt-1 text-[12px] text-white/50">
                  自社ツール・SaaSのスポンサー掲載、または技術スタック別トレンド分析レポートのDLはこちらから。
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPricing(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#46ffda] px-4 py-2 text-sm font-bold text-[#0f131a] transition hover:bg-[#7dffe6]"
            >
              <CreditCard className="h-4 w-4" />
              プランを見る
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e2e5e5] py-6 text-center text-[11px] text-[#8f9faa]">
        TechRegret — 技術乗り換え・移行理由DB
      </footer>

      {selected && <DetailModal migration={selected} onClose={() => setSelected(null)} />}
      {showSubmit && <SubmitModal onClose={() => setShowSubmit(false)} onSubmit={handleSubmit} />}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    </div>
  );
}

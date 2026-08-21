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
    <div className="min-h-screen bg-slate-50">
      <Header query={query} onQueryChange={setQuery} onPost={() => setShowSubmit(true)} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="mb-6">
          <h1 className="text-lg font-black text-slate-900 sm:text-xl">
            公式ドキュメントに載っていない、現場の「乗り換えた決定打」
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            料金高騰・ビルド遅延・開発体験・仕様変更——技術スタックを移行した生々しい理由を検索・投稿できる技術選定の罠回避DB。
          </p>
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
            <p className="col-span-full py-16 text-center text-sm text-slate-400">該当するログが見つかりませんでした。</p>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-[14px] font-black text-slate-900">技術選定・乗り換えトレンド分析レポート</p>
              <p className="mt-1 text-[12px] text-slate-500">
                自社ツール・SaaSのスポンサー掲載、または技術スタック別トレンド分析レポートのDLはこちらから。
              </p>
            </div>
            <button
              onClick={() => setShowPricing(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#00d09c] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#00a37b]"
            >
              <CreditCard className="h-4 w-4" />
              プランを見る
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-[11px] text-slate-400">
        TechRegret — 技術乗り換え・移行理由DB
      </footer>

      {selected && <DetailModal migration={selected} onClose={() => setSelected(null)} />}
      {showSubmit && <SubmitModal onClose={() => setShowSubmit(false)} onSubmit={handleSubmit} />}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    </div>
  );
}

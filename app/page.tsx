"use client";

import { useEffect, useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import { CASES } from "@/data/cases";
import type { Category, Migration, ReasonKey } from "@/lib/types";
import { getSubmissions, getUpvoted, toggleUpvote, addSubmission } from "@/lib/storage";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { CategoryFilterBar } from "@/components/CategoryFilterBar";
import { MigrationCard } from "@/components/MigrationCard";
import { DetailModal } from "@/components/DetailModal";
import { SubmitModal } from "@/components/SubmitModal";
import { PricingModal } from "@/components/PricingModal";
import { StatsBento } from "@/components/StatsBento";

export default function Home() {
  const [query, setQuery] = useState("");
  const [reasonFilter, setReasonFilter] = useState<ReasonKey | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [submissions, setSubmissions] = useState<Migration[]>([]);
  const [upvoted, setUpvoted] = useState<string[]>([]);
  const [selected, setSelected] = useState<Migration | null>(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    setSubmissions(getSubmissions());
    setUpvoted(getUpvoted());
  }, []);

  const migrations = useMemo(() => [...submissions, ...CASES], [submissions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return migrations.filter((m) => {
      const matchesReason = reasonFilter === "all" || m.reasons.includes(reasonFilter);
      const matchesCategory = categoryFilter === "all" || m.category === categoryFilter;
      const matchesQuery =
        !q ||
        m.from.toLowerCase().includes(q) ||
        m.to.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        (m.company ?? "").toLowerCase().includes(q);
      return matchesReason && matchesCategory && matchesQuery;
    });
  }, [migrations, query, reasonFilter, categoryFilter]);

  const handleUpvote = (id: string) => {
    toggleUpvote(id);
    setUpvoted(getUpvoted());
  };

  const handleSubmit = (m: Migration) => {
    addSubmission(m);
    setSubmissions(getSubmissions());
  };

  return (
    <div className="min-h-screen bg-white">
      <Header query={query} onQueryChange={setQuery} onPost={() => setShowSubmit(true)} />

      <section className="relative overflow-hidden border-b border-[#e2e5e5] bg-white px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
        <img
          src="/illust/choose_5kz4.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-10 hidden h-56 w-auto opacity-90 lg:block xl:-right-2"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="eyebrow font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[#3ea8ff]">
            Tech Migration Database
          </p>
          <h1 className="font-display mt-3 text-[28px] font-extrabold leading-[1.4] text-[#0f131a] sm:text-[38px]">
            公式ドキュメントに載っていない、
            <br />
            現場の「乗り換えた決定打」
          </h1>
          <p className="mt-4 text-[14.5px] leading-relaxed text-[#5c5f66] sm:text-[15px]">
            料金高騰・パフォーマンス限界・開発体験・仕様変更——実在の企業が公開した技術スタック移行事例と、個人開発者のリアルな乗り換え理由を検索できる技術選定の罠回避DB。
          </p>
          <div className="mt-7">
            <SearchBar query={query} onQueryChange={setQuery} />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="mb-6">
          <StatsBento migrations={migrations} />
        </section>

        <section className="mb-3">
          <CategoryFilterBar active={categoryFilter} onChange={setCategoryFilter} />
        </section>
        <section className="mb-4">
          <FilterBar active={reasonFilter} onChange={setReasonFilter} />
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

        <section className="mt-10 overflow-hidden rounded-2xl border border-[#e2e5e5] bg-[#f9fafa] p-5 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <img src="/illust/fixing-bugs_1ytu.svg" alt="" aria-hidden="true" className="hidden h-16 w-auto shrink-0 sm:block" />
              <div>
                <p className="font-display text-[14px] font-extrabold text-[#0f131a]">技術選定・乗り換えトレンド分析レポート</p>
                <p className="mt-1 text-[12px] text-[#8f9faa]">
                  自社ツール・SaaSのスポンサー掲載、または技術スタック別トレンド分析レポートのDLはこちらから。
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPricing(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#3ea8ff] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0b6fd1]"
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

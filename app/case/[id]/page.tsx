import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, CalendarDays, Building2, AlertTriangle, Lightbulb, TrendingUp, BookOpen } from "lucide-react";
import { CASES } from "@/data/cases";
import { REASONS } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ArticleBody } from "@/components/ArticleBody";
import { MetricsTable } from "@/components/MetricsTable";

export function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = CASES.find((m) => m.id === id);
  if (!c) return {};
  const title = `${c.title}｜TechRegret`;
  return {
    title,
    description: c.summary,
    openGraph: { title, description: c.summary },
  };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = CASES.find((c) => c.id === id);
  if (!m) return notFound();

  const background = m.background ?? m.narrative;
  const process = m.process;
  const results = m.results;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#e2e5e5]">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-1.5 text-[13px] font-bold text-[#5c5f66] hover:text-[#1547B0]">
            <ArrowLeft className="h-4 w-4" />
            TechRegret 一覧に戻る
          </Link>
          {m.sourceUrl && (
            <a
              href={m.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#e2e5e5] px-3 py-1.5 text-[12px] font-bold text-[#5c5f66] transition hover:border-[#1E63E9] hover:text-[#1547B0]"
            >
              元記事を見る
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold">
          <span className="flex items-center gap-1 rounded-md bg-[#f5f6f6] px-2 py-1 text-[#5c5f66]">
            <CategoryIcon category={m.category} className="h-3 w-3" />
            {m.category}
          </span>
          {m.reasons.map((r) => (
            <span key={r} className="rounded-full bg-[#f5f6f6] px-2 py-0.5 text-[11px] font-semibold text-[#40444d]">
              {REASONS[r].emoji} {REASONS[r].label}
            </span>
          ))}
        </div>

        {m.company && (
          <div className="mt-4 flex items-center gap-2.5">
            <img
              src={`/logos/${m.id}.png`}
              alt=""
              aria-hidden="true"
              className="h-10 w-10 rounded-lg border border-[#e2e5e5] bg-white object-contain p-1.5"
            />
            <p className="flex items-center gap-1.5 text-[14px] font-bold text-[#1547B0]">
              <Building2 className="h-3.5 w-3.5" />
              {m.company}
            </p>
          </div>
        )}

        <h1 className="font-display mt-3 text-2xl font-extrabold leading-snug text-[#1F2937] sm:text-3xl">{m.title}</h1>

        <div className="mt-4 flex items-center gap-2 text-[13px] font-bold">
          <span className="rounded-md border border-[#f3c3ce] bg-[#fdf0f2] px-2.5 py-1 text-[#d60a34]">{m.from}</span>
          <ArrowRight className="h-4 w-4 text-slate-300" />
          <span className="rounded-md border border-[#c9ecab] bg-[#f2fbe9] px-2.5 py-1 text-[#378d00]">{m.to}</span>
        </div>

        <p className="mt-5 text-[15px] leading-[1.9] text-[#40444d]">{m.summary}</p>

        {(m.challenge || m.approach || m.resultSummary) && (
          <div className="mt-8 grid grid-cols-1 gap-3 rounded-2xl border border-[#e2e5e5] bg-[#f9fafa] p-5 sm:grid-cols-3 sm:p-6">
            {m.challenge && (
              <div>
                <p className="flex items-center gap-1.5 text-[11px] font-black text-[#8f9faa]">
                  <AlertTriangle className="h-3.5 w-3.5 text-[#d60a34]" />
                  課題
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#1F2937]">{m.challenge}</p>
              </div>
            )}
            {m.approach && (
              <div className="sm:border-l sm:border-[#e2e5e5] sm:pl-4">
                <p className="flex items-center gap-1.5 text-[11px] font-black text-[#8f9faa]">
                  <Lightbulb className="h-3.5 w-3.5 text-[#FFC800]" />
                  アプローチ
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#1F2937]">{m.approach}</p>
              </div>
            )}
            {m.resultSummary && (
              <div className="sm:border-l sm:border-[#e2e5e5] sm:pl-4">
                <p className="flex items-center gap-1.5 text-[11px] font-black text-[#8f9faa]">
                  <TrendingUp className="h-3.5 w-3.5 text-[#378d00]" />
                  効果
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#1F2937]">{m.resultSummary}</p>
              </div>
            )}
          </div>
        )}

        <section className="mt-10">
          <h2 className="font-display mb-3 text-[17px] font-black text-[#1F2937]">背景</h2>
          <ArticleBody text={background} />
        </section>

        {process && (
          <section className="mt-10">
            <h2 className="font-display mb-3 text-[17px] font-black text-[#1F2937]">移行のプロセス</h2>
            <ArticleBody text={process} />
          </section>
        )}

        {m.compareMetrics.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display mb-3 text-[17px] font-black text-[#1F2937]">移行前後の変化</h2>
            <MetricsTable rows={m.compareMetrics} />
          </section>
        )}

        {results && (
          <section className="mt-10">
            <h2 className="font-display mb-3 text-[17px] font-black text-[#1F2937]">結果</h2>
            <ArticleBody text={results} />
          </section>
        )}

        {m.lessons && (
          <section className="mt-10 rounded-2xl border border-[#FFE8A3] bg-[#FFF9E6] p-5 sm:p-6">
            <h2 className="font-display mb-2 flex items-center gap-1.5 text-[15px] font-black text-[#1F2937]">
              <BookOpen className="h-4 w-4 text-[#FFC800]" />
              学び
            </h2>
            <p className="whitespace-pre-line text-[14px] leading-[1.9] text-[#5c5f66]">{m.lessons}</p>
          </section>
        )}

        <section className="mt-10 flex items-center justify-between border-t border-[#e2e5e5] pt-5">
          <div className="flex items-center gap-1.5 text-[12px] text-[#8f9faa]">
            <CalendarDays className="h-3.5 w-3.5" />
            {m.createdAt}
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 rounded-full bg-[#1E63E9] px-3.5 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#1547B0]"
          >
            他の事例も見る
          </Link>
        </section>

        {m.sourceUrl && (
          <footer className="mt-6 rounded-xl border border-[#e2e5e5] bg-[#f9fafa] p-4 text-[13px] text-[#5c5f66]">
            <p className="font-bold text-[#1F2937]">出典</p>
            <a
              href={m.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-[#1547B0] hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {m.sourceName ?? m.sourceUrl}
            </a>
            <p className="mt-2 text-[12px] text-[#8f9faa]">
              本ページは上記出典をもとにTechRegretが要約したものです。詳細な文脈・数値は原文をご確認ください。
            </p>
          </footer>
        )}
      </article>
    </div>
  );
}

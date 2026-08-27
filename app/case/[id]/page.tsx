import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, CalendarDays, Building2 } from "lucide-react";
import { CASES } from "@/data/cases";
import { REASONS } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";
import { MetricChart } from "@/components/MetricChart";

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

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#e2e5e5]">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-1.5 text-[13px] font-bold text-[#5c5f66] hover:text-[#0b6fd1]">
            <ArrowLeft className="h-4 w-4" />
            TechRegret 一覧に戻る
          </Link>
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
          <p className="mt-4 flex items-center gap-1.5 text-[13px] font-bold text-[#0b6fd1]">
            <Building2 className="h-3.5 w-3.5" />
            {m.company}
          </p>
        )}

        <h1 className="font-display mt-2 text-2xl font-extrabold leading-snug text-[#0f131a] sm:text-3xl">{m.title}</h1>

        <div className="mt-4 flex items-center gap-2 text-[13px] font-bold">
          <span className="rounded-md border border-[#f3c3ce] bg-[#fdf0f2] px-2.5 py-1 text-[#d60a34]">{m.from}</span>
          <ArrowRight className="h-4 w-4 text-slate-300" />
          <span className="rounded-md border border-[#c9ecab] bg-[#f2fbe9] px-2.5 py-1 text-[#378d00]">{m.to}</span>
        </div>

        <p className="mt-5 text-[15px] leading-[1.9] text-[#40444d]">{m.summary}</p>

        <section className="mt-8">
          <h2 className="font-display mb-3 text-[15px] font-black text-[#0f131a]">何が起きたか</h2>
          <p className="whitespace-pre-line text-[15px] leading-[1.9] text-[#40444d]">{m.narrative}</p>
        </section>

        {m.compareMetrics.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display mb-3 text-[15px] font-black text-[#0f131a]">移行前後の変化</h2>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {m.compareMetrics.map((row, i) => (
                <MetricChart key={i} row={row} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 flex items-center justify-between border-t border-[#e2e5e5] pt-5">
          <div className="flex items-center gap-1.5 text-[12px] text-[#8f9faa]">
            <CalendarDays className="h-3.5 w-3.5" />
            {m.createdAt}
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 rounded-full bg-[#3ea8ff] px-3.5 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#0b6fd1]"
          >
            他の事例も見る
          </Link>
        </section>

        {m.sourceUrl && (
          <footer className="mt-6 rounded-xl border border-[#e2e5e5] bg-[#f9fafa] p-4 text-[13px] text-[#5c5f66]">
            <p className="font-bold text-[#0f131a]">出典</p>
            <a
              href={m.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-[#0b6fd1] hover:underline"
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

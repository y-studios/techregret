"use client";

import { useEffect } from "react";
import { X, FileDown, Crown, CreditCard } from "lucide-react";
import { STRIPE_LINKS } from "@/lib/stripe";

function PlanRow({
  icon,
  title,
  price,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  price: string;
  desc: string;
  href: string;
}) {
  const ready = href.length > 0;
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00d09c]/10 text-[#00a37b]">{icon}</span>
          <div>
            <p className="text-[14px] font-black text-slate-900">{title}</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500">{desc}</p>
          </div>
        </div>
        <p className="shrink-0 text-[15px] font-black text-slate-900">{price}</p>
      </div>
      {ready ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0f172a] py-2 text-[13px] font-bold text-white transition hover:bg-slate-800"
        >
          <CreditCard className="h-4 w-4" />
          Stripeで安全に決済する
        </a>
      ) : (
        <button
          disabled
          className="mt-3 flex w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-slate-100 py-2 text-[13px] font-bold text-slate-400"
        >
          決済リンク準備中
        </button>
      )}
    </div>
  );
}

export function PricingModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-t-2xl bg-white p-5 sm:rounded-2xl sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[15px] font-black text-slate-900">スポンサー / レポート購入</p>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          <PlanRow
            icon={<FileDown className="h-4 w-4" />}
            title="技術選定・乗り換えトレンド分析レポート"
            price="¥980"
            desc="全マイグレーションログを技術スタック別に集計したトレンド分析PDF（買い切り）。"
            href={STRIPE_LINKS.report}
          />
          <PlanRow
            icon={<Crown className="h-4 w-4" />}
            title="自社ツール/SaaSスポンサー掲載（Proパス）"
            price="¥1,980 / 年"
            desc="移行先候補として優先掲載。技術スタック別トレンド分析レポートも閲覧可能。"
            href={STRIPE_LINKS.sponsor}
          />
        </div>
        <p className="mt-4 text-center text-[11px] text-slate-400">Apple Pay / Google Pay / クレジットカード対応（Stripe決済）</p>
      </div>
    </div>
  );
}

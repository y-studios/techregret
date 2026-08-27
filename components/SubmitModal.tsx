"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Category, Migration, ReasonKey } from "@/lib/types";
import { REASONS } from "@/lib/types";

const CATEGORIES: Category[] = ["Hosting", "Framework", "DB", "Auth", "ORM", "UI"];

export function SubmitModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (m: Migration) => void }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [category, setCategory] = useState<Category>("Framework");
  const [reasons, setReasons] = useState<ReasonKey[]>([]);
  const [title, setTitle] = useState("");
  const [satisfaction, setSatisfaction] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [narrative, setNarrative] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggleReason = (r: ReasonKey) => {
    setReasons((prev) => (prev.includes(r) ? prev.filter((v) => v !== r) : [...prev, r]));
  };

  const canSubmit = from.trim() && to.trim() && title.trim() && reasons.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const m: Migration = {
      id: `user-${Date.now()}`,
      from: from.trim(),
      to: to.trim(),
      category,
      reasons,
      title: title.trim(),
      summary: narrative.trim().slice(0, 80) || title.trim(),
      satisfaction,
      upvotes: 0,
      prosBefore: [],
      consBefore: [],
      prosAfter: [],
      consAfter: [],
      narrative: narrative.trim() || "詳細は準備中です。",
      pitfalls: "",
      compareMetrics: [],
      author: author.trim() || "匿名",
      createdAt: new Date().toISOString().slice(0, 10),
      isUserSubmitted: true,
    };
    onSubmit(m);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="scrollbar-thin max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/illust/code-contribution_8k0x.svg" alt="" aria-hidden="true" className="h-12 w-12 shrink-0" />
            <p className="text-[15px] font-black text-slate-900">乗り換え理由を投稿する</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-[12px] font-bold text-slate-500">移行元（From）</span>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="例: Vercel"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#3ea8ff] focus:ring-2 focus:ring-[#3ea8ff]/20"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[12px] font-bold text-slate-500">移行先（To）</span>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="例: Cloudflare Pages"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#3ea8ff] focus:ring-2 focus:ring-[#3ea8ff]/20"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-[12px] font-bold text-slate-500">カテゴリ</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#3ea8ff] focus:ring-2 focus:ring-[#3ea8ff]/20"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="mb-1.5 block text-[12px] font-bold text-slate-500">主な乗り換え理由（複数選択）</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(REASONS) as ReasonKey[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleReason(r)}
                  className={`rounded-full border px-3 py-1.5 text-[12px] font-bold transition ${
                    reasons.includes(r) ? "border-[#3ea8ff] bg-[#3ea8ff] text-white" : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {REASONS[r].emoji} {REASONS[r].label}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1 block text-[12px] font-bold text-slate-500">タイトル・決定打（1行サマリー）</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 画像最適化コストが月$20を超えたためCFへ移行"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#3ea8ff] focus:ring-2 focus:ring-[#3ea8ff]/20"
            />
          </label>

          <div>
            <span className="mb-1.5 block text-[12px] font-bold text-slate-500">移行満足度</span>
            <div className="flex gap-1.5">
              {([1, 2, 3, 4, 5] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSatisfaction(n)}
                  className={`h-9 w-9 rounded-lg border text-sm font-bold transition ${
                    satisfaction >= n ? "border-amber-300 bg-amber-50 text-amber-500" : "border-slate-200 text-slate-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1 block text-[12px] font-bold text-slate-500">詳細レビュー（現場のハマりどころなど）</span>
            <textarea
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              rows={4}
              placeholder="具体的にどのコードや料金体系で詰まったか、移行時の注意点など"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#3ea8ff] focus:ring-2 focus:ring-[#3ea8ff]/20"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-[12px] font-bold text-slate-500">お名前（任意）</span>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="匿名可"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#3ea8ff] focus:ring-2 focus:ring-[#3ea8ff]/20"
            />
          </label>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full rounded-lg bg-[#0f131a] py-2.5 text-sm font-bold text-white transition hover:bg-[#272c35] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            投稿する
          </button>
          <p className="text-center text-[11px] text-slate-400">この端末（LocalStorage）に保存されます</p>
        </div>
      </div>
    </div>
  );
}

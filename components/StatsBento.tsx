"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import type { Migration, ReasonKey } from "@/lib/types";
import { REASONS } from "@/lib/types";

const COLORS: Record<ReasonKey, string> = {
  cost: "#FFC800",
  performance: "#14B8A6",
  dx: "#1E63E9",
  deprecation: "#ff6868",
};

export function StatsBento({ migrations }: { migrations: Migration[] }) {
  const total = migrations.length;
  const realCases = migrations.filter((m) => m.sourceUrl).length;
  const totalUpvotes = migrations.reduce((s, m) => s + (m.upvotes ?? 0), 0);

  const reasonCounts = (Object.keys(REASONS) as ReasonKey[]).map((r) => ({
    name: REASONS[r].label,
    key: r,
    value: migrations.filter((m) => m.reasons.includes(r)).length,
  }));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e2e5e5] bg-white p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[#FFC800] opacity-[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-[#1E63E9] opacity-[0.06] blur-3xl" />

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#e2e5e5] bg-[#f9fafa] p-3.5">
          <p className="text-[11px] font-bold text-[#8f9faa]">登録ログ数</p>
          <p className="font-display mt-1 text-2xl font-extrabold text-[#1F2937]">{total}</p>
        </div>
        <div className="rounded-xl border border-[#e2e5e5] bg-[#f9fafa] p-3.5">
          <p className="text-[11px] font-bold text-[#8f9faa]">出典付きの実企業事例</p>
          <p className="font-display mt-1 text-2xl font-extrabold text-[#1F2937]">{realCases}</p>
        </div>
        <div className="rounded-xl border border-[#e2e5e5] bg-[#f9fafa] p-3.5">
          <p className="text-[11px] font-bold text-[#8f9faa]">累計「わかる」</p>
          <p className="font-display mt-1 text-2xl font-extrabold text-[#1F2937]">{totalUpvotes}</p>
        </div>
        <div className="col-span-2 row-span-2 rounded-xl border border-[#e2e5e5] bg-[#f9fafa] p-3.5 sm:col-span-1">
          <p className="mb-1 text-[11px] font-bold text-[#8f9faa]">乗り換え理由の内訳</p>
          <div className="h-[92px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reasonCounts} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={0} hide />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} isAnimationActive={false} barSize={14}>
                  {reasonCounts.map((r) => (
                    <Cell key={r.key} fill={COLORS[r.key]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

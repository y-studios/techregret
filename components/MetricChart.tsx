"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { CompareRow } from "@/lib/types";
import { parseMetricNumber } from "@/lib/parseMetric";

export function MetricChart({ row }: { row: CompareRow }) {
  const before = parseMetricNumber(row.before);
  const after = parseMetricNumber(row.after);

  if (before === null || after === null) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px]">
        <span className="font-semibold text-slate-500">{row.label}</span>
        <span className="font-bold text-rose-500">{row.before}</span>
        <span className="text-slate-300">→</span>
        <span className="font-bold text-emerald-600">{row.after}</span>
      </div>
    );
  }

  const data = [
    { name: "Before", value: before, label: row.before },
    { name: "After", value: after, label: row.after },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="mb-1 text-[12px] font-bold text-slate-500">{row.label}</p>
      <div className="h-[90px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={48} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(_, __, item) => [(item.payload as { label: string }).label, ""]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} isAnimationActive={false}>
              <Cell fill="#fb7185" />
              <Cell fill="#00d09c" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

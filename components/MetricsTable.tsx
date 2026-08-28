import { ArrowRight } from "lucide-react";
import type { CompareRow } from "@/lib/types";

export function MetricsTable({ rows }: { rows: CompareRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#e2e5e5]">
      <table className="w-full min-w-[420px] border-collapse text-[13.5px]">
        <thead>
          <tr className="bg-[#f5f6f6] text-left text-[11.5px] font-black text-[#8f9faa]">
            <th className="px-4 py-2.5">指標</th>
            <th className="px-4 py-2.5">Before</th>
            <th className="px-4 py-2.5"></th>
            <th className="px-4 py-2.5">After</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#fafbfb]"}>
              <td className="border-t border-[#edeeee] px-4 py-3 font-bold text-[#1F2937]">{row.label}</td>
              <td className="border-t border-[#edeeee] px-4 py-3 font-semibold text-[#d60a34]">{row.before}</td>
              <td className="border-t border-[#edeeee] px-2 py-3 text-slate-300">
                <ArrowRight className="h-3.5 w-3.5" />
              </td>
              <td className="border-t border-[#edeeee] px-4 py-3 font-semibold text-[#378d00]">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

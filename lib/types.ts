export type ReasonKey = "cost" | "performance" | "dx" | "deprecation";

export const REASONS: Record<ReasonKey, { label: string; emoji: string }> = {
  cost: { label: "コスト削減", emoji: "💸" },
  performance: { label: "パフォーマンス・速度", emoji: "⚡" },
  dx: { label: "開発体験（DX）", emoji: "🛠️" },
  deprecation: { label: "サービスの仕様変更/終了", emoji: "⚠️" },
};

export type Category = "Hosting" | "Framework" | "DB" | "Auth" | "ORM" | "UI";

export interface CompareRow {
  label: string;
  before: string;
  after: string;
}

export interface Migration {
  id: string;
  from: string;
  to: string;
  category: Category;
  reasons: ReasonKey[];
  title: string;
  summary: string;
  satisfaction: 1 | 2 | 3 | 4 | 5;
  upvotes: number;
  prosBefore: string[];
  consBefore: string[];
  prosAfter: string[];
  consAfter: string[];
  narrative: string;
  pitfalls: string;
  compareMetrics: CompareRow[];
  author: string;
  authorX?: string;
  createdAt: string;
  isUserSubmitted?: boolean;
}

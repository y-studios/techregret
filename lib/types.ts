export type ReasonKey = "cost" | "performance" | "dx" | "deprecation";

export const REASONS: Record<ReasonKey, { label: string; emoji: string }> = {
  cost: { label: "コスト削減", emoji: "💸" },
  performance: { label: "パフォーマンス・速度", emoji: "⚡" },
  dx: { label: "開発体験（DX）", emoji: "🛠️" },
  deprecation: { label: "サービスの仕様変更/終了", emoji: "⚠️" },
};

export type Category = "Hosting" | "Framework" | "DB" | "Auth" | "ORM" | "UI" | "Language" | "Architecture";

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
  narrative: string;
  compareMetrics: CompareRow[];
  createdAt: string;
  isUserSubmitted?: boolean;

  // ユーザー投稿(SubmitModal経由)のみで使うフィールド
  satisfaction?: 1 | 2 | 3 | 4 | 5;
  upvotes?: number;
  prosBefore?: string[];
  consBefore?: string[];
  prosAfter?: string[];
  consAfter?: string[];
  pitfalls?: string;
  author?: string;
  authorX?: string;

  // 実企業の事例(data/cases.ts)のみで使うフィールド。詳細ページ(/case/[id])を持つ
  company?: string;
  sourceName?: string;
  sourceUrl?: string;

  // 詳細ページの拡充用（あれば使う。無ければnarrativeにフォールバック）
  challenge?: string;
  approach?: string;
  resultSummary?: string;
  background?: string;
  process?: string;
  results?: string;
  lessons?: string;
}

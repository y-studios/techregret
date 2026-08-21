import { Server, Layers, Database, ShieldCheck, GitBranch, Palette, Box } from "lucide-react";
import type { Category } from "@/lib/types";

const ICONS: Record<Category, typeof Server> = {
  Hosting: Server,
  Framework: Layers,
  DB: Database,
  Auth: ShieldCheck,
  ORM: GitBranch,
  UI: Palette,
};

export function CategoryIcon({ category, className }: { category: Category; className?: string }) {
  const Icon = ICONS[category] ?? Box;
  return <Icon className={className} />;
}

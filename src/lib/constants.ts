export const CATEGORY_COLORS: Record<string, string> = {
  teologia: "bg-rose-50 text-rose-700",
  "vida-crista": "bg-emerald-50 text-emerald-700",
  devocional: "bg-amber-50 text-amber-700",
  apologetica: "bg-sky-50 text-sky-700",
  "estudo-biblico": "bg-violet-50 text-violet-700",
  escatologia: "bg-orange-50 text-orange-700",
  geral: "bg-neutral-100 text-neutral-600",
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category.toLowerCase()] ?? CATEGORY_COLORS["geral"];
}

import type { Category, CategoryCatalog } from "@/lib/validation/schemas";

export function getCategoryLabels(category: Category, categories: CategoryCatalog): string[] {
  const primary = categories.primary.find((candidate) => candidate.id === category.primary);
  const secondary = primary?.secondary.find((candidate) => candidate.id === category.secondary);
  const tertiary = secondary?.tertiary.find((candidate) => candidate.id === category.tertiary);

  return [
    primary?.label ?? category.primary,
    secondary?.label ?? category.secondary,
    tertiary?.label ?? category.tertiary
  ];
}

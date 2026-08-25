import { notFound } from "next/navigation";
import { ComparisonPage } from "@/components/comparisons/ComparisonPage";
import { ContentValidationState } from "@/components/concepts/ConceptPage";
import { loadComparisonById } from "@/lib/content/loader";
import { ContentValidationError } from "@/lib/validation/errors";

const V1_COMPARISON_ID = "filter-chip-vs-badge-vs-tag";

export default async function ComparisonRoute() {
  let loaded: Awaited<ReturnType<typeof loadComparisonById>>;

  try {
    loaded = await loadComparisonById(V1_COMPARISON_ID);
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return (
        <ContentValidationState
          error={error}
          title="La comparaison ne peut pas être affichée"
          description="La comparaison éditoriale est invalide."
        />
      );
    }

    throw error;
  }

  if (!loaded.comparison) {
    notFound();
  }

  return <ComparisonPage comparison={loaded.comparison} concepts={loaded.concepts} />;
}

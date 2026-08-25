import { notFound } from "next/navigation";
import { ConceptPage, ContentValidationState } from "@/components/concepts/ConceptPage";
import { loadConceptBySlug } from "@/lib/content/loader";
import { ContentValidationError } from "@/lib/validation/errors";

type ConceptRouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function ConceptRoute({ params }: ConceptRouteProps) {
  const { slug } = await params;
  let loaded: Awaited<ReturnType<typeof loadConceptBySlug>>;

  try {
    loaded = await loadConceptBySlug(slug);
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return <ContentValidationState error={error} />;
    }

    throw error;
  }

  if (!loaded.concept) {
    notFound();
  }

  return (
    <ConceptPage
      concept={loaded.concept}
      concepts={loaded.concepts}
      categories={loaded.categories}
      comparisons={loaded.comparisons}
    />
  );
}

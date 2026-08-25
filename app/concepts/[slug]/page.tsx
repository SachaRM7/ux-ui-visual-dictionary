import { notFound } from "next/navigation";
import { ConceptPage, ContentValidationState } from "@/components/concepts/ConceptPage";
import { loadConceptBySlug } from "@/lib/content/loader";
import { ContentValidationError } from "@/lib/validation/errors";

type ConceptRouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function ConceptRoute({ params }: ConceptRouteProps) {
  const { slug } = await params;

  try {
    const loaded = await loadConceptBySlug(slug);

    if (!loaded.concept) {
      notFound();
    }

    return (
      <ConceptPage
        concept={loaded.concept}
        concepts={loaded.concepts}
        categories={loaded.categories}
      />
    );
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return <ContentValidationState error={error} />;
    }

    throw error;
  }
}

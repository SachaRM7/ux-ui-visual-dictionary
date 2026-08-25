import Link from "next/link";
import { SliceNavigation } from "@/components/navigation/SliceNavigation";
import { getCategoryLabels } from "@/lib/content/categories";
import { loadContentCatalog } from "@/lib/content/loader";
import { ContentValidationState } from "@/components/concepts/ConceptPage";
import { ContentValidationError } from "@/lib/validation/errors";
import { searchConcepts } from "@/lib/search/search";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

function getQueryValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getQueryValue(params.q);
  let catalog: Awaited<ReturnType<typeof loadContentCatalog>>;

  try {
    catalog = await loadContentCatalog();
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return <ContentValidationState error={error} />;
    }

    throw error;
  }

  const results = searchConcepts(catalog.concepts, query);

  return (
    <>
      <SliceNavigation />
      <main className="search-page">
        <section className="search-header">
          <p className="eyebrow">Recherche V1</p>
          <h1>Rechercher un concept</h1>
          <form action="/search" method="get" className="search-form">
            <label htmlFor="search-query">Votre recherche</label>
            <div>
              <input
                id="search-query"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Ex. petits boutons pour filtrer"
              />
              <button type="submit">Rechercher</button>
            </div>
          </form>
        </section>

        <section className="search-results" aria-live="polite">
          <h2>
            {query ? "Résultats pour « " + query + " »" : "Aucune recherche effectuée"}
          </h2>

          {!query ? (
            <p className="empty-state">Saisissez une intention ou un terme UI/UX.</p>
          ) : results.length === 0 ? (
            <p className="empty-state">Aucun concept ne correspond à cette recherche.</p>
          ) : (
            <ol className="result-list">
              {results.map((result) => (
                <li key={result.concept.id}>
                  <article className="result-card">
                    <h3>
                      <Link href={"/concepts/" + result.concept.slug}>
                        {result.concept.canonical_name}
                      </Link>
                    </h3>
                    <p>{result.concept.short_definition}</p>
                    <p>
                      <strong>Catégorie :</strong>{" "}
                      {getCategoryLabels(result.concept.category, catalog.categories).join(" / ")}
                    </p>
                    <p>
                      <strong>Correspondance :</strong> {result.reason}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>
    </>
  );
}

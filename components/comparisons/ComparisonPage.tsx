import React from "react";
import Link from "next/link";
import { SliceNavigation } from "@/components/navigation/SliceNavigation";
import type { Comparison, Concept, ConceptCatalog } from "@/lib/validation/schemas";

const CRITERION_KEYS = [
  "function",
  "interaction",
  "selection",
  "role",
  "context",
  "use_case"
] as const;

type CriterionKey = (typeof CRITERION_KEYS)[number];

const CRITERION_LABELS: Record<CriterionKey, string> = {
  function: "Function",
  interaction: "Interaction",
  selection: "Selection",
  role: "Role",
  context: "Context",
  use_case: "Use case"
};

function findConcept(id: string, concepts: ConceptCatalog): Concept | undefined {
  return concepts.find((concept) => concept.id === id);
}

export function ConceptComparisonHeader({ concept }: { concept: Concept }) {
  return (
    <li className="comparison-concept">
      <h2>
        <Link href={"/concepts/" + concept.slug}>{concept.canonical_name}</Link>
      </h2>
      <p>{concept.short_definition}</p>
    </li>
  );
}

export function ComparisonCriterion({
  criterion,
  concept_ids,
  concepts,
  values
}: {
  criterion: CriterionKey;
  concept_ids: string[];
  concepts: ConceptCatalog;
  values: Record<string, string>;
}) {
  return (
    <li className="comparison-criterion">
      <h2>{CRITERION_LABELS[criterion]}</h2>
      <dl className="comparison-values">
        {concept_ids.map((concept_id) => {
          const concept = findConcept(concept_id, concepts);

          if (!concept) {
            return null;
          }

          return (
            <div key={concept.id}>
              <dt>{concept.canonical_name}</dt>
              <dd>{values[concept.id] ?? "Valeur non renseignée."}</dd>
            </div>
          );
        })}
      </dl>
    </li>
  );
}

export function ComparisonPage({
  comparison,
  concepts
}: {
  comparison: Comparison;
  concepts: ConceptCatalog;
}) {
  const comparedConcepts = comparison.concepts
    .map((concept_id) => findConcept(concept_id, concepts))
    .filter((concept): concept is Concept => concept !== undefined);

  return (
    <>
      <SliceNavigation />
      <main className="comparison-page">
      <article>
        <header className="comparison-header">
          <p className="eyebrow">Comparaison éditoriale</p>
          <h1>{comparedConcepts.map((concept) => concept.canonical_name).join(" / ")}</h1>
        </header>

        <section className="comparison-concepts-section">
          <h2>Concepts comparés</h2>
          <ol className="comparison-concepts">
            {comparedConcepts.map((concept) => (
              <ConceptComparisonHeader key={concept.id} concept={concept} />
            ))}
          </ol>
        </section>

        <section className="comparison-criteria-section">
          <h2>Critères</h2>
          <ol className="comparison-criteria">
            {CRITERION_KEYS.map((criterion) => (
              <ComparisonCriterion
                key={criterion}
                criterion={criterion}
                concept_ids={comparison.concepts}
                concepts={concepts}
                values={comparison.criteria[criterion]}
              />
            ))}
          </ol>
        </section>
      </article>
      </main>
    </>
  );
}

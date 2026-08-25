import React from "react";
import type { ReactNode } from "react";
import type { CategoryCatalog, Concept, ConceptCatalog } from "@/lib/validation/schemas";
import type { ContentValidationError } from "@/lib/validation/errors";
import { getCategoryLabels } from "@/lib/content/categories";
import { CopyablePrompt } from "@/components/concepts/CopyablePrompt";

type ConceptPageProps = {
  concept: Concept;
  concepts: ConceptCatalog;
  categories: CategoryCatalog;
};

type DefinitionListProps = {
  items: Array<[string, string]>;
};

function formatValue(value: unknown): string {
  if (value === null) {
    return "Aucune limite";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return String(value);
}

function conceptLabel(id: string, concepts: ConceptCatalog): string {
  return concepts.find((concept) => concept.id === id)?.canonical_name ?? id;
}

function relationshipLabel(key: string): string {
  const labels: Record<string, string> = {
    parent: "Parent",
    commonly_confused_with: "À ne pas confondre avec",
    alternatives_to: "Alternatives",
    related_patterns: "Patterns associés"
  };

  return labels[key] ?? key;
}

export function ConceptSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="concept-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function DefinitionList({ items }: DefinitionListProps) {
  if (items.length === 0) {
    return <p className="empty-state">Aucune donnée renseignée.</p>;
  }

  return (
    <dl className="definition-list">
      {items.map(([term, description]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  );
}

function StringList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="empty-state">Aucune donnée renseignée.</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function VariantList({ concept }: { concept: Concept }) {
  if (concept.variants.length === 0) {
    return <p className="empty-state">Aucune variante renseignée.</p>;
  }

  return (
    <ul>
      {concept.variants.map((variant) => (
        <li key={variant.id}>
          <strong>{variant.name}</strong>
          <span>{variant.description}</span>
        </li>
      ))}
    </ul>
  );
}

function StateList({ concept }: { concept: Concept }) {
  if (concept.states.length === 0) {
    return <p className="empty-state">Aucun état renseigné.</p>;
  }

  return (
    <ul>
      {concept.states.map((state) => (
        <li key={state.id}>
          <strong>{state.name}</strong>
          <span>{state.description}</span>
        </li>
      ))}
    </ul>
  );
}

function RelationshipList({ concept, concepts }: Pick<ConceptPageProps, "concept" | "concepts">) {
  const relationships = Object.entries(concept.relationships).map(([key, ids]) => [
    relationshipLabel(key),
    ids.length > 0 ? ids.map((id) => conceptLabel(id, concepts)).join(", ") : "Aucune"
  ] as [string, string]);

  return <DefinitionList items={relationships} />;
}

function SourceList({ concept }: { concept: Concept }) {
  if (concept.sources.length === 0) {
    return <p className="empty-state">Aucune source renseignée.</p>;
  }

  return (
    <ul className="source-list">
      {concept.sources.map((source) => (
        <li key={source.name + "-" + source.publisher}>
          <strong>{source.name}</strong>
          <span>{source.publisher}</span>
          <span>Usage : {formatValue(source.usage)}</span>
          <span>Vérification : {source.last_verified ?? "À vérifier"}</span>
          {source.url.startsWith("http") ? (
            <a href={source.url}>{source.url}</a>
          ) : (
            <span>URL : {source.url}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ConceptPage({ concept, concepts, categories }: ConceptPageProps) {
  const labels = getCategoryLabels(concept.category, categories);

  return (
    <main className="concept-page">
      <article>
        <header className="concept-header">
          <p className="eyebrow">{concept.status}</p>
          <h1>{concept.canonical_name}</h1>
          <p className="category-path">
            <strong>Catégorie :</strong> {labels.join(" / ")}
          </p>
          <p className="short-definition">{concept.short_definition}</p>
        </header>

        <ConceptSection title="Définition">
          <p>{concept.definition}</p>
        </ConceptSection>

        <ConceptSection title="Purpose">
          <p>{concept.purpose}</p>
        </ConceptSection>

        <div className="concept-grid">
          <ConceptSection title="Quand l'utiliser">
            <StringList items={concept.use_when} />
          </ConceptSection>

          <ConceptSection title="Quand l'éviter">
            <StringList items={concept.avoid_when} />
          </ConceptSection>
        </div>

        <div className="concept-grid">
          <ConceptSection title="Variantes">
            <VariantList concept={concept} />
          </ConceptSection>

          <ConceptSection title="États">
            <StateList concept={concept} />
          </ConceptSection>
        </div>

        <ConceptSection title="Relations">
          <RelationshipList concept={concept} concepts={concepts} />
        </ConceptSection>

        {concept.interactive && concept.selection_model ? (
          <ConceptSection title="Modèle de sélection">
            <DefinitionList
              items={[
                ["Type", concept.selection_model.type],
                ["Sélection minimale", formatValue(concept.selection_model.min_selection)],
                ["Sélection maximale", formatValue(concept.selection_model.max_selection)]
              ]}
            />
          </ConceptSection>
        ) : null}

        {concept.interactive && concept.interaction_model ? (
          <ConceptSection title="Modèle d'interaction">
            <DefinitionList
              items={[
                ["Déclencheur", concept.interaction_model.trigger],
                ["Activation", concept.interaction_model.activation],
                ["Désactivation", concept.interaction_model.deactivation],
                ["Effet immédiat", formatValue(concept.interaction_model.immediate_effect)],
                ["Confirmation requise", formatValue(concept.interaction_model.requires_confirmation)]
              ]}
            />
          </ConceptSection>
        ) : null}

        {concept.interactive && concept.accessibility ? (
          <ConceptSection title="Accessibilité">
            <DefinitionList
              items={[
                ["Rôle sémantique", concept.accessibility.semantic_role],
                ["Élément natif", concept.accessibility.native_element],
                ["Clavier", formatValue(concept.accessibility.keyboard)],
                ["Focus", concept.accessibility.focus],
                ["Contraste", concept.accessibility.contrast],
                ["Taille de cible", concept.accessibility.target_size],
                ["Indépendance de la couleur", concept.accessibility.color_independence]
              ]}
            />
          </ConceptSection>
        ) : null}

        <ConceptSection title="Sources">
          <SourceList concept={concept} />
        </ConceptSection>

        <ConceptSection title="Prompts IA">
          <CopyablePrompt label="Prompt court" prompt={concept.ai.short_prompt} />
          <CopyablePrompt label="Prompt détaillé" prompt={concept.ai.detailed_prompt} />
        </ConceptSection>
      </article>
    </main>
  );
}

export function ContentValidationState({ error, title = "La fiche concept ne peut pas être affichée", description = "Le contenu structuré est invalide." }: { error: ContentValidationError; title?: string; description?: string }) {
  return (
    <main className="concept-page" role="alert">
      <article>
        <header className="concept-header">
          <p className="eyebrow">Erreur de contenu</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <ConceptSection title="Détails de validation">
          <ul>
            {error.issues.map((issue, index) => (
              <li key={issue.path.join(".") + "-" + index}>
                <strong>{issue.path.length > 0 ? issue.path.join(".") : "document"} :</strong>{" "}
                {issue.message}
              </li>
            ))}
          </ul>
        </ConceptSection>
      </article>
    </main>
  );
}
